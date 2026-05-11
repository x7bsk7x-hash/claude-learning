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

  return (
    <>
      <Navigation />
      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 16px 80px' }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 8 }}>コース一覧</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>{courses.length}コース・6パートの体系的カリキュラム</p>

        {/* Part filter */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32, overflowX: 'auto' }}>
          {parts.map(p => (
            <button key={p} onClick={() => setActivePart(p)} style={{
              padding: '6px 14px', borderRadius: 6, fontSize: 13, border: '1px solid',
              borderColor: activePart === p ? 'var(--accent)' : 'var(--border)',
              background: activePart === p ? 'rgba(88,166,255,0.12)' : 'var(--bg-card)',
              color: activePart === p ? 'var(--accent)' : 'var(--text-secondary)',
              cursor: 'pointer', whiteSpace: 'nowrap', fontWeight: activePart === p ? 600 : 400,
            }}>
              {p === 0 ? 'すべて' : `Part ${p}: ${getPartLabel(p)}`}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {filtered.map(course => {
            const done = completedCourses.includes(course.id);
            return (
              <Link key={course.id} href={`/courses/${course.id}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: 'var(--bg-surface)', border: `1px solid ${done ? 'rgba(63,185,80,0.4)' : 'var(--border)'}`,
                  borderRadius: 12, padding: '20px', height: '100%', display: 'flex', flexDirection: 'column', gap: 12,
                  transition: 'border-color 0.15s',
                }}
                  onMouseEnter={e => { if (!done) e.currentTarget.style.borderColor = 'rgba(88,166,255,0.4)'; }}
                  onMouseLeave={e => { if (!done) e.currentTarget.style.borderColor = 'var(--border)'; }}>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 32 }}>{course.icon}</span>
                    {done && <span style={{ fontSize: 11, color: 'var(--green)', background: 'rgba(63,185,80,0.1)', padding: '2px 8px', borderRadius: 4, fontWeight: 600 }}>✓ 完了</span>}
                  </div>

                  <div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>Part {course.part} · {course.partLabel}</div>
                    <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-primary)', lineHeight: 1.4 }}>{course.title}</div>
                  </div>

                  <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, flex: 1 }}>{course.description}</div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, borderTop: '1px solid var(--border)' }}>
                    <LevelBadge level={course.difficulty} />
                    <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>⏱ {course.estimatedMinutes}分</span>
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
    <Suspense fallback={<div style={{ padding: 40, color: 'var(--text-muted)' }}>読み込み中...</div>}>
      <CoursesContent />
    </Suspense>
  );
}
