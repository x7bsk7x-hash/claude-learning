import type { UserProgress, DiagnosticResult, PracticeResult } from './types';

const KEY = 'claude-learning-progress';

const defaultProgress: UserProgress = {
  diagnosticResult: null,
  completedCourses: [],
  completedChapters: {},
  practiceResults: [],
  totalPoints: 0,
  lastActivity: new Date().toISOString(),
  streak: 0,
};

export function getProgress(): UserProgress {
  if (typeof window === 'undefined') return defaultProgress;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultProgress;
    return { ...defaultProgress, ...JSON.parse(raw) };
  } catch {
    return defaultProgress;
  }
}

export function saveProgress(p: UserProgress): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEY, JSON.stringify(p));
}

export function saveDiagnosticResult(result: DiagnosticResult): void {
  const p = getProgress();
  p.diagnosticResult = result;
  p.lastActivity = new Date().toISOString();
  p.totalPoints += 50;
  saveProgress(p);
}

export function markChapterComplete(courseId: string, chapterId: string): void {
  const p = getProgress();
  if (!p.completedChapters[courseId]) p.completedChapters[courseId] = [];
  if (!p.completedChapters[courseId].includes(chapterId)) {
    p.completedChapters[courseId].push(chapterId);
    p.totalPoints += 10;
    p.lastActivity = new Date().toISOString();
  }
  saveProgress(p);
}

export function markCourseComplete(courseId: string): void {
  const p = getProgress();
  if (!p.completedCourses.includes(courseId)) {
    p.completedCourses.push(courseId);
    p.totalPoints += 100;
    p.lastActivity = new Date().toISOString();
  }
  saveProgress(p);
}

export function savePracticeResult(result: PracticeResult): void {
  const p = getProgress();
  p.practiceResults.push(result);
  p.totalPoints += Math.round(result.score * 30);
  p.lastActivity = new Date().toISOString();
  saveProgress(p);
}

export function getChapterProgress(courseId: string): string[] {
  return getProgress().completedChapters[courseId] || [];
}

export function isCourseComplete(courseId: string): boolean {
  return getProgress().completedCourses.includes(courseId);
}

export function resetProgress(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(KEY);
}
