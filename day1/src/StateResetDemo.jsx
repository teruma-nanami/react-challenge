import { useState } from "react";
export default function StateMultiDemo() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [isOn, setIsOn] = useState(false);

  const resetAll = () => {
    setCount(0);
    setName("");
    setIsOn(false);
  };

  return (
    <div>
      <h2>状態リセットデモページ</h2>
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
      <div>
        <button onClick={resetAll}>リセット</button>
      </div>
    </div>
  );
}
