export const Practice1 = () => {
  const calcTotalfee = (num: number) => {
    const total = num * 1.1;
    console.log(`合計金額は${total}円です`);
  }
  const onclickPractice = () => calcTotalfee(1000);
  return (
    <div>
      <p>練習問題:引数の型指定</p>
      <button onClick={onclickPractice}>練習問題を実行</button>
    </div>
  )
}