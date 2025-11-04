import styled from "styled-components";
import { PrimaryButton } from "./PrimaryButton";

const StyledSearchInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;

  &:focus {
    border-color: #40514e;
    outline: none;
  }
`;

export const SearchInput = () => {
  return (
    <div>
      <StyledSearchInput type="text" placeholder="検索条件を入力" />
      <PrimaryButton>検索</PrimaryButton>
    </div>
  );
};
