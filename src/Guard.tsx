import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./providers/AuthProvider";

export default function Guard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser === null) {
      navigate("/auth/login", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  }, [currentUser, navigate]);
}
