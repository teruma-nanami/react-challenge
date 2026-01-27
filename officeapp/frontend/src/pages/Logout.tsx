import { useAuth0 } from "@auth0/auth0-react";
const { logout } = useAuth0();

<button
  onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
>
  ログアウト
</button>;
