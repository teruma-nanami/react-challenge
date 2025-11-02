const style = {
  width: "100%",
  height: "200px",
  backgroundColor: "khaki",
};

export const ChildArea = (props) => {
  const { open } = props;
  // const data = [...Array(2000).keys()]; // 0から1999までの配列
  // data.forEach(() => {
  //   console.log("レンダリングされました");
  // });

  const data = [...Array(1).keys()]; // 0から1999までの配列
  data.forEach(() => {
    console.log("useEffectの練習");
  });

  return <>{open ? <div style={style}>子コンポーネント</div> : null}</>;
};
