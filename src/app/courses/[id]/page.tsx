'use client';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import LevelBadge from '@/components/LevelBadge';
import ChapterRenderer from '@/components/ChapterRenderer';
import { courses } from '@/data/courses';
import { markChapterComplete, markCourseComplete, getChapterProgress } from '@/lib/storage';

export default function CoursePage() {
  const { id } = useParams<{ id: string }>();
  const course = courses.find(c => c.id === id);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [completed, setCompleted] = useState<string[]>([]);
  const [courseComplete, setCourseComplete] = useState(false);
  const shouldScrollRef = useRef(false);

  useEffect(() => {
    if (course) setCompleted(getChapterProgress(course.id));
  }, [course]);

  useEffect(() => {
    if (shouldScrollRef.current) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      shouldScrollRef.current = false;
    }
  }, [currentIdx]);

  if (!course) return (
    <>
      <Navigation />
      <main style={{ padding: 48, textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)', marginBottom: 16 }}>コースが見つかりません</p>
        <Link href="/courses" className="btn-primary" style={{ padding: '10px 20px', textDecoration: 'none', display: 'inline-block' }}>← コース一覧に戻る</Link>
      </main>
    </>
  );

  const chapter = course.chapters[currentIdx];
  const isCompleted = completed.includes(chapter.id);
  const allDone = course.chapters.every(c => completed.includes(c.id));
  const nextCourse = courses.find(c => c.part === course.part && courses.indexOf(c) === courses.indexOf(course) + 1)
    || courses.find(c => c.part === course.part + 1);

  const handleChapterClick = (idx: number) => {
    if (idx !== currentIdx) {
      shouldScrollRef.current = true;
      setCurrentIdx(idx);
    }
  };

  const handleComplete = () => {
    if (!isCompleted) {
      markChapterComplete(course.id, chapter.id);
      setCompleted(getChapterProgress(course.id));
      const newCompleted = [...completed, chapter.id];
      if (course.chapters.every(c => newCompleted.includes(c.id))) {
        markCourseComplete(course.id);
        setCourseComplete(true);
        return;
      }
    }
    if (currentIdx < course.chapters.length - 1) {
      shouldScrollRef.current = true;
      setCurrentIdx(currentIdx + 1);
    }
  };

  return (
    <>
      <Navigation />
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '20px 16px 80px', display: 'flex', gap: 24 }}>
        {/* Sidebar */}
        <aside style={{ width: 230, flexShrink: 0, position: 'sticky', top: 72, alignSelf: 'flex-start', display: 'none' }} className="sidebar">
          <style>{`@media(min-width:768px){.sidebar{display:block}}`}</style>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 10, padding: 14, marginBottom: 10 }}>
            <Link href="/courses" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-muted)', textDecoration: 'none', padding: '6px 0', marginBottom: 10, borderBottom: '1px solid var(--border)', paddingBottom: 10 }}>
              ← コース一覧
            </Link>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 10, letterSpacing: '0.05em' }}>チャプター</div>
            {course.chapters.map((ch, i) => {
              const done = completed.includes(ch.id);
              return (
                <button key={ch.id} onClick={() => handleChapterClick(i)} style={{
                  width: '100%', textAlign: 'left', padding: '8px 10px', borderRadius: 6, display: 'flex', gap: 8, alignItems: 'flex-start',
                  background: i === currentIdx ? 'rgba(88,166,255,0.1)' : 'transparent',
                  border: `1px solid ${i === currentIdx ? 'rgba(88,166,255,0.3)' : 'transparent'}`,
                  cursor: 'pointer', marginBottom: 3, transition: 'all 0.15s',
                }}>
                  <span style={{ fontSize: 12, color: done ? 'var(--green)' : i === currentIdx ? 'var(--accent)' : 'var(--text-muted)', flexShrink: 0, marginTop: 1 }}>
                    {done ? '✓' : `${i + 1}`}
                  </span>
                  <span style={{ fontSize: 12, color: i === currentIdx ? 'var(--text-primary)' : 'var(--text-secondary)', lineHeight: 1.4 }}>{ch.title}</span>
                </button>
              );
            })}
          </div>
          {allDone && (
            <Link href={`/practice/${course.id}`} style={{ display: 'block', textAlign: 'center', background: 'rgba(63,185,80,0.1)', border: '1px solid rgba(63,185,80,0.35)', borderRadius: 8, padding: '10px 12px', fontSize: 12, color: 'var(--green)', fontWeight: 700, textDecoration: 'none' }}>
              📝 演習問題に挑戦
            </Link>
          )}
        </aside>

        {/* Main content */}
        <main style={{ flex: 1, minWidth: 0 }}>
          {/* Back + Breadcrumb */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, marginBottom: 20 }}>
            <Link href="/courses" style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-muted)', textDecoration: 'none', padding: '5px 10px', border: '1px solid var(--border)', borderRadius: 6, background: 'var(--bg-surface)', transition: 'all 0.15s', fontSize: 12 }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(88,166,255,0.4)'; e.currentTarget.style.color = 'var(--accent)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)'; }}>
              ← コース一覧
            </Link>
            <span style={{ color: 'var(--text-muted)' }}>›</span>
            <span style={{ color: 'var(--text-secondary)', fontSize: 12 }}>{course.title}</span>
          </div>

          {/* Course header */}
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 'clamp(16px, 4vw, 24px)', marginBottom: 20 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 11, color: 'var(--text-muted)', background: 'var(--bg-card)', padding: '2px 8px', borderRadius: 4, border: '1px solid var(--border)' }}>Part {course.part} · {course.partLabel}</span>
              <LevelBadge level={course.difficulty} />
              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>⏱ {course.estimatedMinutes}分</span>
              {allDone && <span style={{ fontSize: 11, color: 'var(--green)', background: 'rgba(63,185,80,0.1)', padding: '2px 8px', borderRadius: 4 }}>✓ 完了済み</span>}
            </div>
            <h1 style={{ fontSize: 'clamp(18px, 3.5vw, 24px)', fontWeight: 700, margin: '0 0 6px', lineHeight: 1.3 }}>
              {course.icon} {course.title}
            </h1>
            <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: 14 }}>{course.description}</p>
          </div>

          {/* Chapter tabs */}
          <div style={{ display: 'flex', gap: 6, overflowX: 'auto', marginBottom: 20, paddingBottom: 4 }}>
            {course.chapters.map((ch, i) => {
              const done = completed.includes(ch.id);
              return (
                <button key={ch.id} onClick={() => handleChapterClick(i)} style={{
                  padding: '6px 12px', borderRadius: 7, fontSize: 12, whiteSpace: 'nowrap', cursor: 'pointer',
                  border: '1px solid', flexShrink: 0, fontWeight: i === currentIdx ? 600 : 400, transition: 'all 0.15s',
                  borderColor: i === currentIdx ? 'var(--accent)' : done ? 'rgba(63,185,80,0.35)' : 'var(--border)',
                  background: i === currentIdx ? 'rgba(88,166,255,0.1)' : 'transparent',
                  color: i === currentIdx ? 'var(--accent)' : done ? 'var(--green)' : 'var(--text-muted)',
                }}>
                  {done ? '✓' : `${i + 1}`}. {ch.title}
                </button>
              );
            })}
          </div>

          {/* Chapter content */}
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 'clamp(16px, 4vw, 28px)', marginBottom: 20 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 22px', paddingBottom: 14, borderBottom: '1px solid var(--border)' }}>
              {currentIdx + 1}. {chapter.title}
            </h2>
            <ChapterRenderer contents={chapter.content} />
          </div>

          {/* Course complete banner */}
          {courseComplete && (
            <div style={{ background: 'rgba(63,185,80,0.08)', border: '1px solid rgba(63,185,80,0.35)', borderRadius: 12, padding: '28px 24px', marginBottom: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 40, marginBottom: 10 }}>🎉</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--green)', marginBottom: 6 }}>コース完了！</div>
              <div style={{ color: 'var(--text-muted)', marginBottom: 24, fontSize: 14 }}>+100ポイント獲得</div>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href={`/practice/${course.id}`} style={{ background: 'var(--green)', color: '#070d14', padding: '11px 24px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 14 }}>
                  📝 演習に挑戦する
                </Link>
                {nextCourse && (
                  <Link href={`/courses/${nextCourse.id}`} style={{ background: 'var(--bg-card)', color: 'var(--text-primary)', padding: '11px 22px', borderRadius: 8, fontWeight: 600, textDecoration: 'none', border: '1px solid var(--border)', fontSize: 14 }}>
                    次のコース: {nextCourse.title} →
                  </Link>
                )}
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          {!courseComplete && (
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
              <button
                onClick={() => { shouldScrollRef.current = true; setCurrentIdx(Math.max(0, currentIdx - 1)); }}
                disabled={currentIdx === 0}
                style={{ padding: '10px 20px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg-surface)', color: 'var(--text-secondary)', cursor: currentIdx === 0 ? 'not-allowed' : 'pointer', opacity: currentIdx === 0 ? 0.4 : 1, fontWeight: 600, fontSize: 14 }}>
                ← 前へ
              </button>
              <button
                onClick={handleComplete}
                className="btn-primary"
                style={{ padding: '10px 24px', fontSize: 14, cursor: 'pointer' }}>
                {isCompleted
                  ? (currentIdx < course.chapters.length - 1 ? '次のチャプターへ →' : '完了済み')
                  : (currentIdx < course.chapters.length - 1 ? '完了して次へ →' : 'このコースを完了する')}
              </button>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
