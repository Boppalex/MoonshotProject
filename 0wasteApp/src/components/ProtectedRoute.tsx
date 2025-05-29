import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { currentUser, loading } = useAuth();

  // 1. Tant que Firebase n’a pas renvoyé l’état, on affiche un loader
  if (loading) return <div>Chargement en cours…</div>;

  // 2. Si pas de user, on redirige vers /login
  if (!currentUser) return <Navigate to="/login" replace />;

  // 3. Sinon, on affiche la page demandée
  return children;
}
