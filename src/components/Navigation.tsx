'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  { href: '/', label: 'ホーム', icon: '⌂' },
  { href: '/diagnostic', label: '診断', icon: '◎' },
  { href: '/courses', label: 'コース', icon: '◈' },
  { href: '/reference', label: '参照', icon: '⊞' },
  { href: '/ai-tutor', label: 'AI', icon: '✦' },
];

export default function Navigation() {
  const pathname = usePathname();
  const [shared, setShared] = useState(false);

  const handleShare = async () => {
    const url = window.location.origin;
    if (navigator.share) {
      try { await navigator.share({ title: 'Claude Learning', text: 'Claude Code学習プラットフォーム', url }); } catch { /* cancel ok */ }
    } else {
      await navigator.clipboard.writeText(url);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  return (
    <nav style={{ background: 'rgba(7,13,20,0.97)', borderBottom: '1px solid #141e2e', backdropFilter: 'blur(8px)', position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="nav-accent-line" />
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 52 }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700, background: 'linear-gradient(135deg, #1a3a6b, #0d2a52)', border: '1px solid var(--accent)', color: 'var(--accent)' }}>
              ⚡
            </div>
            <div className="hidden-mobile">
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', color: 'var(--accent)' }}>CLAUDE</div>
              <div style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--text-muted)' }}>LEARNING</div>
            </div>
          </Link>

          {/* Nav + share */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {navItems.map(item => {
              const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link key={item.href} href={item.href} style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
                  padding: '6px 10px', borderRadius: 8, fontWeight: 600, letterSpacing: '0.04em',
                  textDecoration: 'none', minWidth: 40, transition: 'all 0.15s',
                  background: active ? 'rgba(88,166,255,0.12)' : 'transparent',
                  color: active ? 'var(--accent)' : 'var(--text-secondary)',
                  border: active ? '1px solid rgba(88,166,255,0.3)' : '1px solid transparent',
                }}>
                  <span style={{ fontSize: 14, lineHeight: 1 }}>{item.icon}</span>
                  <span style={{ fontSize: 9, lineHeight: 1.2 }}>{item.label}</span>
                </Link>
              );
            })}
            <button onClick={handleShare} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
              padding: '6px 10px', borderRadius: 8, border: '1px solid transparent',
              background: shared ? 'rgba(63,185,80,0.12)' : 'transparent',
              color: shared ? 'var(--green)' : 'var(--text-muted)', cursor: 'pointer', minWidth: 40,
            }}>
              <span style={{ fontSize: 14, lineHeight: 1 }}>{shared ? '✓' : '↑'}</span>
              <span style={{ fontSize: 9, lineHeight: 1.2 }}>{shared ? 'コピー' : '共有'}</span>
            </button>
          </div>
        </div>
      </div>
      <style>{`.hidden-mobile { display: none; } @media(min-width: 480px){ .hidden-mobile { display: block; } }`}</style>
    </nav>
  );
}
