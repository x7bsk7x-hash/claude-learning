import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const SYSTEM_PROMPT = `あなたはClaude CodeとAIエンジニアリングの専門チューターです。日本語で親切かつ実践的に回答してください。
指針:
- Claude Code・Anthropic API・AI開発に関する正確な情報を提供する
- 初心者にも分かりやすい言葉で、具体的なコード例を交えて説明する
- 「/コマンド名」「CLAUDE.md」「Hooks」などの固有名詞は正確に記述する
- 回答は簡潔に（目安300字以内）、必要に応じてコードブロックを使用する`;

type MsgIn = { role: string; content: string };

export async function POST(req: NextRequest) {
  const apiKey = req.headers.get('x-api-key');
  if (!apiKey) return NextResponse.json({ error: 'API_KEY_NOT_SET' }, { status: 503 });

  const { messages, provider } = await req.json();

  // ── Groq ─────────────────────────────────────────────────────────
  if (provider === 'groq') {
    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...messages.filter((m: MsgIn) => m.role === 'user' || m.role === 'assistant')
              .map((m: MsgIn) => ({ role: m.role, content: m.content })),
          ],
          max_tokens: 1024,
        }),
      });
      if (!res.ok) {
        const err = await res.text();
        if (res.status === 401 || res.status === 403) return NextResponse.json({ error: 'INVALID_API_KEY' }, { status: 401 });
        return NextResponse.json({ error: 'API_ERROR', detail: `Groq ${res.status}: ${err}` }, { status: 500 });
      }
      const data = await res.json();
      return NextResponse.json({ reply: data.choices?.[0]?.message?.content ?? '返答を取得できませんでした。' });
    } catch { return NextResponse.json({ error: 'API_ERROR' }, { status: 500 }); }
  }

  // ── Gemini ───────────────────────────────────────────────────────
  if (provider === 'gemini') {
    const allContents = messages.map((m: MsgIn) => ({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: m.content }] }));
    const firstUserIdx = allContents.findIndex((m: { role: string }) => m.role === 'user');
    const contents = firstUserIdx >= 0 ? allContents.slice(firstUserIdx) : allContents;
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ system_instruction: { parts: [{ text: SYSTEM_PROMPT }] }, contents, generationConfig: { maxOutputTokens: 1024 } }),
        }
      );
      if (!res.ok) {
        const err = await res.text();
        if (res.status === 401 || res.status === 403) return NextResponse.json({ error: 'INVALID_API_KEY' }, { status: 401 });
        return NextResponse.json({ error: 'API_ERROR', detail: `Gemini ${res.status}: ${err}` }, { status: 500 });
      }
      const data = await res.json();
      return NextResponse.json({ reply: data.candidates?.[0]?.content?.parts?.[0]?.text ?? '返答を取得できませんでした。' });
    } catch { return NextResponse.json({ error: 'API_ERROR' }, { status: 500 }); }
  }

  // ── Claude ───────────────────────────────────────────────────────
  try {
    const client = new Anthropic({ apiKey });
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages.map((m: MsgIn) => ({ role: m.role as 'user' | 'assistant', content: m.content })),
    });
    const text = response.content[0].type === 'text' ? response.content[0].text : '';
    return NextResponse.json({ reply: text });
  } catch (err: unknown) {
    const status = (err as { status?: number }).status;
    if (status === 401 || status === 403) return NextResponse.json({ error: 'INVALID_API_KEY' }, { status: 401 });
    return NextResponse.json({ error: 'API_ERROR' }, { status: 500 });
  }
}
