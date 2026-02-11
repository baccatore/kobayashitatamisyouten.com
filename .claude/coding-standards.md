# コーディング規約

## 基本方針

- シンプルさ重視：複雑な実装を避け、必要最小限の機能に絞る
- 保守性重視：日本人エンジニアが管理・更新できる構成
- 日本語コメント：コードの意図を明確に記述

## Astro

### ファイル構成 (Astro)

```shell
src/
├── pages/          # ページ（ルーティング）
├── components/     # 再利用可能なコンポーネント
├── layouts/        # レイアウトテンプレート
└── styles/         # グローバルスタイル
```

### .astroファイル

**基本構造**:

```astro
---
// フロントマター（サーバーサイドで実行）
import Layout from '../layouts/Layout.astro';
import Header from '../components/Header.astro';

const title = 'ページタイトル';
---

<Layout title={title}>
  <Header />
  <main>
    <!-- コンテンツ -->
  </main>
</Layout>

<style>
  /* スコープ付きスタイル */
  main {
    padding: 2rem;
  }
</style>
```

**命名規則**:

- コンポーネント: PascalCase（例: `Header.astro`、`ContactForm.astro`）
- ページ: kebab-case（例: `index.astro`、`about-us.astro`）

**コメント**:

```astro
---
// 日本語でわかりやすく
// コンポーネントのインポート
import Card from '../components/Card.astro';
---

<!-- メインコンテンツ -->
<main>
  <Card />
</main>
```

### HTML

- セマンティックなタグを使用（header, nav, main, article, section, footer）
- 適切な見出し構造（h1は1ページ1つ）
- インデント: 2スペース

### CSS

**基本方針**:

- BEM記法を緩く採用、またはシンプルなクラス命名
- CSS変数を活用（カラーパレット、余白等）
- モバイルファーストアプローチ

**CSS変数**:

```css
:root {
  /* カラーパレット */
  --color-primary: #2c5f2d;
  --color-secondary: #97b885;
  --color-text: #333333;
  --color-background: #ffffff;

  /* 余白 */
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 2rem;

  /* ブレイクポイント */
  --breakpoint-tablet: 768px;
  --breakpoint-desktop: 1024px;
}
```

**レスポンシブデザイン**:

```css
/* モバイルファースト */
.container {
  padding: var(--spacing-md);
}

/* タブレット */
@media (min-width: 768px) {
  .container {
    padding: var(--spacing-lg);
  }
}

/* デスクトップ */
@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
}
```

**コメント**:

```css
/* ===================================
   ヘッダー部分のスタイル
   =================================== */
.header {
  background-color: var(--color-white);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
```

### TypeScript

**基本方針**:

- 型定義を明確に記述
- any型は原則使用しない
- 必要最小限の実装
- コメントは日本語で記述

**Astroでの使用**:

```astro
---
// フロントマターでTypeScriptが使える
import type { Props } from './types';

interface PageProps {
  title: string;
  description: string;
}

const { title, description }: PageProps = Astro.props;
---

<h1>{title}</h1>
<p>{description}</p>

<script lang="ts">
  // クライアントサイドでもTypeScriptが使える
  const menuButton = document.querySelector<HTMLButtonElement>('.menu-button');
  const nav = document.querySelector<HTMLElement>('.nav');

  menuButton?.addEventListener('click', () => {
    nav?.classList.toggle('is-open');
  });
</script>
```

**外部TypeScriptファイル**:

```typescript
// src/scripts/menu.ts
export function toggleMenu() {
  const nav = document.querySelector<HTMLElement>('.nav');
  nav?.classList.toggle('is-open');
}
```

```astro
---
import { toggleMenu } from '../scripts/menu';
---

<script>
  import { toggleMenu } from '../scripts/menu';

  const menuButton = document.querySelector('.menu-button');
  menuButton?.addEventListener('click', toggleMenu);
</script>
```

**型定義ファイル**:

```typescript
// src/types/index.ts
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface PageMeta {
  title: string;
  description: string;
  ogImage?: string;
}
```

---

## Hono

### ファイル構成 (Hono)

```shell
workers/
├── src/
│   ├── index.ts        # エントリーポイント
│   ├── routes/         # ルーティング
│   ├── middlewares/    # ミドルウェア
│   └── utils/          # ユーティリティ関数
└── wrangler.toml       # Cloudflare Workers設定
```

### TypeScript

**基本方針**:

- 型定義を明確に記述
- any型は原則使用しない
- インターフェースで型を定義
- 命名規則は「共通規約 - TypeScript命名規則」を参照

**コメント**:

```typescript
/**
 * お問い合わせフォームのバリデーション
 * @param data - フォームデータ
 * @returns バリデーション結果
 */
function validateContactForm(data: ContactFormData): ValidationResult {
  // 実装
}
```

### Honoアプリケーション

**基本構造**:

```typescript
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { validator } from 'hono/validator';

const app = new Hono();

// ミドルウェア
app.use('/api/*', cors());

// ルーティング
app.post(
  '/api/contact',
  validator('json', (value, c) => {
    // バリデーション
    if (!value.name || !value.email || !value.message) {
      return c.json({ error: 'Required fields missing' }, 400);
    }
    return value;
  }),
  async (c) => {
    const data = c.req.valid('json');

    // お問い合わせ処理
    // メール送信等

    return c.json({ success: true });
  }
);

export default app;
```

**エラーハンドリング**:

```typescript
app.onError((err, c) => {
  console.error(`${err}`);
  return c.json({ error: 'Internal Server Error' }, 500);
});
```

## 共通規約

### TypeScript命名規則

- **変数・関数**: camelCase（例: `validateEmail`、`sendMail`、`isOpen`）
- **型・インターフェース**: PascalCase（例: `ContactFormData`、`PageMeta`）
- **定数**: UPPER_SNAKE_CASE（例: `API_KEY`、`MAX_FILE_SIZE`）
- **コンポーネント**: PascalCase（例: `Header.astro`、`ContactForm.astro`）

### ファイル命名

- **一般ファイル**: 小文字、ハイフン区切り（例: `main-visual.jpg`、`contact-form.ts`）
- **Astroコンポーネント**: PascalCase（例: `Header.astro`、`Layout.astro`）
- **Astroページ**: kebab-case（例: `index.astro`、`about-us.astro`）
- **型定義ファイル**: camelCase（例: `types.ts`、`index.ts`）

### 文字コード・改行

- 文字コード: UTF-8
- 改行コード: LF
- インデント: 2スペース

### コミットメッセージ

日本語で記述、プレフィックスを使用:

```shell
feat: お問い合わせフォームを追加
fix: ハンバーガーメニューの開閉バグを修正
style: ヘッダーのスタイルを調整
docs: README.mdを更新
refactor: バリデーション関数を整理
```

## 重要事項

### CSSの変更時

- 必ずモバイル表示を先に確認
- 既存のCSS変数を確認し、ハードコードした色やサイズを使わない
- ブラウザの開発者ツールでレスポンシブ表示を確認

### セキュリティ

- フォーム入力値は必ずバリデーション
- XSS対策: ユーザー入力をそのまま表示しない
- CSRF対策: トークン検証を実装
- 機密情報（APIキー等）は環境変数で管理

### パフォーマンス

- 画像: WebP/AVIF形式を使用、Lazy Loading実装
- CSS/JS: 不要なコードは削除、minify
- Astroの自動最適化機能を活用
