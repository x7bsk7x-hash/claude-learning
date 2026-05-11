'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import LevelBadge from '@/components/LevelBadge';
import ProgressRing from '@/components/ProgressRing';
import { getProgress } from '@/lib/storage';
import { courses } from '@/data/courses';
import type { UserProgress } from '@/lib/types';

const navCards = [
  {
    icon: '◈',
    title: '学習を始める',
    desc: '6パート・19コースの体系的カリキュラム',
    sub: 'Part 1〜6 · 初級〜上級',
    href: '/courses',
    color: '#2dce89',
    bg: 'rgba(45,206,137,0.07)',
    border: 'rgba(45,206,137,0.2)',
  },
  {
    icon: '◉',
    title: 'テストを受ける',
    desc: '35問でレベルと弱点パートを判定',
    sub: '所要時間 15〜20分',
    href: '/diagnostic',
    color: 'var(--accent)',
    bg: 'rgba(157,140,255,0.07)',
    border: 'rgba(157,140,255,0.2)',
  },
  {
    icon: '⌨',
    title: 'Claude早見表',
    desc: 'スラッシュコマンド・ショートカット一覧',
    sub: 'コマンド · 権限 · MCP',
    href: '/reference',
    color: '#60a5fa',
    bg: 'rgba(96,165,250,0.06)',
    border: 'rgba(96,165,250,0.2)',
  },
  {
    icon: '✦',
    title: 'AIコーチ',
    desc: 'Groq / Gemini / Claudeに質問',
    sub: 'リアルタイムQ&A',
    href: '/ai-tutor',
    color: '#fbbf24',
    bg: 'rgba(251,191,36,0.06)',
    border: 'rgba(251,191,36,0.2)',
  },
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
      <main style={{ maxWidth: 960, margin: '0 auto', padding: '56px 16px 80px' }} className="dot-bg">

        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(157,140,255,0.08)', border: '1px solid rgba(157,140,255,0.22)', borderRadius: 20, padding: '5px 16px', fontSize: 11, color: 'var(--accent)', marginBottom: 28, letterSpacing: '0.08em', fontFamily: 'var(--font-mono)' }}>
            ◆ Claude Code / Anthropic API Learning
          </div>
          <div style={{ margin: '0 0 22px', lineHeight: 1 }}>
            <div style={{ fontSize: 'clamp(50px, 10vw, 88px)', fontWeight: 900, letterSpacing: '-0.045em', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', lineHeight: 0.95 }}>
              Claude
            </div>
            <div style={{ fontSize: 'clamp(50px, 10vw, 88px)', fontWeight: 900, letterSpacing: '-0.045em', fontFamily: 'var(--font-mono)', lineHeight: 0.95, background: 'linear-gradient(135deg, var(--accent) 0%, #c4b5fd 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Learning
            </div>
          </div>
          <p style={{ fontSize: 'clamp(13px, 2vw, 15px)', color: 'var(--text-secondary)', maxWidth: 400, margin: '0 auto', lineHeight: 1.9 }}>
            基礎から実践・チーム活用まで<br />
            体系的なAIエンジニアリング学習
          </p>
        </div>

        {/* 4 Nav Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 36 }}>
          {navCards.map(card => (
            <Link key={card.href} href={card.href} style={{ textDecoration: 'none' }}>
              <div className="card-hover" style={{
                background: card.bg,
                border: `1px solid ${card.border}`,
                borderRadius: 14,
                padding: '22px 20px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}>
                <div style={{ fontSize: 26, color: card.color, fontFamily: 'var(--font-mono)', marginBottom: 10 }}>{card.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-primary)', letterSpacing: '-0.01em', marginBottom: 5 }}>{card.title}</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6, flex: 1 }}>{card.desc}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, paddingTop: 12, borderTop: `1px solid ${card.border}` }}>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{card.sub}</span>
                  <span style={{ fontSize: 13, color: card.color, fontWeight: 700 }}>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Progress */}
        {progress && (completedCount > 0 || progress.diagnosticResult) && (
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 14, padding: '20px 22px', marginBottom: 36 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 16 }}>学習の進捗</div>
            <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <ProgressRing value={progressPct} size={56} color="var(--accent)" />
                <div>
                  <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1, fontFamily: 'var(--font-mono)' }}>{completedCount}<span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 400 }}>/{courses.length}</span></div>
                  <div style={{ color: 'var(--text-muted)', fontSize: 11, marginTop: 3 }}>コース完了</div>
                </div>
              </div>
              {progress.diagnosticResult && (
                <div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 6, letterSpacing: '0.04em' }}>判定レベル</div>
                  <LevelBadge level={progress.diagnosticResult.level} size="md" />
                </div>
              )}
            </div>
            {progress.diagnosticResult?.recommendedCourseIds.length ? (
              <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 10, letterSpacing: '0.06em' }}>おすすめの次のコース</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {progress.diagnosticResult.recommendedCourseIds.slice(0, 3).map(id => {
                    const c = courses.find(c => c.id === id);
                    if (!c) return null;
                    return (
                      <Link key={id} href={`/courses/${id}`} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: '6px 12px', fontSize: 13, color: 'var(--text-primary)', textDecoration: 'none' }}>
                        {c.title}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>
        )}

        {/* Curriculum */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 12, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>カリキュラム</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {parts.map(p => (
              <Link key={p.part} href={`/courses?part=${p.part}`} style={{ textDecoration: 'none' }}>
                <div className="card-hover" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 26, height: 26, borderRadius: 6, background: 'rgba(157,140,255,0.1)', border: '1px solid rgba(157,140,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-mono)', flexShrink: 0 }}>
                    {p.part}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <span style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 700, flexShrink: 0 }}>Part {p.part}</span>
                      <span style={{ fontWeight: 600, fontSize: 13 }}>{p.label}</span>
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{p.desc}</div>
                  </div>
                  <span style={{ color: 'var(--text-muted)', fontSize: 14, flexShrink: 0 }}>›</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
