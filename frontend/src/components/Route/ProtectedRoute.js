import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
function ProtectedRoute({ isAuthenticated, isAdmin, children }) {
  const { user } = useSelector((state) => state.user);
  // return isAuthenticated ? children : <Navigate to="/login" />;
  if (isAuthenticated === false) {
    return <Navigate to="/login" />;
  }
  if (isAdmin === true && user.role !== "admin") {
    return <Navigate to="/login" />;
  }
  return children;
}
export default ProtectedRoute;
