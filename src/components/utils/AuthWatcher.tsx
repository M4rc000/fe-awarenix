import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function isTokenValid(token: string | null): boolean {
  if (!token) return false;
  try {
    const [, payloadBase64] = token.split(".");
    const payload = JSON.parse(atob(payloadBase64));
    const now = Math.floor(Date.now() / 1000);
    return payload.exp && payload.exp > now;
  } catch {
    return false;
  }
}

export default function AuthWatcher() {
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(async () => {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");

      const valid = isTokenValid(token);

      if (!token || !valid || !user) {
        if (token) {
          // Call backend logout (optional)
          await fetch("/api/v1/auth/logout", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }

        // Clear localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // Redirect
        navigate("/login", { replace: true });
      }
    }, 15000); // every 15 seconds

    return () => clearInterval(interval);
  }, [navigate]);

  return null; // No UI
}
