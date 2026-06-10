import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    navigate("/dashboard");
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-brand">F</div>
        <p className="eyebrow">Dispatcher workspace</p>
        <h1>Freight Offers Inbox</h1>
        <p className="muted">Sign in to review and manage today's freight opportunities.</p>
        <form onSubmit={handleSubmit}>
          <label>
            Username
            <input type="text" placeholder="dispatcher" required />
          </label>
          <label>
            Password
            <input type="password" placeholder="Enter password" required />
          </label>
          <button className="button primary full-width" type="submit">Login</button>
        </form>
        <small>Practice project - no real authentication required</small>
      </div>
    </div>
  );
}

export default Login;
