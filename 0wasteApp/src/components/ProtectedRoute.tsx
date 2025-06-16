import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { currentUser, loading } = useAuth();

  if (loading) return <div>Chargement en cours…</div>;

  if (!currentUser) return <Navigate to="/login" replace />;

  return children;
}
