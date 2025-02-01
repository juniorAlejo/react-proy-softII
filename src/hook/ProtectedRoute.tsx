import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isAuthenticated = sessionStorage.getItem("isAuthenticated");

  if (!isAuthenticated) {
    return <Navigate to="/teacher/login" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ProtectedRoute;

