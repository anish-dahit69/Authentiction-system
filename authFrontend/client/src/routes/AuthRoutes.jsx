import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import VerifyOTP from "../pages/auth/VerifyOTP";
import LandingPage from "../pages/LandingPage";

export const authRoutes = [
  { path: "/", element: <LandingPage /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/verify-otp", element: <VerifyOTP /> },
];
