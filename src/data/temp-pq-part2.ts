import type { PracticeQuestion } from '@/lib/types';

export const pqPart2: PracticeQuestion[] = [
  // ─── p2-c1: 必要なツールのインストール ───────────────────────────────────

  // 1. [beginner] fnmの利点
  {
    id: 'pq-p2c1-1',
    courseId: 'p2-c1',
    type: 'multiple-choice',
    topic: 'Node.jsバージョン管理',
    question: 'Node.jsのバージョン管理ツール「fnm」の主な利点として最も正確なものはどれですか？',
    options: [
      'Node.jsをグローバルにひとつだけインストールするため、余分なストレージを使わない',
      'プロジェクトごとに異なるNode.jsバージョンを切り替えられ、nvmより起動が高速',
      'npmパッケージをキャッシュして再インストールを不要にする機能を持つ',
      'Node.jsのソースコードをビルドして最新版を常に自動適用する',
    ],
    correctIndex: 1,
    explanation: 'fnm（Fast Node Manager）はRustで実装されており、nvmよりシェル起動が高速です。.node-versionや.nvmrcファイルを読み取ってプロジェクトごとにNode.jsバージョンを自動切替できます。選択肢0は誤りで、複数バージョンを共存させるのがバージョン管理ツールの目的です。選択肢2のパッケージキャッシュはfnmの機能ではありません。選択肢3のような自動ビルドも行いません。',
    difficulty: 'beginner',
  },

  // 2. [beginner] core.quotepath false の目的
  {
    id: 'pq-p2c1-2',
    courseId: 'p2-c1',
    type: 'multiple-choice',
    topic: 'gitセットアップ',
    question: '`git config --global core.quotepath false` を設定する主な目的はどれですか？',
    options: [
      'gitがファイルパスを引用符で囲まないようにして、スクリプトでのパース処理を簡略化する',
      '日本語などのマルチバイト文字を含むファイル名が文字化けせず正しく表示されるようにする',
      'ファイルパスに含まれるスペースをgitが正しく解釈できるようにする',
      'gitのコミットメッセージでシングルクォートを使えるようにする',
    ],
    correctIndex: 1,
    explanation: 'Gitはデフォルトでマルチバイト文字（日本語など）を`\\350\\252\\244`のようなオクタルエスケープで表示します。`core.quotepath false`を設定すると、日本語ファイル名がそのまま表示されるようになります。選択肢0は表面的には正しいですが目的ではありません。選択肢2のスペースはquotepathとは別の問題です。選択肢3のコミットメッセージとは無関係です。',
    difficulty: 'beginner',
  },

  // 3. [intermediate] Node.js v22推奨の理由
  {
    id: 'pq-p2c1-3',
    courseId: 'p2-c1',
    type: 'multiple-choice',
    topic: 'Node.jsバージョン要件',
    question: 'Claude CodeがNode.js v22を推奨し、v16では問題が生じる可能性がある主な理由はどれですか？',
    options: [
      'v16ではnpmコマンドが使えないため、Claude Codeのインストール自体ができない',
      'Claude CodeがWebSocketsやStreaming APIなどv18以降で安定した機能を多用しており、v16ではランタイムエラーが発生する',
      'v16はLTSサポートが終了済みでセキュリティパッチが当たらず、またClaude Codeが依存するNode.js APIがv18+で追加されたものを含む',
      'v16ではTypeScriptのコンパイルに対応していないためソースの解析に失敗する',
    ],
    correctIndex: 2,
    explanation: 'Node.js v16はEOL（サポート終了）を迎えており、セキュリティ修正が提供されません。さらにClaude CodeはFetch APIネイティブサポートやutil.parseArgs等のv18/v20以降で追加・安定したAPIを利用するため、v16では動作が保証されません。選択肢0は誤りで、v16でもnpmは使えます。選択肢1は一部正しい側面もありますがLTSサポート終了という核心を外しています。選択肢3はNode.jsとTypeScriptコンパイルの関係を誤解しています。',
    difficulty: 'intermediate',
  },

  // 4. [intermediate] gitとClaude Codeを組み合わせた安全な開発フロー
  {
    id: 'pq-p2c1-4',
    courseId: 'p2-c1',
    type: 'multiple-choice',
    topic: 'git + Claude Code開発フロー',
    question: 'gitとClaude Codeを組み合わせて安全に開発するフローとして最も推奨されるものはどれですか？',
    options: [
      'mainブランチで作業し、Claude Codeが変更したファイルをすべてgit addした後にまとめてコミットする',
      '作業前にfeatureブランチを切り、Claude Codeの変更をdiffで確認してから必要な変更のみをステージングしてコミットする',
      'Claude Codeに変更を依頼するたびに自動でコミットされるよう.gitconfigにpost-checkoutフックを設定する',
      'Claude Codeを使用中はgit statusを実行しないようにする。Claude Codeが管理しているためコンフリクトが起きやすい',
    ],
    correctIndex: 1,
    explanation: 'featureブランチで作業することで、意図しない変更がmainに混入するリスクを防ぎます。Claude Codeの変更を`git diff`で確認してから選択的にステージングすることで、AI生成コードの品質を担保できます。選択肢0のmainブランチ直接作業はリスクが高いです。選択肢2のような自動コミットは意図しない変更をコミット履歴に混入させます。選択肢3は誤りで、git statusはClaude Code使用中も積極的に確認すべきです。',
    difficulty: 'intermediate',
  },

  // 5. [advanced prompt-writing] 新メンバーのローカル環境セットアップ手順
  {
    id: 'pq-p2c1-5',
    courseId: 'p2-c1',
    type: 'prompt-writing',
    topic: 'ローカル環境構築ドキュメント',
    question: '新しく参加したチームメンバーが迷わずローカル開発環境を構築できるよう、セットアップ手順書をClaude Codeに作成させるプロンプトを書いてください。',
    scenario: 'あなたはNode.js v22 + TypeScript + gitを使ったWebアプリプロジェクトのリードエンジニアです。新しいメンバーが来るたびに環境構築で詰まるケースが多く、再現性の高い手順書が必要です。fnmを使ったNode.jsインストール、gitの初期設定（core.quotepath含む）、SSH鍵設定、依存パッケージのインストール、動作確認コマンドまでを網羅する必要があります。',
    modelAnswer: `以下の条件を満たすローカル開発環境セットアップ手順書を Markdown 形式で作成してください。

## 対象OS
- macOS（Apple Silicon / Intel）
- Windows 11（WSL2 + Ubuntu 22.04）
- Ubuntu 22.04 LTS

## 手順書に含める内容（この順序で）

1. **前提確認**
   - 対応OSとバージョンの確認方法
   - 必要なディスク空き容量（最低5GB）

2. **fnmのインストールとNode.js v22のセットアップ**
   - OS別インストールコマンド
   - シェルプロファイル（.zshrc / .bashrc）への追記内容
   - \`fnm install 22\` と \`fnm use 22\` の実行
   - \`node --version\` でv22が表示されることの確認

3. **gitの初期設定**
   - \`git config --global user.name\` / \`user.email\` の設定
   - \`git config --global core.quotepath false\` の設定（理由も説明）
   - \`git config --global init.defaultBranch main\` の設定

4. **SSH鍵の生成とGitHubへの登録**
   - Ed25519鍵の生成コマンド
   - \`~/.ssh/config\` の設定例
   - GitHubへの公開鍵登録手順（スクリーンショット不要、URLとUI操作の文章説明）
   - \`ssh -T git@github.com\` での疎通確認

5. **リポジトリのクローンと依存パッケージインストール**
   - クローンコマンド
   - \`npm install\` の実行
   - \`.env.example\` から \`.env.local\` を作成する手順と必須環境変数の説明

6. **動作確認**
   - 開発サーバー起動コマンドと確認URL
   - テスト実行コマンド
   - 正常動作時に表示される出力例

## 品質要件
- 各コマンドはコードブロックで記載する
- エラーが起きやすいポイントには「⚠️ つまずきポイント」として注記する
- 所要時間の目安を冒頭に記載する
- 初めてNode.js開発をする人でも理解できる平易な日本語で書く`,
    evaluationCriteria: [
      '対象OS（macOS / Windows WSL2 / Ubuntu）を明示し、OS別の差異に対応するよう指示している',
      'fnmを使ったNode.js v22のインストールとシェルプロファイル設定が手順に含まれている',
      'git設定（core.quotepath false含む）とSSH鍵設定が具体的なコマンドとともに指定されている',
      '動作確認コマンドと期待される出力例の記載を要求している',
      'つまずきポイントや品質要件（コードブロック・平易な日本語など）が指定されている',
    ],
    explanation: '環境構築手順書は「誰が」「どのOSで」読むかを最初に明示することが重要です。OS別の分岐が必要な箇所を指定し、つまずきポイントの注記や動作確認手順まで含めることで、AI生成のドキュメントが実際に使えるレベルになります。',
    difficulty: 'advanced',
  },

  // ─── p2-c2: Claude Codeのインストールと認証 ─────────────────────────────

  // 1. [beginner] インストールコマンド
  {
    id: 'pq-p2c2-1',
    courseId: 'p2-c2',
    type: 'multiple-choice',
    topic: 'Claude Codeインストール',
    question: 'Claude Codeをグローバルインストールする正しいコマンドはどれですか？',
    options: [
      'npm install claude-code',
      'npm install -g @anthropic-ai/claude-code',
      'npx install @anthropic/claude',
      'npm install -g claude',
    ],
    correctIndex: 1,
    explanation: 'Claude Codeの正式パッケージ名は`@anthropic-ai/claude-code`です。`-g`フラグでグローバルインストールすることで、どのディレクトリからでも`claude`コマンドが使えるようになります。選択肢0はパッケージ名が誤りで`-g`もありません。選択肢2の`npx install`は存在しないコマンドです。選択肢3の`claude`はパッケージ名が誤りです。',
    difficulty: 'beginner',
  },

  // 2. [beginner] APIキーを環境変数で設定する方法
  {
    id: 'pq-p2c2-2',
    courseId: 'p2-c2',
    type: 'multiple-choice',
    topic: 'APIキー設定',
    question: 'ANTHROPIC_API_KEYを環境変数として永続的に設定する方法として最も適切なものはどれですか？',
    options: [
      'ターミナルで `set ANTHROPIC_API_KEY=sk-ant-xxxx` を実行する（Windowsのみ有効）',
      'プロジェクトルートの `claude.config.json` に `{"apiKey": "sk-ant-xxxx"}` と記述する',
      'シェルのプロファイルファイル（.zshrcや.bashrc）に `export ANTHROPIC_API_KEY="sk-ant-xxxx"` を追記する',
      'Claude Code起動時に毎回 `claude --api-key sk-ant-xxxx` オプションで渡す',
    ],
    correctIndex: 2,
    explanation: 'シェルプロファイル（.zshrcや.bashrc）に`export`で設定することで、新しいターミナルセッションでも自動的に環境変数が読み込まれます。選択肢0のWindowsの`set`コマンドはセッション内のみ有効で永続しません。選択肢1の`claude.config.json`はClaude Codeの設定ファイルではなく、APIキーをファイルに直接書くことはセキュリティリスクです。選択肢3は毎回入力が必要で非効率かつコマンド履歴にキーが残るリスクがあります。',
    difficulty: 'beginner',
  },

  // 3. [intermediate] グローバル vs ローカルインストール
  {
    id: 'pq-p2c2-3',
    courseId: 'p2-c2',
    type: 'multiple-choice',
    topic: 'npmインストール方式',
    question: 'Claude Codeをグローバルインストール（`-g`）するべき理由として最も適切なものはどれですか？',
    options: [
      'ローカルインストールではnode_modulesにバイナリが作成されず、npmスクリプト以外から起動できないため',
      'グローバルインストールすると自動的にAPIキーが全プロジェクトで共有されるため',
      'ローカルインストールではTypeScriptの型チェックが無効になるため',
      'グローバルインストールの方がセキュリティ的に安全で、ローカルインストールは推奨されないため',
    ],
    correctIndex: 0,
    explanation: 'CLIツールはグローバルインストールが適切です。ローカルインストール（`-g`なし）でも`npx claude`で実行できますが、任意のディレクトリから直接`claude`コマンドを呼べるのはグローバルインストール時のみです。選択肢1のAPIキー共有はインストール方法と無関係です。選択肢2のTypeScript型チェックとも無関係です。選択肢3はむしろ逆で、グローバルインストールは悪意あるパッケージのリスクがローカルより高いとも言えます。',
    difficulty: 'intermediate',
  },

  // 4. [intermediate] APIキーの安全な管理
  {
    id: 'pq-p2c2-4',
    courseId: 'p2-c2',
    type: 'multiple-choice',
    topic: 'APIキーセキュリティ',
    question: 'APIキーを安全に管理するベストプラクティスとして誤っているものはどれですか？',
    options: [
      'APIキーを`.env`ファイルに記述し、`.gitignore`に`.env`を追加してリポジトリに含めない',
      'チームメンバーと共有する際はSlackのDMやメールでAPIキーをテキスト送信する',
      'Anthropicコンソールでキーに使用制限（月額上限）を設定しておく',
      'ターミナルに直接`export ANTHROPIC_API_KEY=...`と入力する場合、コマンド履歴に残らないよう注意する',
    ],
    correctIndex: 1,
    explanation: 'SlackのDMやメールでAPIキーをテキスト送信することはセキュリティ上最もリスクの高い行為です。ログが残り、アカウントが漏洩した際にキーも流出します。APIキーの共有には専用のシークレット管理ツール（1Password, AWS Secrets Managerなど）を使うべきです。選択肢0の`.gitignore`での除外は必須のベストプラクティスです。選択肢2の使用制限設定は被害を最小化する正しい対策です。選択肢3のシェル履歴への注意も正しい配慮です。',
    difficulty: 'intermediate',
  },

  // 5. [advanced prompt-writing] トラブルシューティング手順
  {
    id: 'pq-p2c2-5',
    courseId: 'p2-c2',
    type: 'prompt-writing',
    topic: 'Claude Codeセットアップトラブルシューティング',
    question: 'Claude Code初回セットアップ時に起きやすいトラブルとその解決手順をまとめたガイドを、Claude Codeに作成させるプロンプトを書いてください。',
    scenario: 'あなたは社内エンジニア向けにClaude Codeの利用を展開しようとしています。初回セットアップ時のよくある問題（npmパーミッションエラー、APIキー認識されない、`command not found`、バージョン不一致など）に対するトラブルシューティングガイドが必要です。サポート担当者が1次対応できるレベルの内容にしたいです。',
    modelAnswer: `Claude Codeの初回セットアップに関するトラブルシューティングガイドをMarkdown形式で作成してください。

## 対象環境
- macOS 13以降、Windows 11（WSL2）、Ubuntu 22.04 LTS
- Node.js v22（fnmでインストール済み想定）
- 対象読者：ITサポート担当者（Claude Code未経験）

## ガイドに含めるトラブルシューティング項目

### 1. インストール時のエラー
- **npmパーミッションエラー**（\`EACCES: permission denied\`）
  - 原因の説明
  - fnmやnvmを使った解決策（sudo不使用推奨）
  - sudoを使う場合の注意点

- **ネットワーク/プロキシエラー**（\`ETIMEDOUT\`, \`ECONNREFUSED\`）
  - 企業プロキシ環境での\`npm config set proxy\`設定方法

### 2. \`claude\` コマンドが見つからない（command not found）
  - PATHが通っていない場合の確認方法（\`echo $PATH\`, \`which claude\`）
  - fnm/nvmのシェルプロファイル未設定の場合の対処
  - グローバルインストール先の確認方法（\`npm root -g\`）

### 3. APIキーが認識されない
  - \`ANTHROPIC_API_KEY\`が設定されているかの確認方法
  - シェルプロファイルへの追記後に\`source ~/.zshrc\`が必要なケース
  - \`/login\`コマンドを使った代替認証フロー
  - APIキーの形式確認（\`sk-ant-\`で始まるか）

### 4. バージョン不一致エラー
  - \`claude --version\`で確認したバージョンが古い場合の更新コマンド
  - Node.jsバージョンがv16以下の場合の対処（fnmでv22に切り替え）

### 5. 認証後もAPIエラーが出る
  - APIキーの使用制限（レート制限・月次上限）の確認方法
  - Anthropic Statusページの確認推奨

## 各項目のフォーマット
- 症状（エラーメッセージの具体例をコードブロックで）
- 原因（1〜2文で簡潔に）
- 解決手順（番号付きリスト＋コマンドはコードブロック）
- 解決しない場合のエスカレーション先（Anthropicドキュメント等のURL記載箇所）

## 品質要件
- 各解決手順は5分以内で実施できる粒度にする
- コマンドはコピー&ペーストで実行できるよう完全な形で記載
- IT知識があってもClaude Code未経験者が1人で解決できる記述レベル`,
    evaluationCriteria: [
      '対象OS・Node.jsバージョン・対象読者のスキルレベルが明示されている',
      '主要トラブル（パーミッションエラー、command not found、APIキー未認識、バージョン不一致）が網羅されている',
      '各項目に症状・原因・解決手順という構造を指定している',
      'コードブロックでの記載など、コピー&ペースト可能なフォーマットを要求している',
      '5分以内で解決できる粒度という品質基準が含まれている',
    ],
    explanation: 'トラブルシューティングガイドを作成させるプロンプトでは、「誰が使うか」という読者像と「各トラブルの構造（症状・原因・解決手順）」を明示することが重要です。実際のエラーメッセージの具体例を含めるよう指示することで、AIが抽象的な説明ではなく実用的な内容を生成するよう誘導できます。',
    difficulty: 'advanced',
  },

  // ─── p2-c3: 初期設定とCLAUDE.md ─────────────────────────────────────────

  // 1. [beginner] CLAUDE.mdの主な目的
  {
    id: 'pq-p2c3-1',
    courseId: 'p2-c3',
    type: 'multiple-choice',
    topic: 'CLAUDE.mdの役割',
    question: 'CLAUDE.mdファイルの主な目的として最も正確なものはどれですか？',
    options: [
      'Claude Codeのバージョンとライセンス情報を記録するファイル',
      'プロジェクトの概要・コーディング規約・禁止事項などをClaude Codeに事前に伝えるコンテキストファイル',
      'Claude Codeが生成したコードを自動的に保存するログファイル',
      'APIキーと認証情報を安全に保存するための暗号化設定ファイル',
    ],
    correctIndex: 1,
    explanation: 'CLAUDE.mdはプロジェクトのルートや`~/.claude/`に置くMarkdownファイルで、Claude Codeがセッション開始時に自動で読み込みます。プロジェクトの技術スタック・禁止コマンド・コーディング規約などを記述することで、毎回同じ説明をせずにAIが文脈を把握した状態で作業できます。選択肢0・2・3はいずれもCLAUDE.mdの実際の役割とは異なります。',
    difficulty: 'beginner',
  },

  // 2. [beginner] settings.jsonの場所
  {
    id: 'pq-p2c3-2',
    courseId: 'p2-c3',
    type: 'multiple-choice',
    topic: 'settings.json設定',
    question: 'Claude Codeのグローバル設定ファイル（settings.json）が置かれる場所として正しいものはどれですか？',
    options: [
      '各プロジェクトのルートにある `.claude/settings.json`',
      'ホームディレクトリの `~/.claude/settings.json`',
      'npm のグローバルインストール先にある `node_modules/@anthropic-ai/claude-code/settings.json`',
      'OSのシステム設定フォルダにある `/etc/claude/settings.json`',
    ],
    correctIndex: 1,
    explanation: 'グローバル設定は`~/.claude/settings.json`（ホームディレクトリ直下の.claudeフォルダ）に保存され、全プロジェクトに適用されます。プロジェクト固有の設定は選択肢0の`.claude/settings.json`に置きます（こちらはプロジェクトスコープ）。選択肢2のnode_modules内は読み取り専用のパッケージコードであり、選択肢3のような/etcパスはClaude Codeでは使用されません。',
    difficulty: 'beginner',
  },

  // 3. [intermediate] CLAUDE.mdに書くべき禁止事項
  {
    id: 'pq-p2c3-3',
    courseId: 'p2-c3',
    type: 'multiple-choice',
    topic: 'CLAUDE.md設計',
    question: 'CLAUDE.mdの「禁止事項」セクションに記載すべき内容として最も適切なものはどれですか？',
    options: [
      'Claude Codeのバージョン番号とリリース日付',
      'チームメンバーの名前とGitHubアカウント一覧',
      '本番DBへの直接接続禁止・`git push --force`禁止・`.env`ファイルの内容をコミット禁止などの破壊的操作の制限',
      'コードレビューの担当者と承認プロセスの手順',
    ],
    correctIndex: 2,
    explanation: 'CLAUDE.mdの禁止事項には、Claude Codeが意図せず実行すると取り返しのつかない操作を明示します。代表的なものは「本番DBへのDDL実行禁止」「強制プッシュ禁止」「シークレット情報のハードコード禁止」などです。これらを明示しておくことで、AIが自律的に作業する際のリスクを大幅に低減できます。選択肢0・1・3はCLAUDE.mdではなく別の文書に記載すべき内容です。',
    difficulty: 'intermediate',
  },

  // 4. [intermediate] グローバルとプロジェクトCLAUDE.mdの優先順位
  {
    id: 'pq-p2c3-4',
    courseId: 'p2-c3',
    type: 'multiple-choice',
    topic: 'CLAUDE.md優先順位',
    question: 'グローバルの`~/.claude/CLAUDE.md`とプロジェクトの`CLAUDE.md`が両方存在するとき、Claude Codeはどのように扱いますか？',
    options: [
      'プロジェクトの`CLAUDE.md`のみを読み込み、グローバルは無視される',
      'グローバルの`~/.claude/CLAUDE.md`のみを読み込み、プロジェクトのものは無視される',
      '両方を読み込み、プロジェクトの`CLAUDE.md`の内容がグローバルの設定より優先される',
      '両方を読み込み、後から読まれるグローバル設定が常にプロジェクト設定を上書きする',
    ],
    correctIndex: 2,
    explanation: 'Claude Codeはグローバルとプロジェクト両方のCLAUDE.mdを読み込み、コンテキストとして統合します。内容が競合する場合はプロジェクト固有の指示が優先されます。これにより、グローバルに共通のコーディングスタイルを設定しつつ、プロジェクトごとに上書きや追加設定が可能になります。選択肢0・1はどちらか一方のみを読む誤った理解です。選択肢3の「グローバルが優先」は逆です。',
    difficulty: 'intermediate',
  },

  // 5. [advanced prompt-writing] CLAUDE.md生成プロンプト
  {
    id: 'pq-p2c3-5',
    courseId: 'p2-c3',
    type: 'prompt-writing',
    topic: 'CLAUDE.md作成',
    question: '実際のNode.js + TypeScriptプロジェクト用のCLAUDE.mdを、Claude Codeに生成させるプロンプトを書いてください。',
    scenario: 'あなたはNext.js 15 + TypeScript + PostgreSQL（Prisma ORM）を使ったSaaSプロダクトを開発しています。チームは5名で、GitHub Actions CI/CD、Vercelデプロイを使っています。Claude Codeを全員が使い始めるにあたり、統一されたCLAUDE.mdを整備したいと考えています。',
    modelAnswer: `このプロジェクト用の CLAUDE.md を作成してください。以下の情報を元に、Claude Codeが開発作業を安全・効率的に支援できるよう最適化してください。

## プロジェクト情報

**技術スタック:**
- フレームワーク: Next.js 15（App Router）
- 言語: TypeScript 5.x（strict: true）
- DB: PostgreSQL 16 + Prisma ORM
- テスト: Vitest + Testing Library
- CI/CD: GitHub Actions
- デプロイ: Vercel（mainブランチ自動デプロイ）

**ディレクトリ構成の概要:**
\`\`\`
src/
├── app/          # Next.js App Router
├── components/   # 共通UIコンポーネント
├── lib/          # ユーティリティ・DB接続
├── server/       # Server Actions
└── types/        # 型定義
prisma/
└── schema.prisma
\`\`\`

## CLAUDE.mdに含めるべきセクション

1. **プロジェクト概要**（2〜3文でプロダクトの目的を記述）

2. **技術スタックと重要ファイル**
   - 上記スタック一覧
   - よく触るファイルへのパス案内

3. **禁止事項**（以下を必ず含める）
   - \`prisma db push\`をproduction環境で直接実行禁止（マイグレーションファイル経由のみ）
   - \`git push --force\`禁止（main/developブランチ）
   - \`.env.local\`や\`.env.production\`のコミット禁止
   - \`console.log\`をコミットに含めない
   - any型の使用禁止（TypeScript strict準拠）

4. **コーディング規約**
   - コンポーネント: 関数コンポーネント + TypeScript Props型定義必須
   - Server Actions: \`src/server/\`配下に配置
   - エラーハンドリング: Result型またはtry-catchを統一パターンで使用
   - インポート順: 外部ライブラリ → 内部モジュール → 相対パス
   - テスト: 新機能追加時はVitestのユニットテスト必須

5. **開発コマンド一覧**
   - dev, build, test, prisma migrate, lint の各コマンド

6. **よくある作業パターン**（Claude Codeへのヒント）
   - 新しいAPIルート追加時の手順
   - Prismaスキーマ変更時のマイグレーション手順

## 出力フォーマット要件
- Markdownで記述し、各セクションに見出し（##）を使う
- 禁止事項はチェックリスト形式（- [ ]）で列挙する
- コマンドはコードブロック（\`\`\`bash）で記載する
- 全体で100行以内に収める（簡潔さを重視）`,
    evaluationCriteria: [
      '技術スタック（Next.js、TypeScript、Prisma、Vercelなど）が具体的に列挙されている',
      '禁止事項（本番DBへの直接操作禁止、強制プッシュ禁止、シークレットのコミット禁止など）が明示されている',
      'コーディング規約（型定義必須、any型禁止、テスト要件など）が含まれている',
      'CLAUDE.mdのセクション構成（プロジェクト概要・禁止事項・規約・コマンド）が指定されている',
      '出力フォーマット要件（Markdown形式、行数制限、コードブロック使用など）が指定されている',
    ],
    explanation: 'CLAUDE.md生成プロンプトは「技術スタックの具体的な列挙」と「禁止事項の明示」が最も重要です。禁止事項は抽象的ではなく「`prisma db push`をproduction環境で直接実行禁止」のように具体的なコマンドレベルで指定することで、AIが実際に守れるルールになります。また出力フォーマット（行数制限など）を指定することで、実用的な長さのドキュメントが生成されます。',
    difficulty: 'advanced',
  },
];
