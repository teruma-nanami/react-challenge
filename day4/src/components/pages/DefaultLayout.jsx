import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = styled.header`
  background-color: #11999e;
  color: white;
  padding: 10px;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;

const Footer = styled.footer`
  background-color: #11999e;
  color: #fff;
  padding: 10px;
  text-align: center;
  margin-top: 20px;
`;

export const DefaultLayout = (props) => {
  const { children } = props;
  return (
    <>
      <Header>
        <Link to="/">Home</Link>
        <Link to="/user">User</Link>
      </Header>
      {children}
      <Footer>
        <small>© 2024 React Challenge</small>
      </Footer>
    </>
  );
};
