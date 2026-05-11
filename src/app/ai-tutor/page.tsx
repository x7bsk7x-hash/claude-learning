'use client';
import { useState, useEffect, useRef } from 'react';
import Navigation from '@/components/Navigation';

type Provider = 'groq' | 'gemini' | 'claude';
type Message = { role: 'user' | 'assistant'; content: string };

const STORAGE_PROVIDER = 'cl_ai_provider';
const STORAGE_GROQ_KEY = 'cl_groq_key';
const STORAGE_GEMINI_KEY = 'cl_gemini_key';
const STORAGE_CLAUDE_KEY = 'cl_claude_key';
const STORAGE_MESSAGES = 'cl_ai_messages';
const MAX_STORED_MESSAGES = 200;

const GREETING: Message = {
  role: 'assistant',
  content: 'こんにちは！Claude LearningのAIチューターです。Claude Code・Anthropic API・AI開発について何でも質問してください。',
};

const PROVIDER_INFO = {
  groq: {
    name: 'Groq', label: 'Groq (Llama)', color: '#f55036',
    badge: '無料', badgeColor: '#22c55e',
    placeholder: 'gsk_...', keyPrefix: 'gsk_',
    keyHint: '"gsk_" から始まる形式です',
    docsUrl: 'https://console.groq.com/keys', docsLabel: 'console.groq.com',
    note: '完全無料・カード不要・高速',
  },
  gemini: {
    name: 'Gemini', label: 'Google Gemini', color: '#4285f4',
    badge: '有料', badgeColor: '#f59e0b',
    placeholder: 'AIzaSy...', keyPrefix: 'AIzaSy',
    keyHint: '"AIzaSy" から始まる形式です',
    docsUrl: 'https://aistudio.google.com/app/apikey', docsLabel: 'aistudio.google.com',
    note: '無料枠あり・請求先登録が必要',
  },
  claude: {
    name: 'Claude', label: 'Anthropic Claude', color: '#58a6ff',
    badge: '有料', badgeColor: '#ef4444',
    placeholder: 'sk-ant-...', keyPrefix: 'sk-ant-',
    keyHint: '"sk-ant-" から始まる形式です',
    docsUrl: 'https://console.anthropic.com/settings/keys', docsLabel: 'console.anthropic.com',
    note: '従量課金（1回 約$0.001）',
  },
} as const;

const SUGGESTED = [
  'Hooksの設定方法を教えて',
  'MCPサーバーを追加するには？',
  'CLAUDE.mdに何を書けばいい？',
  'コストを抑えるには？',
  '/compact はどんな時に使う？',
];

function SetupScreen({ onSave, onBack, onDeleteKey }: {
  onSave: (provider: Provider, key: string, persist: boolean) => void;
  onBack?: () => void;
  onDeleteKey?: () => void;
}) {
  const [provider, setProvider] = useState<Provider>('groq');
  const [key, setKey] = useState('');
  const [error, setError] = useState('');
  const [persist, setPersist] = useState(true);
  const info = PROVIDER_INFO[provider];

  const handleSave = () => {
    const trimmed = key.trim();
    if (!trimmed.startsWith(info.keyPrefix)) { setError(info.keyHint); return; }
    onSave(provider, trimmed, persist);
  };

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: '32px 16px' }}>
      {onBack && (
        <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer', marginBottom: 24, padding: 0 }}>
          ← チャットに戻る
        </button>
      )}
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>✦</div>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--accent)', margin: '0 0 6px' }}>AIチューターの設定</h1>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0 }}>使用するAIを選んで、APIキーを入力してください</p>
      </div>

      {/* Provider 選択 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
        {(['groq', 'gemini', 'claude'] as Provider[]).map(p => {
          const inf = PROVIDER_INFO[p];
          const active = provider === p;
          return (
            <button key={p} onClick={() => { setProvider(p); setKey(''); setError(''); }} style={{
              borderRadius: 12, padding: '12px 16px', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
              background: active ? `${inf.color}18` : 'var(--bg-surface)',
              border: `2px solid ${active ? inf.color : 'var(--border)'}`,
              transition: 'all 0.15s',
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                  <span style={{ fontWeight: 700, fontSize: 14, color: active ? inf.color : 'var(--text-secondary)' }}>{inf.name}</span>
                  <span style={{ fontSize: 11, padding: '1px 8px', borderRadius: 10, fontWeight: 700, background: `${inf.badgeColor}20`, color: inf.badgeColor }}>{inf.badge}</span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{inf.note}</div>
              </div>
              {active && <span style={{ color: inf.color, fontSize: 18 }}>✓</span>}
            </button>
          );
        })}
      </div>

      {/* キー入力 */}
      <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 20, marginBottom: 16 }}>
        <div style={{ fontSize: 12, marginBottom: 12 }}>
          <div style={{ fontWeight: 700, letterSpacing: '0.08em', color: info.color, marginBottom: 4 }}>APIキーの取得方法</div>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
            <a href={info.docsUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>{info.docsLabel}</a>
            {' '}でAPIキーを発行して、下に貼り付けてください
          </p>
        </div>
        <input type="password" value={key} onChange={e => { setKey(e.target.value); setError(''); }}
          placeholder={info.placeholder}
          style={{ width: '100%', padding: '10px 14px', borderRadius: 10, fontSize: 13, fontFamily: 'var(--font-mono)', background: '#060c15', border: `1px solid ${error ? 'var(--red)' : 'var(--border)'}`, color: 'var(--text-primary)', outline: 'none', marginBottom: 8 }} />
        {error && <p style={{ fontSize: 12, color: 'var(--red)', margin: '0 0 8px' }}>{error}</p>}

        <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', marginBottom: 12, fontSize: 13, color: 'var(--text-secondary)' }}>
          <input type="checkbox" checked={persist} onChange={e => setPersist(e.target.checked)} />
          このデバイスに保存する（次回から入力不要）
        </label>
        {persist && (
          <div style={{ fontSize: 12, padding: '8px 12px', borderRadius: 8, background: 'rgba(210,153,34,0.06)', border: '1px solid rgba(210,153,34,0.2)', color: '#92826a', marginBottom: 12 }}>
            ※ 複数人で共有しているデバイスでは、APIキーの保存はお控えください。
            {(provider === 'gemini' || provider === 'claude') && '有料プランのキーが不正利用された場合、意図しない費用が発生する恐れがあります。'}
          </div>
        )}

        <button onClick={handleSave} disabled={!key.trim()} className="btn-primary" style={{
          width: '100%', padding: '12px', fontSize: 14,
          background: key.trim() ? 'linear-gradient(135deg, #1a3a6b, #0d2a52)' : 'rgba(255,255,255,0.04)',
          border: `1px solid ${key.trim() ? 'var(--accent)' : 'var(--border)'}`,
          color: key.trim() ? 'var(--accent)' : 'var(--text-muted)',
        }}>
          {persist ? '保存してチャットを始める →' : 'チャットを始める →'}
        </button>
      </div>

      {onDeleteKey && (
        <button onClick={() => { if (confirm('保存済みのAPIキーを削除しますか？')) onDeleteKey(); }} style={{
          width: '100%', padding: '10px', borderRadius: 10, fontSize: 12, cursor: 'pointer',
          background: 'rgba(248,81,73,0.06)', border: '1px solid rgba(248,81,73,0.2)', color: 'var(--red)',
        }}>
          保存済みAPIキーを削除
        </button>
      )}
      <p style={{ fontSize: 11, textAlign: 'center', color: 'var(--text-muted)', marginTop: 12 }}>
        {persist ? 'キーはこのデバイスのブラウザにのみ保存されます' : 'キーは今回のみ使用されます（保存されません）'}
      </p>
    </div>
  );
}

export default function AITutorPage() {
  const [provider, setProvider] = useState<Provider | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [showSetup, setShowSetup] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedProvider = localStorage.getItem(STORAGE_PROVIDER) as Provider | null;
    if (storedProvider) {
      const storageKey = storedProvider === 'groq' ? STORAGE_GROQ_KEY : storedProvider === 'gemini' ? STORAGE_GEMINI_KEY : STORAGE_CLAUDE_KEY;
      const storedKey = localStorage.getItem(storageKey);
      if (storedKey) { setProvider(storedProvider); setApiKey(storedKey); }
    }
    const saved = localStorage.getItem(STORAGE_MESSAGES);
    if (saved) {
      try { const parsed = JSON.parse(saved); setMessages(parsed.length > 0 ? parsed : [GREETING]); }
      catch { setMessages([GREETING]); }
    } else { setMessages([GREETING]); }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(STORAGE_MESSAGES, JSON.stringify(messages.slice(-MAX_STORED_MESSAGES)));
  }, [messages, loaded]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const handleSaved = (p: Provider, key: string, persist: boolean) => {
    if (persist) {
      const storageKey = p === 'groq' ? STORAGE_GROQ_KEY : p === 'gemini' ? STORAGE_GEMINI_KEY : STORAGE_CLAUDE_KEY;
      localStorage.setItem(storageKey, key);
      localStorage.setItem(STORAGE_PROVIDER, p);
    }
    setProvider(p); setApiKey(key); setShowSetup(false);
  };

  const removeKey = () => {
    [STORAGE_PROVIDER, STORAGE_GROQ_KEY, STORAGE_GEMINI_KEY, STORAGE_CLAUDE_KEY].forEach(k => localStorage.removeItem(k));
    setProvider(null); setApiKey(null);
  };

  const clearHistory = () => { localStorage.removeItem(STORAGE_MESSAGES); setMessages([GREETING]); };

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading || !apiKey || !provider) return;
    const userMsg: Message = { role: 'user', content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000);
    try {
      const res = await fetch('/api/ai-tutor', {
        method: 'POST', signal: controller.signal,
        headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
        body: JSON.stringify({ messages: newMessages, provider }),
      });
      clearTimeout(timeout);
      if (res.status === 401) {
        setMessages(prev => [...prev, { role: 'assistant', content: '⚠️ APIキーが無効です。「設定」からキーを再入力してください。' }]);
        removeKey(); return;
      }
      const data = await res.json();
      if (!res.ok) { setMessages(prev => [...prev, { role: 'assistant', content: `エラー: ${data.detail ?? data.error ?? 'サーバーエラー'}` }]); return; }
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      clearTimeout(timeout);
      const isTimeout = err instanceof Error && err.name === 'AbortError';
      setMessages(prev => [...prev, { role: 'assistant', content: isTimeout ? '⏱ 応答がタイムアウトしました。もう一度お試しください。' : 'エラーが発生しました。もう一度お試しください。' }]);
    } finally { setLoading(false); }
  };

  if (!loaded) return null;

  if (!apiKey || !provider || showSetup) return (
    <>
      <Navigation />
      <SetupScreen
        onSave={handleSaved}
        onBack={apiKey && provider ? () => setShowSetup(false) : undefined}
        onDeleteKey={apiKey && provider ? () => { removeKey(); setShowSetup(false); } : undefined}
      />
    </>
  );

  const info = PROVIDER_INFO[provider];

  return (
    <>
      <Navigation />
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 16px', height: 'calc(100dvh - 52px)', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 0 10px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--accent)' }}>✦ AIチューター</span>
            <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 10, fontWeight: 700, background: `${info.color}18`, color: info.color, border: `1px solid ${info.color}40` }}>{info.name}</span>
          </div>
          <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
            {messages.length > 1 && (
              <button onClick={() => { if (confirm('会話履歴を削除しますか？')) clearHistory(); }} style={{ fontSize: 11, padding: '5px 10px', borderRadius: 8, background: 'rgba(30,58,95,0.4)', border: '1px solid var(--border)', color: 'var(--text-muted)', cursor: 'pointer' }}>
                履歴削除
              </button>
            )}
            <button onClick={() => setShowSetup(true)} style={{ fontSize: 11, padding: '5px 10px', borderRadius: 8, background: 'rgba(30,58,95,0.4)', border: '1px solid var(--border)', color: 'var(--text-secondary)', cursor: 'pointer' }}>
              設定
            </button>
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 0', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '85%', padding: '12px 16px', borderRadius: 16, fontSize: 14, lineHeight: 1.7, whiteSpace: 'pre-wrap',
                ...(msg.role === 'user'
                  ? { background: 'rgba(59,130,246,0.75)', color: '#fff', borderBottomRightRadius: 4 }
                  : { background: 'var(--bg-surface)', color: 'var(--text-primary)', border: '1px solid var(--border)', borderBottomLeftRadius: 4 }
                ),
              }}>
                {msg.role === 'assistant' && (
                  <div style={{ fontSize: 11, fontWeight: 700, color: info.color, marginBottom: 6 }}>✦ AIチューター ({info.name})</div>
                )}
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: 'flex' }}>
              <div style={{ padding: '12px 16px', borderRadius: 16, background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', gap: 4 }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--text-muted)', animation: `bounce 1s ${i * 0.15}s infinite` }} />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggested */}
        {messages.length <= 1 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
            {SUGGESTED.map(q => (
              <button key={q} onClick={() => sendMessage(q)} style={{ fontSize: 12, padding: '5px 12px', borderRadius: 16, background: 'rgba(30,58,95,0.4)', border: '1px solid var(--border)', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div style={{ display: 'flex', gap: 8, paddingBottom: 16 }}>
          <input type="text" value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
            placeholder="質問を入力してください..."
            style={{ flex: 1, padding: '11px 14px', borderRadius: 10, fontSize: 14, background: 'var(--bg-surface)', border: '1px solid var(--border)', color: 'var(--text-primary)', outline: 'none' }} />
          <button onClick={() => sendMessage(input)} disabled={!input.trim() || loading} className="btn-primary"
            style={{ padding: '0 20px', fontSize: 14 }}>
            送信
          </button>
        </div>
      </div>
      <style>{`@keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }`}</style>
    </>
  );
}
