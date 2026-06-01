import MainLayout from "../layouts/MainLayout";
import Footer from "../components/Footer";
import "./about.css";
export default function About() {
  return (
    <MainLayout>
      <div className="about-page">
        {/* ================================================= */}
        {/* HERO SECTION */}
        {/* ================================================= */}
        <section className="about-hero">
          <h1>
            About <span>INTERVRSE</span>
          </h1>
          <p>
            INTERVRSE is an interview preparation
            platform designed to help students and job seekers
            improve their technical interview skills through
            realistic interview simulations and intelligent
            answer evaluation.
          </p>
        </section>
        {/* ================================================= */}
        {/* ABOUT CONTENT */}
        {/* ================================================= */}
        <section className="about-container">
          {/* LEFT */}
          <div className="about-card">
            <h2>
              Our Mission
            </h2>
            <p>
              Our mission is to make technical interview
              preparation more interactive, accessible,
              and intelligent using modern Natural Language Processing
              technologies.
            </p>
            <p>
              INTERVRSE helps users practice domain-specific
              interview questions, receive contextual
              feedback, and track their overall interview
              performance through analytics and adaptive
              evaluation systems.
            </p>
          </div>
          {/* RIGHT */}
          <div className="about-card">
            <h2>
              Key Features
            </h2>
            <ul>
              <li>
                Semantic answer evaluation
              </li>
              <li>
                Adaptive interview difficulty system
              </li>
              <li>
                Real-time interview simulation
              </li>
              <li>
                Voice-assisted interview interaction
              </li>
              <li>
                Interview history and analytics
              </li>
              <li>
                Multiple technical domains support
              </li>
              <li>
                Secure JWT authentication system
              </li>
            </ul>
          </div>
        </section>
        {/* ================================================= */}
        {/* TECHNOLOGY SECTION */}
        {/* ================================================= */}
        <section className="tech-section">
          <h2>
            Technologies Used
          </h2>
          <div className="tech-grid">
            <div className="tech-card">
              <h3>
                Frontend
              </h3>
              <p>
                React.js, CSS, Recharts
              </p>
            </div>
            <div className="tech-card">
              <h3>
                Backend
              </h3>
              <p>
                FastAPI, Python
              </p>
            </div>
            <div className="tech-card">
              <h3>
                Database
              </h3>
              <p>
                SQLite, SQLAlchemy
              </p>
            </div>
            <div className="tech-card">
              <h3>
                AI Models
              </h3>
              <p>
                SBERT, RoBERTa-large-MNLI
              </p>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}