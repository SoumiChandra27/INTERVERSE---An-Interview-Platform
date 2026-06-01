import {
  Navigate
} from "react-router-dom";
export default function ProtectedRoute({
  children
}) {
  // ============================================
  // CHECK TOKEN
  // ============================================
  const token =
    localStorage.getItem("token");
  // ============================================
  // IF NOT LOGGED IN
  // ============================================
  if (!token) {
    return <Navigate to="/login" />;
  }
  // ============================================
  // ALLOW ACCESS
  // ============================================
  return children;
}