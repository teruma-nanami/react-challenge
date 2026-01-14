import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

type Props = {
  children: ReactNode;
};

function Layout({ children }: Props) {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div>
      <header style={{ padding: "8px", borderBottom: "1px solid #ccc" }}>
        <nav style={{ display: "flex", gap: "8px" }}>
          <Link to="/todos">Todos</Link>
          <Link to="/profile">Profile</Link>

          {isAuthenticated ? (
            <button
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            >
              Logout
            </button>
          ) : (
            <button onClick={() => loginWithRedirect()}>Login</button>
          )}
        </nav>
      </header>

      <main style={{ padding: "16px" }}>{children}</main>
    </div>
  );
}

export default Layout;
