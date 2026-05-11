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
          <div key={i} style={{ background: 'rgba(157,140,255,0.07)', border: '1px solid rgba(157,140,255,0.3)', borderRadius: 8, padding: '12px 16px', margin: '16px 0' }}>
            {item.label && <div style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 700, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.label}</div>}
            <div style={{ color: 'var(--text-primary)', lineHeight: 1.7 }}>{item.content}</div>
          </div>
        );

        if (item.type === 'tip') return (
          <div key={i} style={{ background: 'rgba(45,206,137,0.07)', border: '1px solid rgba(45,206,137,0.3)', borderRadius: 8, padding: '12px 16px', margin: '16px 0', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 12, color: 'var(--green)', fontWeight: 700, background: 'rgba(45,206,137,0.12)', border: '1px solid rgba(45,206,137,0.3)', borderRadius: 4, padding: '2px 6px', flexShrink: 0, marginTop: 2, fontFamily: 'var(--font-mono)' }}>TIP</span>
            <div style={{ color: 'var(--text-primary)', lineHeight: 1.7 }}>{item.content}</div>
          </div>
        );

        if (item.type === 'warning') return (
          <div key={i} style={{ background: 'rgba(247,95,106,0.07)', border: '1px solid rgba(247,95,106,0.3)', borderRadius: 8, padding: '12px 16px', margin: '16px 0', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 12, color: 'var(--red)', fontWeight: 700, background: 'rgba(247,95,106,0.12)', border: '1px solid rgba(247,95,106,0.3)', borderRadius: 4, padding: '2px 6px', flexShrink: 0, marginTop: 2, fontFamily: 'var(--font-mono)' }}>!</span>
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
            <span style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 700, fontFamily: 'var(--font-mono)', background: 'rgba(157,140,255,0.1)', border: '1px solid rgba(157,140,255,0.3)', borderRadius: 4, padding: '2px 6px', flexShrink: 0, marginTop: 2 }}>REF</span>
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
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(157,140,255,0.15)', border: '1px solid var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: 'var(--accent)', flexShrink: 0 }}>{j + 1}</div>
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
                <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontSize: 13, background: 'rgba(157,140,255,0.1)', padding: '2px 8px', borderRadius: 4, whiteSpace: 'nowrap', flexShrink: 0 }}>{cmd.cmd}</code>
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

        if (item.type === 'flow') {
          const colorMap: Record<string, { bg: string; border: string; text: string }> = {
            accent: { bg: 'rgba(157,140,255,0.1)', border: 'rgba(157,140,255,0.4)', text: 'var(--accent)' },
            green: { bg: 'rgba(45,206,137,0.08)', border: 'rgba(45,206,137,0.4)', text: 'var(--green)' },
            amber: { bg: 'rgba(251,191,36,0.08)', border: 'rgba(251,191,36,0.4)', text: '#fbbf24' },
            red: { bg: 'rgba(247,95,106,0.08)', border: 'rgba(247,95,106,0.4)', text: 'var(--red)' },
            muted: { bg: 'var(--bg-card)', border: 'var(--border)', text: 'var(--text-secondary)' },
          };
          return (
            <div key={i} style={{ margin: '20px 0', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 20px' }}>
              {item.title && <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 14 }}>{item.title}</div>}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 0, alignItems: 'stretch' }}>
                {item.nodes.map((node, j) => {
                  const c = colorMap[node.color ?? 'muted'];
                  return (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                      <div style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: 8, padding: '10px 14px', width: 110, textAlign: 'center', flexShrink: 0 }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: c.text, lineHeight: 1.4 }}>{node.label}</div>
                        {node.desc && <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 3, lineHeight: 1.4 }}>{node.desc}</div>}
                      </div>
                      {j < item.nodes.length - 1 && (
                        <div style={{ padding: '0 4px', color: 'var(--text-muted)', fontSize: 14, flexShrink: 0 }}>→</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }

        if (item.type === 'stat-grid') {
          const scMap: Record<string, { text: string; bg: string; border: string }> = {
            accent: { text: 'var(--accent)', bg: 'rgba(157,140,255,0.08)', border: 'rgba(157,140,255,0.2)' },
            green: { text: 'var(--green)', bg: 'rgba(45,206,137,0.08)', border: 'rgba(45,206,137,0.2)' },
            amber: { text: '#fbbf24', bg: 'rgba(251,191,36,0.07)', border: 'rgba(251,191,36,0.25)' },
            red: { text: 'var(--red)', bg: 'rgba(247,95,106,0.07)', border: 'rgba(247,95,106,0.2)' },
            muted: { text: 'var(--text-secondary)', bg: 'var(--bg-card)', border: 'var(--border)' },
          };
          return (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(120px, 1fr))`, gap: 10, margin: '16px 0' }}>
              {item.stats.map((stat, j) => {
                const c = scMap[stat.color ?? 'accent'];
                return (
                  <div key={j} style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: 10, padding: '16px 12px', textAlign: 'center' }}>
                    <div style={{ fontSize: 26, fontWeight: 700, color: c.text, lineHeight: 1, fontFamily: 'var(--font-mono)' }}>{stat.value}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-primary)', marginTop: 6, fontWeight: 600, lineHeight: 1.3 }}>{stat.label}</div>
                    {stat.sub && <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 3 }}>{stat.sub}</div>}
                  </div>
                );
              })}
            </div>
          );
        }

        if (item.type === 'terminal') {
          return (
            <div key={i} style={{ margin: '16px 0', borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border)' }}>
              <div style={{ background: 'var(--bg-card)', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 6, borderBottom: '1px solid var(--border)' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#f85149', display: 'inline-block', flexShrink: 0 }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#fbbf24', display: 'inline-block', flexShrink: 0 }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#3fb950', display: 'inline-block', flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: 'var(--text-muted)', marginLeft: 8, fontFamily: 'var(--font-mono)' }}>{item.title ?? 'terminal'}</span>
              </div>
              <div style={{ background: '#0a0d12', padding: '14px 16px' }}>
                {item.lines.map((line, j) => {
                  if (line.type === 'input') return (
                    <div key={j} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                      <span style={{ color: 'var(--green)', fontFamily: 'var(--font-mono)', fontSize: 13, flexShrink: 0, userSelect: 'none' }}>$</span>
                      <span style={{ color: '#e2e8f0', fontFamily: 'var(--font-mono)', fontSize: 13 }}>{line.content}</span>
                    </div>
                  );
                  if (line.type === 'output') return (
                    <div key={j} style={{ color: '#94a3b8', fontFamily: 'var(--font-mono)', fontSize: 12, marginBottom: 4, paddingLeft: 18, whiteSpace: 'pre' }}>{line.content}</div>
                  );
                  if (line.type === 'comment') return (
                    <div key={j} style={{ color: '#4b5563', fontFamily: 'var(--font-mono)', fontSize: 12, marginBottom: 6, paddingLeft: 18 }}># {line.content}</div>
                  );
                  return null;
                })}
              </div>
            </div>
          );
        }

        if (item.type === 'architecture') {
          const arcMap: Record<string, { bg: string; border: string; text: string }> = {
            accent: { bg: 'rgba(157,140,255,0.1)', border: 'rgba(157,140,255,0.35)', text: 'var(--accent)' },
            green: { bg: 'rgba(45,206,137,0.08)', border: 'rgba(45,206,137,0.35)', text: 'var(--green)' },
            amber: { bg: 'rgba(251,191,36,0.08)', border: 'rgba(251,191,36,0.35)', text: '#fbbf24' },
            muted: { bg: 'var(--bg-card)', border: 'var(--border)', text: 'var(--text-secondary)' },
          };
          return (
            <div key={i} style={{ margin: '16px 0' }}>
              {item.title && <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>{item.title}</div>}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                {item.layers.map((layer, j) => {
                  const c = arcMap[layer.color ?? 'muted'];
                  return (
                    <div key={j} style={{ display: 'flex', alignItems: 'stretch', borderRadius: 8, overflow: 'hidden', border: `1px solid ${c.border}` }}>
                      <div style={{ width: 88, minWidth: 88, background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px 8px', borderRight: `1px solid ${c.border}` }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: c.text, textAlign: 'center', lineHeight: 1.3 }}>{layer.label}</span>
                      </div>
                      <div style={{ flex: 1, display: 'flex', gap: 6, padding: '10px 12px', background: 'var(--bg-card)', flexWrap: 'wrap', alignItems: 'center' }}>
                        {layer.items.map((it, k) => (
                          <span key={k} style={{ fontSize: 12, color: 'var(--text-primary)', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 5, padding: '3px 8px', whiteSpace: 'nowrap' }}>{it}</span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }

        if (item.type === 'key-points') {
          const kpMap: Record<string, { text: string; bg: string; border: string }> = {
            accent: { text: 'var(--accent)', bg: 'rgba(157,140,255,0.08)', border: 'rgba(157,140,255,0.25)' },
            green: { text: 'var(--green)', bg: 'rgba(45,206,137,0.07)', border: 'rgba(45,206,137,0.25)' },
            amber: { text: '#fbbf24', bg: 'rgba(251,191,36,0.07)', border: 'rgba(251,191,36,0.25)' },
            red: { text: 'var(--red)', bg: 'rgba(247,95,106,0.07)', border: 'rgba(247,95,106,0.25)' },
            muted: { text: 'var(--text-secondary)', bg: 'var(--bg-card)', border: 'var(--border)' },
          };
          return (
            <div key={i} style={{ margin: '16px 0' }}>
              {item.title && <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>{item.title}</div>}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {item.points.map((pt, j) => {
                  const c = kpMap[pt.color ?? 'muted'];
                  return (
                    <div key={j} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', background: c.bg, border: `1px solid ${c.border}`, borderRadius: 8, padding: '11px 14px' }}>
                      <span style={{ fontSize: 13, fontFamily: 'var(--font-mono)', color: c.text, fontWeight: 700, flexShrink: 0, minWidth: 22, textAlign: 'center', marginTop: 1 }}>{pt.mark}</span>
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: 14 }}>{pt.title}</div>
                        {pt.desc && <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 3, lineHeight: 1.6 }}>{pt.desc}</div>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
