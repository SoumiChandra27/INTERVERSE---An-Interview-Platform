import {
    useState
} from "react";
import {
    useParams,
    useNavigate
} from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/auth.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
export default function ResetPassword() {
    const [password, setPassword] =
        useState("");
    const { token } = useParams();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] =
        useState(false);
    const handleReset = async () => {
        try {
            const res = await API.post(
                `/auth/reset-password/${token}`,
                {
                    password
                }
            );
            alert(res.data.message);
            navigate("/login");
        } catch (err) {
            console.log(err);
            alert("Reset failed");
        }
    };
    return (
        <div className="auth-wrapper">
            <Navbar />
            <div className="auth-page">
                <div className="auth-card">
                    <h1 className="logo">
                        INTERVRSE
                    </h1>
                    <p className="subtitle">
                        Create new password
                    </p>
                    <div className="password-box">
                        <input
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            placeholder="Enter new password"
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
                    <button onClick={handleReset}>
                        Reset Password
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
}