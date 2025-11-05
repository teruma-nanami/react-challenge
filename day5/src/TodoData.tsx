import axios from "axios";
import { useState } from "react";
import { Todo } from "./Todo";
// Todoの型だけをimportするときは、import typeを使用する
import type { TodoType } from "./types/todo";

export const TodoData = () => {
  // stateの型を指定する場合は、useStateのジェネリクスに型を指定する
  const [todos, setTodos] = useState<TodoType[]>([]);
  const onClickFetchData = () => {
    axios
      // axiosを使用してデータを取得する場合はgetメソッドを使用する
      // 取得するデータの型を指定する場合は、getメソッドのジェネリクスに型を指定する
      .get<TodoType[]>("https://jsonplaceholder.typicode.com/todos")
      // thenメソッドでデータ取得後の関数を定義する
      .then((res) => {
        setTodos(res.data);
      })
      // catchメソッドでエラー発生時の関数を定義する
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <button onClick={onClickFetchData}>データ取得</button>
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          title={todo.title}
          userId={todo.userId}
          completed={todo.completed}
        />
      ))}
    </div>
  );
};
