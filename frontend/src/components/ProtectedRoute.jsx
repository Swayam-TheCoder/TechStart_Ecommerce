import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { userInfo } = useAuth();

  return userInfo ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
