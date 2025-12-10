import styled from "styled-components";
import { CardArea } from "../template/CardArea";
import { useLocation } from "react-router-dom";
import { SecondaryButton } from "../atoms/SecondaryButton";
import { useContext } from "react";
import { UserContext } from "../../providers/UserProvider";
import { SearchInput } from "../atoms/SearchInput";

const Container = styled.div`
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const User = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const onClickToggle = () => {
    setUserInfo({ isAdmin: !userInfo?.isAdmin });
  };

  const { state } = useLocation();
  const isAdmin = state?.isAdmin || false;
  return (
    <>
      <Container>
        <h1>User Page</h1>
        <SearchInput />
        <SecondaryButton onClick={onClickToggle}>きりかえ</SecondaryButton>
        <CardArea isAdmin={isAdmin} />
      </Container>
    </>
  );
};
