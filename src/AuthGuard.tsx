import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./providers/AuthProvider";

export default function AuthGuard() {
  const { currentUser } = useAuth();

  return currentUser !== null ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" replace={true} />
  );
}
