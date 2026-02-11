# 運用手順

## デプロイ

### 前提条件

- GitHubリポジトリにコードがプッシュされている
- Cloudflareアカウントが作成済み
- Cloudflare PagesとWorkersが設定済み

---

## Astroサイトのデプロイ（Cloudflare Pages）

### 自動デプロイフロー

Cloudflare PagesのGit連携による自動デプロイ。

**手順**:

1. ローカルで開発・テスト
2. 変更をコミット

   ```bash
   git add .
   git commit -m "feat: 機能追加"
   ```

3. GitHubへプッシュ

   ```bash
   git push origin main
   ```

4. Cloudflare Pagesが自動検知してビルド開始
5. ビルド完了後、自動的に本番環境へデプロイ

### Cloudflare Pages設定

**ビルド設定**（Cloudflareダッシュボード）:

- **フレームワーク**: Astro
- **ビルドコマンド**: `npm run build`
- **ビルド出力ディレクトリ**: `dist/`
- **Node.jsバージョン**: `18`（環境変数で設定）

**環境変数**:

Cloudflare Pagesダッシュボード → Settings → Environment variables

```shell
NODE_VERSION=18
```

### デプロイ状況の確認 (Cloudflare Pages)

1. Cloudflareダッシュボード → Pages → プロジェクト選択
2. Deploymentsタブでビルドログ確認
3. デプロイURLで動作確認

## Cloudflare Workersのデプロイ

### Wrangler CLIを使用したデプロイ

**初回設定**:

```bash
# Workersディレクトリに移動
cd workers

# 依存関係のインストール
npm install

# Cloudflareにログイン（初回のみ）
npx wrangler login
```

**デプロイ実行**:

```bash
# 本番環境へデプロイ
npm run deploy

# または
npx wrangler deploy
```

### wrangler.toml設定

```toml
name = "kobayashitatamisyouten-api"
main = "src/index.ts"
compatibility_date = "2024-01-01"

[env.production]
name = "kobayashitatamisyouten-api"
route = "kobayashitatamisyouten.com/api/*"
```

### 環境変数（Secrets）の設定

```bash
# 環境変数の設定
npx wrangler secret put API_KEY
# プロンプトでAPIキーを入力

npx wrangler secret put SENDGRID_API_KEY
# プロンプトでSendGrid APIキーを入力
```

### デプロイ状況の確認 (Cloudflare Workers)

```bash
# デプロイ済みWorkerの一覧
npx wrangler deployments list

# ログの確認
npx wrangler tail
```

## トラブルシューティング

### Cloudflare Pagesのビルドエラー

**確認事項**:

1. Cloudflareダッシュボードでビルドログを確認
2. Node.jsバージョンが18以上か確認
3. ローカルで `npm run build` が成功するか確認

**よくあるエラー**:

- `Module not found`: 依存関係が不足 → `package.json` 確認
- `Build failed`: ビルドコマンドが間違っている → 設定確認

### Cloudflare Workersのデプロイエラー

**確認事項**:

1. `wrangler.toml` の設定が正しいか確認
2. ログイン状態を確認: `npx wrangler whoami`
3. ローカルで動作するか確認: `npm run dev`

### デプロイ後に表示がおかしい

1. ブラウザキャッシュをクリア（Shift + Reload）
2. Cloudflareのキャッシュをパージ（ダッシュボードから）
3. デプロイログで正常にビルドされているか確認

## ロールバック

### Cloudflare Pages

1. Cloudflareダッシュボード → Pages → Deployments
2. 過去のデプロイを選択
3. "Rollback to this deployment" をクリック

### Cloudflare Workers

```bash
# 過去のバージョンにロールバック
npx wrangler rollback
```

または、GitHubで過去のコミットに戻して再デプロイ:

```bash
git revert <commit-hash>
git push origin main
```
