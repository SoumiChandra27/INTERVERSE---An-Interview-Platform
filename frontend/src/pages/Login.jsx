import {
  useState,
  useContext
} from "react";
import {
  Link,
  useNavigate
} from "react-router-dom";
import {
  loginUser
} from "../services/authApi";
import {
  AuthContext
} from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/auth.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
function Login() {
  // =====================================================
  // NAVIGATION
  // =====================================================
  const navigate = useNavigate();
  // =====================================================
  // CONTEXT
  // =====================================================
  const { login } =
    useContext(AuthContext);
  // =====================================================
  // STATES
  // =====================================================
  const [email, setEmail] =
    useState("");
  const [password, setPassword] =
    useState("");
  const [showPassword, setShowPassword] =
    useState(false);
  // =====================================================
  // LOGIN HANDLER
  // =====================================================
  const submitHandler = async () => {
    // ============================================
    // VALIDATION
    // ============================================
    if (!email || !password) {
      alert(
        "Please fill all fields"
      );
      return;
    }
    try {
      // ============================================
      // LOGIN API
      // ============================================
      const res =
        await loginUser({
          email,
          password
        });
      // ============================================
      // CLEAR OLD STORAGE
      // ============================================
      localStorage.clear();
      // ============================================
      // CONTEXT LOGIN
      // ============================================
      login(res.data);
      // ============================================
      // STORE TOKEN
      // ============================================
      localStorage.setItem(
        "token",
        res.data.token
      );
      // ============================================
      // STORE USER
      // ============================================
      localStorage.setItem(
        "user",
        JSON.stringify(
          res.data.user
        )
      );
      // ============================================
      // REDIRECT
      // ============================================
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      alert(
        "Invalid credentials"
      );
    }
  };
  // =====================================================
  // UI
  // =====================================================
  return (
    <div className="auth-wrapper">
      {/* =====================================================
      NAVBAR
      ===================================================== */}
      <Navbar />
      {/* =====================================================
      LOGIN PAGE
      ===================================================== */}
      <div className="auth-page">
        <div className="auth-card">
          {/* =====================================================
          LOGO
          ===================================================== */}
          <h1 className="logo">
            INTERVRSE
          </h1>
          {/* =====================================================
          SUBTITLE
          ===================================================== */}
          <p className="subtitle">
            Interview Platform
          </p>
          {/* =====================================================
          EMAIL
          ===================================================== */}
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
          />
          {/* =====================================================
          PASSWORD
          ===================================================== */}
          <div className="password-box">
            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
            />
            <span
              className="password-eye"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
            >
              {
                showPassword
                  ? <FaEyeSlash />
                  : <FaEye />
              }
            </span>
          </div>
          {/* =====================================================
          LOGIN BUTTON
          ===================================================== */}
          <button
            onClick={submitHandler}
          >
            Login
          </button>
          {/* =====================================================
          SIGNUP LINK
          ===================================================== */}
          <p className="switch-auth">
            Don't have an account?
            <Link to="/signup">
              Signup
            </Link>
          </p>
          <p className="forgot-password">
            <Link to="/forgot-password">
              Forgot Password?
            </Link>
          </p>
        </div>
      </div>
      {/* =====================================================
      FOOTER
      ===================================================== */}
      <Footer />
    </div>
  );
}
export default Login;