import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/auth";

export const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Checking authentication...
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }
  return <Outlet />;
};
