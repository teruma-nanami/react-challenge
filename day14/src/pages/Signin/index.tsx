import { Link } from "react-router-dom";
import "../Signup/auth.css";
import { useState } from "react";
import { authRepository } from "../../modules/auth/auth.repository";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signin = async () => {
    // サインイン処理をここに実装
    if (email === "" || password === "") return;
    const { user, token } = await authRepository.signin(email, password);
    console.log("Signin successful:", user, token);
  };

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <h1 className="signup-title">Sign in</h1>
        <p className="signup-subtitle">メールアドレスでログインしてください</p>

        <div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="continue-button"
            onClick={signin}
            disabled={email === "" || password === ""}
          >
            Continue
          </button>
        </div>
        <p className="signin-link">
          ユーザー登録は<Link to="/signup">こちら</Link>
        </p>
      </div>
    </div>
  );
}

export default Signin;
