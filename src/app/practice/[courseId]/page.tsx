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
      // Local scoring fallback
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
        コースが見つかりません。<Link href="/courses" style={{ color: 'var(--accent)' }}>コース一覧へ</Link>
      </main>
    </>
  );

  if (questions.length === 0) return (
    <>
      <Navigation />
      <main style={{ padding: 48, textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)', marginBottom: 16 }}>このコースの演習問題はまだ準備中です。</p>
        <Link href={`/courses/${courseId}`} style={{ color: 'var(--accent)' }}>コースに戻る</Link>
      </main>
    </>
  );

  if (phase === 'intro') return (
    <>
      <Navigation />
      <main style={{ maxWidth: 640, margin: '0 auto', padding: '48px 16px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>{course.icon}</div>
        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>{course.title}</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 32 }}>演習問題: {questions.length}問</p>
        <button onClick={() => setPhase('quiz')} style={{ background: 'var(--accent)', color: '#0d1117', padding: '12px 32px', borderRadius: 8, fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: 15 }}>
          演習を始める
        </button>
      </main>
    </>
  );

  if (phase === 'done') {
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    return (
      <>
        <Navigation />
        <main style={{ maxWidth: 640, margin: '0 auto', padding: '48px 16px', textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
          <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>演習完了！</h1>
          <div style={{ fontSize: 36, fontWeight: 700, color: avg >= 0.75 ? 'var(--green)' : avg >= 0.45 ? 'var(--accent)' : 'var(--red)', margin: '16px 0' }}>
            {Math.round(avg * 100)}点
          </div>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 32 }}>+{Math.round(avg * 30)}ポイント獲得</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href={`/courses/${courseId}`} style={{ background: 'var(--bg-card)', color: 'var(--text-primary)', padding: '10px 22px', borderRadius: 8, fontWeight: 600, textDecoration: 'none', border: '1px solid var(--border)' }}>
              コースに戻る
            </Link>
            {nextCourse && (
              <Link href={`/courses/${nextCourse.id}`} style={{ background: 'var(--accent)', color: '#0d1117', padding: '10px 22px', borderRadius: 8, fontWeight: 700, textDecoration: 'none' }}>
                次のコース: {nextCourse.title} →
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
      <main style={{ maxWidth: 720, margin: '0 auto', padding: '32px 16px 80px' }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--text-muted)', marginBottom: 8 }}>
            <span>問題 {current + 1} / {questions.length}</span>
            <span>{q.type === 'multiple-choice' ? '選択問題' : '記述問題'}</span>
          </div>
          <div style={{ background: 'var(--border)', borderRadius: 4, height: 4 }}>
            <div style={{ background: 'var(--accent)', height: 4, borderRadius: 4, width: `${progress}%`, transition: 'width 0.3s' }} />
          </div>
        </div>

        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 28, marginBottom: 20 }}>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 10 }}>{q.topic}</div>
          <h2 style={{ fontSize: 18, fontWeight: 600, lineHeight: 1.7, margin: '0 0 20px' }}>{q.question}</h2>

          {q.type === 'multiple-choice' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {(q as MCQPracticeQuestion).options.map((opt, i) => {
                let bg = 'var(--bg-card)', bc = 'var(--border)', color = 'var(--text-primary)';
                if (selected !== null) {
                  if (i === (q as MCQPracticeQuestion).correctIndex) { bg = 'rgba(63,185,80,0.1)'; bc = 'var(--green)'; color = 'var(--green)'; }
                  else if (i === selected) { bg = 'rgba(248,81,73,0.1)'; bc = 'var(--red)'; color = 'var(--red)'; }
                }
                return (
                  <button key={i} onClick={() => handleMCQ(i)} style={{ background: bg, border: `1px solid ${bc}`, borderRadius: 8, padding: '12px 16px', textAlign: 'left', cursor: selected !== null ? 'default' : 'pointer', color, fontSize: 14, lineHeight: 1.6, transition: 'all 0.15s' }}>
                    <span style={{ fontWeight: 600, marginRight: 8, opacity: 0.6 }}>{String.fromCharCode(65 + i)}.</span>{opt}
                  </button>
                );
              })}
            </div>
          ) : (
            <div>
              {(q as PromptWritingQuestion).scenario && (
                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 16px', marginBottom: 16, fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  <strong style={{ color: 'var(--text-muted)', display: 'block', marginBottom: 6, fontSize: 11 }}>シナリオ</strong>
                  {(q as PromptWritingQuestion).scenario}
                </div>
              )}
              <textarea
                value={promptTexts[current] ?? ''}
                onChange={e => setPromptTexts(prev => ({ ...prev, [current]: e.target.value }))}
                disabled={showExp}
                placeholder="Claude Codeへの指示プロンプトをここに書いてください..."
                style={{ width: '100%', minHeight: 160, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 14px', color: 'var(--text-primary)', fontSize: 14, lineHeight: 1.7, resize: 'vertical', fontFamily: 'inherit' }}
              />
              {!showExp && (
                <button onClick={handlePromptSubmit} disabled={evaluating || !promptTexts[current]?.trim()} style={{ marginTop: 12, background: 'var(--accent)', color: '#0d1117', padding: '10px 24px', borderRadius: 8, fontWeight: 700, border: 'none', cursor: 'pointer', opacity: evaluating || !promptTexts[current]?.trim() ? 0.5 : 1 }}>
                  {evaluating ? '評価中...' : '提出して採点'}
                </button>
              )}
            </div>
          )}
        </div>

        {showExp && (
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 10, padding: 18, marginBottom: 20 }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--accent)', marginBottom: 8 }}>解説</div>
            <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: q.type === 'prompt-writing' ? 16 : 0 }}>{q.type === 'multiple-choice' ? (q as MCQPracticeQuestion).explanation : (q as PromptWritingQuestion).explanation}</div>
            {q.type === 'prompt-writing' && (
              <div style={{ marginTop: 12 }}>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>模範回答例:</div>
                <pre style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 14px', fontSize: 13, whiteSpace: 'pre-wrap', lineHeight: 1.7, color: 'var(--text-secondary)', fontFamily: 'inherit', margin: 0 }}>{(q as PromptWritingQuestion).modelAnswer}</pre>
              </div>
            )}
          </div>
        )}

        {showExp && (
          <div style={{ textAlign: 'right' }}>
            <button onClick={handleNext} style={{ background: 'var(--accent)', color: '#0d1117', padding: '12px 28px', borderRadius: 8, fontWeight: 700, border: 'none', cursor: 'pointer' }}>
              {current < questions.length - 1 ? '次の問題 →' : '結果を見る'}
            </button>
          </div>
        )}
      </main>
    </>
  );
}
