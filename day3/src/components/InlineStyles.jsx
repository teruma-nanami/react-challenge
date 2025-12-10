export const InlineStyles = () => {
  const containerStyle = {
    border: "1px solid #ccc",
    padding: "16px",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  };
  const titleStyle = {
    fontSize: "24px",
    color: "#333",
  };

  const buttonStyle = {
    padding: "8px 16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>インラインスタイル</h1>
      <p>インラインスタイルに関する情報をここに記述します。</p>
      <button style={buttonStyle}>クリック me!</button>
    </div>
  );
};
