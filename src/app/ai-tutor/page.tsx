'use client';
import { useState, useEffect, useRef } from 'react';
import Navigation from '@/components/Navigation';

type Message = { role: 'user' | 'assistant'; content: string };

const STORAGE_KEY = 'cl-tutor-history';
const API_KEY_KEY = 'cl-api-key';

export default function AITutorPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [savedKey, setSavedKey] = useState('');
  const [showSetup, setShowSetup] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setMessages(JSON.parse(saved));
    const key = localStorage.getItem(API_KEY_KEY) ?? '';
    setSavedKey(key);
    if (!key) setShowSetup(true);
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const key = savedKey || apiKey;
    if (!key) { setShowSetup(true); return; }

    const userMsg: Message = { role: 'user', content: input };
    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMsgs, apiKey: key }),
      });
      if (res.ok) {
        const data = await res.json();
        const updated = [...newMsgs, { role: 'assistant' as const, content: data.content }];
        setMessages(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated.slice(-100)));
      } else {
        const err = await res.json();
        setMessages(prev => [...prev, { role: 'assistant', content: `エラー: ${err.error ?? 'API呼び出しに失敗しました'}` }]);
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'エラーが発生しました。ネットワーク接続を確認してください。' }]);
    }
    setLoading(false);
  };

  const handleSaveKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem(API_KEY_KEY, apiKey.trim());
      setSavedKey(apiKey.trim());
    }
    setShowSetup(false);
  };

  const handleClearHistory = () => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const handleDeleteKey = () => {
    localStorage.removeItem(API_KEY_KEY);
    setSavedKey('');
    setApiKey('');
    setShowSetup(true);
  };

  return (
    <>
      <Navigation />
      <div style={{ maxWidth: 800, margin: '0 auto', height: 'calc(100vh - 56px)', display: 'flex', flexDirection: 'column', padding: '0 16px' }}>
        {/* Header */}
        <div style={{ padding: '16px 0', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>🤖 AIチューター</h1>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0 }}>Claude Code・AI開発について質問できます</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={handleClearHistory} style={{ padding: '6px 12px', borderRadius: 6, fontSize: 12, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer' }}>
              履歴削除
            </button>
            <button onClick={() => setShowSetup(true)} style={{ padding: '6px 12px', borderRadius: 6, fontSize: 12, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer' }}>
              API設定
            </button>
          </div>
        </div>

        {/* Setup modal */}
        {showSetup && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
            <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 28, maxWidth: 480, width: '100%' }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Anthropic APIキーを設定</h2>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 20, lineHeight: 1.7 }}>
                AIチューター機能にはAnthropic APIキー（sk-ant-...）が必要です。<br />
                <a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>console.anthropic.com</a>で取得できます。
              </p>
              <div style={{ background: 'rgba(248,81,73,0.1)', border: '1px solid rgba(248,81,73,0.3)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: 'var(--text-secondary)' }}>
                ⚠️ 共有デバイスでは保存しないでください。APIキーが漏洩すると不正利用される恐れがあります。
              </div>
              <input value={apiKey} onChange={e => setApiKey(e.target.value)} type="password" placeholder="sk-ant-api03-..." style={{ width: '100%', padding: '10px 12px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text-primary)', fontSize: 14, marginBottom: 16, boxSizing: 'border-box' }} />
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <button onClick={handleSaveKey} disabled={!apiKey.trim()} style={{ background: 'var(--accent)', color: '#0d1117', padding: '10px 20px', borderRadius: 8, fontWeight: 700, border: 'none', cursor: 'pointer', opacity: apiKey.trim() ? 1 : 0.4 }}>保存して使用</button>
                {savedKey && <button onClick={() => setShowSetup(false)} style={{ padding: '10px 20px', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer' }}>キャンセル</button>}
                {savedKey && <button onClick={handleDeleteKey} style={{ padding: '10px 20px', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--red)', cursor: 'pointer' }}>保存済みキーを削除</button>}
              </div>
            </div>
          </div>
        )}

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 0', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {messages.length === 0 && (
            <div style={{ textAlign: 'center', padding: '48px 16px' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🤖</div>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                Claude Code・Anthropic API・AIエンジニアリングについて<br />何でも質問してください。
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginTop: 20 }}>
                {['Hooksの設定方法は？', 'MCPサーバーを追加するには？', 'CLAUDE.mdに何を書けばいい？', 'コストを抑えるには？'].map(q => (
                  <button key={q} onClick={() => setInput(q)} style={{ padding: '6px 14px', borderRadius: 16, fontSize: 13, border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text-secondary)', cursor: 'pointer' }}>{q}</button>
                ))}
              </div>
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '80%', padding: '12px 16px', borderRadius: 12, fontSize: 14, lineHeight: 1.7,
                background: msg.role === 'user' ? 'rgba(88,166,255,0.15)' : 'var(--bg-surface)',
                border: `1px solid ${msg.role === 'user' ? 'rgba(88,166,255,0.3)' : 'var(--border)'}`,
                color: 'var(--text-primary)',
                whiteSpace: 'pre-wrap',
              }}>
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: 'flex' }}>
              <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '12px 16px', fontSize: 14, color: 'var(--text-muted)' }}>
                <span style={{ animation: 'pulse 1s infinite' }}>考え中...</span>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Input */}
        <div style={{ paddingBottom: 16, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', gap: 10 }}>
            <textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              placeholder="質問を入力... (Shift+Enterで改行)" rows={2}
              style={{ flex: 1, padding: '10px 12px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text-primary)', fontSize: 14, lineHeight: 1.6, resize: 'none', fontFamily: 'inherit', outline: 'none' }} />
            <button onClick={handleSend} disabled={loading || !input.trim()} style={{ padding: '0 20px', borderRadius: 8, background: 'var(--accent)', color: '#0d1117', fontWeight: 700, border: 'none', cursor: 'pointer', opacity: loading || !input.trim() ? 0.4 : 1, fontSize: 14, flexShrink: 0 }}>
              送信
            </button>
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>
            {savedKey ? '✓ APIキー設定済み' : '⚠️ APIキー未設定'}
          </div>
        </div>
      </div>
    </>
  );
}
