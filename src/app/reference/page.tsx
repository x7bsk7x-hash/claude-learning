'use client';
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { slashCommands, keyboardShortcuts, permissionTools, mcpServers } from '@/data/reference-data';

type Tab = 'commands' | 'shortcuts' | 'permissions' | 'mcp';

export default function ReferencePage() {
  const [tab, setTab] = useState<Tab>('commands');
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState<string>('all');

  const tabs: { id: Tab; label: string }[] = [
    { id: 'commands', label: 'スラッシュコマンド' },
    { id: 'shortcuts', label: 'キーボードショートカット' },
    { id: 'permissions', label: 'ツール権限' },
    { id: 'mcp', label: 'MCPサーバー' },
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
      <main style={{ maxWidth: 1000, margin: '0 auto', padding: '32px 16px 80px' }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 6 }}>リファレンス</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 28 }}>Claude Codeのコマンド・ショートカット・設定の一覧</p>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 28, overflowX: 'auto' }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => { setTab(t.id); setSearch(''); setCatFilter('all'); }} style={{
              padding: '8px 16px', borderRadius: 8, fontSize: 14, cursor: 'pointer', whiteSpace: 'nowrap',
              border: '1px solid', fontWeight: tab === t.id ? 600 : 400,
              borderColor: tab === t.id ? 'var(--accent)' : 'var(--border)',
              background: tab === t.id ? 'rgba(88,166,255,0.12)' : 'var(--bg-card)',
              color: tab === t.id ? 'var(--accent)' : 'var(--text-secondary)',
            }}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'commands' && (
          <>
            <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="コマンドを検索..." style={{ flex: 1, minWidth: 200, padding: '8px 12px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text-primary)', fontSize: 14, outline: 'none' }} />
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {categories.map(c => (
                  <button key={c} onClick={() => setCatFilter(c)} style={{ padding: '6px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer', border: '1px solid', borderColor: catFilter === c ? 'var(--accent)' : 'var(--border)', background: catFilter === c ? 'rgba(88,166,255,0.1)' : 'transparent', color: catFilter === c ? 'var(--accent)' : 'var(--text-muted)' }}>
                    {catLabel[c] ?? c}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
              {filteredCommands.map((cmd, i) => (
                <div key={cmd.cmd} style={{ display: 'flex', gap: 16, padding: '14px 18px', borderBottom: i < filteredCommands.length - 1 ? '1px solid var(--border)' : 'none', alignItems: 'flex-start' }}>
                  <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontSize: 14, background: 'rgba(88,166,255,0.1)', padding: '3px 10px', borderRadius: 5, whiteSpace: 'nowrap', flexShrink: 0 }}>{cmd.cmd}</code>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, color: 'var(--text-primary)', marginBottom: cmd.example ? 4 : 0 }}>{cmd.description}</div>
                    {cmd.example && <code style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{cmd.example}</code>}
                  </div>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)', background: 'var(--bg-card)', padding: '2px 8px', borderRadius: 4, flexShrink: 0 }}>{catLabel[cmd.category]}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === 'shortcuts' && (
          <div style={{ border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden' }}>
            {keyboardShortcuts.map((sc, i) => (
              <div key={i} style={{ display: 'flex', gap: 20, padding: '14px 18px', borderBottom: i < keyboardShortcuts.length - 1 ? '1px solid var(--border)' : 'none', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                  {sc.keys.map((k, ki) => (
                    <kbd key={ki} style={{ fontFamily: 'var(--font-mono)', fontSize: 13, background: 'var(--bg-card)', border: '1px solid var(--border-strong)', borderRadius: 5, padding: '3px 8px', color: 'var(--text-primary)' }}>{k}</kbd>
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
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 20 }}>Claude Codeが使用できるツールと、各ツールのリスクレベルです。settings.jsonのpermissionsで制御できます。</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
              {permissionTools.map(tool => (
                <div key={tool.name} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontWeight: 700 }}>{tool.name}</code>
                    <span style={{ fontSize: 11, color: riskColor[tool.risk], background: `${riskColor[tool.risk]}20`, padding: '2px 8px', borderRadius: 4 }}>{riskLabel[tool.risk]}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: 13, color: 'var(--text-secondary)' }}>{tool.description}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 28 }}>
              <h2 style={{ fontSize: 16, marginBottom: 14 }}>設定例</h2>
              <div style={{ background: '#0d1117', border: '1px solid var(--border)', borderRadius: 8, padding: 20, overflowX: 'auto' }}>
                <pre style={{ margin: 0, fontSize: 13, fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{`{
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
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 20 }}>MCPサーバーを追加することでClaude Codeの機能を拡張できます。<code style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>claude mcp add</code> コマンドで追加します。</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {mcpServers.map(srv => (
                <div key={srv.name} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 18px', display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: 120 }}>
                    <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{srv.name}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{srv.description}</div>
                  </div>
                  <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)', background: 'var(--bg-card)', padding: '4px 10px', borderRadius: 5, whiteSpace: 'nowrap' }}>{srv.package}</code>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </>
  );
}
