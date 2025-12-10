import styled from "./BaseButton.module.scss";

export const BaseButton = (props) => {
  const { color, children } = props;

  // styled[color]を使用しなければいけない = CSS moduleの限界
  return <button className={styled[color]}>{children}</button>;
};
