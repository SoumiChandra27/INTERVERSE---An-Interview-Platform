import {
  useEffect,
  useState
} from "react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";
import API from "../services/api";
import MainLayout from "../layouts/MainLayout";
// =====================================================
// COMPONENTS
// =====================================================
import "./analytics.css";
export default function Analytics() {
  // =====================================================
  // STATES
  // =====================================================
  const [history, setHistory] =
    useState([]);
  const [avgScore, setAvgScore] =
    useState(0);
  const [domainStats, setDomainStats] =
    useState([]);
  const [difficultyStats, setDifficultyStats] =
    useState([]);
  // =====================================================
  // USER
  // =====================================================
  const user = JSON.parse(
    localStorage.getItem("user")
  );
  // =====================================================
  // LOAD HISTORY
  // =====================================================
  useEffect(() => {
    fetchHistory();
  }, []);
  // =====================================================
  // FETCH HISTORY
  // =====================================================
  const fetchHistory = async () => {
    try {
      const token =
        localStorage.getItem("token");
      const res = await API.get(
        `/history/${user.id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );
      // =================================================
      // FORMAT HISTORY
      // =================================================
      const formattedHistory =
        res.data.history.map(
          (item, index) => ({
            ...item,
            index: index + 1,
            score:
              Math.round(
                item.score * 100
              )
          })
        );
      setHistory(
        formattedHistory
      );
      // =================================================
      // AVERAGE SCORE
      // =================================================
      if (
        formattedHistory.length > 0
      ) {
        const total =
          formattedHistory.reduce(
            (sum, item) =>
              sum + item.score,
            0
          );
        const average =
          Math.round(
            total /
            formattedHistory.length
          );
        setAvgScore(average);
      }
      // =================================================
      // DOMAIN STATS
      // =================================================
      const grouped = {};
      formattedHistory.forEach(
        (item) => {
          if (
            !grouped[item.domain]
          ) {
            grouped[item.domain] = {
              domain:
                item.domain,
              total: 0,
              score: 0
            };
          }
          grouped[item.domain].total += 1;
          grouped[item.domain].score +=
            item.score;
        }
      );
      const formattedDomains =
        Object.values(grouped).map(
          (item) => ({
            domain:
              item.domain,
            interviews:
              item.total,
            avg:
              Math.round(
                item.score /
                item.total
              )
          })
        );
      setDomainStats(
        formattedDomains
      );
      // =================================================
      // DIFFICULTY STATS
      // =================================================
      let easyCount = 0;
      let mediumCount = 0;
      let hardCount = 0;
      formattedHistory.forEach(
        (item) => {
          if (
            item.difficulty === "easy"
          ) {
            easyCount++;
          }
          else if (
            item.difficulty === "medium"
          ) {
            mediumCount++;
          }
          else if (
            item.difficulty === "hard"
          ) {
            hardCount++;
          }
        }
      );
      setDifficultyStats([
        {
          name: "Easy",
          value: easyCount
        },
        {
          name: "Medium",
          value: mediumCount
        },
        {
          name: "Hard",
          value: hardCount
        }
      ]);
    } catch (err) {
      console.log(err);
    }
  };
  // =====================================================
  // COLORS
  // =====================================================
  const COLORS = [
    "#20b9ad",
    "#137178",
    "#102E3C"
  ];
  // =====================================================
  // UI
  // =====================================================
  return (
    <MainLayout>
      <div className="analytics-page">
        {/* ============================================= */}
        {/* TOP */}
        {/* ============================================= */}
        <div className="analytics-top">
          <h1>
            Analytics Dashboard
          </h1>
          <p>
            Track your interview performance
          </p>
        </div>
        {/* ============================================= */}
        {/* STATS */}
        {/* ============================================= */}
        <div className="analytics-stats">
          <div className="analytics-card">
            <h2>
              {history.length}
            </h2>
            <p>
              Total Interviews
            </p>
          </div>
          <div className="analytics-card">
            <h2>
              {avgScore}%
            </h2>
            <p>
              Average Score
            </p>
          </div>
        </div>
        {/* ============================================= */}
        {/* CHARTS */}
        {/* ============================================= */}
        <div className="chart-grid">
          {/* LINE CHART */}
          <div className="chart-card">
            <h2>
              Interview Progression
            </h2>
            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <LineChart
                data={history}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                />
                <XAxis
                  dataKey="index"
                />
                <YAxis
                  domain={[0, 100]}
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#1A998F"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          {/* PIE CHART */}
          <div className="chart-card">
            <h2>
              Difficulty Distribution
            </h2>
            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <PieChart>
                <Pie
                  data={difficultyStats}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  dataKey="value"
                  label
                >
                  {
                    difficultyStats.map(
                      (entry, index) => (
                        <Cell
                          key={index}
                          fill={
                            COLORS[index]
                          }
                        />
                      )
                    )
                  }
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* ============================================= */}
        {/* DOMAIN WISE */}
        {/* ============================================= */}
        <div className="chart-card">
          <h2>
            Domain Wise Performance
          </h2>
          <ResponsiveContainer
            width="100%"
            height={350}
          >
            <BarChart
              data={domainStats}
            >
              <CartesianGrid
                strokeDasharray="3 3"
              />
              <XAxis
                dataKey="domain"
              />
              <YAxis
                domain={[0, 100]}
              />
              <Tooltip />
              <Bar
                dataKey="avg"
                fill="#1A998F"
                radius={[8,8,0,0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </MainLayout>
  );
}