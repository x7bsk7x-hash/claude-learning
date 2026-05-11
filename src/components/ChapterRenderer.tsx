import type { ChapterContent } from '@/lib/types';

function CodeBlock({ language, content, filename, description }: { language: string; content: string; filename?: string; description?: string }) {
  return (
    <div style={{ margin: '16px 0', borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border)' }}>
      <div style={{ background: 'var(--bg-card)', padding: '6px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)' }}>
        <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>{filename || language}</span>
        {description && <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{description}</span>}
      </div>
      <pre style={{ margin: 0, padding: '16px', background: '#0d1117', overflowX: 'auto', fontSize: 13, lineHeight: 1.6, fontFamily: 'var(--font-mono)' }}>
        <code>{content}</code>
      </pre>
    </div>
  );
}

export default function ChapterRenderer({ contents }: { contents: ChapterContent[] }) {
  return (
    <div>
      {contents.map((item, i) => {
        if (item.type === 'text') return (
          <p key={i} style={{ color: 'var(--text-primary)', lineHeight: 1.8, margin: '12px 0' }}>{item.content}</p>
        );

        if (item.type === 'code') return (
          <CodeBlock key={i} language={item.language} content={item.content} filename={item.filename} description={item.description} />
        );

        if (item.type === 'highlight') return (
          <div key={i} style={{ background: 'rgba(88,166,255,0.08)', border: '1px solid rgba(88,166,255,0.3)', borderRadius: 8, padding: '12px 16px', margin: '16px 0' }}>
            {item.label && <div style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 700, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.label}</div>}
            <div style={{ color: 'var(--text-primary)', lineHeight: 1.7 }}>{item.content}</div>
          </div>
        );

        if (item.type === 'tip') return (
          <div key={i} style={{ background: 'rgba(63,185,80,0.08)', border: '1px solid rgba(63,185,80,0.3)', borderRadius: 8, padding: '12px 16px', margin: '16px 0', display: 'flex', gap: 10 }}>
            <span style={{ fontSize: 16 }}>💡</span>
            <div style={{ color: 'var(--text-primary)', lineHeight: 1.7 }}>{item.content}</div>
          </div>
        );

        if (item.type === 'warning') return (
          <div key={i} style={{ background: 'rgba(248,81,73,0.08)', border: '1px solid rgba(248,81,73,0.3)', borderRadius: 8, padding: '12px 16px', margin: '16px 0', display: 'flex', gap: 10 }}>
            <span style={{ fontSize: 16 }}>⚠️</span>
            <div style={{ color: 'var(--text-primary)', lineHeight: 1.7 }}>{item.content}</div>
          </div>
        );

        if (item.type === 'example') return (
          <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px 16px', margin: '16px 0' }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700, marginBottom: 8, textTransform: 'uppercase' }}>例</div>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, fontFamily: 'inherit' }}>{item.content}</pre>
          </div>
        );

        if (item.type === 'reference') return (
          <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 16px', margin: '16px 0', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 20 }}>🔗</span>
            <div>
              <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', fontWeight: 600 }}>{item.title}</a>
              <p style={{ margin: '4px 0 0', color: 'var(--text-secondary)', fontSize: 13 }}>{item.description}</p>
            </div>
          </div>
        );

        if (item.type === 'comparison') return (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, margin: '16px 0' }}>
            {[item.left, item.right].map((side, j) => (
              <div key={j} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px' }}>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8, fontSize: 14 }}>{side.label}</div>
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, fontFamily: 'inherit' }}>{side.content}</pre>
              </div>
            ))}
          </div>
        );

        if (item.type === 'steps') return (
          <div key={i} style={{ margin: '16px 0' }}>
            {item.steps.map((step, j) => (
              <div key={j} style={{ display: 'flex', gap: 14, padding: '12px 0', borderBottom: j < item.steps.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(88,166,255,0.15)', border: '1px solid var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: 'var(--accent)', flexShrink: 0 }}>{j + 1}</div>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>{step.title}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7, whiteSpace: 'pre-line' }}>{step.content}</div>
                </div>
              </div>
            ))}
          </div>
        );

        if (item.type === 'command-list') return (
          <div key={i} style={{ margin: '16px 0', border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
            {item.commands.map((cmd, j) => (
              <div key={j} style={{ display: 'flex', gap: 16, padding: '10px 14px', borderBottom: j < item.commands.length - 1 ? '1px solid var(--border)' : 'none', alignItems: 'flex-start' }}>
                <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontSize: 13, background: 'rgba(88,166,255,0.1)', padding: '2px 8px', borderRadius: 4, whiteSpace: 'nowrap', flexShrink: 0 }}>{cmd.cmd}</code>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: 'var(--text-primary)' }}>{cmd.description}</div>
                  {cmd.example && <code style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{cmd.example}</code>}
                </div>
              </div>
            ))}
          </div>
        );

        if (item.type === 'shortcut-list') return (
          <div key={i} style={{ margin: '16px 0', border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
            {item.shortcuts.map((sc, j) => (
              <div key={j} style={{ display: 'flex', gap: 16, padding: '10px 14px', borderBottom: j < item.shortcuts.length - 1 ? '1px solid var(--border)' : 'none', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                  {sc.keys.map((k, ki) => (
                    <kbd key={ki} style={{ fontFamily: 'var(--font-mono)', fontSize: 12, background: 'var(--bg-card)', border: '1px solid var(--border-strong)', borderRadius: 4, padding: '2px 6px', color: 'var(--text-primary)' }}>{k}</kbd>
                  ))}
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{sc.description}</div>
              </div>
            ))}
          </div>
        );

        if (item.type === 'table') return (
          <div key={i} style={{ margin: '16px 0', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: 'var(--bg-card)' }}>
                  {item.headers.map((h, j) => (
                    <th key={j} style={{ padding: '10px 14px', textAlign: 'left', color: 'var(--text-secondary)', fontWeight: 600, border: '1px solid var(--border)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.03em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {item.rows.map((row, j) => (
                  <tr key={j} style={{ background: j % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)' }}>
                    {row.map((cell, k) => (
                      <td key={k} style={{ padding: '10px 14px', color: 'var(--text-primary)', border: '1px solid var(--border)', lineHeight: 1.5 }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

        return null;
      })}
    </div>
  );
}
