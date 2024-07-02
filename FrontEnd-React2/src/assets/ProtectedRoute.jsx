import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import PropTypes from "prop-types";

export function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("tetrisGame");
    if (!user) {
      return navigate("/");
    }
  }, [navigate]);

  return <>{children}</>;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node,
};
