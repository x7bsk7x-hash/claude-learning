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
        <p style={{ color: 'var(--text-muted)' }}>コースが見つかりません</p>
        <Link href="/courses" style={{ color: 'var(--accent)' }}>コース一覧に戻る</Link>
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
        return; // no scroll on final chapter
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
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 16px 80px', display: 'flex', gap: 24 }}>
        {/* Sidebar */}
        <aside style={{ width: 240, flexShrink: 0, position: 'sticky', top: 80, alignSelf: 'flex-start', display: 'none' }} className="sidebar">
          <style>{`@media(min-width:768px){.sidebar{display:block}}`}</style>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 10, padding: 16 }}>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>チャプター</div>
            {course.chapters.map((ch, i) => {
              const done = completed.includes(ch.id);
              return (
                <button key={ch.id} onClick={() => handleChapterClick(i)} style={{
                  width: '100%', textAlign: 'left', padding: '8px 10px', borderRadius: 6, display: 'flex', gap: 8, alignItems: 'flex-start',
                  background: i === currentIdx ? 'rgba(88,166,255,0.1)' : 'transparent',
                  border: `1px solid ${i === currentIdx ? 'rgba(88,166,255,0.3)' : 'transparent'}`,
                  cursor: 'pointer', marginBottom: 4,
                }}>
                  <span style={{ fontSize: 12, color: done ? 'var(--green)' : i === currentIdx ? 'var(--accent)' : 'var(--text-muted)', flexShrink: 0, marginTop: 1 }}>
                    {done ? '✓' : `${i + 1}`}
                  </span>
                  <span style={{ fontSize: 13, color: i === currentIdx ? 'var(--text-primary)' : 'var(--text-secondary)', lineHeight: 1.4 }}>{ch.title}</span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Main content */}
        <main style={{ flex: 1, minWidth: 0 }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>
            <Link href="/courses" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>コース一覧</Link>
            <span>›</span>
            <span style={{ color: 'var(--text-secondary)' }}>{course.title}</span>
          </div>

          {/* Course header */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Part {course.part} · {course.partLabel}</span>
              <LevelBadge level={course.difficulty} />
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>⏱ {course.estimatedMinutes}分</span>
            </div>
            <h1 style={{ fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: 700, margin: '0 0 8px' }}>
              {course.icon} {course.title}
            </h1>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>{course.description}</p>
          </div>

          {/* Mobile chapter tabs */}
          <div style={{ display: 'flex', gap: 6, overflowX: 'auto', marginBottom: 24, paddingBottom: 4 }}>
            {course.chapters.map((ch, i) => {
              const done = completed.includes(ch.id);
              return (
                <button key={ch.id} onClick={() => handleChapterClick(i)} style={{
                  padding: '6px 12px', borderRadius: 6, fontSize: 12, whiteSpace: 'nowrap', cursor: 'pointer',
                  border: '1px solid', flexShrink: 0,
                  borderColor: i === currentIdx ? 'var(--accent)' : done ? 'rgba(63,185,80,0.4)' : 'var(--border)',
                  background: i === currentIdx ? 'rgba(88,166,255,0.1)' : 'transparent',
                  color: i === currentIdx ? 'var(--accent)' : done ? 'var(--green)' : 'var(--text-muted)',
                }}>
                  {done ? '✓' : `${i + 1}`}. {ch.title}
                </button>
              );
            })}
          </div>

          {/* Chapter content */}
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 'clamp(16px, 4vw, 32px)', marginBottom: 24 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 24px', paddingBottom: 16, borderBottom: '1px solid var(--border)' }}>
              {currentIdx + 1}. {chapter.title}
            </h2>
            <ChapterRenderer contents={chapter.content} />
          </div>

          {/* Course complete banner */}
          {courseComplete && (
            <div style={{ background: 'rgba(63,185,80,0.1)', border: '1px solid rgba(63,185,80,0.4)', borderRadius: 12, padding: 24, marginBottom: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 36, marginBottom: 8 }}>🎉</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--green)', marginBottom: 8 }}>コース完了！</div>
              <div style={{ color: 'var(--text-secondary)', marginBottom: 20 }}>+100ポイント獲得</div>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href={`/practice/${course.id}`} style={{ background: 'var(--green)', color: '#0d1117', padding: '10px 22px', borderRadius: 8, fontWeight: 700, textDecoration: 'none' }}>演習に挑戦する</Link>
                {nextCourse && <Link href={`/courses/${nextCourse.id}`} style={{ background: 'var(--bg-card)', color: 'var(--text-primary)', padding: '10px 22px', borderRadius: 8, fontWeight: 600, textDecoration: 'none', border: '1px solid var(--border)' }}>次のコース: {nextCourse.title} →</Link>}
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          {!courseComplete && (
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
              <button onClick={() => { shouldScrollRef.current = true; setCurrentIdx(Math.max(0, currentIdx - 1)); }}
                disabled={currentIdx === 0}
                style={{ padding: '10px 20px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text-secondary)', cursor: currentIdx === 0 ? 'not-allowed' : 'pointer', opacity: currentIdx === 0 ? 0.4 : 1 }}>
                ← 前へ
              </button>
              <button onClick={handleComplete}
                style={{ padding: '10px 24px', borderRadius: 8, border: 'none', background: isCompleted && currentIdx === course.chapters.length - 1 ? 'var(--border)' : 'var(--accent)', color: '#0d1117', fontWeight: 700, cursor: 'pointer' }}>
                {isCompleted ? (currentIdx < course.chapters.length - 1 ? '次のチャプターへ →' : '完了済み') : (currentIdx < course.chapters.length - 1 ? '完了して次へ →' : 'このコースを完了する')}
              </button>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
