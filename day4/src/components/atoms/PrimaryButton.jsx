import styled from "styled-components";
import { BaseButton } from "./BaseButton";

const StyledButton = styled(BaseButton)`
  background-color: #40514e;
`;

export const PrimaryButton = (props) => {
  const { children } = props;
  return <StyledButton>{children}</StyledButton>;
};
