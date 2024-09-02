import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import { Home } from "./pages/home/home";
import AdminDashboard from "./pages/admin";
import LoginAdmin from "./pages/admin/login/login";
import Cookies from "js-cookie";

const useAuth = () => {
  const user = Cookies.get("token");

  return user;
};

const PrivateRouteAdmin = () => {
  const user = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (!user) {
    return <Navigate to={"/"} replace />;
  }

  return <Outlet />;
};

export const Root = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route element={<PrivateRouteAdmin />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
