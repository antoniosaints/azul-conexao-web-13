import { useAuth } from "@/hooks/useAuth";
import Login from "./Login";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();

  console.log("ProtectedRoute - isAuthenticated:", isAuthenticated);

  if (!isAuthenticated) {
    console.log("User not authenticated, showing login");
    return <Login />;
  }

  console.log("User authenticated, showing protected content");
  return <>{children}</>;
}