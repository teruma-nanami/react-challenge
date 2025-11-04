import { Link } from "react-router-dom";

export const HeaderOnly = (props) => {
  const { children } = props;
  return (
    <>
      <div>{children}</div>
    </>
  );
};
