import { Navigate, Outlet } from "react-router-dom";

function isTokenValid(token: string | null): boolean {
  if (!token) return false;
  try {
    const [, payloadBase64] = token.split(".");
    const payload = JSON.parse(atob(payloadBase64));
    const now = Math.floor(Date.now() / 1000);
    return payload.exp && payload.exp > now;
  } catch (err) {
    return false;
  }
}

export default function ProtectedRoute() {
  const token = localStorage.getItem("token");

  if (!isTokenValid(token)) {
    localStorage.removeItem("token"); // optional: bersihkan token expired
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
