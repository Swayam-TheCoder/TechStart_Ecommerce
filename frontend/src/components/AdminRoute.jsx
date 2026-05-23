import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminRoute({ children }) {
  const { userInfo } = useAuth();

  return userInfo && userInfo.isAdmin ? children : <Navigate to="/" />;
}

export default AdminRoute;
