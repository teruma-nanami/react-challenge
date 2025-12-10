import { memo } from "react";

const style = {
  width: "100%",
  height: "200px",
  backgroundColor: "khaki",
};

export const ChildArea = memo((props) => {
  const { open, onClickClose } = props;
  // const data = [...Array(2000).keys()]; // 0から1999までの配列
  // data.forEach(() => {
  //   console.log("レンダリングされました");
  // });

  const data = [...Array(1).keys()]; // 0から1999までの配列
  data.forEach(() => {
    console.log("useEffectの練習");
  });

  return (
    <>
      {open ? (
        <div style={style}>
          <p>子コンポーネント</p>
          <button onClick={onClickClose}>閉じる</button>
        </div>
      ) : null}
    </>
  );
});
