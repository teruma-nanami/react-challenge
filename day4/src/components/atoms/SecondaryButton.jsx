import styled from "styled-components";
import { BaseButton } from "./BaseButton";

const StyledButton = styled(BaseButton)`
  background-color: #11999e;
`;

export const SecondaryButton = (props) => {
  const { children } = props;
  return <StyledButton>{children}</StyledButton>;
};
