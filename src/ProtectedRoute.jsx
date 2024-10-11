import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";


export default function ProtectedRoute() {
  const {loading, isAuthenticated} = useAuth();

  console.log("Loading: ", loading);
  console.log("isAuthenticated: ", isAuthenticated);
  if(loading) {
    return <div>Loading...</div>
  }

  if(!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <Outlet />
  )
}
