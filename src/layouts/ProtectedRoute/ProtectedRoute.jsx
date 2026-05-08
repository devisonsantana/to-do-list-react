import { Navigate } from "react-router-dom";
import { useAppContext } from "../../hooks";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isTokenExpired } = useAppContext();

  if (!isAuthenticated || isTokenExpired) {
    localStorage.clear();
    return <Navigate to="/login" />;
  }

  return children;
};

export { ProtectedRoute };
