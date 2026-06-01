import {
  Link
} from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter
} from "react-icons/fa6";
import "./Footer.css";
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* ================================================= */}
        {/* COLUMN 1 */}
        {/* ================================================= */}
        <div className="footer-column">
          <h3>
            Solutions
          </h3>
          <Link to="/dashboard">
            Interview Practice
          </Link>
          <Link to="/analytics">
            Performance Tracking
          </Link>
        </div>
                {/* ================================================= */}
        {/* COLUMN 2 */}
        {/* ================================================= */}
        <div className="footer-column">
          <h3>
            About Us
          </h3>
          <Link to="/about">
            About INTERVRSE
          </Link>
        </div>
        {/* ================================================= */}
        {/* COLUMN 3 */}
        {/* ================================================= */}
        <div className="footer-column">
          <h3>
            Conatct
          </h3>
          <Link to="/contact">
            Contact
          </Link>
        </div>
        {/* ================================================= */}
        {/* COLUMN 4 */}
        {/* ================================================= */}
        <div className="footer-column">
          <h3>
            Get Started
          </h3>
          <Link to="/signup">
            Create Account
          </Link>
          <Link to="/login">
            Login
          </Link>
        </div>
      </div>
      {/* ================================================= */}
      {/* BOTTOM */}
      {/* ================================================= */}
      <div className="footer-bottom">
        {/* LEFT */}
        <div className="footer-brand">
          <h1>
            INTERVRSE
          </h1>
          <p>
            © 2026 INTERVRSE
            All Rights Reserved.
          </p>
        </div>
        {/* RIGHT */}
        <div className="footer-right">
          {/* SOCIALS */}
          <div className="footer-socials">
            <a href="#">
              <FaFacebook />
            </a>
            <a href="#">
              <FaLinkedin />
            </a>
            <a href="#">
              <FaXTwitter />
            </a>
            <a href="#">
              <FaInstagram />
            </a>
          </div>
          {/* LINKS */}
          <div className="footer-policy">
            <Link to="/">
              Privacy Policy
            </Link>
            <Link to="/">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;