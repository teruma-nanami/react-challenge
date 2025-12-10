import { useState } from "react";
export default function StateMultiDemo() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [isOn, setIsOn] = useState(false);

  return (
    <div>
      <h2>複数の状態管理デモページ</h2>
      <p>
        カウント: {count}
        <button onClick={() => setCount(count + 1)}>増加</button>
      </p>
      <p>名前: {name}</p>
      <p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </p>
      <p>
        トグル状態: {isOn ? "ON" : "OFF"}
        <button onClick={() => setIsOn(!isOn)}>切り替え</button>
      </p>
    </div>
  );
}
