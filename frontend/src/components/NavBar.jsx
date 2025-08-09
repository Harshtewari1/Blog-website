import { useEffect, useState } from "react";
import API from "../utils/api"; // tumhara axios instance
import { FaUserCircle } from "react-icons/fa"; // profile icon ke liye
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await API.get("/profile/me");
                setUsername(res.data.name || res.data.username || "User");
            } catch (err) {
                console.error("Error fetching profile:", err);
            }
        };

        fetchUser();
    }, []);

    const handleLogout = async () => {
        try {
            // await API.post("/auth/logout");
            localStorage.removeItem("token");
            navigate("/login")
        } catch (err) {
            console.error("Logout error:", err);
        }
    };

    return (
        <nav className="flex justify-between items-center bg-gray-900 text-white px-6 py-3 shadow-md">
            {/* Left Side */}
            <div className="text-lg font-semibold">
                Welcome, {username}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
                <FaUserCircle
                    className="text-2xl cursor-pointer hover:text-gray-300 transition"
                    onClick={() => navigate("/profile")}
                />
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}
