export const StyledJsx = () => {
  return (
    <div className="container">
      <h1 className="title">Styled JSX</h1>
      <p className="description">Styled JSXに関する情報をここに記述します。</p>
      <button className="button">クリック me!</button>

      <style jsx>{`
        .container {
          border: 1px solid #eade68;
          padding: 16px;
          border-radius: 8px;
          background-color: #f9f9f9;
        }
        .title {
          font-size: 24px;
          color: #333;
        }
        .description {
          margin-bottom: 16px;
        }
        .button {
          padding: 8px 16px;
          background-color: #56475c;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .button:hover {
          background-color: #3b2f41;
        }
      `}</style>
    </div>
  );
};
