export const Practice4 = () => {
  // strict モードが有効になっていると、引数や戻り値の型指定を省略するとエラーになる
  // パラメーター'num'の形は暗黙的に'any'になります。というエラーが出る
  const calcTotalfee = (num) => {
    const total = num * 1.1;
    console.log(`合計金額は${total}円です`);
  }
  const onclickPractice = () => calcTotalfee(1000);
  // ここで1000を文字列にするとエラーが出る。しかし、ブラウザ上では動作するので注意
  return (
    <div>
      <p>練習問題:設定ファイルを触ってみる</p>
      <button onClick={onclickPractice}>練習問題4を実行</button>
    </div>
  )
}