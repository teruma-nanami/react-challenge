type Props = {
  title: string;
  submitting: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

function TodoForm({ title, submitting, onChange, onSubmit }: Props) {
  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => onChange(e.target.value)}
        placeholder="新しいTodo"
      />
      <button onClick={onSubmit} disabled={submitting}>
        追加
      </button>
    </div>
  );
}

export default TodoForm;