import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../store/useAuthStore";

export default function AuthRoute() {
  const user = useAuthStore((state) => state.user);

  if (user) return <Navigate to="/projects" />;

  return <Outlet />;
}
