# 技術構成

## 採用技術

### フロントエンド

**Astro** - 静的サイトジェネレーター

- 高速なページ表示（静的HTML生成）
- シンプルな学習曲線
- Cloudflare Pagesとの高い親和性

### バックエンド

**TypeScript** - プログラミング言語

- 型安全性による保守性向上
- エディタのサポート充実
- JavaScriptエンジニアの学習コストが低い

**Hono** - 軽量Webフレームワーク

- Cloudflare Workers向けに最適化
- 学習コストが低い
- バリデーション、CORS等のミドルウェア充実
- 日本人開発者による開発、ドキュメント充実

### インフラ

**Cloudflare Pages** - ホスティング・CDN

- 高速CDN配信
- 無料プランで十分
- Git連携による自動デプロイ
- セキュリティ機能標準装備（DDoS保護、WAF、自動HTTPS）

**Cloudflare Workers** - サーバーレス関数

- お問い合わせフォーム処理に使用
- メール送信API連携（SendGrid / Resend）
- Cloudflareとの高い親和性

**Cloudflare DNS** - ドメイン管理

- ドメイン: `kobayashitatamisyouten.com`
- SSL/TLS証明書の自動更新

### バージョン管理

**Git / GitHub**

- ソースコード管理
- ブランチ戦略: `main`（本番）のみ
- 自動デプロイトリガー

### 分析ツール

**Google Analytics 4**

- アクセス解析

**Google Search Console**

- 検索パフォーマンス監視

## 実装方針

### レスポンシブデザイン

- モバイルファースト
- ブレイクポイント:
  - スマートフォン: 〜767px
  - タブレット: 768px〜1023px
  - PC: 1024px〜

### ブラウザ対応

- 対応: Chrome / Safari / Firefox / Edge（最新版）、iPhone Safari、Android Chrome
- 非対応: Internet Explorer 11
- 技術要件: ES6+構文、CSS Grid / Flexbox、Fetch API

### 画像最適化

- 形式: WebP/AVIF
- Lazy Loading（Intersection Observer API）
- レスポンシブ画像（srcset属性）

### SEO対策

- サイトマップ（Astroで自動生成）
- robots.txt配置
- Open Graph / Twitter Cardメタタグ
- 構造化データ（JSON-LD形式）:
  - LocalBusiness（事業所情報）
  - BreadcrumbList（パンくずリスト）

### セキュリティ

- Cloudflare: WAF、DDoS保護、Bot対策、SSL/TLS暗号化
- フォーム: reCAPTCHA v3、CSRF対策、入力値サニタイゼーション

### バックアップ・復旧

- ソースコード: GitHubリポジトリ + ローカルクローン
- 画像・アセット: GitHubリポジトリで管理
- ロールバック: Cloudflare Pagesのデプロイ履歴から復元

## デプロイ

Cloudflare PagesのGit連携による自動デプロイ。詳細は [operations.md](./operations.md) を参照。
