import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function ProtectedRoute({ allowed = [] }) {
  const { user } = useAuth();

  // If allowed empty -> public
  if (!allowed.length) return <Outlet />;

  if (allowed.includes(user.role)) {
    return <Outlet />;
  }

  // If guest -> go to login, otherwise show unauthorized
  return user.role === "guest" ? <Navigate to="/login" replace /> : <Navigate to="/unauthorized" replace />;
}

export default ProtectedRoute;