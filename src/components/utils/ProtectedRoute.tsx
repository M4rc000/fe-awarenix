import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // const isAuthenticated = localStorage.getItem('token'); // atau dari context/state

  // return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;