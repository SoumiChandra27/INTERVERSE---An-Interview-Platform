import {
    useEffect,
    useState
} from "react";
import {
    useNavigate
} from "react-router-dom";
import API from "../services/api";
import MainLayout from "../layouts/MainLayout";
import "./dashboard.css";
export default function History() {
    // =====================================================
    // STATES
    // =====================================================
    const [history, setHistory] =
        useState([]);
    // =====================================================
    // NAVIGATE
    // =====================================================
    const navigate = useNavigate();
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
            // =============================================
            // FORMAT HISTORY
            // =============================================
            const formattedHistory =
                res.data.history;
            // =============================================
            // SORT LATEST FIRST
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
        } catch (err) {
            console.log(err);
        }
    };
    // =====================================================
    // UI
    // =====================================================
    return (
        <MainLayout>
            <div className="dashboard-page">
                <div className="dashboard-main">
                    {/* ========================================= */}
                    {/* TITLE */}
                    {/* ========================================= */}
                    <h1 className="history-title">
                        My <span>Interview History</span>
                    </h1>
                    {/* ========================================= */}
                    {/* HISTORY LIST */}
                    {/* ========================================= */}
                    <div className="history-list">
                        {
                            history.length === 0 ? (
                                <p>
                                    No interview history found.
                                </p>
                            ) : (
                                history.map(
                                    (item, index) => (
                                        <div
                                            className="history-card"
                                            key={index}
                                            onClick={() =>
                                                navigate(
                                                    `/history/details/${item.id}`
                                                )
                                            }
                                        >
                                            {/* DOMAIN */}
                                            <h3>
                                                {item.domain}
                                            </h3>
                                            {/* SCORE */}
                                            <p>
                                                Score:
                                                {" "}
                                                {Number(item.score).toFixed(1)}/10
                                            </p>
                                            {/* DIFFICULTY */}
                                            <p>
                                                Difficulty:
                                                {" "}
                                                {item.difficulty}
                                            </p>
                                            {/* DURATION */}
                                            <p>
                                                Duration:
                                                {" "}
                                                {
                                                    item.duration ||
                                                    "N/A"
                                                } mins
                                            </p>
                                            {/* DATE */}
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
                </div>
            </div>
        </MainLayout>
    );
}