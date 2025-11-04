import styled from "styled-components";
import { SearchInput } from "../atoms/SearchInput";
import { SecondaryButton } from "../atoms/SecondaryButton";
import { useContext } from "react";
import { UserContext } from "../../providers/UserProvider";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Top = () => {
  const navigate = useNavigate();
  const { setUserInfo } = useContext(UserContext);

  const onClickAdmin = () => {
    setUserInfo({ isAdmin: true });
    navigate("/user"); // AppRouter の path と一致
  };

  const onClickGeneral = () => {
    setUserInfo({ isAdmin: false });
    navigate("/user");
  };

  return (
    <Container>
      <h1>Top Page</h1>
      <SearchInput />
      <SecondaryButton onClick={onClickAdmin}>管理者ユーザー</SecondaryButton>
      <SecondaryButton onClick={onClickGeneral}>一般ユーザー</SecondaryButton>
    </Container>
  );
};
