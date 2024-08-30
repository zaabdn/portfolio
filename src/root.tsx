import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import { Home } from "./pages/home/home";
import AdminDashboard from "./pages/admin";

const useAuth = () => {
  const user = { isAuthenticated: true, isAdmin: true };

  return user;
};

const PrivateRouteAdmin = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (!isAdmin) {
    return <Navigate to={"/"} replace />;
  }

  return <Outlet />;
};

export const Root = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<PrivateRouteAdmin />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
