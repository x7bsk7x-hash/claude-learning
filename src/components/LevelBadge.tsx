import type { Difficulty } from '@/lib/types';
import { getLevelLabel, getLevelColor, getLevelBg } from '@/lib/scoring';

export default function LevelBadge({ level, size = 'sm' }: { level: Difficulty; size?: 'sm' | 'md' }) {
  const sz = size === 'md' ? { fontSize: 13, padding: '4px 10px' } : { fontSize: 11, padding: '2px 8px' };
  return (
    <span style={{
      ...sz,
      borderRadius: 4,
      fontWeight: 600,
      color: getLevelColor(level),
      background: getLevelBg(level),
      display: 'inline-block',
      letterSpacing: '0.02em',
    }}>
      {getLevelLabel(level)}
    </span>
  );
}
