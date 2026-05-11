@AGENTS.md

# Claude Learning — プロジェクト引き継ぎ資料

## プロジェクト概要
Claude Code / Anthropic APIを学ぶWebアプリ。Next.js製。Vercel上で本番運用。

- **GitHubリポジトリ**: x7bsk7x-hash/claude-learning
- **対象ユーザー**: IT従事者・エンジニア（初心者〜上級者）
- **言語**: 日本語のみ

## 技術スタック
- **フレームワーク**: Next.js 16 (App Router, Turbopack)
- **言語**: TypeScript
- **スタイリング**: インラインstyle（Tailwind CSS未使用）+ globals.css CSS変数
- **データ永続化**: ブラウザのlocalStorage（サーバーDB・認証なし）
- **デプロイ**: Vercel（GitHubのmainブランチへのpushで自動デプロイ）

## デプロイ手順（必ず守ること）
コード変更後は**必ずVercelへの反映（git push）まで行う**。

```bash
cd C:\Users\shunj\claude-learning
git add <変更ファイル>
git commit -m "説明"
git push origin main
```

## ファイル構成
```
src/
├── app/
│   ├── layout.tsx          # ルートレイアウト（Inter font定義）
│   ├── globals.css         # CSS変数・グローバルCSS
│   ├── page.tsx            # ホーム画面
│   ├── diagnostic/
│   │   └── page.tsx        # 診断テスト（35問）
│   ├── courses/
│   │   ├── page.tsx        # コース一覧（Part filter付き）
│   │   └── [id]/page.tsx   # コース詳細（チャプター表示）
│   ├── practice/
│   │   └── [courseId]/page.tsx  # 演習問題（MCQ+記述）
│   ├── reference/
│   │   └── page.tsx        # スラッシュコマンド・ショートカット一覧
│   ├── ai-tutor/
│   │   └── page.tsx        # AIチューターチャット
│   └── api/
│       ├── ai-tutor/route.ts        # Claude API呼び出し
│       └── evaluate-prompt/route.ts # プロンプト評価API
├── components/
│   ├── Navigation.tsx      # ナビゲーション
│   ├── LevelBadge.tsx      # 初級/中級/上級バッジ
│   ├── ProgressRing.tsx    # 円形進捗インジケーター
│   └── ChapterRenderer.tsx # チャプターコンテンツ描画
├── data/
│   ├── courses.ts          # 19コース・6パートの学習コンテンツ
│   ├── diagnostic-questions.ts  # 診断問題（35問）
│   ├── practice-questions.ts    # 演習問題（MCQ+記述）
│   └── reference-data.ts   # コマンド・ショートカット・ツール一覧
└── lib/
    ├── types.ts            # TypeScript型定義
    ├── storage.ts          # localStorage操作
    └── scoring.ts          # スコア計算・レベル判定
```

## デザインシステム（globals.css CSS変数）
| 変数 | 値 | 用途 |
|------|-----|------|
| `--bg-base` | `#0d1117` | ページ背景 |
| `--bg-surface` | `#161b22` | カード・パネル背景 |
| `--bg-card` | `#1c2128` | 内側カード |
| `--border` | `#30363d` | 通常のボーダー |
| `--accent` | `#58a6ff` | プライマリアクセント |
| `--green` | `#3fb950` | 成功・完了 |
| `--red` | `#f85149` | エラー・警告 |
| `--text-primary` | `#e6edf3` | メインテキスト |
| `--text-secondary` | `#8b949e` | サブテキスト |

## カリキュラム構成（6パート・19コース）
- Part 1: AIとClaudeの基礎（3コース）
- Part 2: 開発環境の構築（3コース）
- Part 3: Claude Code入門（3コース）
- Part 4: Claude Code周辺機能（4コース）
- Part 5: 実践的な開発（3コース）
- Part 6: チーム・組織での活用（3コース）

## 学習フロー
1. 診断テスト（35問）→ レベル判定（初級/中級/上級）
2. おすすめコースが自動選定される
3. コース学習（チャプター→完了→ポイント）
4. 演習問題（MCQ + プロンプト記述・AI採点）
5. AIチューターで質問

## スコアリング
- 診断: ≥75% → 上級、≥45% → 中級、それ未満 → 初級
- チャプター完了: +10pt
- コース完了: +100pt
- 演習完了: スコア×30pt
- 診断完了: +50pt

## APIルート
- `POST /api/ai-tutor` — Claude Haiku 3.5でチャット（ユーザー提供APIキー使用）
- `POST /api/evaluate-prompt` — プロンプト演習を採点（APIキーなしでもフォールバック評価）

## 開発サーバー
```bash
cd C:\Users\shunj\claude-learning
npm run dev
# http://localhost:3000 で確認
```
