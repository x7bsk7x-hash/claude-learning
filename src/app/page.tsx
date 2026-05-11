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
    desc: '6パート・19コースの体系的カリキュラムで段階的に習得',
    sub: 'Part 1〜6',
    href: '/courses',
  },
  {
    icon: '◉',
    title: 'テストを受ける',
    desc: '35問でスキルレベルと弱点パートを診断し、最適な学習パスを提案',
    sub: '所要 15〜20分',
    href: '/diagnostic',
  },
  {
    icon: '⌨',
    title: 'Claude早見表',
    desc: 'スラッシュコマンド・ショートカット・権限設定・MCPを一覧で確認',
    sub: 'コマンド · 設定',
    href: '/reference',
  },
  {
    icon: '✦',
    title: 'AIコーチ',
    desc: '疑問をAIに質問しながら学習。進捗に応じた弱点分析と次のステップを提案',
    sub: 'Q&A · 弱点分析',
    href: '/ai-tutor',
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
  const practiceCount = progress?.practiceResults.length ?? 0;
  const latestScore = progress?.diagnosticResult ? Math.round(progress.diagnosticResult.overallScore * 100) : null;

  return (
    <>
      <Navigation />
      <main style={{ maxWidth: 960, margin: '0 auto', padding: '52px 16px 80px' }} className="dot-bg">

        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(157,140,255,0.08)', border: '1px solid rgba(157,140,255,0.2)', borderRadius: 20, padding: '4px 14px', fontSize: 11, color: 'var(--accent)', marginBottom: 24, letterSpacing: '0.08em', fontFamily: 'var(--font-mono)' }}>
            ◆ Claude Code / Anthropic API
          </div>
          <div style={{ marginBottom: 18 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 'clamp(26px, 5vw, 40px)', letterSpacing: '0.06em', color: 'var(--text-primary)' }}>CLAUDE</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 'clamp(26px, 5vw, 40px)', letterSpacing: '0.06em', marginLeft: '0.25em', background: 'linear-gradient(120deg, var(--accent) 0%, #c4b5fd 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>LEARNING</span>
          </div>
          <p style={{ fontSize: 'clamp(13px, 2vw, 14px)', color: 'var(--text-secondary)', maxWidth: 380, margin: '0 auto', lineHeight: 1.9, letterSpacing: '0.01em' }}>
            基礎から実践・チーム活用まで<br />
            体系的なAIエンジニアリング学習
          </p>
        </div>

        {/* 4 Nav Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 32 }}>
          {navCards.map(card => (
            <Link key={card.href} href={card.href} style={{ textDecoration: 'none' }}>
              <div className="card-hover" style={{
                background: 'rgba(157,140,255,0.05)',
                border: '1px solid rgba(157,140,255,0.16)',
                borderRadius: 14,
                padding: '20px 20px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}>
                <div style={{ fontSize: 22, color: 'var(--accent)', fontFamily: 'var(--font-mono)', marginBottom: 10 }}>{card.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)', letterSpacing: '-0.01em', marginBottom: 6 }}>{card.title}</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.7, flex: 1 }}>{card.desc}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, paddingTop: 11, borderTop: '1px solid rgba(157,140,255,0.12)' }}>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{card.sub}</span>
                  <span style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 700 }}>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Stats row */}
        {progress && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 32 }}>
            {/* 学習進捗 */}
            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '18px 18px' }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 14 }}>学習進捗</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <ProgressRing value={progressPct} size={44} color="var(--accent)" />
                <div>
                  <div style={{ fontSize: 20, fontWeight: 700, lineHeight: 1, fontFamily: 'var(--font-mono)' }}>{completedCount}<span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 400 }}>/{courses.length}</span></div>
                  <div style={{ color: 'var(--text-muted)', fontSize: 11, marginTop: 3 }}>コース完了</div>
                </div>
              </div>
            </div>

            {/* 演習回数 */}
            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '18px 18px' }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 14 }}>演習回数</div>
              <div style={{ fontSize: 28, fontWeight: 700, fontFamily: 'var(--font-mono)', lineHeight: 1, color: 'var(--text-primary)' }}>
                {practiceCount}<span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 400, marginLeft: 2 }}>回</span>
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>演習完了</div>
            </div>

            {/* 最新テスト */}
            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '18px 18px' }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 14 }}>最新テスト</div>
              {latestScore !== null ? (
                <>
                  <div style={{ fontSize: 28, fontWeight: 700, fontFamily: 'var(--font-mono)', lineHeight: 1, color: latestScore >= 75 ? 'var(--green)' : latestScore >= 45 ? 'var(--accent)' : 'var(--red)' }}>
                    {latestScore}<span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 400, marginLeft: 1 }}>%</span>
                  </div>
                  <div style={{ marginTop: 6 }}>
                    <LevelBadge level={progress.diagnosticResult!.level} />
                  </div>
                </>
              ) : (
                <>
                  <div style={{ fontSize: 20, fontWeight: 700, fontFamily: 'var(--font-mono)', lineHeight: 1, color: 'var(--text-muted)' }}>--</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>未受験</div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Recommended courses */}
        {progress?.diagnosticResult?.recommendedCourseIds.length ? (
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '16px 18px', marginBottom: 32 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 12 }}>おすすめのコース</div>
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

        {/* Curriculum */}
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, marginBottom: 12, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>カリキュラム</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {parts.map(p => (
              <Link key={p.part} href={`/courses?part=${p.part}`} style={{ textDecoration: 'none' }}>
                <div className="card-hover" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '11px 16px', display: 'flex', alignItems: 'center', gap: 14 }}>
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
