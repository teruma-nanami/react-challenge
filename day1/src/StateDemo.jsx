import { useState } from "react";

export default function StateDemo() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>useStateのデモページ</h2>
      <p>カウント: {count}</p>
      <button onClick={() => setCount(count + 1)}>増やす</button>
    </div>
  );
}
