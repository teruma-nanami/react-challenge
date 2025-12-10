import { UserCard } from "./components/UserCard";
import { useAllUsers } from "./hooks/useAllUsers";

export const UserData = () => {
  const { getUsers, userProfiles, loading, error } = useAllUsers();
  const onClickFetchUsers = () => {
    getUsers();
  };

  return (
    <>
      <button onClick={onClickFetchUsers}>データ取得</button>
      {error ? (
        <p>Error occurred while fetching data.</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {userProfiles.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </>
      )}
    </>
  );
};
