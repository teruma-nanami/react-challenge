import { memo } from 'react';

export const Login = memo(() => {
  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
});


export default Login;