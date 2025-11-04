import App from "../../App";
import styled from "styled-components";
import { SearchInput } from "../atoms/SearchInput";
import { CardArea } from "../template/CardArea";
import { SecondaryButton } from "../atoms/SecondaryButton";

const Container = styled.div`
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Top = () => {
  return (
    <App>
      <Container>
        <h1>Top Page</h1>
        <SearchInput />
        <SecondaryButton>管理者ユーザー</SecondaryButton>
        <SecondaryButton>一般ユーザー</SecondaryButton>
      </Container>
      <CardArea />
    </App>
  );
};
