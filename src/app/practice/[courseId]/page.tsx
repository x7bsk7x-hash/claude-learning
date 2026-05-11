'use client';
import { useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { practiceQuestions } from '@/data/practice-questions';
import { courses } from '@/data/courses';
import { savePracticeResult } from '@/lib/storage';
import type { MCQPracticeQuestion, PromptWritingQuestion, PromptFeedback } from '@/lib/types';

type Phase = 'intro' | 'quiz' | 'done';

export default function PracticePage() {
  const { courseId } = useParams<{ courseId: string }>();
  const course = courses.find(c => c.id === courseId);
  const questions = practiceQuestions.filter(q => q.courseId === courseId);

  const [phase, setPhase] = useState<Phase>('intro');
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showExp, setShowExp] = useState(false);
  const [scores, setScores] = useState<number[]>([]);
  const [promptTexts, setPromptTexts] = useState<Record<number, string>>({});
  const [promptFeedbacks, setPromptFeedbacks] = useState<PromptFeedback[]>([]);
  const [evaluating, setEvaluating] = useState(false);

  const q = questions[current];

  const handleMCQ = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    setShowExp(true);
    const correct = idx === (q as MCQPracticeQuestion).correctIndex ? 1 : 0;
    setScores(prev => [...prev, correct]);
  };

  const handlePromptSubmit = useCallback(async () => {
    const pq = q as PromptWritingQuestion;
    const userPrompt = promptTexts[current] ?? '';
    if (!userPrompt.trim()) return;
    setEvaluating(true);

    let score = 0;
    let feedback = '';
    let criteria: PromptFeedback['criteria'] = [];

    try {
      const res = await fetch('/api/evaluate-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userPrompt, question: pq, apiKey: localStorage.getItem('cl-api-key') }),
      });
      if (res.ok) {
        const data = await res.json();
        score = data.score;
        feedback = data.feedback;
        criteria = data.criteria;
      }
    } catch {
      const met = pq.evaluationCriteria.filter(c => userPrompt.includes(c.slice(0, 10))).length;
      score = met / pq.evaluationCriteria.length;
      feedback = score >= 0.6 ? 'よく書けています！' : '具体性を高めてみましょう。';
      criteria = pq.evaluationCriteria.map(c => ({ name: c, passed: userPrompt.length > 50, comment: '' }));
    }

    setEvaluating(false);
    setShowExp(true);
    setScores(prev => [...prev, score]);
    setPromptFeedbacks(prev => [...prev, { questionId: q.id, userPrompt, score, feedback, criteria }]);
  }, [q, current, promptTexts]);

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(c => c + 1);
      setSelected(null);
      setShowExp(false);
    } else {
      const total = scores.reduce((a, b) => a + b, 0) / scores.length;
      savePracticeResult({ courseId: courseId!, date: new Date().toISOString(), score: total, totalQuestions: questions.length, promptFeedback: promptFeedbacks });
      setPhase('done');
    }
  };

  const nextCourse = courses.find(c => courses.indexOf(c) === courses.indexOf(course!) + 1);

  if (!course) return (
    <>
      <Navigation />
      <main style={{ padding: 48, textAlign: 'center', color: 'var(--text-muted)' }}>
        コースが見つかりません。
        <Link href="/courses" style={{ color: 'var(--accent)', marginLeft: 8 }}>コース一覧へ</Link>
      </main>
    </>
  );

  if (questions.length === 0) return (
    <>
      <Navigation />
      <main style={{ padding: 48, textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)', marginBottom: 20 }}>このコースの演習問題はまだ準備中です。</p>
        <Link href={`/courses/${courseId}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none', padding: '8px 16px', border: '1px solid var(--border)', borderRadius: 7, background: 'var(--bg-surface)' }}>
          ← コースに戻る
        </Link>
      </main>
    </>
  );

  if (phase === 'intro') return (
    <>
      <Navigation />
      <main style={{ maxWidth: 640, margin: '0 auto', padding: '40px 16px 80px' }}>
        <Link href={`/courses/${courseId}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none', marginBottom: 36, padding: '6px 12px', border: '1px solid var(--border)', borderRadius: 7, background: 'var(--bg-surface)' }}>
          ← コースに戻る
        </Link>

        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '36px 28px', textAlign: 'center' }}>
          <div style={{ width: 52, height: 52, borderRadius: 12, background: 'rgba(157,140,255,0.1)', border: '1px solid rgba(157,140,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-mono)', margin: '0 auto 20px' }}>
            P{course.part}
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8, letterSpacing: '0.05em' }}>{course.partLabel}</div>
          <h1 style={{ fontSize: 'clamp(18px, 3vw, 22px)', fontWeight: 700, margin: '0 0 8px' }}>{course.title}</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 32, fontSize: 14 }}>演習問題: {questions.length}問</p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 32 }}>
            {[
              { label: '問題数', value: `${questions.length}問` },
              { label: '形式', value: 'MCQ + 記述' },
            ].map(s => (
              <div key={s.label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 16px' }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--accent)' }}>{s.value}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>

          <button onClick={() => setPhase('quiz')} className="btn-primary" style={{ padding: '12px 36px', fontSize: 15, cursor: 'pointer' }}>
            演習を始める →
          </button>
        </div>
      </main>
    </>
  );

  if (phase === 'done') {
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    const scoreColor = avg >= 0.75 ? 'var(--green)' : avg >= 0.45 ? 'var(--accent)' : 'var(--red)';
    return (
      <>
        <Navigation />
        <main style={{ maxWidth: 640, margin: '0 auto', padding: '48px 16px 80px', textAlign: 'center' }}>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '36px 28px', marginBottom: 24 }}>
            <div style={{ width: 52, height: 52, borderRadius: 12, background: avg >= 0.75 ? 'rgba(45,206,137,0.1)' : 'rgba(157,140,255,0.1)', border: `1px solid ${avg >= 0.75 ? 'rgba(45,206,137,0.3)' : 'rgba(157,140,255,0.3)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: avg >= 0.75 ? 'var(--green)' : 'var(--accent)', margin: '0 auto 16px' }}>✓</div>
            <h1 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 8px' }}>演習完了</h1>
            <div style={{ fontSize: 48, fontWeight: 700, color: scoreColor, margin: '16px 0 4px', lineHeight: 1 }}>
              {Math.round(avg * 100)}<span style={{ fontSize: 18, fontWeight: 400 }}>点</span>
            </div>
            <p style={{ color: 'var(--text-muted)', marginBottom: 0, fontSize: 14 }}>+{Math.round(avg * 30)}ポイント獲得</p>
          </div>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href={`/courses/${courseId}`} style={{ display: 'inline-block', background: 'var(--bg-surface)', color: 'var(--text-secondary)', padding: '11px 22px', borderRadius: 8, fontWeight: 600, textDecoration: 'none', border: '1px solid var(--border)', fontSize: 14 }}>
              ← コースに戻る
            </Link>
            {nextCourse && (
              <Link href={`/courses/${nextCourse.id}`} className="btn-primary" style={{ padding: '11px 22px', textDecoration: 'none', display: 'inline-block', fontSize: 14 }}>
                次のコース →
              </Link>
            )}
          </div>
        </main>
      </>
    );
  }

  const progress = (current / questions.length) * 100;
  return (
    <>
      <Navigation />
      <main style={{ maxWidth: 720, margin: '0 auto', padding: '28px 16px 80px' }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <Link href={`/courses/${courseId}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--text-muted)', textDecoration: 'none', padding: '5px 10px', border: '1px solid var(--border)', borderRadius: 6, background: 'var(--bg-surface)' }}>
              ← コースに戻る
            </Link>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', gap: 12 }}>
              <span>問題 <strong style={{ color: 'var(--text-primary)' }}>{current + 1}</strong> / {questions.length}</span>
              <span style={{ color: q.type === 'multiple-choice' ? 'var(--accent)' : 'var(--purple)' }}>
                {q.type === 'multiple-choice' ? '選択問題' : '記述問題'}
              </span>
            </div>
          </div>
          <div style={{ background: 'var(--bg-card)', borderRadius: 4, height: 5 }}>
            <div style={{ background: 'var(--accent)', height: 5, borderRadius: 4, width: `${progress}%`, transition: 'width 0.3s' }} />
          </div>
        </div>

        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 'clamp(18px, 4vw, 28px)', marginBottom: 16 }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 10, letterSpacing: '0.05em' }}>{q.topic}</div>
          <h2 style={{ fontSize: 'clamp(15px, 2.5vw, 18px)', fontWeight: 600, lineHeight: 1.7, margin: '0 0 20px', color: 'var(--text-primary)' }}>{q.question}</h2>

          {q.type === 'multiple-choice' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {(q as MCQPracticeQuestion).options.map((opt, i) => {
                let bg = 'var(--bg-card)', bc = 'var(--border)', color = 'var(--text-primary)';
                if (selected !== null) {
                  if (i === (q as MCQPracticeQuestion).correctIndex) { bg = 'rgba(45,206,137,0.1)'; bc = 'rgba(45,206,137,0.5)'; color = 'var(--green)'; }
                  else if (i === selected) { bg = 'rgba(247,95,106,0.08)'; bc = 'rgba(247,95,106,0.45)'; color = 'var(--red)'; }
                }
                return (
                  <button key={i} onClick={() => handleMCQ(i)} style={{ background: bg, border: `1px solid ${bc}`, borderRadius: 8, padding: '13px 16px', textAlign: 'left', cursor: selected !== null ? 'default' : 'pointer', color, fontSize: 14, lineHeight: 1.6, transition: 'all 0.15s', width: '100%' }}>
                    <span style={{ fontWeight: 700, marginRight: 10, opacity: 0.5, fontFamily: 'var(--font-mono)' }}>{String.fromCharCode(65 + i)}.</span>{opt}
                  </button>
                );
              })}
            </div>
          ) : (
            <div>
              {(q as PromptWritingQuestion).scenario && (
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 16px', marginBottom: 16, fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  <strong style={{ color: 'var(--text-muted)', display: 'block', marginBottom: 6, fontSize: 11, letterSpacing: '0.05em' }}>シナリオ</strong>
                  {(q as PromptWritingQuestion).scenario}
                </div>
              )}
              <textarea
                value={promptTexts[current] ?? ''}
                onChange={e => setPromptTexts(prev => ({ ...prev, [current]: e.target.value }))}
                disabled={showExp}
                placeholder="Claude Codeへの指示プロンプトをここに書いてください..."
                style={{ width: '100%', minHeight: 160, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 14px', color: 'var(--text-primary)', fontSize: 14, lineHeight: 1.7, resize: 'vertical', fontFamily: 'inherit', outline: 'none' }}
              />
              {!showExp && (
                <button
                  onClick={handlePromptSubmit}
                  disabled={evaluating || !promptTexts[current]?.trim()}
                  className="btn-primary"
                  style={{ marginTop: 12, padding: '10px 24px', fontSize: 14, cursor: evaluating || !promptTexts[current]?.trim() ? 'not-allowed' : 'pointer' }}>
                  {evaluating ? '評価中...' : '提出して採点'}
                </button>
              )}
            </div>
          )}
        </div>

        {showExp && (
          <div style={{ background: 'rgba(157,140,255,0.05)', border: '1px solid rgba(157,140,255,0.18)', borderRadius: 10, padding: '16px 18px', marginBottom: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 12, color: 'var(--accent)', marginBottom: 8, letterSpacing: '0.06em' }}>解説</div>
            <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: q.type === 'prompt-writing' ? 14 : 0 }}>
              {q.type === 'multiple-choice' ? (q as MCQPracticeQuestion).explanation : (q as PromptWritingQuestion).explanation}
            </div>
            {q.type === 'prompt-writing' && (
              <div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8, letterSpacing: '0.05em' }}>模範回答例:</div>
                <pre style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 14px', fontSize: 13, whiteSpace: 'pre-wrap', lineHeight: 1.7, color: 'var(--text-secondary)', fontFamily: 'inherit', margin: 0 }}>
                  {(q as PromptWritingQuestion).modelAnswer}
                </pre>
              </div>
            )}
          </div>
        )}

        {showExp && (
          <div style={{ textAlign: 'right' }}>
            <button onClick={handleNext} className="btn-primary" style={{ padding: '12px 28px', fontSize: 14, cursor: 'pointer' }}>
              {current < questions.length - 1 ? '次の問題 →' : '結果を見る'}
            </button>
          </div>
        )}
      </main>
    </>
  );
}
