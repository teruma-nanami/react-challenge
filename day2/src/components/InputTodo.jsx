export const InputTodo = (props) => {
  const { todo, setTodo, onClickAdd, disabled } = props;

  return (
    <div>
      <input
        type="text"
        placeholder="Todoを入力"
        value={todo}
        disabled={disabled}
        onChange={(e) => {
          setTodo(e.target.value);
        }}
      />
      <button disabled={disabled} onClick={() => onClickAdd()}>
        追加
      </button>
    </div>
  );
};
