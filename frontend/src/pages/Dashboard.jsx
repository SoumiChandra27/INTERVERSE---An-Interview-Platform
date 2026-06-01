import {
  useState,
  useEffect
} from "react";
import {
  useNavigate
} from "react-router-dom";
import "./dashboard.css";
import API, {
  getDomains
} from "../services/api";
// =====================================================
// COMPONENTS
// =====================================================
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
export default function Dashboard() {
  // =====================================================
  // NAVIGATION
  // =====================================================
  const navigate = useNavigate();
  // =====================================================
  // STATES
  // =====================================================
  const [domain, setDomain] =
    useState("");
  const [domains, setDomains] =
    useState([]);
  const [duration, setDuration] =
    useState("");
  const [history, setHistory] =
    useState([]);
  const [avgScore, setAvgScore] =
    useState(0);
  // =====================================================
  // USER
  // =====================================================
  const user = JSON.parse(
    localStorage.getItem("user")
  );
  // =====================================================
  // LOAD DATA
  // =====================================================
  useEffect(() => {
    fetchDomains();
    fetchHistory();
  }, []);
  // =====================================================
  // FETCH DOMAINS
  // =====================================================
  const fetchDomains = async () => {
    try {
      const res =
        await getDomains();
      setDomains(
        res.data.domains
      );
    } catch (err) {
      console.log(err);
    }
  };
  // =====================================================
  // FETCH HISTORY
  // =====================================================
  const fetchHistory = async () => {
    try {
      const token =
        localStorage.getItem(
          "token"
        );
      const res = await API.get(
        `/history/${user.id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );
      // =============================================
      // FORMAT SCORES TO %
      // =============================================
      const formattedHistory = res.data.history;
      // =============================================
      // SORT BY LATEST INTERVIEW
      // =============================================
      const sortedHistory =
        formattedHistory.sort(
          (a, b) =>
            new Date(
              b.created_at ||
              b.date ||
              b.createdAt
            ) -
            new Date(
              a.created_at ||
              a.date ||
              a.createdAt
            )
        );
      // =============================================
      // SAVE HISTORY
      // =============================================
      setHistory(
        sortedHistory
      );
      // =============================================
      // AVG SCORE
      // =============================================
      if (
        sortedHistory.length > 0
      ) {
        const total =
          sortedHistory.reduce(
            (sum, item) =>
              sum + item.score,
            0
          );
        const average =
          total / sortedHistory.length;
        setAvgScore(
          average
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
  // =====================================================
  // START CUSTOM INTERVIEW
  // =====================================================
  const startInterview = () => {
    localStorage.setItem(
      "domain",
      domain
    );
    localStorage.setItem(
      "duration",
      duration
    );
    navigate("/interview");
  };
  // =====================================================
  // QUICK INTERVIEW
  // =====================================================
  const startQuickInterview = (
    selectedDomain
  ) => {
    localStorage.setItem(
      "domain",
      selectedDomain
    );
    localStorage.setItem(
      "duration",
      duration
    );
    navigate("/interview");
  };
  // =====================================================
  // UI
  // =====================================================
  return (
    <div className="dashboard-page">
      {/* =====================================================
      NAVBAR
      ===================================================== */}
      <Navbar />
      {/* =====================================================
      MAIN CONTENT
      ===================================================== */}
      <main className="dashboard-main">
        <div className="main-container">
          {/* =================================================
          TOPBAR
          ================================================= */}
          <div className="topbar">
            <h1>
              Welcome,
              <span>
                {" "}
                {user?.name}
              </span>
            </h1>
            <p>
              Ready for your next interview?
            </p>
          </div>
          {/* =================================================
          DOMAIN GRID
          ================================================= */}
          <div className="domain-grid">
            {/* =================================================
DSA
================================================= */}
            <div className="domain-card">
              <h3>
                DSA Interview
              </h3>
              <p>
                Data Structures & Algorithms
              </p>
              <select
                className="quick-duration"
                defaultValue=""
                required
                onChange={(e) =>
                  localStorage.setItem(
                    "quick_duration_dsa",
                    e.target.value
                  )
                }
              >
                <option value="" disabled>
                  Please Select Duration
                </option>
                <option value={2}>
                  2 Minute
                </option>
                <option value={5}>
                  5 Minutes
                </option>
                <option value={10}>
                  10 Minutes
                </option>
                <option value={15}>
                  15 Minutes
                </option>
              </select>
              <button
                onClick={() => {
                  const duration = localStorage.getItem(
                    "quick_duration_dsa"
                  );
                  // ============================
                  // VALIDATION
                  // ============================
                  if (!duration) {
                    alert(
                      "Please Select Duration"
                    );
                    return;
                  }
                  // ============================
                  // SAVE DATA
                  // ============================
                  localStorage.setItem(
                    "domain",
                    "data structures & algorithms (dsa)"
                  );
                  localStorage.setItem(
                    "duration",
                    duration
                  );
                  // ============================
                  // NAVIGATE
                  // ============================
                  navigate("/interview");
                }}
              >
                Start Interview
              </button>
            </div>
            {/* =================================================
JAVA
================================================= */}
            <div className="domain-card">
              <h3>
                Java Interview
              </h3>
              <p>
                Java Core + OOPs
              </p>
              <select
                className="quick-duration"
                defaultValue=""
                required
                onChange={(e) =>
                  localStorage.setItem(
                    "quick_duration_java",
                    e.target.value
                  )
                }
              >
                <option value="" disabled>
                  Please Select Duration
                </option>
                <option value={2}>
                  2 Minute
                </option>
                <option value={5}>
                  5 Minutes
                </option>
                <option value={10}>
                  10 Minutes
                </option>
                <option value={15}>
                  15 Minutes
                </option>
              </select>
              <button
                onClick={() => {
                  const duration = localStorage.getItem(
                    "quick_duration_java"
                  );
                  // =====================================
                  // VALIDATION
                  // =====================================
                  if (!duration) {
                    alert(
                      "Please Select Duration"
                    );
                    return;
                  }
                  // =====================================
                  // SAVE
                  // =====================================
                  localStorage.setItem(
                    "domain",
                    "programming languages (java)"
                  );
                  localStorage.setItem(
                    "duration",
                    duration
                  );
                  navigate("/interview");
                }}
              >
                Start Interview
              </button>
            </div>
            {/* =================================================
ML
================================================= */}
            <div className="domain-card">
              <h3>
                ML Interview
              </h3>
              <p>
                AI / Machine Learning
              </p>
              <select
                className="quick-duration"
                defaultValue=""
                required
                onChange={(e) =>
                  localStorage.setItem(
                    "quick_duration_ml",
                    e.target.value
                  )
                }
              >
                <option value="" disabled>
                  Please Select Duration
                </option>
                <option value={2}>
                  2 Minute
                </option>
                <option value={5}>
                  5 Minutes
                </option>
                <option value={10}>
                  10 Minutes
                </option>
                <option value={15}>
                  15 Minutes
                </option>
              </select>
              <button
                onClick={() => {
                  const duration = localStorage.getItem(
                    "quick_duration_ml"
                  );
                  // =====================================
                  // VALIDATION
                  // =====================================
                  if (!duration) {
                    alert(
                      "Please Select Duration"
                    );
                    return;
                  }
                  // =====================================
                  // SAVE
                  // =====================================
                  localStorage.setItem(
                    "domain",
                    "artificial intelligence / machine learning"
                  );
                  localStorage.setItem(
                    "duration",
                    duration
                  );
                  navigate("/interview");
                }}
              >
                Start Interview
              </button>
            </div>
            {/* =================================================
CUSTOM
================================================= */}
            <div className="domain-card custom-card">
              <h3>
                Custom Interview
              </h3>
              {/* DOMAIN */}
              <select
                value={domain}
                defaultValue=""
                required
                onChange={(e) =>
                  setDomain(
                    e.target.value
                  )
                }
              >
                <option value="" disabled>
                  Please Select Domain
                </option>
                {
                  domains.map(
                    (item, index) => (
                      <option
                        key={index}
                        value={item}
                      >
                        {item}
                      </option>
                    )
                  )
                }
              </select>
              {/* DURATION */}
              <select
                value={duration}
                defaultValue=""
                required
                onChange={(e) =>
                  setDuration(
                    e.target.value
                  )
                }
              >
                <option value="" disabled>
                  Please Select Duration
                </option>
                <option value={2}>
                  2 Minute
                </option>
                <option value={5}>
                  5 Minutes
                </option>
                <option value={10}>
                  10 Minutes
                </option>
                <option value={15}>
                  15 Minutes
                </option>
              </select>
              {/* START */}
              <button
                onClick={() => {
                  // =====================================
                  // VALIDATION
                  // =====================================
                  if (!domain) {
                    alert(
                      "Please Select Domain"
                    );
                    return;
                  }
                  if (!duration) {
                    alert(
                      "Please Select Duration"
                    );
                    return;
                  }
                  // =====================================
                  // SAVE
                  // =====================================
                  localStorage.setItem(
                    "domain",
                    domain
                  );
                  localStorage.setItem(
                    "duration",
                    duration
                  );
                  navigate("/interview");
                }}
              >
                Start
              </button>
            </div>
          </div>
          {/* =================================================
          STATS
          ================================================= */}
          <div className="stats-grid">
            {/* TOTAL INTERVIEWS */}
            <div className="stat-card">
              <h2>
                {history.length}
              </h2>
              <p>
                Total Interviews
              </p>
            </div>
            {/* AVG SCORE */}
            <div className="stat-card">
              <h2>
                {avgScore.toFixed(1)}/10
              </h2>
              <p>
                Average Score
              </p>
            </div>
            {/* TOTAL DOMAINS */}
            <div className="stat-card">
              <h2>
                {domains.length}
              </h2>
              <p>
                Available Domains
              </p>
            </div>
          </div>
          {/* =================================================
          RECENT HISTORY
          ================================================= */}
          <section className="history-panel">
            <h2>
              Recent Interviews
            </h2>
            <div className="history-list">
              {
                history.length === 0 ? (
                  <p>
                    No interviews yet.
                  </p>
                ) : (
                  history
                    .slice(0, 3)
                    .map(
                      (item, index) => (
                        <div
                          key={index}
                          className="history-card"
                        >
                          <h3>
                            {item.domain}
                          </h3>
                          <p>
                            Score:
                            {" "}
                            {Number(item.score).toFixed(1)}/10
                          </p>
                          <p>
                            Difficulty:
                            {" "}
                            {item.difficulty}
                          </p>
                          <p>
                            Date:
                            {" "}
                            {
                              item.created_at ||
                                item.date ||
                                item.createdAt
                                ? new Date(
                                  item.created_at ||
                                  item.date ||
                                  item.createdAt
                                ).toLocaleDateString(
                                  "en-IN",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric"
                                  }
                                )
                                : "N/A"
                            }
                          </p>
                        </div>
                      )
                    )
                )
              }
            </div>
            {/* SHOW MORE */}
            {
              history.length > 3 && (
                <button
                  className="show-more-btn"
                  onClick={() =>
                    navigate("/history")
                  }
                >
                  Show More Results
                </button>
              )
            }
          </section>
        </div>
      </main>
      {/* =====================================================
      FOOTER
      ===================================================== */}
      <Footer />
    </div>
  );
}