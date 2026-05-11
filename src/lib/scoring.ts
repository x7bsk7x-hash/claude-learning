import type { Difficulty, DiagnosticResult } from './types';
import { courses } from '@/data/courses';

export function calcLevel(score: number): Difficulty {
  if (score >= 0.75) return 'advanced';
  if (score >= 0.45) return 'intermediate';
  return 'beginner';
}

export function calcCategoryLevel(score: number): Difficulty {
  if (score >= 0.75) return 'advanced';
  if (score >= 0.45) return 'intermediate';
  return 'beginner';
}

export function getLevelLabel(level: Difficulty): string {
  return { beginner: '初級', intermediate: '中級', advanced: '上級' }[level];
}

export function getLevelColor(level: Difficulty): string {
  return { beginner: '#3fb950', intermediate: '#58a6ff', advanced: '#bc8cff' }[level];
}

export function getLevelBg(level: Difficulty): string {
  return {
    beginner: 'rgba(63,185,80,0.12)',
    intermediate: 'rgba(88,166,255,0.12)',
    advanced: 'rgba(188,140,255,0.12)',
  }[level];
}

export function getPartLabel(part: number): string {
  return [
    '', 'AIとClaudeの基礎', '開発環境の構築', 'Claude Code入門',
    'Claude Code周辺機能', '実践的な開発', 'チーム・組織での活用',
  ][part] ?? '';
}

export function buildDiagnosticResult(
  scores: Record<string, number>,
  partScores: Record<number, number>,
): DiagnosticResult {
  const overall = Object.values(scores).reduce((a, b) => a + b, 0) / Object.values(scores).length;
  const level = calcLevel(overall);

  const categoryLevels: Record<string, Difficulty> = {};
  for (const [cat, sc] of Object.entries(scores)) {
    categoryLevels[cat] = calcCategoryLevel(sc);
  }

  // レベルと弱点カテゴリに基づいておすすめコースを決定
  const weakParts = Object.entries(partScores)
    .filter(([, sc]) => sc < 0.6)
    .map(([p]) => Number(p))
    .sort();

  let recommendedCourseIds: string[] = [];
  if (level === 'beginner') {
    // 全コースを順番に
    recommendedCourseIds = courses.filter(c => c.part <= 3).map(c => c.id);
  } else if (level === 'intermediate') {
    // 弱いパートのコース + Part 4以降
    const weakCourses = courses.filter(c => weakParts.includes(c.part)).map(c => c.id);
    const advCourses = courses.filter(c => c.part >= 4).map(c => c.id);
    recommendedCourseIds = [...new Set([...weakCourses, ...advCourses])];
  } else {
    // 弱いパートのみ + Part 5-6
    const weakCourses = courses.filter(c => weakParts.includes(c.part)).map(c => c.id);
    const advCourses = courses.filter(c => c.part >= 5).map(c => c.id);
    recommendedCourseIds = [...new Set([...weakCourses, ...advCourses])];
  }

  return {
    id: `diag-${Date.now()}`,
    date: new Date().toISOString(),
    scores,
    overallScore: overall,
    level,
    categoryLevels,
    recommendedCourseIds: recommendedCourseIds.slice(0, 10),
  };
}
