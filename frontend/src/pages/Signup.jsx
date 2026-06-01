import {
  useState
} from "react";
import {
  Link,
  useNavigate
} from "react-router-dom";
import {
  signupUser
} from "../services/authApi";
// =====================================================
// COMPONENTS
// =====================================================
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/auth.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
function Signup() {
  // =====================================================
  // NAVIGATION
  // =====================================================
  const navigate = useNavigate();
  // =====================================================
  // STATES
  // =====================================================
  const [name, setName] =
    useState("");
  const [email, setEmail] =
    useState("");
  const [password, setPassword] =
    useState("");
  const [showPassword, setShowPassword] =
    useState(false);
  // =====================================================
  // SUBMIT HANDLER
  // =====================================================
  const submitHandler = async () => {
    // =====================================
    // VALIDATION
    // =====================================
    if (
      !name ||
      !email ||
      !password
    ) {
      alert(
        "Please fill all fields"
      );
      return;
    }
    try {
      // =====================================
      // CLEAR OLD STORAGE
      // =====================================
      localStorage.clear();
      // =====================================
      // API CALL
      // =====================================
      const res =
        await signupUser({
          name,
          email,
          password
        });
      console.log(
        "SIGNUP RESPONSE:"
      );
      console.log(res.data);
      // =====================================
      // STORE TOKEN
      // =====================================
      localStorage.setItem(
        "token",
        res.data.token
      );
      // =====================================
      // STORE USER
      // =====================================
      localStorage.setItem(
        "user",
        JSON.stringify(
          res.data.user
        )
      );
      // =====================================
      // SUCCESS MESSAGE
      // =====================================
      alert(
        "Account created successfully"
      );
      // =====================================
      // REDIRECT
      // =====================================
      navigate("/dashboard");
    } catch (err) {
      console.log(
        "SIGNUP ERROR:"
      );
      console.log(err);
      alert(
        "Signup failed"
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
      SIGNUP PAGE
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
            Create your Interview account
          </p>
          {/* =====================================================
          NAME
          ===================================================== */}
          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
          />
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
              placeholder="Create password"
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
          BUTTON
          ===================================================== */}
          <button
            onClick={submitHandler}
          >
            Create Account
          </button>
          {/* =====================================================
          LOGIN LINK
          ===================================================== */}
          <p className="switch-auth">
            Already have an account?
            <Link to="/login">
              Login
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
export default Signup;