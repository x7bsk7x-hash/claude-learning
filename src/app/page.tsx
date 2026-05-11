'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import LevelBadge from '@/components/LevelBadge';
import ProgressRing from '@/components/ProgressRing';
import { getProgress } from '@/lib/storage';
import { courses } from '@/data/courses';
import type { UserProgress } from '@/lib/types';

const features = [
  { icon: '◉', title: 'レベルテスト', desc: '35問でレベルと弱点を特定', href: '/diagnostic', color: 'var(--accent)' },
  { icon: '◈', title: 'コース学習', desc: '6パート・19コースの体系的カリキュラム', href: '/courses', color: 'var(--green)' },
  { icon: '⌨', title: 'コマンド早見表', desc: 'スラッシュコマンド・ショートカット一覧', href: '/reference', color: 'var(--purple)' },
  { icon: '✦', title: 'AIチューター', desc: 'Groq/Gemini/ClaudeとリアルタイムQ&A', href: '/ai-tutor', color: 'var(--amber)' },
];

const parts = [
  { part: 1, label: 'AIとClaudeの基礎', desc: 'LLM・トークン・プロンプト設計' },
  { part: 2, label: '開発環境の構築', desc: 'Node.js・Claude Code CLI・IDE連携' },
  { part: 3, label: 'Claude Code入門', desc: '基本操作・ファイル編集・スラッシュコマンド' },
  { part: 4, label: 'Claude Code周辺機能', desc: 'Hooks・MCP・メモリ・パーミッション' },
  { part: 5, label: '実践的な開発', desc: 'バグ修正・TDD・コードレビュー' },
  { part: 6, label: 'チーム・組織での活用', desc: 'CLAUDE.md・CI/CD・コスト管理' },
];

export default function Home() {
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => { setProgress(getProgress()); }, []);

  const completedCount = progress?.completedCourses.length ?? 0;
  const progressPct = completedCount / courses.length;

  return (
    <>
      <Navigation />
      <main style={{ maxWidth: 1000, margin: '0 auto', padding: '48px 16px 80px' }} className="dot-bg">

        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ display: 'inline-block', background: 'rgba(157,140,255,0.08)', border: '1px solid rgba(157,140,255,0.22)', borderRadius: 20, padding: '5px 16px', fontSize: 12, color: 'var(--accent)', marginBottom: 24, letterSpacing: '0.06em' }}>
            ◆ Claude Code / Anthropic API 学習プラットフォーム
          </div>
          <h1 style={{ fontSize: 'clamp(26px, 5vw, 50px)', fontWeight: 700, margin: '0 0 20px', lineHeight: 1.2, letterSpacing: '-0.01em' }}>
            AIエンジニアリングを<br />
            <span style={{ color: 'var(--accent)' }}>体系的に学ぶ</span>
          </h1>
          <p style={{ fontSize: 'clamp(14px, 2.5vw, 17px)', color: 'var(--text-secondary)', maxWidth: 520, margin: '0 auto 36px', lineHeight: 1.8 }}>
            Claude Codeの基礎から実践・チーム活用まで。<br />
            レベルテストでスキルを把握し、最適な学習パスを進みましょう。
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/diagnostic" className="btn-primary" style={{ padding: '12px 28px', fontSize: 15, display: 'inline-block', textDecoration: 'none' }}>
              テストを始める →
            </Link>
            <Link href="/courses" style={{ background: 'var(--bg-surface)', color: 'var(--text-secondary)', padding: '12px 28px', borderRadius: 10, fontWeight: 600, fontSize: 15, textDecoration: 'none', border: '1px solid var(--border)' }}>
              コース一覧を見る
            </Link>
          </div>
        </div>

        {/* Progress */}
        {progress && (completedCount > 0 || progress.diagnosticResult) && (
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '24px 28px', marginBottom: 48 }}>
            <h2 style={{ margin: '0 0 20px', fontSize: 16, fontWeight: 700, color: 'var(--text-secondary)', letterSpacing: '0.06em' }}>学習の進捗</h2>
            <div style={{ display: 'flex', gap: 36, flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <ProgressRing value={progressPct} size={68} color="var(--accent)" />
                <div>
                  <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1 }}>{completedCount}<span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 400 }}>/{courses.length}</span></div>
                  <div style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 2 }}>コース完了</div>
                </div>
              </div>
              {progress.diagnosticResult && (
                <div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 6 }}>判定レベル</div>
                  <LevelBadge level={progress.diagnosticResult.level} size="md" />
                </div>
              )}
              <div>
                <div style={{ fontSize: 26, fontWeight: 700, color: 'var(--amber)', lineHeight: 1 }}>{progress.totalPoints.toLocaleString()}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 2 }}>ポイント</div>
              </div>
            </div>
            {progress.diagnosticResult?.recommendedCourseIds.length ? (
              <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 10, letterSpacing: '0.06em' }}>おすすめの次のコース</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {progress.diagnosticResult.recommendedCourseIds.slice(0, 3).map(id => {
                    const c = courses.find(c => c.id === id);
                    if (!c) return null;
                    return (
                      <Link key={id} href={`/courses/${id}`} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: '7px 12px', fontSize: 13, color: 'var(--text-primary)', textDecoration: 'none' }}>
                        {c.title}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>
        )}

        {/* Features */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 14, marginBottom: 56 }}>
          {features.map(f => (
            <Link key={f.href} href={f.href} style={{ textDecoration: 'none' }}>
              <div className="card-hover" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '22px 18px', height: '100%' }}>
                <div style={{ fontSize: 24, marginBottom: 10, color: f.color, fontFamily: 'var(--font-mono)' }}>{f.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{f.title}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6 }}>{f.desc}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Curriculum */}
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, letterSpacing: '0.04em' }}>カリキュラム構成</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {parts.map(p => (
              <Link key={p.part} href={`/courses?part=${p.part}`} style={{ textDecoration: 'none' }}>
                <div className="card-hover" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '13px 16px', display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 30, height: 30, borderRadius: 6, background: 'rgba(157,140,255,0.1)', border: '1px solid rgba(157,140,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-mono)', flexShrink: 0 }}>
                    {p.part}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700 }}>Part {p.part}</span>
                      <span style={{ fontWeight: 600 }}>{p.label}</span>
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{p.desc}</div>
                  </div>
                  <span style={{ color: 'var(--text-muted)', fontSize: 14 }}>›</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
