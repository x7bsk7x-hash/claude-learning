import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { userPrompt, question, apiKey } = await req.json();
    const key = apiKey || process.env.ANTHROPIC_API_KEY;

    if (!key) {
      // Fallback scoring without API
      const criteria = question.evaluationCriteria as string[];
      const met = criteria.filter((_: string, i: number) => userPrompt.length > 30 * (i + 1)).length;
      const score = met / criteria.length;
      return NextResponse.json({
        score,
        feedback: score >= 0.7 ? 'よく書けています！具体的で実践的なプロンプトです。' : '具体性を高めましょう。ファイル名・制約条件・期待する出力形式を追加してみてください。',
        criteria: criteria.map((c: string) => ({ name: c, passed: userPrompt.includes(c.slice(0, 8)), comment: '' })),
      });
    }

    const evalPrompt = `以下のプロンプト演習問題について、ユーザーの回答を評価してください。

## 問題
${question.question}

## 評価基準
${(question.evaluationCriteria as string[]).map((c: string, i: number) => `${i + 1}. ${c}`).join('\n')}

## ユーザーの回答
${userPrompt}

以下のJSON形式で評価してください:
{
  "score": 0〜1の数値（評価基準を何割満たしているか）,
  "feedback": "改善点を含む日本語でのフィードバック（2〜3文）",
  "criteria": [
    { "name": "評価基準1", "passed": true/false, "comment": "簡単なコメント" },
    ...
  ]
}

JSONのみを返してください。`;

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 800,
        messages: [{ role: 'user', content: evalPrompt }],
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'API呼び出し失敗' }, { status: 500 });
    }

    const data = await res.json();
    const text = data.content[0].text;
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return NextResponse.json(JSON.parse(jsonMatch[0]));
    }
    return NextResponse.json({ error: 'Parse error' }, { status: 500 });
  } catch {
    return NextResponse.json({ error: 'サーバーエラー' }, { status: 500 });
  }
}
