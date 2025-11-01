import { useState } from "react";

export default function StateToggleDemo() {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <div>
      <h2>useStateのデモページ</h2>
      <p>トグル: {isToggled ? "ON" : "OFF"}</p>
      <button onClick={() => setIsToggled(!isToggled)}>トグル</button>
    </div>
  );
}
