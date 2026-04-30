import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function RoleProtectedRoute({ children, allowedRoles }) {

  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  const role = user.role?.toUpperCase();

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

export default RoleProtectedRoute;