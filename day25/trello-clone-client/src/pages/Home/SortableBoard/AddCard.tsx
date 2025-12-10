import { useState } from 'react';

interface AddCardProps {
  listId: number;
  onCreate: (listId: number, title: string) => Promise<void>;
}
export function AddCard({ listId, onCreate }: AddCardProps) {
  const [showInput, setShowInput] = useState(false);
  const [title, setTitle] = useState('');

  const handleCreate = async () => {
    if (title == '') return;
    try {
      await onCreate(listId, title);
      setTitle('');
      setShowInput(false);
    } catch (error) {
      console.error('カードの作成に失敗しました', error);
    }
  };

  if (!showInput) {
    return (
      <button className="add-card-button" onClick={() => setShowInput(true)}>
        ＋ カードを追加
      </button>
    );
  }

  return (
    <div className="add-card-form">
      <textarea
        placeholder="タイトルを入力するか、リンクを貼り付ける"
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="add-card-form-actions">
        <button type="submit" className="add-button" onClick={handleCreate}>
          カードを追加
        </button>
        <button
          type="button"
          className="cancel-button"
          onClick={() => setShowInput(false)}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
