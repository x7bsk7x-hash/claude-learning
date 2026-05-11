export type Difficulty = 'beginner' | 'intermediate' | 'advanced';
export type Part = 1 | 2 | 3 | 4 | 5 | 6;

export type ChapterContent =
  | { type: 'text'; content: string }
  | { type: 'code'; language: string; content: string; filename?: string; description?: string }
  | { type: 'highlight'; content: string; label?: string }
  | { type: 'tip'; content: string }
  | { type: 'warning'; content: string }
  | { type: 'example'; content: string }
  | { type: 'reference'; title: string; url: string; description: string }
  | { type: 'comparison'; left: { label: string; content: string }; right: { label: string; content: string } }
  | { type: 'steps'; steps: { title: string; content: string }[] }
  | { type: 'command-list'; commands: { cmd: string; description: string; example?: string }[] }
  | { type: 'shortcut-list'; shortcuts: { keys: string[]; description: string }[] }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'flow'; title?: string; nodes: { label: string; desc?: string; color?: 'accent' | 'green' | 'amber' | 'red' | 'muted' }[] }
  | { type: 'stat-grid'; stats: { value: string; label: string; sub?: string; color?: 'accent' | 'green' | 'amber' | 'red' | 'muted' }[] }
  | { type: 'terminal'; title?: string; lines: { type: 'input' | 'output' | 'comment'; content: string }[] }
  | { type: 'architecture'; title?: string; layers: { label: string; items: string[]; color?: 'accent' | 'green' | 'amber' | 'muted' }[] }
  | { type: 'key-points'; title?: string; points: { mark: string; title: string; desc?: string; color?: 'accent' | 'green' | 'amber' | 'red' | 'muted' }[] }

export interface Chapter {
  id: string;
  title: string;
  content: ChapterContent[];
}

export interface Course {
  id: string;
  part: Part;
  partLabel: string;
  title: string;
  description: string;
  icon: string;
  difficulty: Difficulty;
  estimatedMinutes: number;
  chapters: Chapter[];
  tags: string[];
}

export interface DiagnosticQuestion {
  id: string;
  part: Part;
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: Difficulty;
}

export type PracticeQuestion =
  | MCQPracticeQuestion
  | PromptWritingQuestion;

export interface MCQPracticeQuestion {
  id: string;
  courseId: string;
  type: 'multiple-choice';
  topic: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: Difficulty;
}

export interface PromptWritingQuestion {
  id: string;
  courseId: string;
  type: 'prompt-writing';
  topic: string;
  question: string;
  scenario: string;
  modelAnswer: string;
  evaluationCriteria: string[];
  explanation: string;
  difficulty: Difficulty;
}

export interface DiagnosticResult {
  id: string;
  date: string;
  scores: Record<string, number>;
  overallScore: number;
  level: Difficulty;
  categoryLevels: Record<string, Difficulty>;
  recommendedCourseIds: string[];
}

export interface PracticeResult {
  courseId: string;
  date: string;
  score: number;
  totalQuestions: number;
  promptFeedback?: PromptFeedback[];
}

export interface PromptFeedback {
  questionId: string;
  userPrompt: string;
  score: number;
  feedback: string;
  criteria: { name: string; passed: boolean; comment: string }[];
}

export interface UserProgress {
  diagnosticResult: DiagnosticResult | null;
  completedCourses: string[];
  completedChapters: Record<string, string[]>;
  practiceResults: PracticeResult[];
  totalPoints: number;
  lastActivity: string;
  streak: number;
}
