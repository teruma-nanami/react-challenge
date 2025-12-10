# Day2 学習内容

## export の役割について学習

React における export は php の public に似た働きがある。  
`export`の本質はモジュール間で使えるようにするための「公開宣言」でなぜ必要？

- JavaScript はファイルごとにスコープが分かれている
- 他のファイルから使いたい関数・変数・コンポーネントは、**明示的に「公開」しないとアクセスできない**

## Udemy の Todo アプリ作成

このプロジェクトは、React の状態管理・イベントハンドラ・コンポーネント分割・props の受け渡しなど、React の基礎を実践的に学ぶためのシンプルな Todo アプリです。

---

### 1. 状態管理（useState）

- `useState` を使って 3 つの状態を管理：
  - `todo`: 入力中のテキスト
  - `incompleteTodos`: 未完了の Todo リスト
  - `completeTodos`: 完了済みの Todo リスト

```js
const [todo, setTodo] = useState("");
const [incompleteTodos, setIncompleteTodos] = useState(["Todo1", "Todo2"]);
const [completeTodos, setCompleteTodos] = useState([
  "Todoでした1",
  "Todoでした2",
]);
```

### 2. スプレッド構文で状態を安全に更新

- React では状態を直接変更せず、スプレッド構文でコピーしてから更新するのが基本。

```js
const newTodos = [...incompleteTodos, todo];
setIncompleteTodos(newTodos);
```

### 3. イベントハンドラの設計と順序の重要性

- onClickComplete や onClickBack では、削除前に対象の要素を取得しておくことが重要。
- 状態更新は非同期なので、削除後に元の配列から要素を参照すると意図しない動作になる可能性がある。

```js
const completedItem = incompleteTodos[index]; // 削除前に取得
const newIncompleteTodos = [...incompleteTodos];
newIncompleteTodos.splice(index, 1);
const newCompleteTodos = [...completeTodos, completedItem];
```

### 4. コンポーネント分割と props の受け渡し

- UI を 3 つのコンポーネントに分割：
  - InputTodo: 入力フォーム
  - IncompleteTodos: 未完了リスト
  - CompleteTodos: 完了リスト
- 各コンポーネントに必要な状態やイベントハンドラを props で渡す

```js
<InputTodo
  todo={todo}
  setTodo={setTodo}
  onClickAdd={onClickAdd}
  disabled={isMaxLimit}
/>
```

### 5. 登録制限の実装（バリデーション）

- 未完了の Todo が 5 件以上になると、入力フォームと追加ボタンを無効化し、警告メッセージを表示。

```js
const isMaxLimit = incompleteTodos.length >= 5;

{
  isMaxLimit && (
    <p style={{ color: "red" }}>登録できるTodoは5個までとなっております</p>
  );
}
```

## 構文リストの作成

### テキスト入力

```jsx
import React, { useState } from "react";

function TodoInput() {
  const [todo, setTodo] = useState(""); // 状態の初期化

  return (
    <input
      type="text"
      placeholder="Todoを入力"
      value={todo} // 表示される値は状態に依存
      onChange={(e) => setTodo(e.target.value)} // 入力された値を状態に反映
    />
  );
}
```

### 削除ボタンの実装

```jsx
const onClickDelete = (index) => {
  const newTodos = [...incompleteTodos];
  newTodos.splice(index, 1);
  setIncompleteTodos(newTodos);
};

//  コード側
<button onClick={() => onClickDelete(index)}>削除</button>;
```
