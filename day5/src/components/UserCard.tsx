import type { UserProfile } from "../types/userProfile";

type Props = {
  user: UserProfile;
};

const style = {
  border: "1px solid #ccc",
  borderRadius: "8px",
  padding: "16px",
};

export const UserCard: React.FC<Props> = ({ user }) => {
  return (
    <div style={style}>
      <dl>
        <dt>ID</dt>
        <dd>{user.id}</dd>
        <dt>Name</dt>
        <dd>{user.name}</dd>
        <dt>Email</dt>
        <dd>{user.email}</dd>
        <dt>Address</dt>
        <dd>{user.address}</dd>
      </dl>
    </div>
  );
};
