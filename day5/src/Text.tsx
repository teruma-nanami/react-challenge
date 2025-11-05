import type { FC } from "react";

type Props = {
  color: string;
  fontSize: string;
};

// 関数コンポーネントの型指定FCはFunctionComponentの略で、React18以降は減少傾向
export const Text: FC<Props> = (props) => {
  const { color, fontSize } = props;
  return <div style={{ color, fontSize }}>テキストコンポーネントです</div>;
};
