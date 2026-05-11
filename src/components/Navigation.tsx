'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'ホーム' },
  { href: '/diagnostic', label: '診断テスト' },
  { href: '/courses', label: 'コース一覧' },
  { href: '/reference', label: 'リファレンス' },
  { href: '/ai-tutor', label: 'AIチューター' },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav style={{
      background: 'var(--bg-surface)',
      borderBottom: '1px solid var(--border)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px', display: 'flex', alignItems: 'center', gap: 8, height: 56 }}>
        <Link href="/" style={{ fontWeight: 700, fontSize: 18, color: 'var(--accent)', marginRight: 24, textDecoration: 'none', whiteSpace: 'nowrap' }}>
          Claude Learning
        </Link>
        <div style={{ display: 'flex', gap: 4, overflowX: 'auto' }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} style={{
              padding: '6px 12px',
              borderRadius: 6,
              fontSize: 14,
              color: pathname === l.href ? 'var(--text-primary)' : 'var(--text-secondary)',
              background: pathname === l.href ? 'rgba(88,166,255,0.12)' : 'transparent',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              fontWeight: pathname === l.href ? 600 : 400,
              transition: 'background 0.15s',
            }}>
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
