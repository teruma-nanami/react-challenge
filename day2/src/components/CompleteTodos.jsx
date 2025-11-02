export const CompleteTodos = (props) => {
  const { Todos, onClickBack } = props;
  return (
    <div>
      <p>完了したTodo</p>
      <ul>
        {Todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => onClickBack(index)}>戻す</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
