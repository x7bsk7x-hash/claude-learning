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
  { icon: '🎯', title: '診断テスト', desc: '35問の診断でレベルと弱点を特定', href: '/diagnostic' },
  { icon: '📚', title: 'コース学習', desc: '6パート・19コースの体系的カリキュラム', href: '/courses' },
  { icon: '⌨️', title: 'リファレンス', desc: 'スラッシュコマンド・ショートカット一覧', href: '/reference' },
  { icon: '🤖', title: 'AIチューター', desc: 'ClaudeとリアルタイムQ&A', href: '/ai-tutor' },
];

export default function Home() {
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  const completedCount = progress?.completedCourses.length ?? 0;
  const totalCourses = courses.length;
  const progressPct = completedCount / totalCourses;

  return (
    <>
      <Navigation />
      <main style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 16px 80px' }}>
        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ display: 'inline-block', background: 'rgba(88,166,255,0.1)', border: '1px solid rgba(88,166,255,0.3)', borderRadius: 24, padding: '6px 18px', fontSize: 13, color: 'var(--accent)', marginBottom: 24 }}>
            Claude Code / Claude API 学習プラットフォーム
          </div>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 700, margin: '0 0 20px', lineHeight: 1.2 }}>
            AIエンジニアリングを<br />
            <span style={{ color: 'var(--accent)' }}>体系的に学ぶ</span>
          </h1>
          <p style={{ fontSize: 'clamp(15px, 2.5vw, 18px)', color: 'var(--text-secondary)', maxWidth: 560, margin: '0 auto 36px', lineHeight: 1.7 }}>
            Claude Codeの基礎から実践・チーム活用まで。<br />
            診断テストで自分のレベルを把握し、最適な学習パスを進みましょう。
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/diagnostic" style={{ background: 'var(--accent)', color: '#0d1117', padding: '12px 28px', borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
              無料で診断を始める
            </Link>
            <Link href="/courses" style={{ background: 'var(--bg-card)', color: 'var(--text-primary)', padding: '12px 28px', borderRadius: 8, fontWeight: 600, fontSize: 15, textDecoration: 'none', border: '1px solid var(--border)' }}>
              コース一覧を見る
            </Link>
          </div>
        </div>

        {/* Progress (if started) */}
        {progress && (completedCount > 0 || progress.diagnosticResult) && (
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px', marginBottom: 40 }}>
            <h2 style={{ margin: '0 0 20px', fontSize: 18 }}>学習の進捗</h2>
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <ProgressRing value={progressPct} size={72} />
                <div>
                  <div style={{ fontSize: 24, fontWeight: 700 }}>{completedCount}<span style={{ fontSize: 14, color: 'var(--text-muted)', fontWeight: 400 }}>/{totalCourses}</span></div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>コース完了</div>
                </div>
              </div>
              {progress.diagnosticResult && (
                <div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 6 }}>あなたのレベル</div>
                  <LevelBadge level={progress.diagnosticResult.level} size="md" />
                </div>
              )}
              <div>
                <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--amber)' }}>{progress.totalPoints.toLocaleString()}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>ポイント</div>
              </div>
            </div>
            {progress.diagnosticResult && progress.diagnosticResult.recommendedCourseIds.length > 0 && (
              <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 10 }}>おすすめの次のコース</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {progress.diagnosticResult.recommendedCourseIds.slice(0, 3).map(id => {
                    const c = courses.find(c => c.id === id);
                    if (!c) return null;
                    return (
                      <Link key={id} href={`/courses/${id}`} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 6, padding: '8px 12px', fontSize: 13, color: 'var(--text-primary)', textDecoration: 'none' }}>
                        {c.icon} {c.title}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Features */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 56 }}>
          {features.map(f => (
            <Link key={f.href} href={f.href} style={{ textDecoration: 'none' }}>
              <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 20px', height: '100%', transition: 'border-color 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{f.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{f.title}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{f.desc}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Curriculum overview */}
        <div>
          <h2 style={{ fontSize: 22, marginBottom: 20 }}>カリキュラム概要</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { part: 1, label: 'AIとClaudeの基礎', desc: 'LLM・トークン・プロンプト設計', icon: '🧠', count: 3 },
              { part: 2, label: '開発環境の構築', desc: 'Node.js・Claude Code CLI・IDE連携', icon: '🛠️', count: 3 },
              { part: 3, label: 'Claude Code入門', desc: '基本操作・ファイル編集・スラッシュコマンド', icon: '🚀', count: 3 },
              { part: 4, label: 'Claude Code周辺機能', desc: 'Hooks・MCP・メモリ・パーミッション', icon: '⚙️', count: 4 },
              { part: 5, label: '実践的な開発', desc: 'バグ修正・TDD・コードレビュー', icon: '💻', count: 3 },
              { part: 6, label: 'チーム・組織での活用', desc: 'CLAUDE.md・CI/CD・コスト管理', icon: '👥', count: 3 },
            ].map(p => (
              <Link key={p.part} href={`/courses?part=${p.part}`} style={{ textDecoration: 'none' }}>
                <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14 }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(88,166,255,0.4)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
                  <span style={{ fontSize: 22 }}>{p.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>Part {p.part}</span>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{p.label}</span>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>{p.desc}</div>
                  </div>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{p.count}コース</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
