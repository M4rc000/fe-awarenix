import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

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

      if(token || user){
        const valid = isTokenValid(token);
        if(!valid){
          await fetch("/api/v1/auth/logout", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          
          Swal.fire({
            title: 'Session Expired!',
            text: 'Please log in.',
            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: "Oke",
            denyButtonText: `Don't save`,
            icon: "warning",
            width: 300,
          }).then(() => {
            // Clear localStorage
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            
            // Redirect
            navigate("/login", { replace: true });
          });

    
        }
      }    
    }, 30000); // every 15 seconds

    return () => clearInterval(interval);
  }, [navigate]);

  return null; // No UI
}
