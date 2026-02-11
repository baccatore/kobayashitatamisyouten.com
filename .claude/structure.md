# プロジェクト構造

## ルートディレクトリ

```
kobayashitatamisyouten.com/
├── app/                 # Astroアプリ（フロントエンド）
├── api/                 # Honoアプリ（バックエンド / Cloudflare Workers）
├── .claude/             # プロジェクトドキュメント
├── CLAUDE.md            # プロジェクト指示
└── README.md            # プロジェクト概要
```

## app/ - Astroアプリ

```
app/
├── src/
│   ├── pages/           # ページ（ルーティング）
│   ├── components/      # 再利用可能なコンポーネント
│   ├── layouts/         # レイアウトテンプレート
│   └── styles/          # グローバルスタイル
├── public/              # 静的アセット（画像、フォント等）
├── package.json         # 依存関係
├── astro.config.mjs     # Astro設定
└── tsconfig.json        # TypeScript設定
```

## api/ - Honoアプリ

```
api/
├── src/
│   └── index.ts         # エントリーポイント
├── package.json         # 依存関係
├── tsconfig.json        # TypeScript設定
└── wrangler.jsonc       # Cloudflare Workers設定
```

## .claude/ - プロジェクトドキュメント

```
.claude/
├── about-store.md       # 小林畳商店について
├── coding-standards.md  # コーディング規約
├── operations.md        # 運用手順
├── references.md        # 参考リンク
├── requirements.md      # 要件定義
├── structure.md         # このファイル
└── technologies.md      # 技術構成
```
