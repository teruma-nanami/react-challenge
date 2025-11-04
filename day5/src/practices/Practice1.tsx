export const Practice1 = () => {
  const calcTotalfee = (num: number) => {
    const total = num * 1.1;
    console.log(`合計金額は${total}円です`);
  }
  const onclickPractice = () => calcTotalfee(1000);
  // ここで1000を文字列にするとエラーが出る。しかし、ブラウザ上では動作するので注意
  return (
    <div>
      <p>練習問題:引数の型指定</p>
      <button onClick={onclickPractice}>練習問題1を実行</button>
    </div>
  )
}