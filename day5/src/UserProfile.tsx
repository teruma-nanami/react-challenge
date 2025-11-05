import type { User } from "./types/user";

export const UserProfile = (props: { user: User }) => {
  const { user } = props;
  return (
    <div>
      <h2>User Profile</h2>
      <p>ID: {user.id}</p>
      <p>Name: {user.name}</p>
      {/* hobbies?.がオプショナルチェイン。
      もしhobbiesがundefinedまたはnullの場合、joinは呼ばれず、代わりにundefinedが返る
      
      {/* joinは配列を文字列に変換するメソッドで、区切り文字を指定できる（今回は", "）
       */}
      <p>Hobbies: {user.hobbies?.join(", ")}</p>
    </div>
  );
};
