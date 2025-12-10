export const Practice2 = () => {
  // 練習問題2: 戻り値の型指定
  // ここではnumber型の値を返すように設定している
  const getTotalfee = (num: number): number => {
    const total = num * 1.2;
    return total;
  }
  const onclickPractice = () => {
    const total = getTotalfee(1000);
    console.log(`合計金額は${total}円です`);
  }
  // ここで1000を文字列にするとエラーが出る。しかし、ブラウザ上では動作するので注意
  return (
    <div>
      <p>練習問題:引数の型指定</p>
      <button onClick={onclickPractice}>練習問題2を実行</button>
    </div>
  )
}