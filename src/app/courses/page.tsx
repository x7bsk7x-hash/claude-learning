'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';
import Navigation from '@/components/Navigation';
import LevelBadge from '@/components/LevelBadge';
import { courses } from '@/data/courses';
import { getProgress } from '@/lib/storage';
import { getPartLabel } from '@/lib/scoring';

const parts = [0, 1, 2, 3, 4, 5, 6];

function CoursesContent() {
  const searchParams = useSearchParams();
  const partParam = searchParams.get('part');
  const [activePart, setActivePart] = useState(partParam ? Number(partParam) : 0);
  const [completedCourses, setCompletedCourses] = useState<string[]>([]);

  useEffect(() => {
    const p = getProgress();
    setCompletedCourses(p.completedCourses);
  }, []);

  const filtered = activePart === 0 ? courses : courses.filter(c => c.part === activePart);
  const completedInView = filtered.filter(c => completedCourses.includes(c.id)).length;

  return (
    <>
      <Navigation />
      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 16px 80px' }} className="dot-bg">
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'inline-block', background: 'rgba(157,140,255,0.08)', border: '1px solid rgba(157,140,255,0.2)', borderRadius: 20, padding: '4px 14px', fontSize: 11, color: 'var(--accent)', marginBottom: 12, letterSpacing: '0.06em' }}>
            ◈ コース一覧
          </div>
          <h1 style={{ fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: 700, margin: '0 0 6px', letterSpacing: '-0.01em' }}>学習コース</h1>
          <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: 14 }}>
            {courses.length}コース・6パートの体系的カリキュラム
            {completedCourses.length > 0 && (
              <span style={{ marginLeft: 12, color: 'var(--green)' }}>✓ {completedCourses.length}/{courses.length} 完了</span>
            )}
          </p>
        </div>

        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 28 }}>
          {parts.map(p => (
            <button key={p} onClick={() => setActivePart(p)} style={{
              padding: '7px 14px', borderRadius: 8, fontSize: 12, border: '1px solid', cursor: 'pointer', whiteSpace: 'nowrap',
              fontWeight: activePart === p ? 700 : 400,
              borderColor: activePart === p ? 'var(--accent)' : 'var(--border)',
              background: activePart === p ? 'rgba(157,140,255,0.12)' : 'var(--bg-surface)',
              color: activePart === p ? 'var(--accent)' : 'var(--text-secondary)',
              transition: 'all 0.15s',
            }}>
              {p === 0 ? 'すべて' : `Part ${p}`}
            </button>
          ))}
          {activePart !== 0 && (
            <div style={{ display: 'flex', alignItems: 'center', fontSize: 13, color: 'var(--text-muted)', padding: '7px 4px' }}>
              — {getPartLabel(activePart)}
            </div>
          )}
        </div>

        {activePart !== 0 && (
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 20 }}>
            {filtered.length}コース中 {completedInView}コース完了
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
          {filtered.map(course => {
            const done = completedCourses.includes(course.id);
            return (
              <Link key={course.id} href={`/courses/${course.id}`} style={{ textDecoration: 'none' }}>
                <div className="card-hover" style={{
                  background: 'var(--bg-surface)',
                  border: `1px solid ${done ? 'rgba(45,206,137,0.35)' : 'var(--border)'}`,
                  borderRadius: 12, padding: '20px', height: '100%', display: 'flex', flexDirection: 'column', gap: 12,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ width: 40, height: 40, borderRadius: 8, background: 'rgba(157,140,255,0.08)', border: '1px solid rgba(157,140,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
                      P{course.part}
                    </div>
                    {done
                      ? <span style={{ fontSize: 11, color: 'var(--green)', background: 'rgba(45,206,137,0.1)', padding: '2px 8px', borderRadius: 4, fontWeight: 700 }}>✓ 完了</span>
                      : <span style={{ fontSize: 11, color: 'var(--text-muted)', background: 'var(--bg-card)', padding: '2px 8px', borderRadius: 4, border: '1px solid var(--border)' }}>{course.estimatedMinutes}分</span>
                    }
                  </div>

                  <div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>{course.partLabel}</div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)', lineHeight: 1.4 }}>{course.title}</div>
                  </div>

                  <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, flex: 1 }}>{course.description}</div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, borderTop: '1px solid var(--border)' }}>
                    <LevelBadge level={course.difficulty} />
                    <span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>⏱ {course.estimatedMinutes}分</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </>
  );
}

export default function CoursesPage() {
  return (
    <Suspense fallback={<div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>読み込み中...</div>}>
      <CoursesContent />
    </Suspense>
  );
}
