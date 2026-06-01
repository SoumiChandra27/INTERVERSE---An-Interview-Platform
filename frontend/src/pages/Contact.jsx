// src/pages/Contact.jsx
import {
    useState
} from "react";
import API from "../services/api";
import MainLayout from "../layouts/MainLayout";
import Footer from "../components/Footer";
import "./contact.css";
export default function Contact() {
    // =====================================================
    // STATES
    // =====================================================
    const [name, setName] =
        useState("");
    const [email, setEmail] =
        useState("");
    const [message, setMessage] =
        useState("");
    // =====================================================
    // SUBMIT
    // =====================================================
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token =
                localStorage.getItem("token");
            await API.post(
                "/contact/",
                {
                    name,
                    email,
                    message
                },
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );
            alert(
                "Message sent successfully!"
            );
            // CLEAR FORM
            setName("");
            setEmail("");
            setMessage("");
        }
        catch (err) {
            console.log(err);
            console.log(
                err.response
            );
            alert(
                err.response?.data?.detail ||
                "Failed to send message"
            );
        }
    };
    // =====================================================
    // UI
    // =====================================================
    return (
        <MainLayout>
            <div className="contact-page">
                {/* =================================================
        HEADER
        ================================================= */}
                <div className="contact-header">
                    <h1>
                        Contact <span>Us</span>
                    </h1>
                    <p>
                        We'd love to hear from you.
                        Send your queries or feedback.
                    </p>
                </div>
                {/* =================================================
        CONTACT CONTAINER
        ================================================= */}
                <div className="contact-container">
                    {/* =============================================
          LEFT SIDE
          ============================================= */}
                    <div className="contact-info">
                        <h2>
                            Get In Touch
                        </h2>
                        <p>
                            INTERVRSE is an
                            interview preparation platform
                            designed to help students improve
                            their technical interview skills.
                        </p>
                        <div className="info-box">
                            <h3>Email</h3>
                            <p>
                                interverse.interview@gmail.com
                            </p>
                        </div>
                        <div className="info-box">
                            <h3>Phone</h3>
                            <p>
                                +91 7439396519
                            </p>
                        </div>
                        <div className="info-box">
                            <h3>Location</h3>
                            <p>
                                Kolkata, India
                            </p>
                        </div>
                    </div>
                    {/* =============================================
          FORM
          ============================================= */}
                    <form
                        className="contact-form"
                        onSubmit={handleSubmit}
                    >
                        <div className="input-group">
                            <label>
                                Full Name
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) =>
                                    setName(
                                        e.target.value
                                    )
                                }
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label>
                                Email Address
                            </label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(
                                        e.target.value
                                    )
                                }
                                required
                            />
                        </div>
                        <div className="input-group full-width">
                            <label>
                                Message
                            </label>
                            <textarea
                                placeholder="Write your message..."
                                value={message}
                                onChange={(e) =>
                                    setMessage(
                                        e.target.value
                                    )
                                }
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="contact-btn"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </MainLayout>
    );
}