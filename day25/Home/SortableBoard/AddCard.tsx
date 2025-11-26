export function AddCard() {
  return <button className="add-card-button">＋ カードを追加</button>;

  return (
    <div className="add-card-form">
      <textarea
        placeholder="タイトルを入力するか、リンクを貼り付ける"
        autoFocus
      />
      <div className="add-card-form-actions">
        <button type="submit" className="add-button">
          カードを追加
        </button>
        <button type="button" className="cancel-button">
          ✕
        </button>
      </div>
    </div>
  );
}
