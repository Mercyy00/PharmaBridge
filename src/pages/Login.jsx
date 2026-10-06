import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const ok = login(email, password);
    if (!ok) {
      setError("Invalid email or password");
      return;
    }
    navigate("/");
  };

  const handleQuickLogin = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    login(demoEmail, demoPass);
    navigate("/");
  };

  return (
    <div className="container mt-5 mb-5" style={{ maxWidth: "480px" }}>
      <div className="pb-card p-4">
        <div className="text-center mb-4">
          <div className="icon-circle mx-auto mb-2"><i className="bi bi-shield-lock-fill"></i></div>
          <h3 className="fw-bold">Sign In to PharmaBridge</h3>
          <p className="text-muted-pb small">Access your export procurement or compliance portal</p>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email Address</label>
            <input
              type="email"
              className="form-control"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <button className="btn btn-pb w-100 py-2">
            <i className="bi bi-box-arrow-in-right me-2"></i>Sign In
          </button>
        </form>

        <p className="mt-3 mb-4 text-center small text-muted-pb">
          New institutional buyer? <Link to="/register" className="fw-semibold">Register here</Link>
        </p>

        {/* Quick Demo Login Buttons */}
        <div className="p-3 bg-light rounded-4 border">
          <div className="eyebrow text-center mb-2">Demo Role Quick-Login</div>
          <div className="d-flex flex-column gap-2">
            <button
              type="button"
              className="btn btn-outline-dark btn-sm d-flex justify-content-between align-items-center"
              onClick={() => handleQuickLogin("admin@pharmabridge.com", "admin123")}
            >
              <span><i className="bi bi-person-fill-gear me-2"></i>Admin</span>
              <small className="text-muted">admin@pharmabridge.com</small>
            </button>
            <button
              type="button"
              className="btn btn-outline-primary btn-sm d-flex justify-content-between align-items-center"
              onClick={() => handleQuickLogin("officer@pharmabridge.com", "officer123")}
            >
              <span><i className="bi bi-shield-check me-2"></i>Compliance Officer</span>
              <small className="text-muted">officer@pharmabridge.com</small>
            </button>
            <button
              type="button"
              className="btn btn-outline-success btn-sm d-flex justify-content-between align-items-center"
              onClick={() => handleQuickLogin("buyer@apollo.com", "buyer123")}
            >
              <span><i className="bi bi-patch-check-fill me-2"></i>Verified Buyer</span>
              <small className="text-muted">buyer@apollo.com</small>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
