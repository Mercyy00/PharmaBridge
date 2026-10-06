import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top">
      <div className="container">
        <Link
          className="navbar-brand fw-bold fs-4"
          style={{ color: "var(--pb-blue)" }}
          to="/"
        >
          <i className="bi bi-plus-square-fill me-2"></i>PharmaBridge
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="menu">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item"><NavLink className="nav-link" to="/">Home</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/products">Products</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/enquiry">Enquiry</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/compliance">Compliance</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/downloads">Downloads</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/about">About Us</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/contact">Contact</NavLink></li>
          </ul>

          <div className="d-flex align-items-center gap-3">
            <Link to="/products" className="text-dark fs-5"><i className="bi bi-search"></i></Link>

            {!currentUser ? (
              <Link to="/login" className="text-dark fs-4"><i className="bi bi-person"></i></Link>
            ) : (
              <div className="dropdown">
                <button
                  className="btn btn-outline-pb btn-sm dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  {currentUser.name}
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li className="dropdown-item-text text-muted small">Role: {currentUser.role}</li>
                  {currentUser.role === "buyer" && (
                    <li><Link className="dropdown-item" to="/upload-license">My Verification</Link></li>
                  )}
                  {currentUser.role === "officer" && (
                    <li><Link className="dropdown-item" to="/officer">Compliance Dashboard</Link></li>
                  )}
                  {currentUser.role === "admin" && (
                    <li><Link className="dropdown-item" to="/admin">Admin Panel</Link></li>
                  )}
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
