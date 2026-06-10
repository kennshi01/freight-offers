import { useNavigate } from "react-router-dom";
import { ArrowRight, LockKeyhole, Truck, User } from "lucide-react";

function Login() {
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    navigate("/dashboard");
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-brand"><Truck size={24} /></div>
        <p className="eyebrow">Dispatcher workspace</p>
        <h1>Freight Offers Inbox</h1>
        <p className="muted">Sign in to review and manage today's freight opportunities.</p>
        <form onSubmit={handleSubmit}>
          <label>
            Username
            <div className="input-with-icon"><User size={16} /><input type="text" placeholder="dispatcher" required /></div>
          </label>
          <label>
            Password
            <div className="input-with-icon"><LockKeyhole size={16} /><input type="password" placeholder="Enter password" required /></div>
          </label>
          <button className="button primary full-width" type="submit">Login <ArrowRight size={16} /></button>
        </form>
        <small>Practice project - no real authentication required</small>
      </div>
    </div>
  );
}

export default Login;
