import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("SignIn Data:", formData);

        // Later: call backend API for authentication
        // authService.signin(formData)

        // Temporary frontend-only login simulation:
        localStorage.setItem("isAuthenticated", "true");

        navigate("/chat");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white px-4">
            <div className="w-full max-w-md bg-slate-900 p-8 rounded-2xl shadow-2xl border border-slate-800">

                <h2 className="text-3xl font-semibold text-center mb-2">
                    Welcome Back
                </h2>

                <p className="text-slate-400 text-center mb-6">
                    Sign in to access Elevance AI Assistant
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Email */}
                    <div>
                        <label className="block text-sm mb-2 text-slate-300">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm mb-2 text-slate-300">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition duration-200 font-medium"
                    >
                        Sign In
                    </button>
                </form>

                <p className="text-center text-sm text-slate-400 mt-6">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-blue-500 hover:underline">
                        Sign Up
                    </Link>
                </p>

            </div>
        </div>
    );
}