import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth/authContext";

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return children;
  }
  return <Navigate to="/profile" replace />;
};

export default PublicRoute;
