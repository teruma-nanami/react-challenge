import { useState } from 'react';

interface AddListProps {
  onCreate: (title: string) => Promise<void>;
}

export function AddList({ onCreate }: AddListProps) {
  const [showInput, setShowInput] = useState(false);
  const [title, setTitle] = useState('');

  const handleCreateList = async () => {
    if (title == '') return;
    try {
      await onCreate(title);
      setTitle('');
      setShowInput(false);
    } catch (error) {
      console.error('リストの作成に失敗しました', error);
    }
  };

  if (!showInput) {
    return (
      <button className="add-list-button" onClick={() => setShowInput(true)}>
        ＋ もう1つリストを追加
      </button>
    );
  }
  return (
    <div className="add-list-form">
      <input
        type="text"
        placeholder="リスト名を入力..."
        className="add-list-input"
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="add-list-actions">
        <button className="add-list-submit" onClick={handleCreateList}>
          リストを追加
        </button>
        <button className="add-list-cancel" onClick={() => setShowInput(false)}>
          ×
        </button>
      </div>
    </div>
  );
}
