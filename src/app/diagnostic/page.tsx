'use client';
import { useState, useCallback } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import LevelBadge from '@/components/LevelBadge';
import { diagnosticQuestions } from '@/data/diagnostic-questions';
import { courses } from '@/data/courses';
import { buildDiagnosticResult } from '@/lib/scoring';
import { saveDiagnosticResult } from '@/lib/storage';
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
      <main style={{ maxWidth: 680, margin: '0 auto', padding: '48px 16px 80px' }} className="dot-bg">
        {/* Back */}
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none', marginBottom: 36, padding: '6px 12px', border: '1px solid var(--border)', borderRadius: 7, background: 'var(--bg-surface)' }}>
          ← ホームに戻る
        </Link>

        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 72, height: 72, borderRadius: 16, background: 'rgba(88,166,255,0.08)', border: '1px solid rgba(88,166,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, margin: '0 auto 24px' }}>◎</div>
          <h1 style={{ fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 700, margin: '0 0 12px', letterSpacing: '-0.01em' }}>レベル診断テスト</h1>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: 480, margin: '0 auto 36px', fontSize: 15 }}>
            {questions.length}問の問題から、あなたの現在のレベルと弱点パートを診断します。
            結果に基づいて最適な学習パスを提案します。
          </p>

          <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 40 }}>
            {[
              { label: '問題数', value: `${questions.length}問`, icon: '?' },
              { label: '所要時間', value: '15〜20分', icon: '⏱' },
              { label: '対象', value: '全6パート', icon: '◈' },
            ].map(s => (
              <div key={s.label} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '14px 20px', minWidth: 100 }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--accent)', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>

          <button onClick={() => setPhase('quiz')} className="btn-primary" style={{ padding: '14px 40px', fontSize: 16, cursor: 'pointer' }}>
            診断を開始する →
          </button>
        </div>
      </main>
    </>
  );

  if (phase === 'result' && result) return (
    <>
      <Navigation />
      <main style={{ maxWidth: 700, margin: '0 auto', padding: '40px 16px 80px' }}>
        {/* Back */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 32 }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-muted)', textDecoration: 'none', padding: '6px 12px', border: '1px solid var(--border)', borderRadius: 7, background: 'var(--bg-surface)' }}>← ホーム</Link>
          <Link href="/courses" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-muted)', textDecoration: 'none', padding: '6px 12px', border: '1px solid var(--border)', borderRadius: 7, background: 'var(--bg-surface)' }}>◈ コース一覧</Link>
        </div>

        {/* Result header */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '28px 24px', marginBottom: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🎉</div>
          <h1 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 8px' }}>診断完了！</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 20, fontSize: 15 }}>
            総合スコア: <strong style={{ color: 'var(--text-primary)' }}>{Math.round(result.overallScore * 100)}%</strong>
          </p>
          <LevelBadge level={result.level} size="md" />
        </div>

        {/* Category scores */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 18, color: 'var(--text-secondary)', letterSpacing: '0.04em' }}>カテゴリ別スコア</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {Object.entries(result.scores).map(([cat, sc]) => (
              <div key={cat}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 13 }}>
                  <span style={{ color: 'var(--text-primary)' }}>{cat}</span>
                  <span style={{ color: sc >= 0.75 ? 'var(--green)' : sc >= 0.45 ? 'var(--accent)' : 'var(--red)', fontWeight: 700 }}>{Math.round(sc * 100)}%</span>
                </div>
                <div style={{ background: 'var(--bg-card)', borderRadius: 4, height: 6 }}>
                  <div style={{ background: sc >= 0.75 ? 'var(--green)' : sc >= 0.45 ? 'var(--accent)' : 'var(--red)', height: 6, borderRadius: 4, width: `${sc * 100}%`, transition: 'width 0.6s' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended courses */}
        {result.recommendedCourseIds.length > 0 && (
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 24, marginBottom: 28 }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16, color: 'var(--text-secondary)', letterSpacing: '0.04em' }}>🎓 おすすめの学習コース</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {result.recommendedCourseIds.slice(0, 6).map(id => {
                const c = courses.find(c => c.id === id);
                if (!c) return null;
                return (
                  <Link key={id} href={`/courses/${id}`} className="card-hover" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 16px', textDecoration: 'none', display: 'flex', gap: 12, alignItems: 'center' }}>
                    <span style={{ fontSize: 22 }}>{c.icon}</span>
                    <div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>Part {c.part} · {c.partLabel}</div>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: 14 }}>{c.title}</div>
                    </div>
                    <span style={{ marginLeft: 'auto', color: 'var(--text-muted)', fontSize: 14 }}>›</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/courses" className="btn-primary" style={{ padding: '12px 28px', textDecoration: 'none', display: 'inline-block', fontSize: 14 }}>
            コース一覧へ →
          </Link>
          <button onClick={handleReset} style={{ background: 'var(--bg-surface)', color: 'var(--text-secondary)', padding: '12px 24px', borderRadius: 8, fontWeight: 600, border: '1px solid var(--border)', cursor: 'pointer', fontSize: 14 }}>
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
      <main style={{ maxWidth: 720, margin: '0 auto', padding: '28px 16px 80px' }}>
        {/* Progress header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-muted)', marginBottom: 10 }}>
            <span style={{ fontWeight: 600 }}>問題 {current + 1} <span style={{ opacity: 0.6 }}>/ {questions.length}</span></span>
            <span>Part {q.part}: {q.category}</span>
          </div>
          <div style={{ background: 'var(--bg-card)', borderRadius: 4, height: 5 }}>
            <div style={{ background: 'var(--accent)', height: 5, borderRadius: 4, width: `${progress}%`, transition: 'width 0.3s' }} />
          </div>
        </div>

        {/* Question card */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 'clamp(18px, 4vw, 28px)', marginBottom: 16 }}>
          <h2 style={{ fontSize: 'clamp(15px, 2.5vw, 18px)', fontWeight: 600, lineHeight: 1.7, margin: '0 0 22px', color: 'var(--text-primary)' }}>{q.question}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {q.options.map((opt, i) => {
              let bg = 'var(--bg-card)';
              let borderColor = 'var(--border)';
              let color = 'var(--text-primary)';
              if (selected !== null) {
                if (i === q.correctIndex) { bg = 'rgba(63,185,80,0.1)'; borderColor = 'rgba(63,185,80,0.6)'; color = 'var(--green)'; }
                else if (i === selected && i !== q.correctIndex) { bg = 'rgba(248,81,73,0.08)'; borderColor = 'rgba(248,81,73,0.5)'; color = 'var(--red)'; }
              }
              return (
                <button key={i} onClick={() => handleAnswer(i)} style={{
                  background: bg, border: `1px solid ${borderColor}`, borderRadius: 8,
                  padding: '13px 16px', textAlign: 'left', cursor: selected !== null ? 'default' : 'pointer',
                  color, fontSize: 14, lineHeight: 1.6, transition: 'all 0.15s', width: '100%',
                }}>
                  <span style={{ fontWeight: 700, marginRight: 10, opacity: 0.5, fontFamily: 'var(--font-mono)' }}>{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        {/* Explanation */}
        {showExp && (
          <div style={{ background: 'rgba(88,166,255,0.06)', border: '1px solid rgba(88,166,255,0.2)', borderRadius: 10, padding: '16px 18px', marginBottom: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 12, color: 'var(--accent)', marginBottom: 8, letterSpacing: '0.06em' }}>解説</div>
            <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.75 }}>{q.explanation}</div>
          </div>
        )}

        {selected !== null && (
          <div style={{ textAlign: 'right' }}>
            <button onClick={handleNext} className="btn-primary" style={{ padding: '12px 28px', fontSize: 15, cursor: 'pointer' }}>
              {current < questions.length - 1 ? '次の問題 →' : '結果を見る'}
            </button>
          </div>
        )}
      </main>
    </>
  );
}
