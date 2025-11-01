# 学習内容

## Day1: Node.js アップグレードと Vite 環境構築

- Vite が Node 20.19+ を要求することを確認
- Node.js を 18 → 22 へアップグレード（nvm 使用）
- Vite で React + JavaScript 構成を選択
- SWC や React Compiler は今回は未使用
- `npm install` と `npm run dev` でローカル起動確認済み
- React のインストールまでまとめ完了

---

## Day1: Hello world の表示

- `App.jsx` を編集して Hello world を表示
- `useState` をインポートしたが未使用だったため赤波線が出た
- カウント機能を追加して `useState` の基本動作を確認後、コメントアウト

---

## Day1: styled-components のインストール

- `styled-components` を導入
- CSS ファイルを分割せず、コンポーネント内で状態に応じたスタイルを切り替える準備を整えた

---

## Day1: useState の学習まとめ

### useState ノック No.1：数値の状態管理（カウント）

- `useState` で数値を扱う
- ボタンでカウントを増加させる
- 状態が変わると UI が即座に更新されることを確認

### useState ノック No.2：文字列の状態管理

- `useState` で文字列を扱う
- input と状態を連動させる（controlled component）
- 入力内容が即座に UI に反映される

### useState ノック No.3：真偽値の状態管理

- `useState` で真偽値を扱う
- ボタンで ON/OFF を切り替える
- 条件による表示の基礎につながる

### useState ノック No.4：配列の状態管理（ToDo 追加）

- `useState` で配列を扱う
- スプレッド構文で新しい要素を追加
- `map` でリスト表示する基本を確認

### useState ノック No.5：オブジェクトの状態管理

- `useState` でオブジェクトを扱う
- スプレッド構文で部分更新
- 複数のプロパティをまとめて管理する練習

### useState ノック No.6：状態によるスタイル切替

- 状態に応じて `className` や styled-components でスタイルを切り替える
- UI の見た目を状態で制御できることを確認

### useState ノック No.7：複数の状態を同時に管理

- 数値・文字列・真偽値を同時に管理
- 複数の `useState` を並列で使えることを体感

### useState ノック No.8：状態を初期化する（リセット）

- 複数の状態をまとめて初期値に戻す
- リセット処理を関数にまとめると見通しが良い

### useState ノック No.9：条件付きレンダリング

- 状態によって表示する要素を切り替える
- 三項演算子や `&&` を使った分岐を確認

### useState ノック No.10：状態の履歴を残す

- 状態の変化を配列に追加して履歴を管理
- `map` で履歴をリスト表示
- ToDo リストの応用として理解

---

s
