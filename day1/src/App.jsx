import { Link } from "react-router-dom";

function App() {
  return (
    <div>
      <h1>Hello World!</h1>
      <h2>React Router</h2>
      <Link to="/router">React Routerの解説ページへ</Link>
      <h2>ReactのuseState 10本ノック</h2>
      <Link to="/state">【useState】カウントアプリのページへ</Link>
      <br />
      <Link to="/state-name">【useState】名前入力のページへ</Link>
      <br />
      <Link to="/state-toggle">【useState】トグルのページへ</Link>
      <br />
      <Link to="/state-todo">【useState】TODOリストのページへ</Link>
      <br />
      <Link to="/state-user">【useState】ユーザ情報入力のページへ</Link>
      <br />
      <Link to="/state-styled-toggle">
        【useState】スタイルトグルのページへ
      </Link>
      <br />
      <Link to="/state-multi">【useState】複数の状態管理デモページへ</Link>
      <br />
      <Link to="/state-reset">【useState】状態リセットデモページへ</Link>
      <br />
      <Link to="/state-conditional">
        【useState】条件付きレンダリングデモページへ
      </Link>
      <br />
      <Link to="/state-history">【useState】状態履歴デモページへ</Link>
    </div>
  );
}

export default App;
