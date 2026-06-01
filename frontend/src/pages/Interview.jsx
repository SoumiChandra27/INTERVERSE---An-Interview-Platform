import {
  useEffect,
  useState,
  useRef
} from "react";
import {
  useNavigate
} from "react-router-dom";
import API from "../services/api";
import "./Interview.css";
export default function Interview() {
  // =====================================================
  // NAVIGATION
  // =====================================================
  const navigate = useNavigate();
  // =====================================================
  // STATES
  // =====================================================
  const [messages, setMessages] =
    useState([]);
  const [sessionId, setSessionId] =
    useState(null);
  const [loading, setLoading] =
    useState(false);
  const [listening, setListening] =
    useState(false);
  const [transcript, setTranscript] =
    useState("");
  const [recordingTime, setRecordingTime] =
    useState(0);
  // =====================================================
  // STORAGE
  // =====================================================
  const domain =
    localStorage.getItem("domain");
  const duration =
    localStorage.getItem("duration");
  const token =
    localStorage.getItem("token");
  // =====================================================
  // TIMER
  // =====================================================
  const [timeLeft, setTimeLeft] =
    useState(
      duration
        ? parseInt(duration) * 60
        : 60
    );
  // =====================================================
  // REFS
  // =====================================================
  const messagesEndRef =
    useRef(null);
  const startedRef =
    useRef(false);
  const recognitionRef =
    useRef(null);
  // =====================================================
  // START INTERVIEW
  // =====================================================
  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    startInterview();
  }, []);
  // =====================================================
  // MAIN TIMER
  // =====================================================
  useEffect(() => {
    if (timeLeft <= 0) {
      finishInterview();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);
  // =====================================================
  // RECORDING TIMER
  // =====================================================
  useEffect(() => {
    let interval;
    if (listening) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [listening]);
  // =====================================================
  // AUTO SCROLL
  // =====================================================
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages]);
  // =====================================================
  // START SESSION
  // =====================================================
  const startInterview = async () => {
    try {
      const storedUser =
        localStorage.getItem("user");
      if (!storedUser) {
        setMessages([
          {
            sender: "ai",
            text:
              "User not found. Please login again."
          }
        ]);
        return;
      }
      const user =
        JSON.parse(storedUser);
      // =================================================
      // API
      // =================================================
      const res = await API.post(
        "/interview/start",
        {
          user_id: user.id,
          domain: domain,
          duration: parseInt(duration),
          voice_enabled: true
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );
      // =================================================
      // SAVE SESSION
      // =================================================
      setSessionId(
        res.data.session_id
      );
      // =================================================
      // FIRST QUESTION
      // =================================================
      fetchQuestion(
        res.data.session_id
      );
    } catch (err) {
      console.log(err);
    }
  };
  // =====================================================
  // FETCH QUESTION
  // =====================================================
  const fetchQuestion = async (id) => {
    setLoading(true);
    try {
      const res = await API.get(
        `/interview/question/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );
      // =================================================
      // BACKEND ERROR
      // =================================================
      if (res.data.error) {
        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text: res.data.error
          }
        ]);
        setLoading(false);
        return;
      }
      // =================================================
      // SHOW QUESTION
      // =================================================
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text: res.data.question
          }
        ]);
        // =================================================
        // SPEAK QUESTION
        // =================================================
        speakQuestion(
          res.data.question
        );
        setLoading(false);
      }, 1200);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  // =====================================================
  // SPEAK QUESTION
  // =====================================================
  const speakQuestion = (text) => {
    // STOP OLD SPEECH
    window.speechSynthesis.cancel();
    const speech =
      new SpeechSynthesisUtterance(
        text
      );
    speech.lang = "en-US";
    speech.rate = 1;
    speech.pitch = 1;
    // =================================================
    // START MIC AFTER AI SPEAKS
    // =================================================
    speech.onend = () => {
      console.log(
        "AI finished speaking"
      );
      setTimeout(() => {
        startListening();
      }, 800);
    };
    // =================================================
    // SPEAK
    // =================================================
    window.speechSynthesis.speak(
      speech
    );
  };
  // =====================================================
  // START LISTENING
  // =====================================================
  const startListening = () => {
    // =============================================
    // PREVENT MULTIPLE STARTS
    // =============================================
    if (listening) return;
    // =============================================
    // STOP OLD RECOGNITION
    // =============================================
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    // =============================================
    // SPEECH RECOGNITION API
    // =============================================
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;
    // =============================================
    // CHECK SUPPORT
    // =============================================
    if (!SpeechRecognition) {
      alert(
        "Speech Recognition is not supported in this browser."
      );
      return;
    }
    // =============================================
    // CLEAR OLD TEXT
    // =============================================
    setTranscript("");
    // =============================================
    // CREATE RECOGNITION
    // =============================================
    const recognition =
      new SpeechRecognition();
    // =============================================
    // SETTINGS
    // =============================================
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    // =============================================
    // SAVE REFERENCE
    // =============================================
    recognitionRef.current =
      recognition;
    // =============================================
    // LOCAL TRANSCRIPT
    // =============================================
    let finalTranscript = "";
    // =============================================
    // START RECORDING
    // =============================================
    setListening(true);
    recognition.start();
    console.log("VOICE STARTED");
    // =============================================
    // LIVE RESULT
    // =============================================
    recognition.onresult = (
      event
    ) => {
      let interimTranscript = "";
      for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
      ) {
        const text =
          event.results[i][0].transcript;
        // FINAL RESULT
        if (
          event.results[i].isFinal
        ) {
          finalTranscript += text + " ";
        }
        // INTERIM RESULT
        else {
          interimTranscript += text;
        }
      }
      // =============================================
      // SHOW LIVE TRANSCRIPT
      // =============================================
      setTranscript(
        finalTranscript +
        interimTranscript
      );
    };
    // =============================================
    // RECORDING ENDED
    // =============================================
    recognition.onend = () => {
      console.log("VOICE ENDED");
      setListening(false);
    };
    // =============================================
    // ERROR HANDLING
    // =============================================
    recognition.onerror = (
      event
    ) => {
      console.log(
        "VOICE ERROR:"
      );
      console.log(event.error);
      setListening(false);
      // =========================================
      // FRIENDLY ERRORS
      // =========================================
      if (
        event.error === "not-allowed"
      ) {
        alert(
          "Please allow microphone access."
        );
      }
      if (
        event.error === "no-speech"
      ) {
        alert(
          "No speech detected. Try again."
        );
      }
    };
  };
  // =====================================================
  // SEND ANSWER
  // =====================================================
  const sendVoiceAnswer = async (
    answer
  ) => {
    if (!answer.trim()) return;
    // =================================================
    // SHOW USER MESSAGE
    // =================================================
    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: answer
      }
    ]);
    try {
      const res = await API.post(
        "/interview/answer",
        {
          session_id: sessionId,
          user_answer: answer
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );
      // =================================================
      // CLEAR TRANSCRIPT
      // =================================================
      setTranscript("");
// =================================================
// SCORE OUT OF 10
// =================================================
const scoreOutOf10 = (
  res.data.similarity * 10
).toFixed(1);
// =================================================
// SHOW RESULT
// =================================================
setMessages((prev) => [
  ...prev,
  {
    sender: "result",
    text:
`Evaluation Result : ${res.data.result}
Score : ${scoreOutOf10}/10
Feedback : ${res.data.feedback}
Expected Answer :
${res.data.matched_answer}`
  }
]);
      // =================================================
      // NEXT QUESTION
      // =================================================
      fetchQuestion(sessionId);
    } catch (err) {
      console.log(err);
    }
  };
  // =====================================================
  // SEND BUTTON
  // =====================================================
  const handleSendTranscript = () => {
    // =============================================
    // STOP MIC
    // =============================================
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setListening(false);
    // =============================================
    // EMPTY CHECK
    // =============================================
    if (!transcript.trim()) {
      alert(
        "Please record your answer first."
      );
      return;
    }
    // =============================================
    // SEND ANSWER
    // =============================================
    sendVoiceAnswer(
      transcript
    );
  };
  // =====================================================
  // FINISH INTERVIEW
  // =====================================================
  const finishInterview = async () => {
    try {
      // =============================================
      // STOP SPEECH
      // =============================================
      window.speechSynthesis.cancel();
      // =============================================
      // STOP MIC
      // =============================================
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      // =============================================
      // FINISH API
      // =============================================
      const res = await API.post(
        `/interview/finish/${sessionId}`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );
      // =============================================
      // FINAL RESULT
      // =============================================
      setMessages((prev) => [
        ...prev,
        {
          sender: "final",
          text:
`Interview Completed
Average Score
----------------
${res.data.average_score}%
Final Feedback
----------------
${res.data.feedback}`
        }
      ]);
      // =============================================
      // REDIRECT
      // =============================================
      setTimeout(() => {
        navigate("/dashboard");
      }, 5000);
    } catch (err) {
      console.log(err);
    }
  };
  // =====================================================
  // FORMAT TIMER
  // =====================================================
  const formatTime = (seconds) => {
    const mins =
      Math.floor(seconds / 60);
    const secs =
      seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };
  // =====================================================
  // UI
  // =====================================================
  return (
    <div className="interview-page">
      {/* =================================================
      HEADER
      ================================================= */}
      <div className="interview-header">
        <h2>
          INTERVRSE
        </h2>
        <div className="timer">
          {formatTime(timeLeft)}
        </div>
      </div>
      {/* =================================================
      CHAT
      ================================================= */}
      <div className="chat-container">
        {
          messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender}`}
            >
              <div className="bubble">
                {msg.text}
              </div>
            </div>
          ))
        }
        {/* =================================================
        LOADING
        ================================================= */}
        {
          loading && (
            <div className="message ai">
              <div className="bubble typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )
        }
        <div ref={messagesEndRef}></div>
      </div>
      {/* =================================================
      VOICE CONTROLS
      ================================================= */}
      <div className="chat-input">
        <div className="voice-section">
          {/* =================================================
          TRANSCRIPT
          ================================================= */}
          <div className="transcript-box">
            {
              transcript
                ? transcript
                : listening
                  ? "Listening to your answer..."
                  : "Your answer will appear here..."
            }
          </div>
          {/* =================================================
          BUTTONS
          ================================================= */}
          <div className="voice-box">
            {/* MIC */}
            <button
              className={
                listening
                  ? "mic-btn active"
                  : "mic-btn"
              }
              onClick={() => {
                if (!listening) {
                  startListening();
                }
              }}
            >
              {
                listening
                  ? `Recording ${recordingTime}s`
                  : "Start Speaking"
              }
            </button>
            {/* SEND */}
            <button
              className="send-btn"
              onClick={
                handleSendTranscript
              }
              disabled={!transcript}
            >
              Send Answer
            </button>
            {/* STOP */}
            <button
              className="stop-btn"
              onClick={finishInterview}
            >
              Stop Interview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}