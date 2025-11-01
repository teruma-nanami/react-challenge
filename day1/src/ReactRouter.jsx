import { Link } from "react-router-dom";

function ReactRouter() {
  return (
    <div>
      <h2>React Router Demo</h2>

      <section>
        <h3>概要</h3>
        <p>
          React Router を使うと、SPA（シングルページアプリケーション）でも
          <strong>ページ遷移</strong>が可能になります。
        </p>
      </section>

      <section>
        <h3>基本タグと書く場所</h3>
        <ul>
          <li>
            <code>&lt;BrowserRouter&gt;</code> :
            ルーティング全体を包むコンポーネント。
            <strong>→ main.jsx に書く</strong>
          </li>
          <li>
            <code>&lt;Routes&gt;</code> : ルートの集合を定義。
            <strong>→ main.jsx に書く</strong>
          </li>
          <li>
            <code>&lt;Route&gt;</code> : パスとコンポーネントを対応付ける。
            <strong>→ main.jsx に書く</strong>
          </li>
          <li>
            <code>&lt;Link&gt;</code> : ページ遷移用のリンク（リロードなし）。
            <strong>→ 各ページのJSX内に書ける</strong>
          </li>
        </ul>
      </section>

      <section>
        <h3>サンプルリンク</h3>
        <p>
          以下のリンクは <code>main.jsx</code> に書いたルートと対応しています。
        </p>
        <nav>
          <Link to="/">Home</Link> | <Link to="/state">useStateのデモ</Link>
        </nav>
        <p>この時main.jsxには以下のようなコードが書かれています。</p>
        <pre>
          <code>
            {`<BrowserRouter>
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/router" element={<ReactRouter />} />
    <Route path="/state" element={<StateDemo />} />
  </Routes>
</BrowserRouter>`}
          </code>
        </pre>
      </section>

      <section>
        <h3>ポイント</h3>
        <ol>
          <li>URLが変わってもページリロードは発生しない</li>
          <li>SPAでも複数ページを持てるように見せられる</li>
          <li>Next.jsの自動ルーティングの理解にもつながる</li>
        </ol>
      </section>
    </div>
  );
}

export default ReactRouter;
