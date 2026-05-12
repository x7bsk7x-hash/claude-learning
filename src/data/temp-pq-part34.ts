import type { PracticeQuestion } from '@/lib/types';

export const pqPart34: PracticeQuestion[] = [

  // ─── p3-c1: Claude Codeの基本操作 ─────────────────────────────────────────

  {
    id: 'pq-p3c1-1',
    courseId: 'p3-c1',
    type: 'multiple-choice',
    topic: 'スラッシュコマンド',
    difficulty: 'beginner',
    question: '/clear と /compact の違いとして正しい説明はどれですか？',
    options: [
      '/clear はコンテキストを圧縮し、/compact は完全に削除する',
      '/clear は会話履歴を完全にリセットし、/compact は長い履歴をAIが要約して圧縮する',
      '/clear はファイルキャッシュをクリアし、/compact はメモリを解放する',
      '/clear と /compact は同じ動作で、どちらも使い方は変わらない',
    ],
    correctIndex: 1,
    explanation:
      '/clear は会話の全履歴を削除して完全にリセットするため、新しい無関係なタスクを始めるときに使います。一方 /compact はコンテキストウィンドウが満杯に近づいたとき、AIが会話の要点を要約して圧縮することでトークンを節約しつつ作業を継続します。①は逆の説明、③はファイルやメモリとは無関係、④は動作が異なるため誤りです。',
  },
  {
    id: 'pq-p3c1-2',
    courseId: 'p3-c1',
    type: 'multiple-choice',
    topic: 'ワンショット実行',
    difficulty: 'beginner',
    question: 'コマンド `claude -p "テストを実行してエラーを報告して"` の用途として最も適切なものはどれですか？',
    options: [
      'インタラクティブなチャットセッションを起動する',
      '指定したプロンプトを1回だけ実行して結果を返し、セッションを終了する（スクリプトや自動化に最適）',
      'プロジェクトの設定ファイルを初期化する',
      '過去のセッションを再開する',
    ],
    correctIndex: 1,
    explanation:
      '`-p`（`--print`）フラグはノンインタラクティブモードで動作し、指定したプロンプトを1回実行して結果を標準出力に返し終了します。CIパイプラインやシェルスクリプトからClaudeを呼び出す際に非常に便利です。①のインタラクティブセッションは `-p` なしの `claude` コマンドで起動します。③の設定初期化は `claude` の `init` コマンド、④の再開は `--continue` フラグを使います。',
  },
  {
    id: 'pq-p3c1-3',
    courseId: 'p3-c1',
    type: 'multiple-choice',
    topic: 'コンテキスト管理',
    difficulty: 'intermediate',
    question: 'セッションのコンテキスト管理のベストプラクティスとして正しいものはどれですか？',
    options: [
      'コンテキストは自動管理されるため、開発者が意識する必要は一切ない',
      '常に /clear を使ってセッションをリセットするのが最も効率的である',
      '無関係なタスクには /clear でリセットし、同一タスクの継続時は /compact で圧縮し、CLAUDE.mdに常時参照すべき情報を書いておく',
      'コンテキストが満杯になったらツールを再起動するしか方法がない',
    ],
    correctIndex: 2,
    explanation:
      '効果的なコンテキスト管理は複数の手段を組み合わせます。①タスクが変わったら /clear で履歴をリセット、②同タスクの継続で履歴が長くなったら /compact で圧縮、③プロジェクト設定やコーディング規約など常に必要な情報はCLAUDE.mdに書いてトークンを節約します。完全自動管理ではなく適切な介入が品質向上につながります。再起動しか方法がないというのは誤りで、/compact や /clear で対処できます。',
  },
  {
    id: 'pq-p3c1-4',
    courseId: 'p3-c1',
    type: 'multiple-choice',
    topic: 'セッション継続',
    difficulty: 'intermediate',
    question: '`claude --continue` フラグの使い所として最も適切な場面はどれですか？',
    options: [
      'まったく新しいプロジェクトを始めるとき',
      'いったんClaudeを終了した後、前回の会話の文脈を引き継いで作業を再開したいとき',
      '複数のターミナルで同時にセッションを起動したいとき',
      'プロジェクトのpackage.jsonを自動生成したいとき',
    ],
    correctIndex: 1,
    explanation:
      '`--continue`（または `-c`）フラグは、直前のセッションの会話履歴をそのまま引き継いでClaudeを起動します。「昨日途中まで書いたコードの続き」や「前回の議論の結論を踏まえて実装を進めたい」といった場面で効果的です。①の新規プロジェクトでは通常の `claude` でよく、③の並列実行とは無関係、④のpackage.json生成もフラグとは無関係です。',
  },
  {
    id: 'pq-p3c1-5',
    courseId: 'p3-c1',
    type: 'prompt-writing',
    topic: 'CI自動化',
    difficulty: 'advanced',
    question: 'GitHub ActionsのCIパイプライン内で `claude -p` を使い、プルリクエストのコード品質を自動チェックする際の指示プロンプトを書いてください。',
    scenario:
      'あなたはNode.js/TypeScriptプロジェクトのCIを整備しています。PRがマージされる前に、Claude Codeを使って「型エラー・未使用変数・関数の複雑度・テストカバレッジ不足」を自動で検出し、問題があれば具体的な修正案とともに報告させたいです。`claude -p` コマンドでノンインタラクティブに実行し、終了コードで合否を返すことが要件です。',
    modelAnswer: `以下のコード品質チェックを実施し、結果をMarkdown形式で報告してください。対象は今回のPRで変更された src/ 以下のTypeScriptファイルです。

## チェック項目

1. **型安全性**: TypeScriptの型エラーおよび any の不適切な使用を検出する
2. **未使用コード**: 未使用の変数・インポート・関数を列挙する
3. **関数の複雑度**: 循環的複雑度が10を超える関数を特定し、リファクタリング案を示す
4. **テストカバレッジ**: 新規追加された関数・クラスにテストが存在しない場合は指摘する
5. **セキュリティ**: ハードコードされたシークレット・SQLインジェクションリスクを確認する

## 出力形式

- 問題が見つかった場合: ファイル名・行番号・問題内容・修正例をテーブルで出力
- 問題がない場合: "✅ All checks passed" とだけ出力
- 重大な問題（型エラー・セキュリティ）が1件でもあれば、最後に "EXIT_CODE: 1" と出力する
- 問題がない、または軽微な警告のみなら "EXIT_CODE: 0" と出力する`,
    evaluationCriteria: [
      'チェック対象（変更ファイル・ディレクトリ）が具体的に指定されている',
      'チェック項目が列挙されており、それぞれの合否基準が明確である',
      '出力形式（Markdown・テーブルなど）が指定されていてCIで解析しやすい',
      '終了コードの出力ルールが定義されており、CIの合否判定に使える',
      '重大度に応じた分類（エラー vs 警告）がある',
    ],
    explanation:
      'CI向けプロンプトは「何をチェックするか」「合否の基準」「出力フォーマット」「終了コードの扱い」を明示することが重要です。Claude自身がEXIT_CODEを出力し、シェルスクリプト側でそれを読み取ることで自動化が成立します。',
  },

  // ─── p3-c2: ファイル操作とコード編集 ──────────────────────────────────────

  {
    id: 'pq-p3c2-1',
    courseId: 'p3-c2',
    type: 'multiple-choice',
    topic: 'Readツール・Writeツール',
    difficulty: 'beginner',
    question: 'Claude CodeのReadツールとWriteツールの使い分けとして正しい説明はどれですか？',
    options: [
      'Readはテキストファイル専用、Writeはバイナリファイル専用',
      'Readはファイルの内容を読み込むだけで変更を加えず、Writeはファイルを新規作成または完全上書きする',
      'ReadとWriteは同じツールの別名で、動作に違いはない',
      'Readはファイルの先頭行のみ読める、Writeは末尾に追記する',
    ],
    correctIndex: 1,
    explanation:
      'Readはファイルを読み取り専用で参照するツールで、コンテンツを変更しません。Writeはファイルを新規作成するか、既存ファイルを全体的に上書きします。既存ファイルの一部だけを変更したい場合はWriteではなくEditツールを使う方が安全・効率的です。①のバイナリ・テキスト区別はなく、③は誤り、④の制限も存在しません。',
  },
  {
    id: 'pq-p3c2-2',
    courseId: 'p3-c2',
    type: 'multiple-choice',
    topic: 'Editツール',
    difficulty: 'beginner',
    question: 'EditツールがWriteツールより優れている点として正しいものはどれですか？',
    options: [
      'Editツールは画像ファイルも編集できるが、Writeツールはできない',
      'Editツールは変更箇所の差分のみを送信するため、大きなファイルでもトークン消費が少なく済む',
      'Editツールを使うとファイルのバックアップが自動作成される',
      'Editツールはシンタックスエラーを自動修正する機能がある',
    ],
    correctIndex: 1,
    explanation:
      'EditツールはWriteツールと異なり、ファイル全体ではなく変更が必要な箇所（old_string→new_string の差分）のみをAPIに送信します。これにより大きなファイルでもトークン消費を大幅に削減できます。①の画像編集機能はなく、③の自動バックアップもなし、④のシンタックス自動修正機能もありません。',
  },
  {
    id: 'pq-p3c2-3',
    courseId: 'p3-c2',
    type: 'multiple-choice',
    topic: '複数ファイルリファクタリング',
    difficulty: 'intermediate',
    question: '複数ファイルにまたがるリファクタリング（例：関数名の一括変更）を安全に行う手順として最も適切なものはどれですか？',
    options: [
      '一度にすべてのファイルを変更するよう指示し、完了後に動作確認する',
      'Claudeに任せて完全自動で行い、人間はレビューしない',
      '変更前にgit commitでスナップショットを取り、GrepでなGlobで対象ファイルを洗い出し、変更ごとに差分確認と承認を行いテストを実行する',
      'バックアップフォルダを手動で作成してから変更を開始する',
    ],
    correctIndex: 2,
    explanation:
      '安全なリファクタリングのフローは①git commitで変更前の状態を保存→②Globやgrepで変更対象ファイルを特定→③各ファイルの変更差分をClaudeが提示→④ユーザーが確認・承認→⑤変更適用→⑥テスト実行です。Claudeは変更前に必ずReadで現在の状態を確認するよう指示が出ます。一括変更後のみ確認では問題発覚時のロールバックが困難になります。',
  },
  {
    id: 'pq-p3c2-4',
    courseId: 'p3-c2',
    type: 'multiple-choice',
    topic: 'Globパターン',
    difficulty: 'intermediate',
    question: '`src/**/*.test.ts` というGlobパターンが一致するファイルはどれですか？',
    options: [
      'src/utils.ts のみ',
      'src/components/Button.test.ts と src/api/auth/login.test.ts の両方',
      'src直下の .test.ts ファイルのみ（サブディレクトリは除外）',
      '.test.ts で終わるすべてのファイル（srcの外も含む）',
    ],
    correctIndex: 1,
    explanation:
      '`**` はゼロ個以上のディレクトリを再帰的に一致させるワイルドカードです。`src/**/*.test.ts` は「srcディレクトリ以下の任意の深さのサブディレクトリにある、.test.ts で終わるすべてのファイル」にマッチします。①は拡張子が違い不一致、③は `**` があるためサブディレクトリも含む、④は `src/` のプレフィックスがあるためsrc外は含みません。',
  },
  {
    id: 'pq-p3c2-5',
    courseId: 'p3-c2',
    type: 'prompt-writing',
    topic: '型安全バリデーション追加',
    difficulty: 'advanced',
    question: '既存のExpressベースのREST APIに、Zodを使った型安全なリクエストバリデーションを追加するようClaude Codeに依頼するプロンプトを書いてください。',
    scenario:
      'src/routes/ 以下に users.ts, products.ts, orders.ts の3ファイルがあります。現在はリクエストボディの型チェックが一切なく、any型で扱っています。Zodライブラリを導入してスキーマ定義を作成し、各エンドポイントにバリデーションミドルウェアを適用したいです。既存のAPIの挙動は変えずにバリデーション層だけ追加してください。',
    modelAnswer: `src/routes/ 以下の users.ts, products.ts, orders.ts に、Zodを使ったリクエストバリデーションを追加してください。

## 作業手順

1. まず3ファイルをReadして現在のエンドポイント定義とリクエスト形式を把握してください
2. \`npm install zod\` を実行してZodを追加してください
3. src/schemas/ ディレクトリを作成し、各ルートに対応するZodスキーマを定義したファイルを作成してください
   - src/schemas/users.ts, products.ts, orders.ts
4. src/middleware/validate.ts にバリデーションミドルウェアを作成してください
   - バリデーション失敗時は 400 Bad Request と { error: "Validation failed", details: [...] } を返す
5. 各ルートファイルにミドルウェアを適用してください

## 制約・要件

- 既存のAPIレスポンスの形式は変更しないこと
- TypeScriptの型推論をZodスキーマから自動生成すること（z.infer を使用）
- any型を完全に排除すること
- 各スキーマファイルにはJSDocコメントを追加すること
- 変更後、既存のテストがある場合は実行して通ることを確認すること`,
    evaluationCriteria: [
      '対象ファイルが具体的に列挙されており、作業前にReadで現状確認する手順が含まれている',
      'Zodスキーマの配置場所と構成（ディレクトリ・ファイル名）が指定されている',
      'バリデーション失敗時のHTTPステータスとレスポンス形式が明示されている',
      '既存APIの挙動を壊さない制約が明示されている',
      'TypeScriptの型安全性に関する要件（z.infer使用・any排除）が含まれている',
    ],
    explanation:
      '既存コードへの機能追加は「現状把握→スキーマ設計→ミドルウェア実装→既存コードへの適用→テスト確認」の順で指示するとClaudeが整合性を保ちながら作業できます。既存挙動を守る制約を明示することが重要です。',
  },

  // ─── p3-c3: デバッグとトラブルシューティング ──────────────────────────────

  {
    id: 'pq-p3c3-1',
    courseId: 'p3-c3',
    type: 'multiple-choice',
    topic: 'エラー情報の伝え方',
    difficulty: 'beginner',
    question: 'Claude Codeにエラーを渡して修正を依頼するとき、最も効果的な方法はどれですか？',
    options: [
      '「エラーが出ています」とだけ伝えて、Claudeに原因を推測させる',
      'エラーメッセージ全文・スタックトレース・発生状況（操作手順）・関連ファイルパスをセットで伝える',
      'エラー画面のスクリーンショットを口頭で説明する',
      'まず自分でエラーを完全に理解してから、解決策だけを聞く',
    ],
    correctIndex: 1,
    explanation:
      '効果的なデバッグ依頼には①エラーメッセージの全文（省略しない）②スタックトレース③エラーが発生する再現手順④関連するファイルのパスが揃っている必要があります。情報が少ないとClaudeは当て推量になり、精度が下がります。スクリーンショットは口頭説明より直接テキストを貼り付ける方が正確です。',
  },
  {
    id: 'pq-p3c3-2',
    courseId: 'p3-c3',
    type: 'multiple-choice',
    topic: 'ロールバック',
    difficulty: 'beginner',
    question: 'Claude Codeに変更を加えてもらった後、意図しない動作になった場合のロールバック手順として正しいものはどれですか？',
    options: [
      'Claudeに「元に戻して」と頼むだけでよい（Claudeが履歴から自動復元する）',
      '作業前に `git commit` でスナップショットを取っておき、問題発生時に `git revert` または `git reset` で元の状態に戻す',
      'ファイルを手動で書き直すしか方法がない',
      'Claude Codeには変更を取り消す機能がないため、バックアップが唯一の手段である',
    ],
    correctIndex: 1,
    explanation:
      'Claude Codeで作業を始める前に必ず `git commit` か `git stash` で現在の状態を保存しておくことが重要です。問題が発生したら `git diff` で変更内容を確認し、`git revert`（コミットを打ち消す）や `git reset --hard HEAD`（コミット前の状態に戻す）を使います。Claudeは変更履歴を保持していないため、「元に戻して」だけでは不確実です。',
  },
  {
    id: 'pq-p3c3-3',
    courseId: 'p3-c3',
    type: 'multiple-choice',
    topic: '段階的デバッグ',
    difficulty: 'intermediate',
    question: '複雑なバグを段階的に解析させる指示の書き方として最も効果的なものはどれですか？',
    options: [
      '「このバグを直して」と一言伝えて、Claudeがすべて解決するのを待つ',
      '「まず原因仮説を3つ挙げて」→「最も可能性の高い仮説を検証するログを追加して」→「ログ結果を見て判断して」と段階を分けて指示する',
      '可能な限り多くの情報を1つのメッセージに詰め込んで一度に解決させる',
      '「なぜ」「どうして」といった質問は避け、直接「修正コードを出して」と指示する',
    ],
    correctIndex: 1,
    explanation:
      '複雑なバグの段階的解析は①原因仮説の列挙→②仮説の優先順位付け→③仮説検証のための情報収集（ログ追加・テスト）→④根本原因の特定→⑤修正→⑥確認という流れが効果的です。一発解決を求めると推測に基づく修正になりがちで、再発リスクがあります。「なぜ」を問うことで表面的な修正でなく根本解決につながります。',
  },
  {
    id: 'pq-p3c3-4',
    courseId: 'p3-c3',
    type: 'multiple-choice',
    topic: 'デバッグ中のgit活用',
    difficulty: 'intermediate',
    question: 'デバッグセッション中にgitを活用する方法として正しいものはどれですか？',
    options: [
      'デバッグ中はgitを使わず、すべて完了してからコミットする',
      'バグ修正の各試行前に `git stash` や `git commit` でチェックポイントを作り、`git diff` で変更を確認しながら進め、正解が見つかったら不要な試行を `git reset` で削除する',
      'git は本番デプロイ後にのみ使うものであり、デバッグ中には不要である',
      'デバッグ中は `git commit --amend` だけを使う',
    ],
    correctIndex: 1,
    explanation:
      'デバッグ中のgit活用法：①試行前に `git stash` か `git commit -m "WIP: hypothesis-1"` でチェックポイントを作る②`git diff` で各変更を確認しClaudeが何を変えたか把握する③行き詰まったら `git reset` や `git stash pop` で前の状態に戻す④正解が見つかったら `git commit` で確定します。チェックポイントがあると「この修正は間違いだった」ときに安全に戻れます。',
  },
  {
    id: 'pq-p3c3-5',
    courseId: 'p3-c3',
    type: 'prompt-writing',
    topic: '本番エラーログ解析',
    difficulty: 'advanced',
    question: '本番環境のエラーログをClaude Codeに渡して、バグの根本原因を特定させ修正させるプロンプトを書いてください。',
    scenario:
      'Next.jsアプリで本番環境（Vercel）にデプロイ後、一部のユーザーで「購入完了ボタンを押すと500エラーになる」という報告が来ています。Vercelのログには以下が記録されています：\n`TypeError: Cannot read properties of undefined (reading \'id\')\n  at processOrder (src/lib/orders.ts:47:23)\n  at POST /api/checkout`\n開発環境では再現しません。',
    modelAnswer: `以下の本番エラーを調査して根本原因を特定し、修正してください。

## エラー情報

\`\`\`
TypeError: Cannot read properties of undefined (reading 'id')
  at processOrder (src/lib/orders.ts:47:23)
  at POST /api/checkout
\`\`\`

- 発生環境: Vercel本番環境のみ（開発環境では未再現）
- 発生条件: 一部のユーザーが購入完了ボタンを押したとき
- 発生頻度: 報告ベースで断続的

## 調査手順（この順で実施してください）

1. src/lib/orders.ts の47行目周辺をReadして、undefined になり得る変数を特定する
2. src/app/api/checkout/route.ts をReadして、processOrder に渡しているデータ構造を確認する
3. 本番と開発で差が出る可能性（環境変数・データの欠損・非同期処理の競合）を仮説として列挙する
4. 最も可能性の高い根本原因を1つ選び、理由を説明する
5. 修正コードを提示する（オプショナルチェーン・nullチェック・エラーハンドリング追加を検討）
6. 修正後に追加すべきテストケースを提案する

## 制約

- 修正は最小限の変更に留めること
- 修正後のコードに any 型を使わないこと
- エラーハンドリングを追加する場合、ユーザーへのエラーメッセージは "購入処理に失敗しました。しばらくしてから再度お試しください。" とすること`,
    evaluationCriteria: [
      'エラーメッセージとスタックトレースの全文が含まれている',
      '発生環境・条件・頻度などの状況情報が整理されている',
      '調査を段階的に進める手順が明示されており、根本原因特定→修正の流れがある',
      '本番のみ発生する原因候補（環境差異）について調査するよう誘導している',
      '修正後のテスト追加など再発防止策への言及がある',
    ],
    explanation:
      '本番バグのデバッグ依頼では「エラーの全情報」「再現条件」「環境差異の情報」を揃えた上で、調査→仮説→修正の段階を明示することで、Claudeが的確な原因特定と安全な修正を行えます。',
  },

  // ─── p4-c1: CLAUDE.mdの活用 ───────────────────────────────────────────────

  {
    id: 'pq-p4c1-1',
    courseId: 'p4-c1',
    type: 'multiple-choice',
    topic: '@include構文',
    difficulty: 'beginner',
    question: 'CLAUDE.mdの `@include` 構文の用途として正しい説明はどれですか？',
    options: [
      '外部URLからドキュメントをリアルタイムで取得してコンテキストに追加する',
      '別のMarkdownファイルの内容をCLAUDE.mdに埋め込み、ルールや設定をファイル分割して管理できるようにする',
      '他のプロジェクトのCLAUDE.mdを共有するためのリンク機能である',
      '特定のファイルをClaudeが読まないようにする除外指定である',
    ],
    correctIndex: 1,
    explanation:
      '`@include` 構文は `@include path/to/file.md` の形式で使い、指定したMarkdownファイルの内容をCLAUDE.mdに展開します。コーディング規約・gitルール・テスト方針などを別ファイルに分割して管理できるため、CLAUDE.mdが肥大化するのを防ぎ、チームで部分的に更新しやすくなります。URLからの取得機能ではなく、ローカルファイルの参照です。',
  },
  {
    id: 'pq-p4c1-2',
    courseId: 'p4-c1',
    type: 'multiple-choice',
    topic: '禁止事項の記載',
    difficulty: 'beginner',
    question: 'CLAUDE.mdに記載すべき「禁止事項」の例として最も適切なものはどれですか？',
    options: [
      '「プログラミングとは何か」の定義',
      '「TypeScriptを使ってください」といった一般的な推奨事項',
      '「本番DBには直接接続しないこと」「.envファイルは絶対に変更しないこと」「masterブランチへの直接プッシュ禁止」',
      '「コードを丁寧に書いてください」といった曖昧な品質基準',
    ],
    correctIndex: 2,
    explanation:
      'CLAUDE.mdの禁止事項は「Claudeが自律的に動く際に絶対やってはいけないこと」を明示します。具体的な例として「本番DBへの直接接続禁止」「.envや認証情報ファイルの変更禁止」「特定ブランチへの直接プッシュ禁止」「外部APIの本番エンドポイントへのテストリクエスト禁止」などが挙げられます。一般的な推奨や曖昧な品質基準は禁止事項として機能しません。',
  },
  {
    id: 'pq-p4c1-3',
    courseId: 'p4-c1',
    type: 'multiple-choice',
    topic: 'CLAUDE.md階層設計',
    difficulty: 'intermediate',
    question: '大規模プロジェクトでのCLAUDE.md階層設計として最も適切な説明はどれですか？',
    options: [
      'CLAUDE.mdはプロジェクトルートに1つだけ置き、すべての設定を1ファイルに集約すべきである',
      'プロジェクトルートにグローバルルール、各サービス・モジュールのディレクトリにそのスコープ固有のルールを記載したCLAUDE.mdを配置し、@includeで共通ルールを参照する',
      'CLAUDE.mdはホームディレクトリにのみ置き、プロジェクトフォルダには置いてはいけない',
      'CLAUDE.mdはClaude Codeが自動生成するため、手動で作成する必要はない',
    ],
    correctIndex: 1,
    explanation:
      'モノレポや大規模プロジェクトでは階層的なCLAUDE.mdが効果的です。ルートには全体共通のルール（git規則・全般的な禁止事項）を、services/api/、services/frontend/ のような各サブプロジェクトには固有のルール（フレームワーク・テスト方針・依存関係）を記載します。Claude Codeはカレントディレクトリとその親ディレクトリのCLAUDE.mdを自動的に読み込みます。',
  },
  {
    id: 'pq-p4c1-4',
    courseId: 'p4-c1',
    type: 'multiple-choice',
    topic: 'git管理・チーム共有',
    difficulty: 'intermediate',
    question: 'チームでCLAUDE.mdをgit管理する主な利点として正しいものはどれですか？',
    options: [
      'CLAUDE.mdをgit管理するとClaudeのAPIコストが削減される',
      'チームメンバー全員が同じプロジェクトルールをClaudeに認識させることができ、コードレビューやPRのコメントでルール更新の議論もできる',
      'git管理するとCLAUDE.mdの内容が自動的に暗号化されてセキュリティが向上する',
      'CLAUDE.mdはgit管理すると読み込まれなくなる仕様がある',
    ],
    correctIndex: 1,
    explanation:
      'CLAUDE.mdをgitリポジトリに含めてチームで共有することで①全員が同じAIの動作ルールを共有できる②ルール変更がPR・コードレビューの対象になりチームで議論できる③新規参加者がCloneするだけで同じ環境になる④変更履歴が追跡できるといった利点があります。APIコスト削減や暗号化とは無関係です。',
  },
  {
    id: 'pq-p4c1-5',
    courseId: 'p4-c1',
    type: 'prompt-writing',
    topic: 'CLAUDE.md作成',
    difficulty: 'advanced',
    question: 'マイクロサービス構成のプロジェクト用CLAUDE.mdを作成するようClaude Codeに依頼するプロンプトを書いてください。',
    scenario:
      'あなたはECサイトのバックエンドを担当しており、services/auth（Node.js/TypeScript）、services/products（Python/FastAPI）、services/orders（Go）の3サービスがモノレポで管理されています。Dockerで各サービスを起動し、GitHub Actionsでデプロイしています。このプロジェクト全体と各サービス向けのCLAUDE.mdを設計・作成したいです。',
    modelAnswer: `このモノレポプロジェクト用のCLAUDE.mdを階層構造で作成してください。

## プロジェクト構成

- services/auth: Node.js/TypeScript（Express + Prisma）
- services/products: Python/FastAPI（SQLAlchemy）
- services/orders: Go（Gin フレームワーク）
- インフラ: Docker Compose + GitHub Actions

## 作成するファイル

1. **ルート CLAUDE.md** に以下を記載してください
   - プロジェクト概要とモノレポ構成の説明
   - 全サービス共通の禁止事項（本番DBへの直接アクセス禁止・mainへの直接プッシュ禁止・.envファイル変更禁止）
   - サービス間通信の規約（REST API・エンドポイント命名規則）
   - Git規約（コミットメッセージ形式・ブランチ命名規則）
   - @include で各サービスのCLAUDE.mdを参照する構造

2. **services/auth/CLAUDE.md** に以下を記載してください
   - 使用技術スタック（Node.js バージョン・主要パッケージ）
   - テスト方針（Jest使用・カバレッジ閾値80%）
   - Prismaマイグレーションの手順と注意事項

3. **services/products/CLAUDE.md** に以下を記載してください
   - Python環境（バージョン・仮想環境の場所）
   - テスト方針（pytest使用）
   - FastAPIのルーティング規約

4. **services/orders/CLAUDE.md** に以下を記載してください
   - Goモジュール構成
   - テスト方針（go test）
   - エラーハンドリング規約（errors.Wrap使用）

## 形式要件

- 各ファイルは300行以内に収める
- 禁止事項は箇条書きで明確に記載する
- コマンド例はコードブロックに記載する`,
    evaluationCriteria: [
      'ルートと各サービスの階層構造が設計されており、スコープが明確に分かれている',
      'プロジェクト固有の技術スタック情報（言語・フレームワーク・バージョン）が含まれている',
      '禁止事項と規約が具体的に列挙されており、曖昧な記述がない',
      '@include構文による階層的な参照構造を設計するよう指示されている',
      '各サービスの固有ルール（テスト方針・マイグレーション・エラーハンドリング）が考慮されている',
    ],
    explanation:
      'CLAUDE.md作成の依頼では「プロジェクトの全体構成」「各コンポーネントの技術スタック」「禁止事項と規約の具体的内容」「ファイル分割設計」を明示することで、実際に使えるCLAUDE.mdが生成されます。',
  },

  // ─── p4-c2: MCPサーバーの活用 ──────────────────────────────────────────────

  {
    id: 'pq-p4c2-1',
    courseId: 'p4-c2',
    type: 'multiple-choice',
    topic: 'MCPサーバー追加コマンド',
    difficulty: 'beginner',
    question: 'Claude Codeにローカルの filesystem MCPサーバーを追加するコマンドとして正しいものはどれですか？',
    options: [
      'claude mcp install filesystem',
      'claude mcp add filesystem -- npx -y @modelcontextprotocol/server-filesystem /path/to/dir',
      'claude plugin add @mcp/filesystem',
      'npm install -g @claude/mcp-filesystem',
    ],
    correctIndex: 1,
    explanation:
      '`claude mcp add <サーバー名> -- <起動コマンド>` が基本構文です。`--` の後にMCPサーバーを起動するコマンドを渡します。filesystem サーバーの場合は `npx -y @modelcontextprotocol/server-filesystem <許可するディレクトリパス>` を渡します。`claude mcp install` や `claude plugin add` というコマンドは存在せず、npm globalインストールだけでは Claude Code に認識されません。',
  },
  {
    id: 'pq-p4c2-2',
    courseId: 'p4-c2',
    type: 'multiple-choice',
    topic: 'MCPスコープ',
    difficulty: 'beginner',
    question: 'MCPサーバーの `local` スコープと `project` スコープの違いとして正しい説明はどれですか？',
    options: [
      'local は高速で、project は信頼性が高い',
      'local は現在のマシン・ユーザーにのみ適用され .gitignore されるべき設定、project はリポジトリに含めてチーム共有できる設定（.mcp.jsonに保存）',
      'local はDockerコンテナ内でのみ動作し、project はホスト環境で動作する',
      'local と project は同一スコープで動作に違いはない',
    ],
    correctIndex: 1,
    explanation:
      'MCPのスコープは3種類あります。`local`：ユーザーのホームディレクトリに保存され、そのマシンのそのユーザーのみが使用（APIキーなど秘密情報を含む設定に適切）。`project`：プロジェクトの .mcp.json に保存され、gitで共有できる（チーム全員で使う公開ツールに適切）。`user`：全プロジェクト共通のユーザー設定。セキュリティ上、認証情報を含む設定は local に限定すべきです。',
  },
  {
    id: 'pq-p4c2-3',
    courseId: 'p4-c2',
    type: 'multiple-choice',
    topic: 'GitHub MCPサーバー',
    difficulty: 'intermediate',
    question: 'GitHub MCPサーバーを使うことで、Claude Codeが直接できるようになる操作として正しいものはどれですか？',
    options: [
      'GitHubのサーバーインフラを直接操作してデプロイできる',
      'リポジトリのファイル読み込み・Issue/PR の作成・コメント追加・コードレビューのコメントを自然言語で指示できる',
      'GitHubの料金プランを変更できる',
      'ローカルのgitコマンドを高速化できる',
    ],
    correctIndex: 1,
    explanation:
      'GitHub MCPサーバーを設定すると、ClaudeはGitHub APIを通じて①リポジトリのファイル・コミット履歴の読み込み②Issue・PRの作成・更新・クローズ③PRへのレビューコメント追加④ブランチ操作などを自然言語の指示で実行できるようになります。ただしGitHubインフラの操作や課金設定の変更はできません。ローカルgitの高速化とも無関係です。',
  },
  {
    id: 'pq-p4c2-4',
    courseId: 'p4-c2',
    type: 'multiple-choice',
    topic: 'MCPセキュリティ',
    difficulty: 'intermediate',
    question: 'MCPサーバーを運用する際のセキュリティ上の考慮点として正しいものはどれですか？',
    options: [
      'MCPサーバーは公式以外も無条件で信頼できるため、すべてインストールして問題ない',
      'MCPサーバーには任意のコードが含まれる可能性があるため、信頼できるソースのみ使い、API キーなどの認証情報は project スコープではなく local スコープで管理する',
      'MCPサーバーはサンドボックス内で動作するため、セキュリティリスクはゼロである',
      'MCPサーバーのAPI キーは CLAUDE.md に直接書くのが最も安全である',
    ],
    correctIndex: 1,
    explanation:
      'MCPサーバーのセキュリティ考慮点：①サードパーティMCPサーバーは内部でシステムコマンドを実行できる可能性があるため、信頼できるソース（公式・有名OSSプロジェクト）のみ使用する②APIキー・トークンは local スコープ（ホームディレクトリの設定ファイル）で管理し、gitリポジトリには含めない③MCPサーバーに与える権限（ファイルシステムのパス・APIのスコープ）を必要最小限に絞ることが重要です。',
  },
  {
    id: 'pq-p4c2-5',
    courseId: 'p4-c2',
    type: 'prompt-writing',
    topic: 'Slack MCP自動化',
    difficulty: 'advanced',
    question: 'Slack MCPサーバーを設定して、本番インシデント発生時の対応フローを自動化するClaude Codeへの指示プロンプトを書いてください。',
    scenario:
      'あなたのチームはPagerDutyでアラートを受け取った後、手動でSlackに通知・担当者のアサイン・ステータス更新を行っています。Slack MCPを使ってClaudeがこのフローを自動化し、インシデントチャンネルへの通知・担当者メンション・定期ステータス更新を行えるようにしたいです。',
    modelAnswer: `Slack MCPを使って、本番インシデント対応フローを以下の手順で自動化してください。

## 前提設定の確認

まず以下を確認してください：
- Slack MCP が設定済みで \`slack_post_message\` ツールが利用可能であること
- インシデント通知先チャンネル: #incidents-prod
- オンコール担当者のSlack IDのリスト（確認が必要な場合は私に聞いてください）

## インシデント発生時の自動フロー

インシデント情報を受け取ったら、以下の順番で実行してください：

### Step 1: 初期通知（発生から5分以内）
#incidents-prod チャンネルに以下のフォーマットでメッセージを送信する：
\`\`\`
🚨 [P{severity}] インシデント発生
- 概要: {description}
- 影響範囲: {impact}
- 発生時刻: {timestamp}
- 担当者: @{oncall-engineer}
- ステータス: 調査中
- インシデントID: INC-{id}
\`\`\`

### Step 2: 担当者への直接メンション
担当エンジニアのDMに詳細情報と対応依頼を送信する

### Step 3: 30分ごとのステータス更新
元のメッセージにスレッドリプライで進捗を更新する（解決するまで継続）

### Step 4: 解決通知
解決後に #incidents-prod に解決報告とポストモーテム予定日を送信する

## 制約

- 深夜（22時〜8時）の場合は担当者のDMのみ送信し、チャンネル通知は朝8時まで待つ
- P3以下（低優先度）のインシデントはチャンネル通知のみとし、DMは送らない
- 誤報の場合は即座に「誤報のため解除」をスレッドに追記する`,
    evaluationCriteria: [
      'Slack MCPのツール利用を前提とした具体的なフローが記述されている',
      'メッセージの送信先チャンネル・フォーマット・タイミングが明確に定義されている',
      '担当者へのメンション・DM通知など複数の通知経路が考慮されている',
      '定期更新・解決通知など時系列の自動化フローが設計されている',
      '時間帯・優先度による条件分岐など実運用を考慮した制約がある',
    ],
    explanation:
      'MCP自動化のプロンプトは「使用するMCPツール名」「実行順序」「メッセージフォーマット」「条件分岐（時間帯・優先度）」を明確にすることで、Claudeが一貫した自動化フローを実行できます。',
  },

  // ─── p4-c3: カスタムスラッシュコマンド ────────────────────────────────────

  {
    id: 'pq-p4c3-1',
    courseId: 'p4-c3',
    type: 'multiple-choice',
    topic: 'カスタムコマンドの作成場所',
    difficulty: 'beginner',
    question: 'プロジェクト固有のカスタムスラッシュコマンドを作成する場所として正しいのはどれですか？',
    options: [
      '~/.claude/commands/ ディレクトリ（ホームディレクトリ）',
      '.claude/commands/ ディレクトリ（プロジェクトルート）の中に .md ファイルを作成する',
      'src/commands/ ディレクトリ',
      'CLAUDE.md ファイル内に直接記述する',
    ],
    correctIndex: 1,
    explanation:
      'プロジェクト固有のカスタムコマンドは `.claude/commands/` ディレクトリに `.md` ファイルとして作成します（例：`.claude/commands/review.md`）。このファイルが `/project:review` コマンドとして使えるようになります。`~/.claude/commands/` はユーザーグローバルのコマンド用で、全プロジェクトで使えます。`src/commands/` はClaude Codeが認識しません。CLAUDE.mdに書いてもコマンドにはなりません。',
  },
  {
    id: 'pq-p4c3-2',
    courseId: 'p4-c3',
    type: 'multiple-choice',
    topic: '$ARGUMENTS変数',
    difficulty: 'beginner',
    question: 'カスタムスラッシュコマンドの `.md` ファイル内で `$ARGUMENTS` を使うとどうなりますか？',
    options: [
      'コマンド実行時にユーザーが入力した引数がその位置に展開される',
      '$ARGUMENTS は予約語でコマンドファイルには使えない',
      'システムの環境変数一覧が表示される',
      'コマンドの引数の数を数値で返す',
    ],
    correctIndex: 0,
    explanation:
      '`$ARGUMENTS` はカスタムコマンドファイル内のプレースホルダーで、ユーザーがコマンド実行時に入力した引数テキストに置き換えられます。例えば `.claude/commands/fix.md` に「`$ARGUMENTS` のバグを修正してテストも書いて」と書いておけば、`/project:fix src/auth.ts` と実行したとき `$ARGUMENTS` が `src/auth.ts` に展開されます。',
  },
  {
    id: 'pq-p4c3-3',
    courseId: 'p4-c3',
    type: 'multiple-choice',
    topic: '効果的なユースケース',
    difficulty: 'intermediate',
    question: 'カスタムスラッシュコマンドが最も効果的なユースケースはどれですか？',
    options: [
      '一度きりの作業で今後使わないタスク',
      'チームで繰り返し行う定型的な作業（PRレビュー・デプロイ前チェック・テスト生成）をテンプレート化すること',
      'Claudeの応答速度を上げるためのキャッシュウォームアップ',
      '個人の好みのカラーテーマを設定する',
    ],
    correctIndex: 1,
    explanation:
      'カスタムスラッシュコマンドが最も威力を発揮するのは「繰り返し同じプロンプトを入力する定型作業」です。例：`/project:review` でPRのコード品質チェック、`/project:test <ファイル名>` でテスト自動生成、`/project:deploy-check` でデプロイ前の確認リストの実行など。一度きりの作業やUI設定はコマンド化する価値が低いです。',
  },
  {
    id: 'pq-p4c3-4',
    courseId: 'p4-c3',
    type: 'multiple-choice',
    topic: 'チーム共有の設計原則',
    difficulty: 'intermediate',
    question: 'チームで共有するカスタムコマンドを設計する際の原則として正しいものはどれですか？',
    options: [
      'できるだけ多くの処理を1コマンドに詰め込んで、コマンド数を減らす',
      'コマンドの目的を1つに絞り、$ARGUMENTSで柔軟性を持たせ、コマンドファイルにコメントで使用例を記載する',
      'チーム共有コマンドは個人の .gitignore に追加して管理する',
      'コマンドはプロジェクトごとに全く異なる命名規則を使う方が良い',
    ],
    correctIndex: 1,
    explanation:
      '良いチーム共有コマンドの設計原則：①単一責任（1コマンド＝1目的）で理解しやすくする②`$ARGUMENTS` で汎用性を持たせる（ファイル名・機能名などを受け取る）③コマンドファイルの冒頭にコメントで使用方法・例を記載する④`.claude/commands/` ディレクトリをgitで管理してチーム全員が使えるようにする⑤コマンド名はプロジェクト全体で一貫した命名規則（動詞-名詞形式など）にします。',
  },
  {
    id: 'pq-p4c3-5',
    courseId: 'p4-c3',
    type: 'prompt-writing',
    topic: 'コードレビューコマンド定義',
    difficulty: 'advanced',
    question: 'コードレビューを自動化するカスタムスラッシュコマンド（`.claude/commands/review.md`の内容）を作成するよう依頼するプロンプトを書いてください。',
    scenario:
      'あなたのチームはTypeScript/Reactプロジェクトで開発しています。PRのレビューで毎回同じ観点（型安全性・コンポーネント設計・パフォーマンス・アクセシビリティ・テスト）を確認しています。`/project:review $ARGUMENTS` の形式で使える再利用可能なコマンドを作りたいです。',
    modelAnswer: `.claude/commands/review.md を以下の仕様で作成してください。

このファイルは /project:review コマンドの定義で、$ARGUMENTS にはレビューするファイルパスまたはディレクトリが入ります。

## ファイルの内容仕様

コマンドファイルの冒頭に以下のコメントを入れてください：
\`\`\`
# /project:review コマンド
# 使用方法: /project:review <ファイルパス or ディレクトリ>
# 例: /project:review src/components/Button.tsx
\`\`\`

次に、$ARGUMENTS で指定されたファイル・ディレクトリに対して以下のレビューを実施する指示を記載してください：

### レビュー観点（すべて確認すること）

1. **型安全性（TypeScript）**
   - any 型の不適切な使用がないか
   - Propsの型定義が適切か
   - 型アサーション（as）の乱用がないか

2. **コンポーネント設計（React）**
   - 単一責任の原則が守られているか
   - カスタムフックへの適切な分離がされているか
   - 不要な再レンダリングの原因がないか（useMemo/useCallback の使い方）

3. **パフォーマンス**
   - 重い処理がレンダリング中に実行されていないか
   - リストレンダリングに key が適切に設定されているか

4. **アクセシビリティ（a11y）**
   - img タグに alt 属性があるか
   - インタラクティブ要素に適切な aria ラベルがあるか
   - キーボード操作が可能か

5. **テスト**
   - 対応するテストファイルが存在するか
   - エッジケースがテストされているか

### 出力形式

各観点ごとに「✅ 問題なし」または「⚠️ 指摘: （内容）（ファイル名:行番号）（修正案）」の形式で出力してください。
最後に総合評価（Approve / Request Changes）を出してください。`,
    evaluationCriteria: [
      'コマンドファイルの用途・使い方・使用例がコメントとして記載されるよう指示されている',
      '$ARGUMENTS がレビュー対象のファイル指定に使われるよう設計されている',
      'チーム固有の技術スタック（TypeScript・React）に合わせたレビュー観点が複数含まれている',
      '出力フォーマット（観点別・絵文字・ファイル行番号・修正案）が明確に定義されている',
      '最終的な承認/変更要求の判定が出力されるよう設計されている',
    ],
    explanation:
      'カスタムコマンド定義の依頼では「コマンドの使い方コメント」「$ARGUMENTSの役割」「チーム固有のチェック項目」「出力フォーマット」を明示することで、実際にチームで使えるコマンドテンプレートが生成されます。',
  },

  // ─── p4-c4: パーミッション設定とセキュリティ ──────────────────────────────

  {
    id: 'pq-p4c4-1',
    courseId: 'p4-c4',
    type: 'multiple-choice',
    topic: '.claudeignore',
    difficulty: 'beginner',
    question: '.claudeignore ファイルの用途として正しい説明はどれですか？',
    options: [
      'Claude Codeの起動を一時的に無効化するファイル',
      'Claude Codeがファイルシステムを操作・参照できないようにするファイル・ディレクトリを指定する（.gitignoreと同じ構文）',
      'Claudeが返答しない質問のキーワードリスト',
      'バージョン管理から除外するファイルを指定する（.gitignoreの代替）',
    ],
    correctIndex: 1,
    explanation:
      '.claudeignore は .gitignore と同じ構文で記述するファイルで、Claude Codeがそのエントリに一致するファイルやディレクトリを読み取り・変更できないよう制限します。.env・node_modules・secrets/・*.pem などを指定して機密情報や大量の不要ファイルをClaudeから保護します。gitの管理対象を変えるものではありません。',
  },
  {
    id: 'pq-p4c4-2',
    courseId: 'p4-c4',
    type: 'multiple-choice',
    topic: 'Bash許可設定',
    difficulty: 'beginner',
    question: 'パーミッション設定の `Bash(npm run *)` が意味することはどれですか？',
    options: [
      'npm コマンド全般（install・publish・audit など含む）をすべて許可する',
      '`npm run <任意のスクリプト名>` の形式のコマンドのみを許可する（npm installなど他のnpmサブコマンドは含まない）',
      'npmパッケージの実行を完全に禁止する',
      'package.json の scripts セクションを編集することを許可する',
    ],
    correctIndex: 1,
    explanation:
      '`Bash(npm run *)` の `*` はグロブパターンで「npm run の後に任意の文字列が続くコマンド」を意味します。つまり `npm run dev`・`npm run test`・`npm run build` などは許可されますが、`npm install`・`npm publish`・`npm audit fix` などは許可されません。これにより意図しないパッケージのインストールや公開を防ぎながら、スクリプト実行は許可できます。',
  },
  {
    id: 'pq-p4c4-3',
    courseId: 'p4-c4',
    type: 'multiple-choice',
    topic: '本番環境の権限設定',
    difficulty: 'intermediate',
    question: '本番環境でClaude Codeを安全に使うための権限設定として最も適切なものはどれですか？',
    options: [
      '本番環境では権限制限なしで使い、エンジニアが常に監視する',
      'allowリストを最小限に絞り（読み取り・テスト実行のみ許可）、denyリストにはDB操作・ファイル削除・外部API呼び出しを追加し、.claudeignoreで機密ファイルを保護する',
      '本番環境ではClaude Codeを使わないことが唯一の安全策である',
      '権限設定よりAPIキーの定期的なローテーションの方が重要である',
    ],
    correctIndex: 1,
    explanation:
      '本番環境での安全な権限設定の原則は「最小権限の原則」です。①allowリスト：ファイル読み取り・テスト実行・ログ確認などに限定②denyリスト：`Bash(rm *)`, `Bash(DROP *)`, 外部APIへの書き込みリクエストなどを明示的に禁止③.claudeignoreで.env・認証情報・証明書ファイルを保護④変更を加える操作は人間の確認が必要なワークフローを設計します。',
  },
  {
    id: 'pq-p4c4-4',
    courseId: 'p4-c4',
    type: 'multiple-choice',
    topic: '.claudeignore除外対象',
    difficulty: 'intermediate',
    question: '.claudeignore に追加すべきファイル・ディレクトリとして最も適切な組み合わせはどれですか？',
    options: [
      'README.md と package.json',
      '.env* / secrets/ / *.pem / *.key / .git/ / node_modules/ / 本番データのダンプファイル',
      'src/ ディレクトリ全体とすべての .ts ファイル',
      'テストファイル（*.test.ts）のみ',
    ],
    correctIndex: 1,
    explanation:
      '.claudeignore に追加すべきファイルは主に3カテゴリです。①機密情報：.env・.env.local・.env.production・secrets/・*.pem・*.key・*.p12（証明書・秘密鍵）②大量の不要ファイル：node_modules/（トークン消費を防ぐ）・.git/③本番データ：DBダンプ・バックアップファイル・ユーザーの個人情報ファイルです。README.mdやpackage.jsonは通常Claudeに参照させる必要があります。',
  },
  {
    id: 'pq-p4c4-5',
    courseId: 'p4-c4',
    type: 'prompt-writing',
    topic: '金融系プロジェクトのパーミッション設計',
    difficulty: 'advanced',
    question: 'セキュリティ要件が厳しい金融系プロジェクト用のClaude Codeパーミッション設定を設計するよう依頼するプロンプトを書いてください。',
    scenario:
      'あなたは銀行のシステム部門でオンラインバンキングシステムの開発を担当しています。このプロジェクトにClaude Codeを導入したいのですが、コンプライアンス要件として「本番DBへのアクセス禁止」「顧客情報ファイルの参照禁止」「承認なしのデプロイ禁止」「監査ログの保持」が必要です。Claude Codeの設定ファイル（settings.json と .claudeignore）の内容を設計してほしいです。',
    modelAnswer: `金融系プロジェクト向けのClaude Code設定ファイルを以下の要件に基づいて設計・作成してください。

## コンプライアンス要件

1. 本番環境DBへの接続・操作の完全禁止
2. 顧客個人情報・取引データファイルへのアクセス禁止
3. 本番環境へのデプロイを自動実行しない（承認フロー必須）
4. Claude Codeが実行したコマンドの監査ログを残せる構成
5. セキュリティスキャン結果・脆弱性レポートをClaudeが変更不可

## 作成するファイル

### .claude/settings.json

以下を含む権限設定を作成してください：

**Allow リスト（許可する操作）:**
- ファイル読み取り（Readツール）
- \`npm run test\`, \`npm run lint\`, \`npm run build\` の実行
- git status, git diff, git log（読み取り系のみ）
- 開発・ステージング環境のDB接続コマンド（DB_ENV=development の場合のみ）

**Deny リスト（明示的に禁止する操作）:**
- \`Bash(rm -rf *)\` などの削除系コマンド
- \`Bash(*production*)\` 本番環境を示す文字列を含むコマンド
- \`Bash(git push origin main)\` 本番ブランチへの直接プッシュ
- \`Bash(kubectl apply *)\` デプロイコマンド
- DB接続文字列に production・prod を含むコマンド

### .claudeignore

以下を除外対象として含めてください：
- .env, .env.production, .env.staging
- secrets/, credentials/, certs/
- *.pem, *.key, *.p12, *.jks
- data/customers/, data/transactions/（顧客・取引データ）
- audit-logs/, compliance-reports/（監査ログ）
- infra/terraform/（インフラ設定）
- node_modules/, .git/

## 出力形式

実際に使えるJSON・ファイル内容として出力し、各設定項目にコメントでその理由も記載してください。`,
    evaluationCriteria: [
      'コンプライアンス要件（DB禁止・顧客情報保護・デプロイ制限）が具体的なallow/deny設定に落とし込まれている',
      '.claudeignoreに機密ファイル・顧客データ・証明書など金融系固有の除外対象が含まれている',
      'allow/denyのパターンが具体的なコマンドやパスで記述されており、グロブパターンを活用している',
      '設定ファイルの形式（settings.jsonと.claudeignoreの両方）が指定されている',
      '各設定にコメントで理由を記載するよう指示されており、監査対応への配慮がある',
    ],
    explanation:
      'セキュリティ要件をパーミッション設定に落とし込む際は「コンプライアンス要件→allow/deny具体パターン→.claudeignore対象」の順で体系化します。金融系では顧客データ・証明書・本番環境操作の3点が特に重要です。',
  },
];
