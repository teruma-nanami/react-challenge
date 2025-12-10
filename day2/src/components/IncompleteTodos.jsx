export const IncompleteTodos = (props) => {
  const { Todos, onClickComplete, onClickDelete } = props;
  return (
    <div>
      <p>未完了のTODO</p>
      <ul>
        {Todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => onClickComplete(index)}>完了</button>
            <button onClick={() => onClickDelete(index)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
