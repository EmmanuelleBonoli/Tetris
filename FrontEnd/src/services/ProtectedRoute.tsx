import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("tetrisGame");
    if (!user) {
      return navigate("/");
    }
  }, [navigate]);

  return <>{children}</>;
}
