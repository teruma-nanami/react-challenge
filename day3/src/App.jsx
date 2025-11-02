import { useCallback, useEffect, useState } from "react";
import { ChildArea } from "./components/ChildArea";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);

  const onClickOpen = () => {
    setOpen(!open);
  };
  const onClickClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onClickAdd = () => {
    setCount(count + 1);
  };

  const onChangeInput = (e) => {
    setText(e.target.value);
  };

  useEffect(() => {
    if (count > 0) {
      if (count % 3 === 0) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    }
  }, [count]);

  return (
    <>
      <p>カウント: {count}</p>
      <button onClick={onClickAdd}>カウントアップ</button>
      <br />
      <br />
      <input type="text" value={text} onChange={onChangeInput} />
      <br />
      <br />
      <button onClick={onClickOpen}>表示</button>
      <ChildArea open={open} onClickClose={onClickClose} />
    </>
  );
}

export default App;
