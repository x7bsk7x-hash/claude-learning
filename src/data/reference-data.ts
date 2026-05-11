export interface SlashCommand {
  cmd: string;
  description: string;
  example?: string;
  category: 'session' | 'model' | 'config' | 'tools' | 'git';
}

export interface KeyboardShortcut {
  keys: string[];
  description: string;
  context?: string;
}

export const slashCommands: SlashCommand[] = [
  // セッション管理
  { cmd: '/clear', description: '会話履歴をリセット', example: '/clear', category: 'session' },
  { cmd: '/compact', description: '会話を圧縮してコンテキストを節約', example: '/compact', category: 'session' },
  { cmd: '/status', description: 'APIキー・モデル・コンテキスト使用量を表示', example: '/status', category: 'session' },
  { cmd: '/cost', description: 'セッションのトークン使用量とコストを表示', example: '/cost', category: 'session' },
  { cmd: '/quit', description: 'Claude Codeを終了（Ctrl+Dも可）', example: '/quit', category: 'session' },
  { cmd: '/help', description: '使用可能なコマンドの一覧を表示', example: '/help', category: 'session' },

  // モデル設定
  { cmd: '/model', description: '使用するモデルを切り替え', example: '/model claude-opus-4-7', category: 'model' },
  { cmd: '/fast', description: 'Opusの高速モードをトグル', example: '/fast', category: 'model' },
  { cmd: '/ultrathink', description: 'Opus 4の拡張思考モードを起動', example: '/ultrathink この設計の問題を分析して', category: 'model' },

  // 設定・管理
  { cmd: '/config', description: '設定ファイルを開いて編集', example: '/config', category: 'config' },
  { cmd: '/doctor', description: '環境設定の診断', example: '/doctor', category: 'config' },
  { cmd: '/login', description: 'Anthropicアカウントでログイン', example: '/login', category: 'config' },
  { cmd: '/logout', description: 'ログアウト', example: '/logout', category: 'config' },
  { cmd: '/memory', description: 'メモリファイルを確認・編集', example: '/memory', category: 'config' },
  { cmd: '/permissions', description: 'ツール権限の設定を確認・変更', example: '/permissions', category: 'config' },
  { cmd: '/release-notes', description: '最新バージョンのリリースノートを表示', example: '/release-notes', category: 'config' },
  { cmd: '/terminal-setup', description: 'ターミナル設定を最適化', example: '/terminal-setup', category: 'config' },
  { cmd: '/vim', description: 'Vimキーバインドのオン/オフ切替', example: '/vim', category: 'config' },

  // プロジェクト・ツール
  { cmd: '/init', description: 'プロジェクトを分析してCLAUDE.mdを生成', example: '/init', category: 'tools' },
  { cmd: '/review', description: '現在のgit changesをコードレビュー', example: '/review', category: 'git' },
  { cmd: '/pr_comments', description: 'GitHub PRのコメントを取得', example: '/pr_comments', category: 'git' },
];

export const keyboardShortcuts: KeyboardShortcut[] = [
  { keys: ['Ctrl', 'C'], description: '現在のリクエストをキャンセル', context: '応答生成中に中断' },
  { keys: ['Ctrl', 'D'], description: 'Claude Codeを終了', context: '/quitと同じ' },
  { keys: ['↑'], description: '直前の入力を呼び出す', context: '入力履歴をさかのぼる' },
  { keys: ['↓'], description: '入力履歴を次へ進む', context: '入力履歴を戻す' },
  { keys: ['Shift', 'Enter'], description: '改行（複数行入力）', context: 'Enterキーのみだと送信される' },
  { keys: ['Tab'], description: 'スラッシュコマンドを補完', context: '/の後に入力して補完' },
  { keys: ['Escape'], description: '入力をキャンセル', context: '入力中の内容をクリア' },
  { keys: ['Ctrl', 'R'], description: '入力履歴をインクリメンタル検索', context: '過去の入力を検索' },
];

export const permissionTools = [
  { name: 'Read', description: 'ファイルを読み込む', risk: 'low' as const },
  { name: 'Write', description: '新規ファイルを作成する', risk: 'medium' as const },
  { name: 'Edit', description: '既存ファイルを編集する', risk: 'medium' as const },
  { name: 'Bash', description: 'シェルコマンドを実行する', risk: 'high' as const },
  { name: 'Glob', description: 'ファイルパターン検索', risk: 'low' as const },
  { name: 'Grep', description: 'テキスト検索', risk: 'low' as const },
  { name: 'WebFetch', description: 'URLからコンテンツ取得', risk: 'medium' as const },
  { name: 'WebSearch', description: 'Web検索', risk: 'medium' as const },
  { name: 'Agent', description: 'サブエージェントを起動', risk: 'high' as const },
];

export const mcpServers = [
  { name: 'GitHub', package: '@modelcontextprotocol/server-github', description: 'Issue・PR・リポジトリの操作' },
  { name: 'PostgreSQL', package: '@modelcontextprotocol/server-postgres', description: 'DBクエリ・スキーマ確認' },
  { name: 'Brave Search', package: '@modelcontextprotocol/server-brave-search', description: 'リアルタイムWeb検索' },
  { name: 'Filesystem', package: '@modelcontextprotocol/server-filesystem', description: 'ファイルシステムへの安全なアクセス' },
  { name: 'Slack', package: '@modelcontextprotocol/server-slack', description: 'Slackチャンネル・メッセージ操作' },
  { name: 'Google Drive', package: '@modelcontextprotocol/server-gdrive', description: 'Googleドキュメント・スプレッドシート操作' },
  { name: 'Context7', package: '@context7/mcp-server', description: 'ライブラリのリアルタイムドキュメント取得' },
  { name: 'SQLite', package: '@modelcontextprotocol/server-sqlite', description: 'SQLiteデータベースの操作' },
];
