import type { Course } from '@/lib/types';

export const courses: Course[] = [
  // ─── Part 1: AIとClaudeの基礎 ───────────────────────────────────────────
  {
    id: 'p1-c1',
    part: 1,
    partLabel: 'AIとClaudeの基礎',
    title: '大規模言語モデル（LLM）とは',
    description: 'ChatGPTやClaudeを動かす技術の仕組みを理解する',
    icon: '🧠',
    difficulty: 'beginner',
    estimatedMinutes: 20,
    tags: ['LLM', 'AI基礎', 'トランスフォーマー'],
    chapters: [
      {
        id: 'ch1',
        title: 'トランスフォーマーとニューラルネットワーク',
        content: [
          { type: 'flow' as const, title: 'LLM処理の流れ', nodes: [
            { label: 'テキスト入力', desc: 'ユーザーのプロンプト', color: 'accent' },
            { label: 'トークン化', desc: '単語→トークンに分割', color: 'accent' },
            { label: 'Transformer', desc: 'アテンション計算', color: 'accent' },
            { label: '次トークン予測', desc: '確率分布から選択', color: 'accent' },
            { label: '出力テキスト', desc: '生成完了', color: 'green' },
          ]},
          { type: 'text', content: '大規模言語モデル（LLM: Large Language Model）は、大量のテキストデータから「次に来る単語を予測する」ことを学習したAIです。ChatGPT・Claude・Geminiなど、現代の主要なAIはすべてこのアーキテクチャをベースにしています。' },
          { type: 'highlight', content: 'LLMは「次のトークンを予測する機械」です。その副産物として、推論・翻訳・コード生成など驚くほど多様な能力が生まれます。', label: '核心概念' },
          { type: 'text', content: '2017年にGoogleが発表した論文「Attention is All You Need」で提案されたトランスフォーマー（Transformer）アーキテクチャが、現代のLLMの基礎です。アテンション機構により、文章内の離れた単語同士の関係を効率的に学習できます。' },
          { type: 'text', content: 'モデルは膨大な数のパラメータ（Claudeの場合は非公開ですが、GPT-4は推定1.8兆個）を持ち、学習によってこれらの数値が調整されます。推論時は入力テキストを受け取り、各パラメータを使って出力を生成します。' },
        ],
      },
      {
        id: 'ch2',
        title: 'トークンとコンテキストウィンドウ',
        content: [
          { type: 'text', content: 'LLMはテキストを「トークン」という単位で処理します。英語では概ね1単語=1〜2トークン、日本語では1文字=1〜2トークン程度です。' },
          { type: 'table', headers: ['モデル', 'コンテキストウィンドウ', '用途'], rows: [
            ['Claude Haiku 3.5', '200K トークン', '高速・低コスト'],
            ['Claude Sonnet 4', '200K トークン', 'バランス型（推奨）'],
            ['Claude Opus 4', '200K トークン', '最高精度'],
          ]},
          { type: 'text', content: 'コンテキストウィンドウとは、モデルが一度に「記憶」できる最大トークン数です。200Kトークンは約15万単語に相当し、長い小説1冊分のテキストを一度に処理できます。' },
          { type: 'tip', content: 'コンテキストが長くなると処理コストも増えます。Claude Codeでは /compact コマンドで会話を圧縮してコンテキストを節約できます。' },
        ],
      },
      {
        id: 'ch3',
        title: 'LLMの能力と限界',
        content: [
          { type: 'text', content: 'LLMは強力ですが、いくつかの重要な限界があります。これを理解することで、AIを適切に活用できます。' },
          { type: 'comparison',
            left: { label: '得意なこと', content: '・コード生成・説明・デバッグ\n・文章の要約・翻訳・校正\n・パターン認識と類推\n・既存情報の整理と構造化\n・多様な形式でのアウトプット' },
            right: { label: '苦手なこと', content: '・最新情報（学習カットオフ以降）\n・正確な数値計算（近似値を出す傾向）\n・事実の確認（ハルシネーション）\n・長期的な記憶の保持\n・真の「理解」や創造' }
          },
          { type: 'warning', content: 'LLMは自信を持って間違った情報（ハルシネーション）を出力することがあります。重要な情報は必ず一次ソースで確認してください。' },
          { type: 'text', content: 'Claude Codeのようなコーディングエージェントは、ツール（ファイル読み書き・コマンド実行）を使って現実の状態を確認できるため、単純なチャットよりも信頼性が高くなります。' },
        ],
      },
    ],
  },
  {
    id: 'p1-c2',
    part: 1,
    partLabel: 'AIとClaudeの基礎',
    title: 'Claudeの特徴と設計思想',
    description: 'Anthropicが設計したClaudeのユニークな特徴と安全性への取り組み',
    icon: '⚡',
    difficulty: 'beginner',
    estimatedMinutes: 15,
    tags: ['Claude', 'Constitutional AI', 'Anthropic'],
    chapters: [
      {
        id: 'ch1',
        title: 'Constitutional AIと安全性',
        content: [
          { type: 'flow' as const, title: 'Claudeの設計思想', nodes: [
            { label: 'ユーザーの要求', desc: '入力プロンプト', color: 'accent' },
            { label: 'Constitutional AI', desc: '倫理ルールで評価', color: 'accent' },
            { label: 'セーフティチェック', desc: '有害性・リスク判断', color: 'amber' },
            { label: '有益な回答', desc: '役立つ・正直・無害', color: 'green' },
          ]},
          { type: 'text', content: 'AnthropicはClaudeを「役立つ・無害・正直」（Helpful, Harmless, Honest）を核に設計しています。Constitutional AI（CAI）という手法により、倫理的なルールのセットをもとにモデルを訓練します。' },
          { type: 'highlight', content: 'Claudeは単純に「ユーザーの言うことを聞く」のではなく、より広い倫理的文脈を考慮して応答します。これがClaude独自の特徴です。', label: '設計原則' },
          { type: 'text', content: 'Claude 3以降のモデルはAnthropic Safety Levelで評価され、危険な能力（生物兵器、サイバー攻撃など）の開発を支援しないよう設計されています。同時に、正当な研究やビジネス用途では積極的に協力します。' },
        ],
      },
      {
        id: 'ch2',
        title: 'Claudeのモデルファミリー',
        content: [
          { type: 'text', content: '2025年現在のClaude 4系モデルは用途に応じて選択できます。' },
          { type: 'table', headers: ['モデルID', '特徴', '推奨用途'], rows: [
            ['claude-haiku-4-5', '最高速・最低コスト', 'バッチ処理・分類・要約'],
            ['claude-sonnet-4-6', 'バランス型（Claude Code標準）', '汎用コーディング・分析'],
            ['claude-opus-4-7', '最高性能・思考モデル', '複雑な推論・設計判断'],
          ]},
          { type: 'tip', content: 'Claude Codeでモデルを切り替えるには /model コマンドを使います。日常のコーディングにはSonnetが推奨です。' },
        ],
      },
      {
        id: 'ch3',
        title: 'APIとClaude Codeの位置づけ',
        content: [
          { type: 'text', content: 'ClaudeへのアクセスにはいくつかのI/Fがあります。' },
          { type: 'steps', steps: [
            { title: 'claude.ai（Web）', content: 'ブラウザで使うチャット形式。コーディングには制限がある。無料プランあり。' },
            { title: 'Anthropic API', content: 'REST APIで自分のアプリに組み込む。従量課金。curl・Python・Node.jsなどから呼び出す。' },
            { title: 'Claude Code（CLI）', content: 'ターミナルで動くAIエージェント。ファイルシステムに直接アクセスし、コードを実際に実行・変更できる。開発者向け。' },
          ]},
          { type: 'text', content: 'このコースで学ぶ「Claude Code」は3番目のCLI形式です。単なるチャットと違い、実際のプロジェクトを自律的に操作できる点が最大の特徴です。' },
        ],
      },
    ],
  },
  {
    id: 'p1-c3',
    part: 1,
    partLabel: 'AIとClaudeの基礎',
    title: 'プロンプト設計の基礎',
    description: 'AIから最良の結果を引き出すプロンプトエンジニアリングの基本原則',
    icon: '✍️',
    difficulty: 'beginner',
    estimatedMinutes: 25,
    tags: ['プロンプト', 'Few-shot', 'Chain-of-Thought'],
    chapters: [
      {
        id: 'ch1',
        title: '良いプロンプトの構造',
        content: [
          { type: 'flow' as const, title: '良いプロンプトの構造', nodes: [
            { label: '役割（Role）', desc: '専門家として振る舞う', color: 'accent' },
            { label: '文脈（Context）', desc: '前提条件を説明', color: 'accent' },
            { label: 'タスク（Task）', desc: '具体的な指示内容', color: 'accent' },
            { label: '形式（Format）', desc: 'JSON・箇条書き等', color: 'accent' },
            { label: '期待する出力', desc: '精度の高い回答', color: 'green' },
          ]},
          { type: 'text', content: 'プロンプトの質が出力の質を決定します。以下の要素を意識するだけで、AIの回答は大幅に改善します。' },
          { type: 'steps', steps: [
            { title: '役割（Role）', content: 'AIにどの専門家として振る舞ってほしいかを明示する。「シニアのRustエンジニアとして」など。' },
            { title: '文脈（Context）', content: 'プロジェクトの目的・制約・前提条件を説明する。AIは知らないことは推測するしかない。' },
            { title: 'タスク（Task）', content: '何をしてほしいかを具体的に指示する。「改善してください」より「型安全性を高め、エラーハンドリングを追加してください」が良い。' },
            { title: '形式（Format）', content: '出力形式を指定する。「JSONで」「箇条書きで」「コメント付きコードで」など。' },
          ]},
          { type: 'example', content: '悪い例: 「このコードを直して」\n\n良い例: 「TypeScriptのシニアエンジニアとして、以下のコードのバグを修正してください。このコードはユーザー認証APIで、JWTトークンを検証します。現在の問題はトークン期限切れ時に適切なエラーを返さないことです。修正後のコードと、変更点の説明を日本語で提供してください。」' },
        ],
      },
      {
        id: 'ch2',
        title: 'Few-shotとChain-of-Thought',
        content: [
          { type: 'text', content: '高度なプロンプト技法として、Few-shot（例示）とChain-of-Thought（思考の連鎖）があります。' },
          { type: 'highlight', content: 'Few-shot: 入力と期待出力の例を数個見せることで、AIがパターンを学習する技法', label: 'Few-shot' },
          { type: 'code', language: 'text', content: '以下の形式でコードレビューコメントを生成してください。\n\n例1:\n入力: `const x = null; x.toString();`\n出力: 🔴 CRITICAL: nullポインタ参照。`x?.toString() ?? ""` に変更してください。\n\n例2:\n入力: `var data = fetch(url);`\n出力: 🟡 WARNING: awaitが抜けています。`const data = await fetch(url);` に変更してください。\n\nでは以下のコードをレビューしてください:\n`const user = getUser(id); return user.name;`', description: 'Few-shotプロンプトの例' },
          { type: 'highlight', content: 'Chain-of-Thought: 「ステップバイステップで考えて」と指示することで、推論精度が向上する技法。複雑な問題に有効。', label: 'CoT' },
          { type: 'tip', content: 'Claude Codeでは /ultrathink コマンドを使うと、Claude Opus 4による高度な思考モードが有効になります。複雑な設計判断に使えます。' },
        ],
      },
      {
        id: 'ch3',
        title: 'Claude Code特有のプロンプト技法',
        content: [
          { type: 'text', content: 'Claude Codeはチャットと異なり、コードベース全体を把握した上で作業します。そのため、プロンプトの書き方も少し変わります。' },
          { type: 'steps', steps: [
            { title: '具体的なファイルを指定する', content: '「src/auth/middleware.ts を修正して」のように、対象ファイルを明示する。' },
            { title: '制約条件を事前に伝える', content: '「既存テストを壊さないで」「後方互換性を保って」など、守るべき条件を最初に伝える。' },
            { title: '段階的に進める', content: '大きな変更は「まず設計を提案して、確認後に実装する」と伝えて確認を挟む。' },
            { title: 'CLAUDE.mdを活用する', content: 'プロジェクト固有のルール・コンテキストをCLAUDE.mdに書いておくと、毎回説明しなくてよい。' },
          ]},
          { type: 'warning', content: 'Claude Codeは指示を文字通りに実行します。「全部削除して」のような指示は慎重に。git管理下で作業することで、誤った変更をロールバックできます。' },
        ],
      },
    ],
  },

  // ─── Part 2: 開発環境の構築 ─────────────────────────────────────────────
  {
    id: 'p2-c1',
    part: 2,
    partLabel: '開発環境の構築',
    title: '必要なツールのインストール',
    description: 'Claude Code開発に必要なNode.js・git・ターミナルのセットアップ',
    icon: '🛠️',
    difficulty: 'beginner',
    estimatedMinutes: 30,
    tags: ['Node.js', 'npm', 'git', 'セットアップ'],
    chapters: [
      {
        id: 'ch1',
        title: 'Node.jsとnpmのインストール',
        content: [
          { type: 'flow' as const, title: 'セットアップの手順', nodes: [
            { label: 'Node.js', desc: 'v22以上をインストール', color: 'accent' },
            { label: 'npm install', desc: 'claude-codeをインストール', color: 'accent' },
            { label: 'バージョン確認', desc: 'node / npm バージョン', color: 'accent' },
            { label: '開発準備完了', desc: 'claude コマンド利用可', color: 'green' },
          ]},
          { type: 'text', content: 'Claude CodeはNode.js上で動作するCLIツールです。まずNode.jsをインストールします。バージョン管理ツール（nvm / fnm）を使うと複数バージョンの管理が容易です。' },
          { type: 'steps', steps: [
            { title: 'macOS / Linux（fnm推奨）', content: 'curl -fsSL https://fnm.vercel.app/install | bash\nfnm install --lts\nfnm use lts-latest' },
            { title: 'Windows（公式インストーラー）', content: 'https://nodejs.org/ からLTS版をダウンロードしてインストール。' },
            { title: 'バージョン確認', content: 'node --version  # v22.x.x 以上を推奨\nnpm --version   # 10.x.x 以上' },
          ]},
          { type: 'code', language: 'bash', content: '# インストール確認\nnode --version\nnpm --version', description: 'インストール確認コマンド' },
          { type: 'tip', content: 'Node.js v22（LTS）以上を推奨します。古いバージョンではClaude Codeが正常に動作しない場合があります。' },
        ],
      },
      {
        id: 'ch2',
        title: 'gitのセットアップ',
        content: [
          { type: 'text', content: 'Claude Codeとgitを組み合わせることで、AIが行った変更を追跡・ロールバックできます。gitは必須ツールです。' },
          { type: 'code', language: 'bash', content: '# gitのインストール確認\ngit --version\n\n# ユーザー設定（未設定の場合）\ngit config --global user.name "Your Name"\ngit config --global user.email "you@example.com"\n\n# 文字化け防止（日本語環境）\ngit config --global core.quotepath false', description: 'git初期設定' },
          { type: 'tip', content: 'Claude Codeが変更を加えた後、git diffで確認 → git addで承認 → git commitで確定、という流れが安全です。Claude CodeはCLAUDE.mdに「コミットは確認後に」と書いておくと自動コミットを防げます。' },
        ],
      },
      {
        id: 'ch3',
        title: 'ターミナルの設定',
        content: [
          { type: 'text', content: 'Claude Codeはターミナルで動作します。快適な開発環境のために、以下の設定をお勧めします。' },
          { type: 'steps', steps: [
            { title: 'macOS: iTerm2 + Oh My Zsh', content: 'iTerm2（https://iterm2.com/）をインストール後、Oh My ZshとPowerline10kテーマで強力なターミナルに。' },
            { title: 'Windows: Windows Terminal', content: 'Microsoft Storeから「Windows Terminal」をインストール。PowerShellまたはWSL2（Ubuntu）との組み合わせが最適。' },
            { title: 'VSCode内蔵ターミナル', content: 'Ctrl+` でターミナルを開き、Claude Codeをエディタと並べて使えます。' },
          ]},
          { type: 'highlight', content: 'Claude Codeはターミナル上でインタラクティブに動作します。コマンド実行・ファイル操作・git操作を自動的に行います。', label: 'ポイント' },
        ],
      },
    ],
  },
  {
    id: 'p2-c2',
    part: 2,
    partLabel: '開発環境の構築',
    title: 'Claude Code CLIのセットアップ',
    description: 'Claude Codeのインストール・ログイン・初期設定を行う',
    icon: '⚙️',
    difficulty: 'beginner',
    estimatedMinutes: 20,
    tags: ['インストール', 'CLI', 'ログイン'],
    chapters: [
      {
        id: 'ch1',
        title: 'インストールとログイン',
        content: [
          { type: 'flow' as const, title: 'Claude Code CLIセットアップ', nodes: [
            { label: 'npm install', desc: 'グローバルインストール', color: 'accent' },
            { label: 'claude login', desc: 'Anthropicアカウント認証', color: 'accent' },
            { label: '/init', desc: 'プロジェクト分析', color: 'accent' },
            { label: 'CLAUDE.md', desc: '設定ファイル生成', color: 'accent' },
            { label: 'コーディング開始', desc: 'AI支援で開発スタート', color: 'green' },
          ]},
          { type: 'text', content: 'Claude CodeはnpmパッケージとしてインストールできるCLIツールです。グローバルインストールで、どのディレクトリからでも使えます。' },
          { type: 'code', language: 'bash', content: '# グローバルインストール\nnpm install -g @anthropic-ai/claude-code\n\n# バージョン確認\nclaude --version\n\n# ログイン（初回のみ）\nclaude\n# ブラウザが開き、Anthropicアカウントでログイン', description: 'インストールとログイン' },
          { type: 'text', content: 'ログインにはAnthropicアカウントが必要です。claude.aiのアカウントがあればそのまま使えます。Claude Proサブスクリプション（$20/月）またはAPI課金のどちらかが必要です。' },
          { type: 'tip', content: 'すでにAnthropicのAPIキーを持っている場合は、ANTHROPIC_API_KEY環境変数に設定することでも認証できます。' },
        ],
      },
      {
        id: 'ch2',
        title: '設定ファイルとカスタマイズ',
        content: [
          { type: 'text', content: 'Claude Codeの設定はホームフォルダ（~/.claude/）以下のJSONファイルで管理されます。' },
          { type: 'code', language: 'bash', content: '# 設定ファイルの場所\n~/.claude/settings.json       # グローバル設定\n.claude/settings.json         # プロジェクト設定（推奨はgit管理外）\n.claude/settings.local.json   # 個人設定（.gitignoreに追加）', description: '設定ファイルの場所' },
          { type: 'code', language: 'json', content: '{\n  "model": "claude-sonnet-4-6",\n  "permissions": {\n    "allow": ["Bash", "Read", "Write", "Edit"],\n    "deny": []\n  },\n  "env": {\n    "ANTHROPIC_API_KEY": "sk-ant-..."\n  }\n}', description: 'settings.jsonの例', filename: '.claude/settings.json' },
          { type: 'tip', content: '/config コマンドまたは /doctor コマンドで設定の確認・診断ができます。' },
        ],
      },
      {
        id: 'ch3',
        title: '最初のプロジェクトを始める',
        content: [
          { type: 'text', content: 'プロジェクトフォルダで claude を実行するとセッションが始まります。/init コマンドで CLAUDE.md が自動生成されます。' },
          { type: 'code', language: 'bash', content: '# プロジェクトフォルダに移動\ncd my-project\n\n# Claude Codeを起動\nclaude\n\n# セッション内でCLAUDE.mdを生成\n> /init', description: 'プロジェクト初期化' },
          { type: 'text', content: '/init を実行するとClaude Codeがプロジェクトを分析し、技術スタック・ファイル構成・設定ファイルを読み取ってCLAUDE.mdを自動生成します。生成されたCLAUDE.mdを確認・編集してチームで共有しましょう。' },
          { type: 'highlight', content: 'CLAUDE.md はプロジェクトの「引き継ぎ書」です。コーディング規約・アーキテクチャ・デプロイ手順などを書いておくと、Claude Codeが毎回説明なしで正しい判断ができます。', label: 'ベストプラクティス' },
        ],
      },
    ],
  },
  {
    id: 'p2-c3',
    part: 2,
    partLabel: '開発環境の構築',
    title: 'IDEとの連携',
    description: 'VS CodeやJetBrains IDEとClaude Codeを組み合わせて使う',
    icon: '💻',
    difficulty: 'beginner',
    estimatedMinutes: 20,
    tags: ['VS Code', 'JetBrains', 'IDE', '拡張機能'],
    chapters: [
      {
        id: 'ch1',
        title: 'VS Code拡張機能',
        content: [
          { type: 'flow' as const, title: 'VS Code + Claude Codeの流れ', nodes: [
            { label: 'VS Code', desc: '拡張機能をインストール', color: 'accent' },
            { label: 'ターミナル起動', desc: 'Ctrl+` で開く', color: 'accent' },
            { label: 'claude 実行', desc: 'セッション開始', color: 'accent' },
            { label: 'AIコーディング', desc: 'エディタと並列作業', color: 'green' },
          ]},
          { type: 'text', content: 'Claude CodeはVS Codeのターミナルと統合して使えます。さらにVS Codeのサイドバーに表示する拡張機能も利用可能です。' },
          { type: 'steps', steps: [
            { title: '拡張機能のインストール', content: 'VS Code拡張機能パネルで「Claude Code」と検索し、Anthropic公式の拡張機能をインストール。' },
            { title: '統合ターミナルで起動', content: 'VS CodeでCtrl+`（バッククォート）でターミナルを開き、claude と入力してClaude Codeを起動。' },
            { title: '並列表示', content: 'VS Codeの左ペインにエディタ、右ペインにターミナルを並べることで、コードを見ながらClaudeと対話できる。' },
          ]},
          { type: 'tip', content: 'Claude CodeはVS Codeが開いているファイルを直接認識し、「今開いているファイルの〇〇を直して」という指示が使えます。' },
        ],
      },
      {
        id: 'ch2',
        title: 'JetBrains IDE連携',
        content: [
          { type: 'text', content: 'IntelliJ IDEA・PyCharm・WebStormなどJetBrains系IDEでも、Claude Code CLIを使った開発が可能です。' },
          { type: 'steps', steps: [
            { title: 'プラグインのインストール', content: 'JetBrains Marketplaceで「Claude Code」を検索し、Anthropic公式プラグインをインストール。' },
            { title: 'ターミナルで起動', content: 'IDEの内蔵ターミナル（Alt+F12）で claude を実行。' },
            { title: 'キーボードショートカット', content: 'IDEの設定からClaude Codeへのキーバインドを設定し、素早く呼び出せるようにする。' },
          ]},
        ],
      },
      {
        id: 'ch3',
        title: 'ターミナル設定のチューニング',
        content: [
          { type: 'text', content: 'Claude Codeを快適に使うためのターミナル設定です。特にマウスサポートとVimモードの設定が重要です。' },
          { type: 'code', language: 'bash', content: '# Vimキーバインドを有効にする\n> /vim\n\n# Vimモードの設定\n~/.claude/settings.json:\n{\n  "vim": true\n}', description: 'Vimモードの設定' },
          { type: 'command-list', commands: [
            { cmd: '/terminal-setup', description: 'ターミナルの設定を最適化する', example: '> /terminal-setup' },
            { cmd: '/vim', description: 'Vimキーバインドのオン/オフ切替', example: '> /vim' },
          ]},
        ],
      },
    ],
  },

  // ─── Part 3: Claude Code入門 ─────────────────────────────────────────────
  {
    id: 'p3-c1',
    part: 3,
    partLabel: 'Claude Code入門',
    title: '基本操作と最初のセッション',
    description: 'Claude Codeの起動から終了まで、基本的な対話の流れを学ぶ',
    icon: '🚀',
    difficulty: 'beginner',
    estimatedMinutes: 25,
    tags: ['基本操作', 'セッション', '対話'],
    chapters: [
      {
        id: 'ch1',
        title: 'Claude Codeの起動と終了',
        content: [
          { type: 'flow' as const, title: '最初のセッションの流れ', nodes: [
            { label: 'プロジェクトへcd', desc: 'ルートフォルダに移動', color: 'accent' },
            { label: 'claude起動', desc: 'インタラクティブモード', color: 'accent' },
            { label: 'タスクを指示', desc: '自然言語で伝える', color: 'accent' },
            { label: '変更をレビュー', desc: 'git diffで確認', color: 'amber' },
            { label: '完了・コミット', desc: '承認して確定', color: 'green' },
          ]},
          { type: 'text', content: 'ターミナルで claude コマンドを実行するとインタラクティブセッションが始まります。プロジェクトフォルダで起動することが重要です。' },
          { type: 'code', language: 'bash', content: '# プロジェクトフォルダで起動\ncd /path/to/your/project\nclaude\n\n# 特定のモデルで起動\nclaude --model claude-opus-4-7\n\n# ワンショット実行（インタラクティブモードなし）\nclaude -p "package.jsonのdependenciesを一覧表示して"\n\n# セッション終了\n> /quit  # または Ctrl+D', description: '起動と終了のコマンド' },
          { type: 'tip', content: 'Claude Codeは起動時にカレントディレクトリを認識します。プロジェクトルート（package.json や git リポジトリのルート）で起動するのがベストプラクティスです。' },
        ],
      },
      {
        id: 'ch2',
        title: '自然言語でコードを操作する',
        content: [
          { type: 'text', content: 'Claude Codeの最大の強みは、自然言語（日本語でも可）でコードを操作できることです。' },
          { type: 'example', content: '実際の操作例:\n\n> 「src/api/users.ts のgetUser関数にキャッシュ機能を追加して。TTLは5分、Redisを使って」\n\nClaude Codeは:\n1. src/api/users.ts を読み込む\n2. 既存のgetUser関数を分析\n3. Redisクライアントの使い方を確認\n4. キャッシュロジックを実装\n5. 変更をファイルに保存\n6. 変更内容を説明する\n\nこれがすべて自動で行われます。' },
          { type: 'highlight', content: '曖昧な指示より具体的な指示が良い結果を出します。「改善して」より「エラーハンドリングを追加してTypeScriptの型を厳密にして」の方が意図通りの変更になります。', label: '効果的な指示の出し方' },
        ],
      },
      {
        id: 'ch3',
        title: '会話の流れとコンテキスト管理',
        content: [
          { type: 'text', content: 'Claude Codeは会話の文脈を保持します。前の指示を参照しながら作業を続けられます。ただしコンテキストには上限があります。' },
          { type: 'command-list', commands: [
            { cmd: '/clear', description: '会話履歴をリセット（新しいタスクを始めるとき）', example: '> /clear' },
            { cmd: '/compact', description: '会話を圧縮してコンテキストを節約', example: '> /compact' },
            { cmd: '/status', description: '現在のコンテキスト使用量を確認', example: '> /status' },
            { cmd: '/cost', description: 'セッションのトークン消費コストを確認', example: '> /cost' },
          ]},
          { type: 'tip', content: '長時間の作業では定期的に /compact を使うか、タスクの切れ目で /clear してください。コンテキストが満杯に近づくとClaude Codeが警告します。' },
        ],
      },
    ],
  },
  {
    id: 'p3-c2',
    part: 3,
    partLabel: 'Claude Code入門',
    title: 'ファイル操作とコード生成',
    description: 'Claude Codeがどのようにファイルを読み書きし、コードを生成するかを学ぶ',
    icon: '📝',
    difficulty: 'beginner',
    estimatedMinutes: 30,
    tags: ['ファイル操作', 'コード生成', 'ツール'],
    chapters: [
      {
        id: 'ch1',
        title: 'ファイルの読み込みと編集',
        content: [
          { type: 'flow' as const, title: 'ファイル操作の流れ', nodes: [
            { label: '指示を入力', desc: '自然言語で依頼', color: 'accent' },
            { label: 'ファイルを読む', desc: 'Readツールで解析', color: 'accent' },
            { label: 'コードを分析', desc: '問題・変更箇所特定', color: 'accent' },
            { label: '編集・書き込み', desc: 'Edit / Writeツール', color: 'accent' },
            { label: '変更を説明', desc: '差分と理由を報告', color: 'green' },
          ]},
          { type: 'text', content: 'Claude Codeは内部でツール（Read・Write・Edit・Bash・Globなど）を使ってファイルシステムを操作します。ユーザーは自然言語で指示するだけで、Claude Codeが適切なツールを選択して実行します。' },
          { type: 'code', language: 'bash', content: '# 例: ファイルを読んで修正する指示\n> 「src/utils/date.ts を読んで、タイムゾーン処理のバグを見つけて修正して」\n\n# Claude Codeの内部動作（ユーザーには許可確認が表示される）:\n# 1. Read: src/utils/date.ts を読み込む\n# 2. 問題を分析\n# 3. Edit: 該当行を修正\n# 4. 変更内容を説明', description: 'ファイル読み込みと編集の流れ' },
          { type: 'text', content: 'ツールを実行するたびに確認が表示されます（デフォルト）。「このセッションは許可」「常に許可」を選択することで、確認をスキップできます。' },
          { type: 'warning', content: '「常に許可」を選ぶ前に、ツールが何をするか理解してください。特にBash（シェルコマンド実行）は慎重に。' },
        ],
      },
      {
        id: 'ch2',
        title: '新しいファイルとプロジェクトの生成',
        content: [
          { type: 'text', content: 'Claude Codeは既存コードの修正だけでなく、新しいファイル・コンポーネント・APIエンドポイントなどをゼロから生成できます。' },
          { type: 'example', content: '> 「React + TypeScriptで、商品一覧を表示するProductListコンポーネントを作って。propsにproducts: Product[]を受け取り、グリッド表示する。src/components/ProductList.tsx に保存」\n\nClaude Codeの動作:\n1. 既存のProductインターフェースを検索（Glob/Grep）\n2. プロジェクトのスタイル規約を確認（globals.css等）\n3. ProductList.tsxを新規作成（Write）\n4. 必要に応じてindex.tsにエクスポートを追加（Edit）' },
          { type: 'tip', content: '「既存コードのスタイルに合わせて」と指定すると、Claude Codeがプロジェクトのコード規約を自動的に読み取って整合性のあるコードを生成します。' },
        ],
      },
      {
        id: 'ch3',
        title: '複数ファイルにまたがる変更',
        content: [
          { type: 'text', content: 'Claude Codeの真の力は、複数ファイルを横断した変更を一貫して行えることです。リファクタリングや機能追加で特に威力を発揮します。' },
          { type: 'example', content: '> 「UserオブジェクトにphoneNumber?: stringフィールドを追加して。型定義・DB migration・APIレスポンス・フロントエンドのフォームを全部更新して」\n\nClaude Codeは:\n1. src/types/user.ts の型定義を更新\n2. prisma/schema.prisma のUserモデルを更新\n3. src/api/users.ts のレスポンスに追加\n4. src/components/UserForm.tsx にフォームフィールドを追加\n5. 必要なバリデーションを各所に追加' },
          { type: 'warning', content: '大規模な変更を一度に指示するとミスが起きやすいです。段階的に確認しながら進めることを推奨します。「まず型定義だけ更新して」→ 確認 → 「次にDBを更新して」という流れが安全です。' },
        ],
      },
    ],
  },
  {
    id: 'p3-c3',
    part: 3,
    partLabel: 'Claude Code入門',
    title: 'スラッシュコマンドとショートカット',
    description: 'Claude Codeの全スラッシュコマンドとキーボードショートカットをマスターする',
    icon: '⌨️',
    difficulty: 'beginner',
    estimatedMinutes: 20,
    tags: ['スラッシュコマンド', 'ショートカット', 'CLI'],
    chapters: [
      {
        id: 'ch1',
        title: 'よく使うスラッシュコマンド',
        content: [
          { type: 'flow' as const, title: '主要スラッシュコマンド', nodes: [
            { label: '/help', desc: 'コマンド一覧表示', color: 'muted' },
            { label: '/model', desc: 'モデルを切り替える', color: 'muted' },
            { label: '/clear', desc: '会話履歴リセット', color: 'muted' },
            { label: '/compact', desc: 'コンテキスト圧縮', color: 'muted' },
            { label: '/review', desc: 'git変更をレビュー', color: 'accent' },
          ]},
          { type: 'text', content: 'スラッシュコマンドはClaude Codeの機能を素早く呼び出すための特殊コマンドです。入力中に / を押すと候補が表示されます。' },
          { type: 'command-list', commands: [
            { cmd: '/help', description: '使用可能なコマンドの一覧を表示', example: '> /help' },
            { cmd: '/clear', description: '会話履歴をリセットして新しいセッションを始める', example: '> /clear' },
            { cmd: '/compact', description: '会話を要約してコンテキストウィンドウを節約', example: '> /compact' },
            { cmd: '/model', description: '使用するモデルを切り替える', example: '> /model claude-opus-4-7' },
            { cmd: '/review', description: '現在のgit changesをコードレビューする', example: '> /review' },
            { cmd: '/init', description: 'プロジェクトを分析してCLAUDE.mdを生成', example: '> /init' },
          ]},
        ],
      },
      {
        id: 'ch2',
        title: '管理・設定コマンド',
        content: [
          { type: 'command-list', commands: [
            { cmd: '/status', description: 'APIキー・モデル・コンテキスト使用量などのステータス', example: '> /status' },
            { cmd: '/cost', description: 'セッションのコスト（トークン・料金）を表示', example: '> /cost' },
            { cmd: '/doctor', description: '環境設定の診断と問題チェック', example: '> /doctor' },
            { cmd: '/login', description: 'Anthropicアカウントでログイン', example: '> /login' },
            { cmd: '/logout', description: 'ログアウト', example: '> /logout' },
            { cmd: '/memory', description: 'メモリファイルを編集・確認する', example: '> /memory' },
            { cmd: '/permissions', description: 'ツール権限の設定を確認・変更', example: '> /permissions' },
            { cmd: '/config', description: '設定ファイルを開いて編集', example: '> /config' },
            { cmd: '/release-notes', description: '最新バージョンのリリースノートを表示', example: '> /release-notes' },
            { cmd: '/fast', description: 'Opusモデルの高速モードをトグル', example: '> /fast' },
            { cmd: '/ultrathink', description: 'Opus 4の高度な思考モードで回答（複雑な問題用）', example: '> /ultrathink この設計の問題点を分析して' },
            { cmd: '/quit', description: 'Claude Codeを終了（Ctrl+Dも可）', example: '> /quit' },
          ]},
        ],
      },
      {
        id: 'ch3',
        title: 'キーボードショートカット',
        content: [
          { type: 'shortcut-list', shortcuts: [
            { keys: ['Ctrl', 'C'], description: '現在のリクエストをキャンセル（応答中に中断）' },
            { keys: ['Ctrl', 'D'], description: 'Claude Codeを終了' },
            { keys: ['↑', '↓'], description: '入力履歴を前後に移動' },
            { keys: ['Escape'], description: '現在の入力をクリア' },
            { keys: ['Shift', 'Enter'], description: '改行（複数行の入力）' },
            { keys: ['Tab'], description: 'スラッシュコマンドの補完' },
            { keys: ['Ctrl', 'R'], description: '入力履歴をインクリメンタル検索' },
          ]},
          { type: 'tip', content: 'Vimモード（/vim）を有効にすると、hjklによるカーソル移動・esc + iでのモード切替など、Vimキーバインドが使えます。Vimユーザーには快適です。' },
        ],
      },
    ],
  },

  // ─── Part 4: Claude Code周辺機能 ────────────────────────────────────────
  {
    id: 'p4-c1',
    part: 4,
    partLabel: 'Claude Code周辺機能',
    title: 'Hooks（フック）の設定と活用',
    description: 'Claude Codeの動作を自動化するHooksシステムを理解して実用的な設定を作る',
    icon: '🔗',
    difficulty: 'intermediate',
    estimatedMinutes: 35,
    tags: ['Hooks', '自動化', 'PreToolUse', 'PostToolUse'],
    chapters: [
      {
        id: 'ch1',
        title: 'Hooksとは何か',
        content: [
          { type: 'flow' as const, title: 'Hooksのライフサイクル', nodes: [
            { label: 'ユーザー要求', desc: 'タスクを指示する', color: 'accent' },
            { label: 'Claudeのアクション', desc: 'ツール実行を決定', color: 'accent' },
            { label: 'PreHook', desc: '実行前チェック・前処理', color: 'amber' },
            { label: 'ツール実行', desc: 'Read/Write/Bash等', color: 'accent' },
            { label: 'PostHook', desc: 'lint・通知・ログ等', color: 'green' },
          ]},
          { type: 'text', content: 'HooksはClaude Codeがツールを実行する前後に、ユーザー定義のシェルコマンドを自動実行する仕組みです。CI/CDのフックに似た概念で、コードの品質チェック・通知・ロギングなどに使えます。' },
          { type: 'highlight', content: 'Hooksを使うと「Claude Codeが何かをしたら自動的に〇〇する」というルールを設定できます。例: ファイルを保存したら自動でlintを実行する。', label: 'Hooksの本質' },
          { type: 'text', content: 'Hooksは settings.json の hooks セクションで設定します。フックは以下の4種類です。' },
          { type: 'table', headers: ['フック名', 'タイミング', '用途'], rows: [
            ['PreToolUse', 'ツール実行前', 'ブロック・確認・前処理'],
            ['PostToolUse', 'ツール実行後', '通知・ログ・後処理'],
            ['Notification', '通知発生時', 'ターミナル/デスクトップ通知'],
            ['Stop', 'セッション終了時', 'クリーンアップ'],
          ]},
        ],
      },
      {
        id: 'ch2',
        title: 'Hookの設定方法',
        content: [
          { type: 'text', content: 'Hookは .claude/settings.json（プロジェクト設定）または ~/.claude/settings.json（グローバル設定）に記述します。' },
          { type: 'code', language: 'json', content: '{\n  "hooks": {\n    "PostToolUse": [\n      {\n        "matcher": "Write|Edit",\n        "hooks": [\n          {\n            "type": "command",\n            "command": "npx eslint --fix $CLAUDE_TOOL_INPUT_FILE_PATH"\n          }\n        ]\n      }\n    ],\n    "Notification": [\n      {\n        "hooks": [\n          {\n            "type": "command",\n            "command": "osascript -e \'display notification \\"Claude Codeの作業が完了\\" with title \\"Claude Code\\"\'"\n          }\n        ]\n      }\n    ]\n  }\n}', description: 'Hookの基本設定例', filename: '.claude/settings.json' },
          { type: 'tip', content: 'Hookのコマンドはシェルで実行されます。環境変数 $CLAUDE_TOOL_INPUT_FILE_PATH でClaude Codeが操作したファイルパスを参照できます。' },
        ],
      },
      {
        id: 'ch3',
        title: '実用的なHooks設定例',
        content: [
          { type: 'text', content: '実際のプロジェクトで使えるHooks設定のパターンを紹介します。' },
          { type: 'code', language: 'json', content: '{\n  "hooks": {\n    "PreToolUse": [\n      {\n        "matcher": "Bash",\n        "hooks": [\n          {\n            "type": "command",\n            "command": "echo \'[HOOK] Bash実行: \'$CLAUDE_TOOL_INPUT_COMMAND >> ~/.claude/bash_log.txt"\n          }\n        ]\n      }\n    ],\n    "PostToolUse": [\n      {\n        "matcher": "Write",\n        "hooks": [\n          {\n            "type": "command",\n            "command": "npx prettier --write $CLAUDE_TOOL_INPUT_FILE_PATH 2>/dev/null || true"\n          }\n        ]\n      }\n    ]\n  }\n}', description: 'ログ記録 + Prettierフォーマット', filename: '.claude/settings.json' },
          { type: 'steps', steps: [
            { title: 'lintエラー自動修正', content: 'PostToolUse(Write/Edit) → eslint --fix を実行' },
            { title: 'テスト自動実行', content: 'PostToolUse(Write) → 関連テストファイルのみ実行（vitest --changed など）' },
            { title: 'セキュリティチェック', content: 'PreToolUse(Write) → .env や秘密鍵の書き込みをブロック' },
            { title: 'macOS通知', content: 'Notification → osascript でデスクトップ通知' },
            { title: 'Slackへの通知', content: 'Notification → curl でSlack Webhookを叩く' },
          ]},
        ],
      },
    ],
  },
  {
    id: 'p4-c2',
    part: 4,
    partLabel: 'Claude Code周辺機能',
    title: 'MCP（Model Context Protocol）サーバー',
    description: 'MCPサーバーでClaude Codeの能力を拡張し、外部ツールと連携する',
    icon: '🔌',
    difficulty: 'intermediate',
    estimatedMinutes: 40,
    tags: ['MCP', 'サーバー', '連携', '拡張'],
    chapters: [
      {
        id: 'ch1',
        title: 'MCPとは何か',
        content: [
          { type: 'flow' as const, title: 'MCPのアーキテクチャ', nodes: [
            { label: 'Claude Code', desc: 'AIエージェント', color: 'accent' },
            { label: 'MCPプロトコル', desc: '標準化されたI/F', color: 'accent' },
            { label: 'MCPサーバー', desc: 'GitHub・DB・Slack等', color: 'accent' },
            { label: '外部サービス', desc: 'リアルタイムに操作', color: 'green' },
          ]},
          { type: 'text', content: 'MCP（Model Context Protocol）は、AnthropicがオープンソースとしてリリースしたプロトコルでAIアシスタントが外部ツール・データソースと標準化された方法で連携するための仕様です。' },
          { type: 'highlight', content: 'MCPはAI版の「USB規格」です。MCP対応サーバーを作れば、Claude CodeだけでなくCursor・GitHub Copilot・GeminiなどどのAIエージェントとも接続できます。', label: 'MCPの位置づけ' },
          { type: 'text', content: 'MCPサーバーは、AIが「ツール」として呼び出せる関数を提供します。例: Slackに投稿する・データベースを検索する・Figmaのデザインを取得するなど。' },
          { type: 'reference', title: 'MCP公式ドキュメント', url: 'https://modelcontextprotocol.io', description: 'MCPの仕様・サーバー一覧・SDKのリファレンス' },
        ],
      },
      {
        id: 'ch2',
        title: 'MCPサーバーの追加方法',
        content: [
          { type: 'text', content: 'MCPサーバーは claude mcp add コマンドまたは設定ファイルに直接記述して追加できます。' },
          { type: 'code', language: 'bash', content: '# コマンドで追加（簡単）\nclaude mcp add\n\n# 対話形式でサーバーを選択・設定\n# または設定ファイルに直接記述', description: 'MCPサーバーの追加' },
          { type: 'code', language: 'json', content: '{\n  "mcpServers": {\n    "github": {\n      "command": "npx",\n      "args": ["-y", "@modelcontextprotocol/server-github"],\n      "env": {\n        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_xxxx"\n      }\n    },\n    "postgres": {\n      "command": "npx",\n      "args": ["-y", "@modelcontextprotocol/server-postgres",\n               "postgresql://user:pass@localhost/mydb"]\n    }\n  }\n}', description: 'settings.jsonでのMCPサーバー設定', filename: '.claude/settings.json' },
          { type: 'tip', content: 'セキュリティのため、APIキーや認証情報はenv変数を使って渡しましょう。設定ファイルにハードコードするとgitで漏洩するリスクがあります。' },
        ],
      },
      {
        id: 'ch3',
        title: '主要なMCPサーバー一覧',
        content: [
          { type: 'text', content: 'コミュニティとAnthropic公式が提供する主要なMCPサーバーを紹介します。' },
          { type: 'table', headers: ['サーバー名', '機能', 'パッケージ'], rows: [
            ['GitHub', 'Issue・PR・コードの操作', '@modelcontextprotocol/server-github'],
            ['PostgreSQL', 'DBクエリ・スキーマ確認', '@modelcontextprotocol/server-postgres'],
            ['Brave Search', 'Webを検索してリアルタイム情報取得', '@modelcontextprotocol/server-brave-search'],
            ['Filesystem', 'ファイルシステムへの安全なアクセス', '@modelcontextprotocol/server-filesystem'],
            ['Slack', 'Slackのチャンネル・メッセージ操作', '@modelcontextprotocol/server-slack'],
            ['Google Drive', 'Googleドキュメント・スプレッドシート操作', '@modelcontextprotocol/server-gdrive'],
            ['Context7', 'ライブラリのリアルタイムドキュメント取得', '@context7/mcp-server'],
          ]},
          { type: 'tip', content: 'mcpHub（https://mcphub.io）でコミュニティ製MCPサーバーを検索できます。2025年時点で数百種類のサーバーが公開されています。' },
        ],
      },
    ],
  },
  {
    id: 'p4-c3',
    part: 4,
    partLabel: 'Claude Code周辺機能',
    title: 'メモリシステムとCLAUDE.md',
    description: 'Claude Codeのメモリシステムを活用して継続的なコンテキストを維持する',
    icon: '💾',
    difficulty: 'intermediate',
    estimatedMinutes: 30,
    tags: ['メモリ', 'CLAUDE.md', 'コンテキスト', '設定'],
    chapters: [
      {
        id: 'ch1',
        title: 'CLAUDE.mdの活用',
        content: [
          { type: 'flow' as const, title: 'メモリレイヤーの構造', nodes: [
            { label: 'グローバルCLAUDE.md', desc: '全プロジェクト共通', color: 'muted' },
            { label: 'プロジェクトCLAUDE.md', desc: 'プロジェクト固有のルール', color: 'accent' },
            { label: '自動メモリ', desc: '会話から学習・蓄積', color: 'accent' },
            { label: 'Claudeの回答', desc: '文脈を理解した応答', color: 'green' },
          ]},
          { type: 'text', content: 'CLAUDE.mdはClaude Codeが自動的に読み込む設定ファイルです。プロジェクトのルールや背景情報を書いておくと、毎回説明しなくてもClaude Codeが正しい判断をします。' },
          { type: 'code', language: 'markdown', content: '# プロジェクト名\n\n## 技術スタック\n- フレームワーク: Next.js 16 (App Router)\n- 言語: TypeScript strict mode\n- スタイル: Tailwind CSS v4\n- DB: PostgreSQL + Prisma\n\n## コーディング規約\n- 関数コンポーネントのみ（クラスコンポーネント禁止）\n- async/awaitを使う（.then().catch()は使わない）\n- エラーハンドリングは必ずcatch節で行う\n\n## デプロイ\n- mainブランチへのpushでVercelに自動デプロイ\n- 本番への変更前に必ずPRを作成してレビューを受ける\n\n## 注意事項\n- .envファイルはgitにコミットしない\n- テストを書かずに新機能を追加しない', description: 'CLAUDE.mdの例', filename: 'CLAUDE.md' },
          { type: 'tip', content: '/init コマンドでCLAUDE.mdを自動生成できます。生成後に確認・編集してチームでgit管理します。' },
        ],
      },
      {
        id: 'ch2',
        title: '自動メモリ機能',
        content: [
          { type: 'text', content: 'Claude Codeには対話中に学んだことを次のセッションに持ち越す「自動メモリ」機能があります。~/.claude/memory/ フォルダにMarkdownファイルとして保存されます。' },
          { type: 'text', content: '「〇〇を記憶して」という指示でClaude Codeに記憶させることができます。例えばユーザーの好みやプロジェクト固有の情報をメモリとして保存できます。' },
          { type: 'code', language: 'bash', content: '# メモリファイルの場所\n~/.claude/memory/           # グローバルメモリ\n.claude/memory/             # プロジェクトメモリ（非推奨）\n\n# メモリを確認・編集するコマンド\n> /memory', description: 'メモリファイルの場所' },
          { type: 'comparison',
            left: { label: 'CLAUDE.md', content: '・チーム全員が共有するルール\n・gitで管理するプロジェクト設定\n・コーディング規約・アーキテクチャ\n・デプロイ手順' },
            right: { label: '自動メモリ（~/.claude/memory/）', content: '・個人の作業スタイル・好み\n・ユーザー固有の情報\n・セッションをまたいで使う情報\n・gitには含めない個人設定' }
          },
        ],
      },
      {
        id: 'ch3',
        title: 'CLAUDE.mdの継承と構造',
        content: [
          { type: 'text', content: 'CLAUDE.mdはディレクトリ階層で継承されます。親フォルダのCLAUDE.mdは子フォルダでも読み込まれます。' },
          { type: 'steps', steps: [
            { title: 'グローバル設定', content: '~/.claude/CLAUDE.md — 全プロジェクト共通のルール（言語設定・個人の好み等）' },
            { title: 'プロジェクト設定', content: './CLAUDE.md — プロジェクト全体のルール（技術スタック・規約等）' },
            { title: 'サブフォルダ設定', content: './src/components/CLAUDE.md — コンポーネント固有のルール' },
          ]},
          { type: 'text', content: 'また、CLAUDE.mdから別ファイルを参照（@ファイルパス）することで、複数のドキュメントを組み合わせられます。' },
          { type: 'code', language: 'markdown', content: '# プロジェクト設定\n@AGENTS.md\n@docs/architecture.md\n@.cursor/rules', description: 'CLAUDE.mdから他ファイルを参照', filename: 'CLAUDE.md' },
        ],
      },
    ],
  },
  {
    id: 'p4-c4',
    part: 4,
    partLabel: 'Claude Code周辺機能',
    title: 'パーミッションとセキュリティ設定',
    description: 'Claude Codeのツール権限を適切に設定してセキュアに使う',
    icon: '🔒',
    difficulty: 'intermediate',
    estimatedMinutes: 25,
    tags: ['パーミッション', 'セキュリティ', 'ツール権限'],
    chapters: [
      {
        id: 'ch1',
        title: 'ツール権限の仕組み',
        content: [
          { type: 'flow' as const, title: 'ツールの権限レベル', nodes: [
            { label: 'Read（低）', desc: 'ファイル読み込みのみ', color: 'green' },
            { label: 'Write / Edit（中）', desc: 'ファイル変更・作成', color: 'amber' },
            { label: 'Bash（高）', desc: '任意コマンド実行', color: 'red' },
            { label: 'WebFetch（中）', desc: 'URL取得・Web検索', color: 'amber' },
          ]},
          { type: 'text', content: 'Claude Codeが使用できるツールはパーミッション設定で制御できます。デフォルトでは各ツールの使用前に確認が表示されます。' },
          { type: 'table', headers: ['ツール名', '機能', 'リスクレベル'], rows: [
            ['Read', 'ファイルの読み込み', '低'],
            ['Write', '新規ファイルの作成', '中'],
            ['Edit', '既存ファイルの編集', '中'],
            ['Bash', 'シェルコマンドの実行', '高'],
            ['Glob', 'ファイルパターン検索', '低'],
            ['Grep', 'テキスト検索', '低'],
            ['WebFetch', 'URLからコンテンツ取得', '中'],
            ['WebSearch', 'Web検索', '中'],
          ]},
          { type: 'warning', content: 'Bashツールは任意のシェルコマンドを実行できます。rm -rf や curl | bash などの危険なコマンドも実行できるため、使用前に何を実行するか確認することを強く推奨します。' },
        ],
      },
      {
        id: 'ch2',
        title: '権限モードの設定',
        content: [
          { type: 'text', content: 'パーミッションは settings.json の permissions セクションで設定します。' },
          { type: 'code', language: 'json', content: '{\n  "permissions": {\n    "allow": [\n      "Read",\n      "Write",\n      "Edit",\n      "Glob",\n      "Grep",\n      "Bash(npm run *)",\n      "Bash(git *)",\n      "Bash(npx *)",\n      "WebFetch"\n    ],\n    "deny": [\n      "Bash(rm -rf *)",\n      "Bash(curl * | bash)",\n      "Bash(sudo *)",\n      "WebSearch"\n    ]\n  }\n}', description: 'パーミッション設定例', filename: '.claude/settings.json' },
          { type: 'tip', content: 'Bashツールはコマンドパターンでallow/denyを細かく制御できます。例: "Bash(npm run *)" は npm run で始まるコマンドのみ許可します。' },
        ],
      },
      {
        id: 'ch3',
        title: 'セキュリティのベストプラクティス',
        content: [
          { type: 'steps', steps: [
            { title: 'git管理下で作業する', content: 'Claude Codeに誤った変更をされても git checkout -- . でロールバック可能。gitなしのフォルダでの作業は危険。' },
            { title: '機密情報を保護する', content: '.env ファイルへの書き込みを deny リストに追加。または .gitignore + .claudeignore で除外する。' },
            { title: 'Bash権限を絞る', content: '必要なコマンドパターンのみ allow に追加。全Bashを許可するのではなく、最小権限の原則を守る。' },
            { title: 'ネットワーク制限', content: 'WebFetch/WebSearchを制限することで外部への情報漏洩リスクを低減（ただし機能も制限される）。' },
            { title: 'ログを確認する', content: 'PostToolUse Hookでコマンドログを記録し、定期的に確認する。' },
          ]},
          { type: 'code', language: 'bash', content: '# .claudeignore - Claude Codeが読み込まないファイルを指定\n.env\n.env.local\n.env.production\n*.pem\n*.key\nsecrets/\nnode_modules/\n.git/', description: '.claudeignoreの設定例', filename: '.claudeignore' },
        ],
      },
    ],
  },

  // ─── Part 5: 実践的な開発 ───────────────────────────────────────────────
  {
    id: 'p5-c1',
    part: 5,
    partLabel: '実践的な開発',
    title: 'バグ修正とデバッグ',
    description: 'Claude Codeを使ったバグ調査・修正・テスト検証のワークフロー',
    icon: '🐛',
    difficulty: 'intermediate',
    estimatedMinutes: 35,
    tags: ['デバッグ', 'バグ修正', 'エラー解析'],
    chapters: [
      {
        id: 'ch1',
        title: 'エラーをClaude Codeに渡す',
        content: [
          { type: 'flow' as const, title: 'バグ修正ワークフロー', nodes: [
            { label: 'エラー報告', desc: 'スタックトレース提供', color: 'red' },
            { label: '原因を分析', desc: '仮説を3つ挙げる', color: 'accent' },
            { label: '仮説を検証', desc: '最有力を絞り込む', color: 'accent' },
            { label: '修正を実装', desc: 'ピンポイントで直す', color: 'accent' },
            { label: 'テスト実行', desc: '再発防止テスト追加', color: 'accent' },
            { label: '動作確認', desc: 'バグ解消を確認', color: 'green' },
          ]},
          { type: 'text', content: 'バグ修正の最初のステップは、エラー情報をClaude Codeに正確に渡すことです。スタックトレース・エラーメッセージ・再現手順を含めると精度が上がります。' },
          { type: 'example', content: '効果的なバグ報告の例:\n\n> 「以下のエラーが発生しています。修正してください。\n\nエラー: TypeError: Cannot read properties of undefined (reading \'name\')\n場所: src/components/UserProfile.tsx:42\n\nスタックトレース:\n  at UserProfile (UserProfile.tsx:42)\n  at Dashboard (Dashboard.tsx:15)\n\n再現手順:\n1. ログイン済みユーザーでダッシュボードを開く\n2. プロフィールアイコンをクリック\n3. ユーザーデータが取得される前にプロフィールを表示しようとするとクラッシュ\n\n期待動作: ローディング状態を表示し、データ取得後にプロフィールを表示する」' },
          { type: 'tip', content: 'エラーをターミナルでコピーしてそのままClaude Codeに貼り付けるだけでもOKです。Claude Codeはエラーを分析して原因を特定します。' },
        ],
      },
      {
        id: 'ch2',
        title: 'デバッグ戦略',
        content: [
          { type: 'text', content: 'Claude Codeとの効果的なデバッグワークフローを紹介します。' },
          { type: 'steps', steps: [
            { title: '1. まず原因を特定させる', content: '「修正して」と言う前に「なぜこのエラーが起きるか分析して」と聞く。修正の前に分析。' },
            { title: '2. 仮説を提示させる', content: '「考えられる原因を3つ挙げて」→ 最も可能性の高い原因を選択 → 修正を依頼。' },
            { title: '3. 段階的に修正する', content: '複数の問題が見つかった場合、一度に全部直さず1つずつ修正・確認を繰り返す。' },
            { title: '4. テストで検証する', content: '修正後に「このバグのリグレッションテストを追加して」と指示してテストコードも生成。' },
          ]},
          { type: 'code', language: 'bash', content: '# テストを実行してバグを確認\n> 「このバグを再現するユニットテストを作って、まず失敗することを確認して」\n> 「次にバグを修正して、テストが通ることを確認して」', description: 'TDDスタイルのバグ修正' },
        ],
      },
      {
        id: 'ch3',
        title: 'ロールバックと安全な変更',
        content: [
          { type: 'text', content: 'Claude Codeの変更が意図しない結果になった場合のロールバック方法を知っておくことが重要です。' },
          { type: 'steps', steps: [
            { title: 'git diffで変更確認', content: 'Claude Codeが変更を加えた後、git diff で何が変わったか確認する。これが最も重要なステップ。' },
            { title: 'git checkoutでロールバック', content: 'ファイル単位: git checkout -- src/utils/date.ts\n全体: git checkout -- .\n特定コミットまで: git reset --hard HEAD~1' },
            { title: 'git stashで一時退避', content: 'まだコミットしていない変更を一時的に退避: git stash\n後で戻す: git stash pop' },
          ]},
          { type: 'warning', content: 'Claude Codeが変更を加える前に git commit しておくと、いつでも安全な状態に戻れます。大きな変更前には必ずコミットしてください。' },
          { type: 'tip', content: 'Claude Codeに「変更する前にgitコミットして」と指示することもできます。CLAUDE.mdに「大きな変更前はコミットすること」と書いておくと毎回自動的に実行されます。' },
        ],
      },
    ],
  },
  {
    id: 'p5-c2',
    part: 5,
    partLabel: '実践的な開発',
    title: 'テスト駆動開発（TDD）',
    description: 'Claude Codeを活用したテストファーストな開発サイクルを確立する',
    icon: '✅',
    difficulty: 'intermediate',
    estimatedMinutes: 35,
    tags: ['TDD', 'テスト', 'ユニットテスト', 'CI'],
    chapters: [
      {
        id: 'ch1',
        title: 'テストコードの自動生成',
        content: [
          { type: 'flow' as const, title: 'TDDサイクル', nodes: [
            { label: 'テスト作成（Red）', desc: '失敗するテストを書く', color: 'red' },
            { label: 'テスト実行（失敗）', desc: 'Failを確認する', color: 'red' },
            { label: '実装する', desc: 'テストが通る最小実装', color: 'accent' },
            { label: 'テスト実行（Pass）', desc: '全テストが通る', color: 'green' },
            { label: 'リファクタリング', desc: 'テストを維持して改善', color: 'accent' },
          ]},
          { type: 'text', content: 'Claude Codeはユニットテスト・統合テスト・E2Eテストを自動生成できます。既存のコードから適切なテストケースを作成します。' },
          { type: 'code', language: 'bash', content: '# テスト生成の指示例\n> 「src/utils/pricing.ts の calculateDiscount 関数のユニットテストを作って。\n  Jest + TypeScriptで。以下のケースを必ずカバーして:\n  - 通常割引（10%引き）\n  - 会員割引（20%引き）\n  - 割引上限（最大5000円引き）\n  - 無効な入力（負の値・NaN）\"', description: 'テスト生成の指示' },
          { type: 'tip', content: '「境界値テストも含めて」「エラーケースを重点的に」「モックを使って外部依存を排除して」など、テストの品質を高める指示を加えましょう。' },
        ],
      },
      {
        id: 'ch2',
        title: 'TDDワークフロー',
        content: [
          { type: 'text', content: 'テスト駆動開発（Red → Green → Refactor）をClaude Codeと一緒に進める方法です。' },
          { type: 'steps', steps: [
            { title: 'Red: 失敗するテストを書く', content: '「sendPasswordResetEmail関数のテストをまず作って。まだ関数は存在しない前提で、テストが失敗することを確認して」' },
            { title: 'Green: テストが通る実装をする', content: '「テストが全部通るように sendPasswordResetEmail を実装して。シンプルな実装でOK」' },
            { title: 'Refactor: コードを改善する', content: '「テストを維持しながら、実装をよりクリーンにリファクタリングして。エラーハンドリングも追加して」' },
          ]},
          { type: 'example', content: '実際のやり取り例:\n\n> 「ショッピングカートのaddItemメソッドのテストを先に書いて」\nClaude: テストを生成...\n\n> 「テストを実行して（npm test）、全部失敗することを確認して」\nClaude: npm test 実行 → 4 tests failed ✓\n\n> 「次にaddItemを実装してテストを全部通して」\nClaude: 実装を生成 → npm test 実行 → 4 tests passed ✓' },
        ],
      },
      {
        id: 'ch3',
        title: 'カバレッジと品質指標',
        content: [
          { type: 'text', content: 'テストカバレッジの確認と品質向上もClaude Codeに任せられます。' },
          { type: 'code', language: 'bash', content: '# カバレッジレポートの確認と改善指示\n> 「npm run test:coverage を実行して、カバレッジが低い（60%以下）のモジュールを教えて、優先順位付きで」\n\n> 「src/services/payment.ts のカバレッジが45%、エッジケースのテストを追加して80%以上にして」', description: 'カバレッジ改善の指示' },
          { type: 'tip', content: '「既存テストを壊さないで」という制約を最初に伝えると、Claude Codeがリファクタリング時にテストの後方互換性を意識します。' },
        ],
      },
    ],
  },
  {
    id: 'p5-c3',
    part: 5,
    partLabel: '実践的な開発',
    title: 'コードレビューとリファクタリング',
    description: 'Claude Codeをコードレビュアーとして活用し、コード品質を継続的に向上させる',
    icon: '🔍',
    difficulty: 'intermediate',
    estimatedMinutes: 30,
    tags: ['コードレビュー', 'リファクタリング', 'コード品質'],
    chapters: [
      {
        id: 'ch1',
        title: 'コードレビューの依頼',
        content: [
          { type: 'flow' as const, title: 'コードレビューの流れ', nodes: [
            { label: 'git diff', desc: '変更内容を取得', color: 'muted' },
            { label: '/review', desc: 'レビューを依頼', color: 'accent' },
            { label: '問題点の指摘', desc: 'セキュリティ・品質等', color: 'amber' },
            { label: 'コードを修正', desc: '指摘箇所を直す', color: 'accent' },
            { label: '再確認・承認', desc: 'PRマージ可能', color: 'green' },
          ]},
          { type: 'text', content: 'Claude Codeはコードレビュアーとして非常に有能です。プルリクエストの変更や特定ファイルのレビューを依頼できます。' },
          { type: 'code', language: 'bash', content: '# gitの差分をレビューする\n> /review\n\n# または明示的に指定\n> 「git diff mainとHEADの差分を確認して、コードレビューをして」\n\n# 特定の観点でレビュー\n> 「src/api/auth.ts をセキュリティの観点でレビューして。特にSQLインジェクション・XSS・認証バイパスのリスクを重点的に」', description: 'コードレビューの依頼方法' },
          { type: 'tip', content: '/review コマンドは現在のgit changesを自動的にレビューします。PRを出す前の習慣にするとコードの品質が上がります。' },
        ],
      },
      {
        id: 'ch2',
        title: '段階的なリファクタリング',
        content: [
          { type: 'text', content: '大規模なリファクタリングも、段階的に指示することで安全に行えます。' },
          { type: 'steps', steps: [
            { title: '現状分析', content: '「src/services/ フォルダのコードを分析して、問題点・改善機会・技術的負債を一覧にして」' },
            { title: '優先順位付け', content: '「改善提案を、影響度・リスク・工数で優先順位付けして」' },
            { title: '1つずつ実行', content: '「まず一番優先度の高い改善（UserServiceのDI化）だけ実施して。テストは壊さないで」' },
            { title: '検証', content: '「変更後にテストを実行して、型チェックも確認して」' },
          ]},
          { type: 'warning', content: '「全部リファクタリングして」と一度に指示するのは危険です。Claude Codeが意図しない大量の変更をする可能性があります。必ず段階的に進めてください。' },
        ],
      },
      {
        id: 'ch3',
        title: 'パフォーマンス最適化',
        content: [
          { type: 'text', content: 'パフォーマンスの問題調査と最適化もClaude Codeの得意分野です。' },
          { type: 'example', content: '> 「このReactコンポーネントを分析して、パフォーマンスの問題点を見つけて。特に不要な再レンダリング・重いComputation・メモリリークに注目して」\n\nClaude Codeの分析:\n- ❌ useEffect依存配列に関数が含まれており毎回再実行される\n- ❌ 大きなリストが仮想化なしにレンダリングされている  \n- ❌ 画像が遅延ロードされていない\n- 💡 useMemo/useCallback でメモ化を追加\n- 💡 react-window で仮想スクロールを実装\n- 💡 next/image で画像最適化' },
          { type: 'tip', content: 'パフォーマンス改善は測定が大前提です。「改善前後でLighthouseスコアを計測して比較して」と指示することで、効果を定量的に確認できます。' },
        ],
      },
    ],
  },

  // ─── Part 6: チーム・組織での活用 ───────────────────────────────────────
  {
    id: 'p6-c1',
    part: 6,
    partLabel: 'チーム・組織での活用',
    title: 'CLAUDE.mdによるチーム設定',
    description: 'チーム全員が一貫したClaude Code体験を得るためのCLAUDE.md設計',
    icon: '👥',
    difficulty: 'advanced',
    estimatedMinutes: 30,
    tags: ['チーム', 'CLAUDE.md', '規約', '共有設定'],
    chapters: [
      {
        id: 'ch1',
        title: 'チーム向けCLAUDE.mdの設計',
        content: [
          { type: 'flow' as const, title: 'チーム設定の共有フロー', nodes: [
            { label: 'CLAUDE.md作成', desc: 'チームルールを記述', color: 'accent' },
            { label: 'git commit', desc: 'バージョン管理に登録', color: 'accent' },
            { label: 'チームがpull', desc: '全員が最新ルール取得', color: 'accent' },
            { label: '共有ルール適用', desc: '一貫した開発体験', color: 'green' },
          ]},
          { type: 'text', content: 'チームでClaude Codeを使う場合、CLAUDE.mdを共通のルール文書として設計することが重要です。新メンバーのオンボーディングや一貫性のある開発体験を実現します。' },
          { type: 'code', language: 'markdown', content: '# [プロジェクト名] — Claude Code設定\n\n## 重要な原則\n1. テストなしで機能を追加しない\n2. 本番DBに直接書き込まない（テストDBを使う）\n3. セキュリティに関わる変更は必ずレビューを受ける\n4. コミット前に必ず /review を実行する\n\n## 開発ワークフロー\n1. featureブランチを切る\n2. 実装 → テスト → /review\n3. PRを作成、レビュー依頼\n4. CIが通ったらマージ\n\n## アーキテクチャの決定事項\n- APIはRESTful設計（GraphQLは不使用）\n- 認証はJWT（セッションは不使用）\n- ログはJSON形式（console.logは本番では使わない）\n\n## 禁止事項\n- any型の使用（型定義が難しい場合はunknownを使う）\n- コメントアウトされたコードの残存\n- TODO/FIXMEを解決せずにマージ', description: 'チーム向けCLAUDE.md', filename: 'CLAUDE.md' },
        ],
      },
      {
        id: 'ch2',
        title: 'セクション構成のベストプラクティス',
        content: [
          { type: 'text', content: '効果的なCLAUDE.mdには共通のセクション構成があります。' },
          { type: 'steps', steps: [
            { title: '技術スタック', content: 'フレームワーク・言語・主要ライブラリのバージョンと使用方針' },
            { title: 'ファイル構成', content: '重要なフォルダ・ファイルの役割と変更時の注意点' },
            { title: 'コーディング規約', content: 'Lintルール・命名規約・コメントの方針など' },
            { title: 'デプロイ手順', content: 'どのブランチがどの環境にデプロイされるか・デプロイコマンド' },
            { title: '禁止事項', content: 'やってはいけないことを明示的にリストアップ' },
            { title: '未解決事項', content: '既知の技術的負債・TODO・議論中の設計判断' },
          ]},
          { type: 'tip', content: 'CLAUDE.mdが長くなりすぎた場合は @docs/architecture.md のように外部ファイルを参照する形に分割します。CLAUDE.md自体は200行以下が読みやすいです。' },
        ],
      },
      {
        id: 'ch3',
        title: 'ドキュメントとしてのCLAUDE.md',
        content: [
          { type: 'text', content: 'CLAUDE.mdはAI向けの設定ファイルですが、人間のドキュメントとしても機能します。新メンバーのオンボーディング資料になります。' },
          { type: 'highlight', content: '「Claude Codeはこのリポジトリを理解している新しいチームメンバー」と考えてCLAUDE.mdを書くと、ちょうど良い粒度になります。', label: 'CLAUDE.md執筆のコツ' },
          { type: 'text', content: 'CLAUDE.mdをgit管理することで、プロジェクトの決定事項の変遷をgit logで追跡できます。また、PRレビューでCLAUDE.mdの変更もレビューすることで、チームの合意を形成できます。' },
        ],
      },
    ],
  },
  {
    id: 'p6-c2',
    part: 6,
    partLabel: 'チーム・組織での活用',
    title: 'CI/CDへの統合',
    description: 'GitHub ActionsなどCIパイプラインにClaude Codeを組み込んで自動化する',
    icon: '🔄',
    difficulty: 'advanced',
    estimatedMinutes: 35,
    tags: ['CI/CD', 'GitHub Actions', '自動化', 'パイプライン'],
    chapters: [
      {
        id: 'ch1',
        title: 'Claude CodeをCIで使う',
        content: [
          { type: 'flow' as const, title: 'CI/CD統合の流れ', nodes: [
            { label: 'PR作成', desc: 'プルリクエスト発行', color: 'accent' },
            { label: 'GitHub Actions', desc: 'CIワークフロー起動', color: 'accent' },
            { label: 'claude -p', desc: 'ワンショット実行', color: 'accent' },
            { label: 'レビューコメント', desc: 'PRに自動投稿', color: 'green' },
          ]},
          { type: 'text', content: 'Claude CodeはCIパイプラインのステップとして実行できます。プルリクエストの自動コードレビュー・テスト生成・ドキュメント更新などを自動化できます。' },
          { type: 'code', language: 'yaml', content: 'name: Claude Code Review\n\non:\n  pull_request:\n    types: [opened, synchronize]\n\njobs:\n  review:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n        with:\n          fetch-depth: 0\n\n      - name: Setup Node.js\n        uses: actions/setup-node@v4\n        with:\n          node-version: "22"\n\n      - name: Install Claude Code\n        run: npm install -g @anthropic-ai/claude-code\n\n      - name: Run Code Review\n        run: |\n          claude -p "git diff originmain...HEAD のコードをレビューして、\n          問題点をGitHub PRコメント形式で出力して。\n          セキュリティ・パフォーマンス・可読性の観点で。"\n        env:\n          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}', description: 'GitHub Actions でのClaude Code実行', filename: '.github/workflows/claude-review.yml' },
          { type: 'warning', content: 'CIでClaude Codeを実行するとAPIコストが発生します。大量のPRがある場合はコストが高くなる可能性があります。適切なrate limitingを設定してください。' },
        ],
      },
      {
        id: 'ch2',
        title: '自動コードレビューの設定',
        content: [
          { type: 'text', content: 'PRにコメントを自動投稿するCIパイプラインを設定する方法です。' },
          { type: 'steps', steps: [
            { title: 'GitHub Secretの設定', content: 'GitHubリポジトリの Settings > Secrets > Actions に ANTHROPIC_API_KEY を追加。' },
            { title: 'ワークフローファイルの作成', content: '.github/workflows/ にYAMLファイルを作成。プルリクエストトリガーを設定。' },
            { title: 'PRコメントとして投稿', content: 'gh CLI を使ってレビュー結果をPRコメントとして投稿。' },
            { title: 'コスト制限', content: 'max-tokens フラグでレビューの長さを制限してコストを抑制。' },
          ]},
          { type: 'tip', content: 'CIのClaude Code実行は、インタラクティブモードではなくワンショット（claude -p "..."）モードを使います。出力はJSONまたはMarkdownで指定すると後続処理が楽です。' },
        ],
      },
      {
        id: 'ch3',
        title: 'ワークフロー自動化のパターン',
        content: [
          { type: 'text', content: 'CI以外でもClaude Codeを使った自動化パターンを紹介します。' },
          { type: 'steps', steps: [
            { title: '定期的なコード分析', content: '週次でコードベースを分析して技術的負債レポートを生成。チームに共有。' },
            { title: 'リリースノート自動生成', content: 'git logからリリースノートをClaude Codeが生成。マーケティング向けの文章に変換。' },
            { title: 'APIドキュメント更新', content: 'コード変更を検知して、OpenAPI specやREADMEを自動更新。' },
            { title: '翻訳の自動化', content: 'i18nファイルの英語版を作成したら、Claude Codeが日本語・韓国語などに翻訳。' },
          ]},
          { type: 'reference', title: 'Claude Code GitHub Action', url: 'https://github.com/anthropics/claude-code-action', description: 'AnthropicがオープンソースとしてリリースしたGitHub Action。PRへのコメントをClaude Codeが返答するなど、より高度な統合が可能。' },
        ],
      },
    ],
  },
  {
    id: 'p6-c3',
    part: 6,
    partLabel: 'チーム・組織での活用',
    title: 'コスト管理とセキュリティ',
    description: '組織でClaude Codeを使う際のコスト最適化とセキュリティ管理',
    icon: '💰',
    difficulty: 'advanced',
    estimatedMinutes: 25,
    tags: ['コスト', 'セキュリティ', 'ガバナンス', '組織'],
    chapters: [
      {
        id: 'ch1',
        title: 'コスト管理',
        content: [
          { type: 'flow' as const, title: 'コスト管理の流れ', nodes: [
            { label: '使用量を監視', desc: 'ダッシュボードを確認', color: 'accent' },
            { label: '/costで確認', desc: 'セッションコスト把握', color: 'accent' },
            { label: 'モデルを選択', desc: 'タスクに合ったモデル', color: 'accent' },
            { label: '/compactで圧縮', desc: 'コンテキストを節約', color: 'accent' },
            { label: 'コスト削減', desc: '最適な運用コストへ', color: 'green' },
          ]},
          { type: 'text', content: 'Claude CodeのAPI利用には費用がかかります（Claude Proサブスクリプションまたは従量課金）。組織での使用では適切なコスト管理が重要です。' },
          { type: 'command-list', commands: [
            { cmd: '/cost', description: '現在のセッションのコストを確認', example: '> /cost' },
            { cmd: '/status', description: 'トークン使用量を確認', example: '> /status' },
            { cmd: '/compact', description: '会話を圧縮してコンテキストを節約', example: '> /compact' },
          ]},
          { type: 'table', headers: ['コスト削減策', '効果', '実装方法'], rows: [
            ['適切なモデル選択', 'Haikuは Opusの1/15程度のコスト', 'シンプルなタスクにはHaikuを指定'],
            ['コンテキスト圧縮', '長い会話のコストを削減', '/compact を定期実行'],
            ['バッチ処理', 'まとめて処理でAPI呼び出し回数削減', 'ワンショットで複数タスクを指定'],
            ['キャッシュ活用', '同じコンテキストの再利用', 'CLAUDE.mdを簡潔に保つ'],
          ]},
        ],
      },
      {
        id: 'ch2',
        title: 'セキュリティリスクの理解',
        content: [
          { type: 'text', content: '組織でClaude Codeを使う際のセキュリティリスクを把握しておきましょう。' },
          { type: 'warning', content: 'Claude CodeはコードをリモートのAPIに送信します。機密情報（APIキー・個人情報・企業秘密）がコードに含まれている場合、送信前に確認してください。' },
          { type: 'steps', steps: [
            { title: '送信されるデータの把握', content: 'Claude Codeはファイルの内容をAPIに送信します。.claudeignoreで機密ファイルを除外してください。' },
            { title: 'APIキーの管理', content: 'ANTHROPIC_API_KEY は環境変数で管理し、コードや設定ファイルにハードコードしない。定期的にローテーション。' },
            { title: '個人情報の取り扱い', content: '個人情報（氏名・メール・住所等）を含むファイルをClaude Codeに読み込ませる場合は、社内のプライバシーポリシーを確認。' },
            { title: '組織向けプラン', content: 'Anthropic のEnterprise/Teamプランは、プロンプトのデータ学習への使用を除外するオプションがある。' },
          ]},
        ],
      },
      {
        id: 'ch3',
        title: '組織ポリシーの設定',
        content: [
          { type: 'text', content: '組織全体でのClaude Code利用方針を設定する方法です。' },
          { type: 'steps', steps: [
            { title: '利用ガイドラインの策定', content: '何を・誰が・どのプロジェクトで使っても良いかを定義したガイドラインを作成する。' },
            { title: '集中管理のAPIキー', content: 'チーム共通のAPIキーを使い、Anthropicの利用ダッシュボードでコスト・使用量を一元管理。' },
            { title: 'CLAUDE.mdのテンプレート化', content: 'セキュリティルールを含む組織共通のCLAUDE.mdテンプレートを用意し、全プロジェクトで使用。' },
            { title: '定期的な使用状況レビュー', content: '月次でAPI使用量・コスト・セキュリティインシデントをレビューするプロセスを設ける。' },
          ]},
          { type: 'tip', content: 'Anthropicの管理コンソール（console.anthropic.com）でAPI使用量・コスト・モデル別の統計を確認できます。アラートを設定することで予算超過を防げます。' },
        ],
      },
    ],
  },
];
