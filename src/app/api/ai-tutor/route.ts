import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { messages, apiKey } = await req.json();

    const key = apiKey || process.env.ANTHROPIC_API_KEY;
    if (!key) {
      return NextResponse.json({ error: 'APIキーが設定されていません' }, { status: 401 });
    }

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        system: 'あなたはClaude CodeとAIエンジニアリングの専門家チューターです。日本語で回答してください。簡潔かつ実践的な回答を心がけ、コード例は適宜Markdownのコードブロックで示してください。',
        messages: messages.map((m: { role: string; content: string }) => ({ role: m.role, content: m.content })),
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      return NextResponse.json({ error: err.error?.message ?? 'APIエラー' }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json({ content: data.content[0].text });
  } catch (e) {
    return NextResponse.json({ error: 'サーバーエラー' }, { status: 500 });
  }
}
