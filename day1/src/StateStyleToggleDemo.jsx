import { useState } from "react";
import "./index.css";
export default function StateStyledToggleDemo() {
  const [isStyled, setIsStyled] = useState(false);

  const toggleStyle = () => {
    setIsStyled(!isStyled);
  };

  return (
    <div>
      <h2>スタイルトグルのデモページ</h2>
      <p className={isStyled ? "red-text" : "normal-text"}>
        このテキストのスタイルをトグルします。
      </p>
      <button onClick={toggleStyle}>切り替え</button>
    </div>
  );
}
