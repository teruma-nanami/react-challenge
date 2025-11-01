import { useState } from "react";
export default function StateUserDemo() {
  const [user, setUser] = useState({ name: "", age: "" });

  return (
    <div>
      <h2>ユーザ情報入力のデモページ</h2>
      <p>
        あなたの名前は {user.name} で、年齢は {user.age} 歳です。
      </p>
      <input
        type="text"
        placeholder="名前を入力"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
      />
      <br />
      <input
        type="number"
        placeholder="年齢を入力"
        value={user.age}
        onChange={(e) => setUser({ ...user, age: e.target.value })}
      />
    </div>
  );
}
