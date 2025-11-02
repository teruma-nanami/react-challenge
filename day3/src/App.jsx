import { useState } from "react";
import { ChildArea } from "./components/ChildArea";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);

  const onClickOpen = () => {
    setOpen(!open);
  };

  const onChangeInput = (e) => {
    setText(e.target.value);
  };
  return (
    <>
      <input type="text" value={text} onChange={onChangeInput} />
      <br />
      <br />
      <button onClick={onClickOpen}>表示</button>
      <ChildArea open={open} />
    </>
  );
}

export default App;
