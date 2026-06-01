import {
  useNavigate
} from "react-router-dom";
import "./Navbar.css";
export default function Navbar() {
  const navigate = useNavigate();
  // =====================================================
  // LOGOUT
  // =====================================================
  const logoutHandler = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <header className="navbar">
      {/* LOGO */}
      <div
        className="navbar-logo"
        onClick={() =>
          navigate("/dashboard")
        }
      >
        INTERVRSE
      </div>
      {/* NAV LINKS */}
      <div className="navbar-links">
        <button
          onClick={() =>
            navigate("/dashboard")
          }
        >
          Dashboard
        </button>
        <button
          onClick={() =>
            navigate("/analytics")
          }
        >
          Analytics
        </button>
        <button
          onClick={() =>
            navigate("/history")
          }
        >
          History
        </button>
        <button
          onClick={() => navigate("/profile")}
        >
          Profile
        </button>
        <button
          className="logout-btn-nav"
          onClick={logoutHandler}
        >
          Logout
        </button>
      </div>
    </header>
  );
}