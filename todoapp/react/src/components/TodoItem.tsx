import type { Todo } from "../types/todos";

type Props = {
  todo: Todo;
  onToggle: (todo: Todo) => void;
  onDelete: (id: number) => void;
};

function TodoItem({ todo, onToggle, onDelete }: Props) {
  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={!!todo.is_completed}
          onChange={() => onToggle(todo)}
        />
        {todo.title}
      </label>

      <button
        onClick={() => onDelete(todo.id)}
        style={{ marginLeft: "8px" }}
      >
        削除
      </button>
    </li>
  );
}

export default TodoItem;