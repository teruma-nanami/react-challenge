import { useState } from "react";

export default function StateConditionalRenderDemo() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <h2>条件付きレンダリングデモページ</h2>
      {isLoggedIn ? (
        <div>
          <p>ようこそ、ユーザーさん！</p>
          <button onClick={() => setIsLoggedIn(false)}>ログアウト</button>
        </div>
      ) : (
        <div>
          <p>ログインしてください。</p>
          <button onClick={() => setIsLoggedIn(true)}>ログイン</button>
        </div>
      )}
    </div>
  );
}
