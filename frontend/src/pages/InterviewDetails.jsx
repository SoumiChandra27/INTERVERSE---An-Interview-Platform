import {
  useEffect,
  useState
} from "react";
import {
  useParams,
  useNavigate
} from "react-router-dom";
import API from "../services/api";
import MainLayout from "../layouts/MainLayout";
import "./InterviewDetails.css";
export default function InterviewDetails() {
  // =====================================================
  // PARAMS
  // =====================================================
  const { id } = useParams();
  // =====================================================
  // NAVIGATE
  // =====================================================
  const navigate = useNavigate();
  // =====================================================
  // STATES
  // =====================================================
  const [data, setData] =
    useState(null);
  const [loading, setLoading] =
    useState(true);
  // =====================================================
  // LOAD DETAILS
  // =====================================================
  useEffect(() => {
    fetchDetails();
  }, []);
  // =====================================================
  // FETCH DETAILS
  // =====================================================
  const fetchDetails = async () => {
    try {
      const token =
        localStorage.getItem(
          "token"
        );
      const res = await API.get(
        `/history/details/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );
      setData(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  // =====================================================
  // LOADING
  // =====================================================
  if (loading) {
    return (
      <div className="details-loading">
        Loading Interview Details...
      </div>
    );
  }
  // =====================================================
  // NO DATA
  // =====================================================
  if (!data) {
    return (
      <div className="details-loading">
        No Interview Found
      </div>
    );
  }
  // =====================================================
  // UI
  // =====================================================
  return (
    <MainLayout>
      <div className="details-page">
        {/* ========================================= */}
        {/* HEADER */}
        {/* ========================================= */}
        <div className="details-header">
          <button
            className="back-btn"
            onClick={() =>
              navigate("/history")
            }
          >
            ← Back
          </button>
          <h1 className="hcolor">
            Interview Details
          </h1>
          <h2 className="hcolor">
            {data.domain}
          </h2>
          <div className="details-top-info">
            <div className="top-box">
              <h3 className="hcolor">
                Duration
              </h3>
              <p>
                {data.duration} mins
              </p>
            </div>
            <div className="top-box">
              <h3>
                Total Questions
              </h3>
              <p>
                {data.questions.length}
              </p>
            </div>
            <div className="top-box">
              <h3>
                Final Score
              </h3>
              <p>
                {Number(data.total_score).toFixed(1)}/10
              </p>
            </div>
          </div>
        </div>
        {/* ========================================= */}
        {/* QUESTIONS */}
        {/* ========================================= */}
        <div className="questions-wrapper">
          {
            data.questions.map(
              (item, index) => (
                <div
                  className="question-card"
                  key={index}
                >
                  {/* QUESTION NUMBER */}
                  <div className="question-number">
                    Question {index + 1}
                  </div>
                  {/* QUESTION */}
                  <div className="detail-section">
                    <h4>
                      Question
                    </h4>
                    <p>
                      {item.question}
                    </p>
                  </div>
                  {/* ANSWER */}
                  <div className="detail-section">
                    <h4>
                      Your Answer
                    </h4>
                    <p>
                      {item.answer}
                    </p>
                  </div>
                  {/* DIFFICULTY */}
                  <div className="detail-row">
                    <div>
                      <h4>
                        Difficulty
                      </h4>
                      <p>
                        {item.difficulty}
                      </p>
                    </div>
                    <div>
                      <h4>
                        Score
                      </h4>
                      <p>
                        {item.score}/10
                      </p>
                    </div>
                  </div>
                  {/* FEEDBACK */}
                  <div className="detail-section">
                    <h4>
                      Feedback
                    </h4>
                    <p>
                      {item.feedback}
                    </p>
                  </div>
                </div>
              )
            )
          }
        </div>
      </div>
    </MainLayout>
  );
}