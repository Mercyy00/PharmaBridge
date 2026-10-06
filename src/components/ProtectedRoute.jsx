import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, roles, requireVerified }) {
  const { currentUser } = useAuth();

  if (!currentUser) return <Navigate to="/login" />;

  if (roles && !roles.includes(currentUser.role)) return <Navigate to="/" />;

  if (
    requireVerified &&
    currentUser.role === "buyer" &&
    currentUser.status !== "verified"
  ) {
    return <Navigate to="/upload-license" />;
  }

  return children;
}

export default ProtectedRoute;
