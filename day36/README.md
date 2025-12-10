# アプリ名

個人事業主用税金計算アプリ

## 概要

---

## 技術スタック

- **フロントエンド**: React 18, Vite
- **UI**: Chakra UI
- **状態管理**: Redux Toolkit
- **言語**: TypeScript
- **その他**: Emotion, Framer Motion, React Router DOM

---

## ディレクトリ構成

```
root/
├── public/                 # 静的ファイル (favicon, index.html など)
├── src/                    # ソースコード
│   ├── assets/             # 画像やフォントなどのアセット。今回は使用しない
│   ├── components/         # 再利用可能な UI コンポーネント（必須）
│   ├── pages/              # 各ページコンポーネント（必須）
│   ├── store/              # 状態管理 (Redux Toolkit を使う場合のみ)
│   ├── styles/             # グローバルスタイルやテーマ設定。今回は使用しない
│   ├── utils/              # ユーティリティ関数。今回は使用しない
│   ├── App.tsx             # ルートコンポーネント。ルーティング機能を含む必須ファイル
│   └── main.tsx            # エントリーポイント。ReactDOM.createRoot の起点
├── .gitignore              # Git 無視ファイル
├── index.html              # HTML テンプレート
├── package.json            # プロジェクト設定と依存関係
├── tsconfig.json           # TypeScript 設定
└── vite.config.ts          # Vite 設定
```

## セットアップ

### 必要環境

- Node.js v22.21.1
- npm v10.9.4

### インストール

```bash
npm install
```

### 開発サーバーの起動

```bash
npm run dev
```

開発サーバーが起動し、ブラウザで `http://localhost:5173` にアクセスできます。

### ビルド

```bash
npm run build
```

プロダクション用のビルドが `dist` フォルダに生成されます。

### プレビュー

```bash
npm run preview
```

ビルド後のアプリケーションをローカルでプレビューできます。

---
