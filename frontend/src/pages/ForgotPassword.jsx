import {
    useState
} from "react";
import {
    useNavigate
} from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/auth.css";
export default function ForgotPassword() {
    // =====================================================
    // STATES
    // =====================================================
    const [email, setEmail] =
        useState("");
    // =====================================================
    // NAVIGATE
    // =====================================================
    const navigate =
        useNavigate();
    // =====================================================
    // SUBMIT
    // =====================================================
    const handleSubmit = async () => {
        try {
            const res = await API.post(
                "/auth/forgot-password",
                { email }
            );
            // =============================================
            // REDIRECT TO RESET PAGE
            // =============================================
            alert(res.data.message);
        } catch (err) {
            alert(
                err.response?.data?.detail ||
                "Something went wrong"
            );
        }
    };
    // =====================================================
    // UI
    // =====================================================
    return (
        <div className="auth-wrapper">
            <Navbar />
            <div className="auth-page">
                <div className="auth-card">
                    <h1 className="logo">
                        INTERVRSE
                    </h1>
                    <p className="subtitle">
                        Reset your password
                    </p>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />
                    <button onClick={handleSubmit}>
                        Send Reset Link
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
}