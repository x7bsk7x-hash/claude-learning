'use client';
import { useState, useCallback } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import LevelBadge from '@/components/LevelBadge';
import { diagnosticQuestions } from '@/data/diagnostic-questions';
import { courses } from '@/data/courses';
import { buildDiagnosticResult } from '@/lib/scoring';
import { saveDiagnosticResult, getProgress } from '@/lib/storage';
import type { DiagnosticResult } from '@/lib/types';

type Phase = 'intro' | 'quiz' | 'result';

export default function DiagnosticPage() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selected, setSelected] = useState<number | null>(null);
  const [showExp, setShowExp] = useState(false);
  const [result, setResult] = useState<DiagnosticResult | null>(null);

  const questions = diagnosticQuestions;
  const q = questions[current];

  const handleAnswer = useCallback((idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    setShowExp(true);
    setAnswers(prev => ({ ...prev, [q.id]: idx }));
  }, [selected, q.id]);

  const handleNext = useCallback(() => {
    if (current < questions.length - 1) {
      setCurrent(c => c + 1);
      setSelected(null);
      setShowExp(false);
    } else {
      const partScores: Record<number, number[]> = {};
      const catScores: Record<string, number[]> = {};
      for (const qq of questions) {
        const ans = answers[qq.id] ?? -1;
        const correct = ans === qq.correctIndex ? 1 : 0;
        if (!partScores[qq.part]) partScores[qq.part] = [];
        partScores[qq.part].push(correct);
        if (!catScores[qq.category]) catScores[qq.category] = [];
        catScores[qq.category].push(correct);
      }
      const scores: Record<string, number> = {};
      for (const [cat, vals] of Object.entries(catScores)) {
        scores[cat] = vals.reduce((a, b) => a + b, 0) / vals.length;
      }
      const pScores: Record<number, number> = {};
      for (const [p, vals] of Object.entries(partScores)) {
        pScores[Number(p)] = vals.reduce((a, b) => a + b, 0) / vals.length;
      }
      const r = buildDiagnosticResult(scores, pScores);
      saveDiagnosticResult(r);
      setResult(r);
      setPhase('result');
    }
  }, [current, questions, answers]);

  const handleReset = () => {
    setPhase('intro');
    setCurrent(0);
    setAnswers({});
    setSelected(null);
    setShowExp(false);
    setResult(null);
  };

  if (phase === 'intro') return (
    <>
      <Navigation />
      <main style={{ maxWidth: 720, margin: '0 auto', padding: '48px 16px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🎯</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>診断テスト</h1>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: 480, margin: '0 auto 32px' }}>
            {questions.length}問の問題から、あなたの現在のレベルと弱点パートを診断します。
            結果に基づいて最適な学習パスを提案します。
          </p>
          <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 32 }}>
            {[
              { label: '問題数', value: `${questions.length}問` },
              { label: '所要時間', value: '約15〜20分' },
              { label: '対象パート', value: '全6パート' },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--accent)' }}>{s.value}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{s.label}</div>
              </div>
            ))}
          </div>
          <button onClick={() => setPhase('quiz')} style={{ background: 'var(--accent)', color: '#0d1117', padding: '14px 36px', borderRadius: 8, fontWeight: 700, fontSize: 16, border: 'none', cursor: 'pointer' }}>
            診断を開始する
          </button>
        </div>
      </main>
    </>
  );

  if (phase === 'result' && result) return (
    <>
      <Navigation />
      <main style={{ maxWidth: 720, margin: '0 auto', padding: '48px 16px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
          <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 8 }}>診断完了！</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 20 }}>スコア: <strong>{Math.round(result.overallScore * 100)}%</strong></p>
          <LevelBadge level={result.level} size="md" />
        </div>

        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, marginBottom: 16 }}>カテゴリ別スコア</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {Object.entries(result.scores).map(([cat, sc]) => (
              <div key={cat}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 13 }}>
                  <span style={{ color: 'var(--text-primary)' }}>{cat}</span>
                  <span style={{ color: sc >= 0.75 ? 'var(--green)' : sc >= 0.45 ? 'var(--accent)' : 'var(--red)', fontWeight: 600 }}>{Math.round(sc * 100)}%</span>
                </div>
                <div style={{ background: 'var(--border)', borderRadius: 4, height: 6 }}>
                  <div style={{ background: sc >= 0.75 ? 'var(--green)' : sc >= 0.45 ? 'var(--accent)' : 'var(--red)', height: 6, borderRadius: 4, width: `${sc * 100}%`, transition: 'width 0.5s' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {result.recommendedCourseIds.length > 0 && (
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 24, marginBottom: 32 }}>
            <h2 style={{ fontSize: 16, marginBottom: 16 }}>🎓 おすすめの学習コース</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {result.recommendedCourseIds.slice(0, 6).map(id => {
                const c = courses.find(c => c.id === id);
                if (!c) return null;
                return (
                  <Link key={id} href={`/courses/${id}`} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 16px', textDecoration: 'none', display: 'flex', gap: 12, alignItems: 'center' }}>
                    <span style={{ fontSize: 22 }}>{c.icon}</span>
                    <div>
                      <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 2 }}>Part {c.part} · {c.partLabel}</div>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{c.title}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/courses" style={{ background: 'var(--accent)', color: '#0d1117', padding: '12px 28px', borderRadius: 8, fontWeight: 700, textDecoration: 'none' }}>コース一覧へ</Link>
          <button onClick={handleReset} style={{ background: 'var(--bg-card)', color: 'var(--text-primary)', padding: '12px 28px', borderRadius: 8, fontWeight: 600, border: '1px solid var(--border)', cursor: 'pointer' }}>
            もう一度診断
          </button>
        </div>
      </main>
    </>
  );

  // Quiz phase
  const progress = (current / questions.length) * 100;
  return (
    <>
      <Navigation />
      <main style={{ maxWidth: 720, margin: '0 auto', padding: '32px 16px 80px' }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--text-muted)', marginBottom: 8 }}>
            <span>問題 {current + 1} / {questions.length}</span>
            <span>Part {q.part}: {q.category}</span>
          </div>
          <div style={{ background: 'var(--border)', borderRadius: 4, height: 4 }}>
            <div style={{ background: 'var(--accent)', height: 4, borderRadius: 4, width: `${progress}%`, transition: 'width 0.3s' }} />
          </div>
        </div>

        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 28, marginBottom: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, lineHeight: 1.7, margin: '0 0 24px' }}>{q.question}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {q.options.map((opt, i) => {
              let bg = 'var(--bg-card)';
              let borderColor = 'var(--border)';
              let color = 'var(--text-primary)';
              if (selected !== null) {
                if (i === q.correctIndex) { bg = 'rgba(63,185,80,0.1)'; borderColor = 'var(--green)'; color = 'var(--green)'; }
                else if (i === selected) { bg = 'rgba(248,81,73,0.1)'; borderColor = 'var(--red)'; color = 'var(--red)'; }
              }
              return (
                <button key={i} onClick={() => handleAnswer(i)} style={{
                  background: bg, border: `1px solid ${borderColor}`, borderRadius: 8,
                  padding: '14px 16px', textAlign: 'left', cursor: selected !== null ? 'default' : 'pointer',
                  color, fontSize: 14, lineHeight: 1.6, transition: 'all 0.15s',
                }}>
                  <span style={{ fontWeight: 600, marginRight: 8, opacity: 0.6 }}>{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        {showExp && (
          <div style={{ background: 'rgba(88,166,255,0.08)', border: '1px solid rgba(88,166,255,0.25)', borderRadius: 10, padding: 18, marginBottom: 20 }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--accent)', marginBottom: 6 }}>解説</div>
            <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{q.explanation}</div>
          </div>
        )}

        {selected !== null && (
          <div style={{ textAlign: 'right' }}>
            <button onClick={handleNext} style={{ background: 'var(--accent)', color: '#0d1117', padding: '12px 28px', borderRadius: 8, fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: 15 }}>
              {current < questions.length - 1 ? '次の問題 →' : '結果を見る'}
            </button>
          </div>
        )}
      </main>
    </>
  );
}
