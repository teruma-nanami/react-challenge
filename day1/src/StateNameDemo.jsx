import { useState } from "react";
export default function StateNameDemo() {
  const [name, setName] = useState("");

  return (
    <div>
      <h2>useStateのデモページ</h2>
      <p>名前: {name}</p>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
}
