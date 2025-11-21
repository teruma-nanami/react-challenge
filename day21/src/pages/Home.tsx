export const Home = () => {
  return (
    <>
      <div className="container">
        <main>
          <ul className="memo-list">
            <li className="memo-item">
              <h2>メモタイトル1</h2>
              <p>メモの内容がここに入ります。</p>
              <a href="/edit/0">編集</a>
            </li>
            <li className="memo-item">
              <h2>メモタイトル2</h2>
              <p>別のメモの内容がここに入ります。</p>
              <a href="/edit/1">編集</a>
            </li>
          </ul>
        </main>
      </div>
    </>
  );
};
