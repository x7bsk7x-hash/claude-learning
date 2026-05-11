'use client';
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { slashCommands, keyboardShortcuts, permissionTools, mcpServers } from '@/data/reference-data';

type Tab = 'commands' | 'shortcuts' | 'permissions' | 'mcp';

export default function ReferencePage() {
  const [tab, setTab] = useState<Tab>('commands');
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState<string>('all');

  const tabs: { id: Tab; label: string; mono?: boolean }[] = [
    { id: 'commands', label: '/コマンド', mono: true },
    { id: 'shortcuts', label: 'キーボード', mono: false },
    { id: 'permissions', label: '権限設定', mono: false },
    { id: 'mcp', label: 'MCPサーバー', mono: false },
  ];

  const categories = ['all', ...Array.from(new Set(slashCommands.map(c => c.category)))];
  const catLabel: Record<string, string> = { all: 'すべて', session: 'セッション', model: 'モデル', config: '設定', tools: 'ツール', git: 'Git' };

  const filteredCommands = slashCommands.filter(c =>
    (catFilter === 'all' || c.category === catFilter) &&
    (c.cmd.includes(search) || c.description.includes(search))
  );

  const riskColor: Record<string, string> = { low: 'var(--green)', medium: 'var(--amber)', high: 'var(--red)' };
  const riskLabel: Record<string, string> = { low: '低リスク', medium: '中リスク', high: '高リスク' };

  return (
    <>
      <Navigation />
      <main style={{ maxWidth: 1000, margin: '0 auto', padding: '32px 16px 80px' }} className="dot-bg">
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: 'inline-block', background: 'rgba(157,140,255,0.08)', border: '1px solid rgba(157,140,255,0.2)', borderRadius: 20, padding: '4px 14px', fontSize: 11, color: 'var(--accent)', marginBottom: 12, letterSpacing: '0.06em', fontFamily: 'var(--font-mono)' }}>
            ⌨ コマンド早見表
          </div>
          <h1 style={{ fontSize: 'clamp(20px, 4vw, 26px)', fontWeight: 700, margin: '0 0 6px', letterSpacing: '-0.01em' }}>コマンド早見表</h1>
          <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: 14 }}>Claude Codeのスラッシュコマンド・ショートカット・設定の一覧</p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 24, overflowX: 'auto', paddingBottom: 2 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => { setTab(t.id); setSearch(''); setCatFilter('all'); }} style={{
              padding: '8px 16px', borderRadius: 8, fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap',
              border: '1px solid', fontWeight: tab === t.id ? 700 : 400, transition: 'all 0.15s',
              borderColor: tab === t.id ? 'var(--accent)' : 'var(--border)',
              background: tab === t.id ? 'rgba(157,140,255,0.12)' : 'var(--bg-surface)',
              color: tab === t.id ? 'var(--accent)' : 'var(--text-secondary)',
              fontFamily: t.mono ? 'var(--font-mono)' : 'inherit',
            }}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'commands' && (
          <>
            <div style={{ display: 'flex', gap: 8, marginBottom: 18, flexWrap: 'wrap' }}>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="コマンドを検索..."
                style={{ flex: 1, minWidth: 180, padding: '8px 12px', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text-primary)', fontSize: 14, outline: 'none', fontFamily: 'inherit' }}
              />
              <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                {categories.map(c => (
                  <button key={c} onClick={() => setCatFilter(c)} style={{
                    padding: '6px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer', border: '1px solid', transition: 'all 0.15s',
                    borderColor: catFilter === c ? 'var(--accent)' : 'var(--border)',
                    background: catFilter === c ? 'rgba(157,140,255,0.1)' : 'transparent',
                    color: catFilter === c ? 'var(--accent)' : 'var(--text-muted)',
                  }}>
                    {catLabel[c] ?? c}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden', background: 'var(--bg-surface)' }}>
              {filteredCommands.length === 0 ? (
                <div style={{ padding: '32px 20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 14 }}>
                  「{search}」に一致するコマンドはありません
                </div>
              ) : filteredCommands.map((cmd, i) => (
                <div key={cmd.cmd} style={{ display: 'flex', gap: 14, padding: '14px 18px', borderBottom: i < filteredCommands.length - 1 ? '1px solid var(--border)' : 'none', alignItems: 'flex-start' }}>
                  <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontSize: 13, background: 'rgba(157,140,255,0.08)', padding: '3px 10px', borderRadius: 5, whiteSpace: 'nowrap', flexShrink: 0, border: '1px solid rgba(157,140,255,0.15)' }}>{cmd.cmd}</code>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, color: 'var(--text-primary)', marginBottom: cmd.example ? 4 : 0 }}>{cmd.description}</div>
                    {cmd.example && <code style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{cmd.example}</code>}
                  </div>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)', background: 'var(--bg-card)', padding: '2px 8px', borderRadius: 4, flexShrink: 0, border: '1px solid var(--border)' }}>{catLabel[cmd.category]}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === 'shortcuts' && (
          <div style={{ border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden', background: 'var(--bg-surface)' }}>
            {keyboardShortcuts.map((sc, i) => (
              <div key={i} style={{ display: 'flex', gap: 20, padding: '14px 18px', borderBottom: i < keyboardShortcuts.length - 1 ? '1px solid var(--border)' : 'none', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                  {sc.keys.map((k, ki) => (
                    <kbd key={ki} style={{ fontFamily: 'var(--font-mono)', fontSize: 12, background: 'var(--bg-card)', border: '1px solid var(--border-strong)', borderRadius: 5, padding: '3px 8px', color: 'var(--text-primary)', boxShadow: '0 1px 0 var(--border-strong)' }}>{k}</kbd>
                  ))}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, color: 'var(--text-primary)' }}>{sc.description}</div>
                  {sc.context && <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{sc.context}</div>}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'permissions' && (
          <>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 20, lineHeight: 1.7 }}>
              Claude Codeが使用できるツールと各ツールのリスクレベルです。<code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)', background: 'rgba(157,140,255,0.08)', padding: '1px 6px', borderRadius: 4 }}>settings.json</code> のpermissionsで制御できます。
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 10, marginBottom: 28 }}>
              {permissionTools.map(tool => (
                <div key={tool.name} className="card-hover" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontWeight: 700, fontSize: 13 }}>{tool.name}</code>
                    <span style={{ fontSize: 11, color: riskColor[tool.risk], background: `${riskColor[tool.risk]}18`, padding: '2px 8px', borderRadius: 4, border: `1px solid ${riskColor[tool.risk]}40`, fontWeight: 600 }}>{riskLabel[tool.risk]}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{tool.description}</p>
                </div>
              ))}
            </div>
            <div>
              <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12, color: 'var(--text-secondary)', letterSpacing: '0.04em' }}>設定例</h2>
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, padding: 20, overflowX: 'auto' }}>
                <pre style={{ margin: 0, fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', lineHeight: 1.8 }}>{`{
  "permissions": {
    "allow": [
      "Read", "Write", "Edit",
      "Bash(npm run *)",
      "Bash(git *)",
      "WebFetch"
    ],
    "deny": [
      "Bash(rm -rf *)",
      "Bash(sudo *)"
    ]
  }
}`}</pre>
              </div>
            </div>
          </>
        )}

        {tab === 'mcp' && (
          <>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 20, lineHeight: 1.7 }}>
              MCPサーバーを追加することでClaude Codeの機能を拡張できます。
              <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)', background: 'rgba(157,140,255,0.08)', padding: '1px 6px', borderRadius: 4, marginLeft: 4 }}>claude mcp add</code> コマンドで追加します。
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {mcpServers.map(srv => (
                <div key={srv.name} className="card-hover" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 18px', display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: 120 }}>
                    <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4, fontSize: 14 }}>{srv.name}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{srv.description}</div>
                  </div>
                  <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)', background: 'var(--bg-card)', padding: '4px 10px', borderRadius: 5, whiteSpace: 'nowrap', border: '1px solid var(--border)' }}>{srv.package}</code>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </>
  );
}
