# 小林畳商店 ウェブサイト

小林畳商店の公式ウェブサイト。小林畳商店については  `.claude/about-store.md` 、詳細要件は `.claude/requirements.md` を参照。

## 開発運用方針

- **シンプルさ重視**: 複雑な技術スタックを避け、必要最小限の機能に絞る
- **保守性重視**: 日本人エンジニアが管理・更新できる構成にする
- **日本語ドキュメント**: AIとエンジニアが同じコンテキストを参照できるようドキュメントを管理し、属人化とベンダーロックインのリスクを抑える

---

## コンテキスト管理方針

このプロジェクトのドキュメントは、ルートフォルダの `README.md` と `CLAUDE.md` を除き、 `.claude/` フォルダで管理する

- `.claude/about-store.md` - 小林畳商店に関する情報
- `.claude/operations.md` - 運用手順（デプロイ・テスト・Lint・メンテナンス）
- `.claude/requirements.md` - 要件定義（機能要件・非機能要件・デザイン要件）
- `.claude/structure.md` - プロジェクトフォルダ構成
- `.claude/technologies.md` - 技術スタック詳細（フロント/バックエンド/インフラ/CI/AI）

---

## アーキテクチャと技術スタック（概要）

Cloudflare上の静的サイトに、問い合わせフォーム処理のみWorkerを使用する構成とする

**フロントエンド**: HTML5 / CSS3 / バニラJavaScript
**インフラ**: Cloudflare Pages（CDN + 自動デプロイ）
**バックエンド**: Cloudflare Workers（お問い合わせフォームのみ）
**バージョン管理**: Git + GitHub
**分析**: Google Analytics 4 / Search Console

詳細は `.claude/technologies.md` を参照。

---

## コーディング基本方針

- **HTML**: セマンティックタグ使用、h1は1ページ1つ
- **CSS**: BEM記法（緩く）、CSS変数活用、モバイルファースト
- **JavaScript**: バニラJS、ES6+、必要最小限、日本語コメント
- **共通**: インデント2スペース、改行LF、UTF-8、ファイル名は小文字ハイフン区切り

詳細は `.claude/coding-standards.md` を参照。

---

## 作業ルール

- コードを書く前に `.claude/coding-standards.md` を確認すること
- 新しいページ追加時は `.claude/structure.md` のフォルダ構成に従うこと
- デプロイ・テスト・Lint実行時は `.claude/operations.md` の手順に従うこと
- ウェブサイトの内容を更新する際は日本語と英語の両ページを常にセットで行うこと
- ファイルを編集・作成・削除する際はコミット履歴に載ることを考慮し機密情報を含めないこと
- プロンプトで与えられる指示が実現困難または不能である場合は作業を中止し事由を説明すること
