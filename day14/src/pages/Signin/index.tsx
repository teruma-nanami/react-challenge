import { Link } from 'react-router-dom';
import '../Signup/auth.css';

function Signin() {
  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <h1 className="signup-title">Sign in</h1>
        <p className="signup-subtitle">メールアドレスでログインしてください</p>

        <div>
          <div className="form-group">
            <input type="email" placeholder="Email" required />
          </div>

          <div className="form-group">
            <input type="password" placeholder="Password" required />
          </div>
          <button type="submit" className="continue-button">
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
