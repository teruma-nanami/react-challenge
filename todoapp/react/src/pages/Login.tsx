import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const { loginWithRedirect, isLoading, isAuthenticated } = useAuth0();

  const navigate = useNavigate();

  // ログイン完了を監視
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/todos");
    }
  }, [isAuthenticated, navigate]);

  if (isLoading) {
    return <div>Auth Loading...</div>;
  }

  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => loginWithRedirect()}>Googleでログイン</button>
    </div>
  );
}

export default Login;
