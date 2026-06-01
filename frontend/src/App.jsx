import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Interview from "./pages/Interview";
import History from "./pages/History";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import About from "./pages/About";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import InterviewDetails from "./pages/InterviewDetails";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* =====================================
        DEFAULT ROUTE
        ===================================== */}
        <Route
          path="/"
          element={<Navigate to="/login" />}
        />
        {/* =====================================
        PUBLIC ROUTES
        ===================================== */}
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/signup"
          element={<Signup />}
        />
        {/* =====================================
        PROTECTED ROUTES
        ===================================== */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={<Profile />}
        />
        <Route
          path="/contact"
          element={<Contact />}
        />
        <Route
          path="/about"
          element={<About />}
        />
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />
        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        />
        <Route
          path="/interview"
          element={
            <ProtectedRoute>
              <Interview />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history/details/:id"
          element={<InterviewDetails />}
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;