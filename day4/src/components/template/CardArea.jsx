import styled from "styled-components";
import { UserCard } from "../organism/UserCard";

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const users = [...Array(10).keys()].map((num) => ({
  Id: num + 1,
  image:
    "https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2832",
  name: `User Name ${num + 1}`,
  email: `user${num + 1}@example.com`,
  location: `Location ${num + 1}`,
  tel: `090-1234-567${num}`,
  website: `https://example${num + 1}.com`,
}));

export const CardArea = () => {
  return (
    <Container>
      {users.map((user) => (
        <UserCard key={user.Id} user={user} />
      ))}
    </Container>
  );
};
