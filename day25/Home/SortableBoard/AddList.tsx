export function AddList() {
  return <button className="add-list-button">＋ もう1つリストを追加</button>;

  return (
    <div className="add-list-form">
      <input
        type="text"
        placeholder="リスト名を入力..."
        className="add-list-input"
        autoFocus
      />
      <div className="add-list-actions">
        <button className="add-list-submit">リストを追加</button>
        <button className="add-list-cancel">×</button>
      </div>
    </div>
  );
}
