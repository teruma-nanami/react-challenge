export const Practice3 = () => {
  // 練習問題2: 戻り値の型指定
  // ここではnumber型の値を返すように設定している
  const getTotalfee = (num: number) => {
    const total = num * 1.3;
    return total.toString();
  };
  const onclickPractice = () => {
    let total: string = "0";
    total = getTotalfee(1000);
    console.log(`合計金額は${total}円です`);
  };

  return (
    <div>
      <p>練習問題:変数の型指定</p>
      <button onClick={onclickPractice}>練習問題3を実行</button>
    </div>
  );
};
