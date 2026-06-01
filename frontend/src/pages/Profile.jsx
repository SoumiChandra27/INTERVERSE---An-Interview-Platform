import { useEffect, useState } from "react";
import API from "../services/api";
import "./profile.css";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
export default function Profile() {
    const [profile, setProfile] = useState({});
    const [profileImage, setProfileImage] =
        useState(null);
    const navigate = useNavigate();
    const [completion, setCompletion] = useState(0);
    useEffect(() => {
        fetchProfile();
    }, []);
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfile({
                ...profile,
                profile_image: reader.result
            });
        };
        reader.readAsDataURL(file);
    };
    const saveProfile = async () => {
        try {
            const token =
                localStorage.getItem("token");
            await API.put(
                "/profile/update",
                profile,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );
            alert(
                "Profile updated successfully"
            );
            // ====================================
            // REDIRECT AFTER 2 SECONDS
            // ====================================
            setTimeout(() => {
                navigate("/dashboard");
            }, 2000);
        } catch (err) {
            console.log(err);
            alert("Failed to save profile");
        }
    };
    const fetchProfile = async () => {
        try {
            const token =
                localStorage.getItem("token");
            const res = await API.get(
                "/profile/me",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );
            setProfile(res.data);
            calculateCompletion(res.data);
        } catch (err) {
            console.log(err);
        }
    };
    const calculateCompletion = (data) => {
        const fields = [
            "name",
            "phone",
            "education",
            "address",
            "skills",
            "college",
            "linkedin",
            "github"
        ];
        let filled = 0;
        fields.forEach((field) => {
            if (
                data[field] &&
                data[field] !== ""
            ) {
                filled++;
            }
        });
        const percent = Math.round(
            (filled / fields.length) * 100
        );
        setCompletion(percent);
    };
    return (
        <MainLayout>
            <div className="profile-page">
                <div className="profile-container">
                    {/* TITLE */}
                    <div className="profile-header">
                        <h1 className="profile-title">
                            My <span>Profile</span>
                        </h1>
                        <p className="profile-subtitle">
                            Complete your profile to improve your interview experience.
                        </p>
                    </div>
                    {/* TOP SECTION */}
                    <div className="profile-top">
                        {/* IMAGE */}
                        <div className="profile-image-box">
                            <img
                                src={
                                    profile.profile_image ||
                                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                }
                                alt="profile"
                                className="profile-image"
                            />
                            {/* HIDDEN INPUT */}
                            <input
                                type="file"
                                accept="image/*"
                                id="profileUpload"
                                hidden
                                onChange={handleImageUpload}
                            />
                            {/* BUTTON */}
                            <label
                                htmlFor="profileUpload"
                                className="profile-upload"
                            >
                                Upload Photo
                            </label>
                        </div>
                        {/* PROGRESS */}
                        <div className="profile-progress">
                            <h3>
                                Profile Completion: {completion}%
                            </h3>
                            <div className="progress-bar">
                                <div
                                    className="progress-fill"
                                    style={{
                                        width: `${completion}%`
                                    }}
                                ></div>
                            </div>
                            <p className="progress-text">
                                Complete remaining details to improve your profile.
                            </p>
                        </div>
                    </div>
                    {/* FORM */}
                    <div className="profile-form">
                        {/* NAME */}
                        <div className="input-group">
                            <label>Name</label>
                            <input
                                type="text"
                                value={profile.name || ""}
                                onChange={(e) =>
                                    setProfile({
                                        ...profile,
                                        name: e.target.value
                                    })
                                }
                            />
                        </div>
                        {/* EMAIL */}
                        <div className="input-group">
                            <label>Email</label>
                            <input
                                type="email"
                                value={profile.email || ""}
                                readOnly
                                className="readonly"
                            />
                        </div>
                        {/* PHONE */}
                        <div className="input-group">
                            <label>Phone</label>
                            <input
                                type="text"
                                value={profile.phone || ""}
                                onChange={(e) =>
                                    setProfile({
                                        ...profile,
                                        phone: e.target.value
                                    })
                                }
                            />
                        </div>
                        {/* EDUCATION */}
                        <div className="input-group">
                            <label>Education</label>
                            <input
                                type="text"
                                value={profile.education || ""}
                                onChange={(e) =>
                                    setProfile({
                                        ...profile,
                                        education: e.target.value
                                    })
                                }
                            />
                        </div>
                        {/* COLLEGE */}
                        <div className="input-group">
                            <label>College</label>
                            <input
                                type="text"
                                value={profile.college || ""}
                                onChange={(e) =>
                                    setProfile({
                                        ...profile,
                                        college: e.target.value
                                    })
                                }
                            />
                        </div>
                        {/* SKILLS */}
                        <div className="input-group">
                            <label>Skills</label>
                            <input
                                type="text"
                                value={profile.skills || ""}
                                onChange={(e) =>
                                    setProfile({
                                        ...profile,
                                        skills: e.target.value
                                    })
                                }
                            />
                        </div>
                        {/* LINKEDIN */}
                        <div className="input-group">
                            <label>LinkedIn</label>
                            <input
                                type="text"
                                value={profile.linkedin || ""}
                                onChange={(e) =>
                                    setProfile({
                                        ...profile,
                                        linkedin: e.target.value
                                    })
                                }
                            />
                        </div>
                        {/* GITHUB */}
                        <div className="input-group">
                            <label>GitHub</label>
                            <input
                                type="text"
                                value={profile.github || ""}
                                onChange={(e) =>
                                    setProfile({
                                        ...profile,
                                        github: e.target.value
                                    })
                                }
                            />
                        </div>
                        {/* ADDRESS */}
                        <div className="input-group full-width">
                            <label>Address</label>
                            <textarea
                                value={profile.address || ""}
                                onChange={(e) =>
                                    setProfile({
                                        ...profile,
                                        address: e.target.value
                                    })
                                }
                            ></textarea>
                        </div>
                    </div>
                    {/* SAVE BUTTON */}
                    <button
                        className="save-btn"
                        onClick={saveProfile}
                    >
                        Save Profile
                    </button>
                </div>
            </div>
        </MainLayout>
    );
}