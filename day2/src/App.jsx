import "./App.css";
import { useState } from "react";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";

const App = () => {
  const [todo, setTodo] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState(["Todo1", "Todo2"]);
  const [completeTodos, setCompleteTodos] = useState([
    "Todoでした1",
    "Todoでした2",
  ]);

  const onClickAdd = () => {
    if (todo === "") return;
    const newTodos = [...incompleteTodos, todo];
    setIncompleteTodos(newTodos);
    setTodo("");
  };
  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };

  const onClickComplete = (index) => {
    const completedItem = incompleteTodos[index];
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);
    const newCompleteTodos = [...completeTodos, completedItem];
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  const onClickBack = (index) => {
    const inCompletedItem = completeTodos[index];
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);
    setCompleteTodos(newCompleteTodos);
    const newIncompleteTodos = [...incompleteTodos, inCompletedItem];
    setIncompleteTodos(newIncompleteTodos);
  };

  const isMaxLimit = incompleteTodos.length >= 5;
  return (
    <>
      {isMaxLimit && (
        <p style={{ color: "red" }}>登録できるTodoは5個までとなっております</p>
      )}
      <InputTodo
        todo={todo}
        setTodo={setTodo}
        onClickAdd={onClickAdd}
        disabled={isMaxLimit}
      />

      <IncompleteTodos
        Todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodos Todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};

export default App;
