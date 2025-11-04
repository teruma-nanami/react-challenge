import styled from "styled-components";
import { BaseButton } from "./BaseButton";

const StyledButton = styled(BaseButton)`
  background-color: #11999e;
  margin: 10px 0;
  &:hover {
    background-color: #0d7c80;
  }
`;

export const SecondaryButton = (props) => {
  const { children } = props;
  return <StyledButton>{children}</StyledButton>;
};
