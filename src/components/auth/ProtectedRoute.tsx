import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import Login from "./Login";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();

  console.log("ProtectedRoute - isAuthenticated:", isAuthenticated);

  if (!isAuthenticated) {
    console.log("User not authenticated, redirecting to login");
    return <Navigate to="/admin/login" replace />;
  }

  console.log("User authenticated, showing protected content");
  return <>{children}</>;
}