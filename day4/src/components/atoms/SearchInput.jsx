import styled from "styled-components";
import { PrimaryButton } from "./PrimaryButton";
import { memo } from "react";

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

export const SearchInput = memo(() => {
  console.log("SearchInput rendered");
  return (
    <div>
      <StyledSearchInput type="text" placeholder="検索条件を入力" />
      <PrimaryButton>検索</PrimaryButton>
    </div>
  );
});
