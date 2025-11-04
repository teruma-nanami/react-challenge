import styled from "styled-components";
import { UserIconWithName } from "../atoms/UserIconWithName";

const StyledDl = styled.dl`
  margin: 0;
  padding: 0;
`;
const StyledDt = styled.dt`
  float: left;
  width: 80px;
  font-weight: bold;
`;
const StyledDd = styled.dd`
  margin: 0 16px 8px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-left: 32px;
  padding-bottom: 8px;
  overflow-wrap: break-word;
`;

const StyledCard = styled.div`
  border: 1px solid #e5e7eb;
  padding: 16px;
  border-radius: 8px;
  background: #fff;
  box-shadow: #dddddd 0 0 4px 2px;
`;

export const UserCard = (props) => {
  const { user } = props;

  return (
    <StyledCard>
      <UserIconWithName user={user} />
      <StyledDl>
        <StyledDt>Email:</StyledDt>
        <StyledDd>{user.email}</StyledDd>
        <StyledDt>Location:</StyledDt>
        <StyledDd>{user.location}</StyledDd>
        <StyledDt>TEL:</StyledDt>
        <StyledDd>{user.tel}</StyledDd>
        <StyledDt>Website:</StyledDt>
        <StyledDd>{user.website}</StyledDd>
      </StyledDl>
    </StyledCard>
  );
};
