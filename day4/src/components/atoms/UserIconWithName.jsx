import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "../../providers/UserProvider";

const StyledUserIcon = styled.div`
  text-align: center;
`;

const StyledUserImage = styled.img`
  border-radius: 50%;
  margin-right: 12px;
`;

const StyledUserName = styled.span`
  font-weight: bold;
  fonst-size: 18px;
  display: block;
  margin-top: 8px;
  color: #40514e;
`;
export const UserIconWithName = (props) => {
  const { user } = props;
  const context = useContext(UserContext);
  console.log(context);
  return (
    <StyledUserIcon>
      <StyledUserImage
        src={user.image}
        alt={`${user.name}のアイコン`}
        width={160}
        height={160}
      />
      <StyledUserName>{user.name}</StyledUserName>
    </StyledUserIcon>
  );
};
