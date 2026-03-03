import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

export default function SignIn() {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

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

    // Temporary frontend login simulation
    localStorage.setItem("isAuthenticated", "true");

    navigate("/chat");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center 
                 bg-gray-100 dark:bg-slate-950 
                 text-gray-900 dark:text-white 
                 transition-colors duration-300 px-4 relative"
    >

      {/* Toggle Button */}
      <button
        onClick={toggleTheme}
        className="absolute top-6 right-6 px-4 py-2 rounded-lg 
                   bg-gray-200 dark:bg-slate-700 
                   text-gray-800 dark:text-white 
                   shadow-md transition"
      >
        {isDark ? "☀️" : "🌙"}
      </button>

      <div
        className="w-full max-w-md 
                   bg-white dark:bg-slate-900 
                   p-8 rounded-2xl shadow-xl 
                   border border-gray-200 dark:border-slate-800"
      >
        <h2 className="text-3xl font-semibold text-center mb-2">
          Welcome Back
        </h2>

        <p className="text-gray-500 dark:text-slate-400 text-center mb-6">
          Sign in to access IBM Elevance AI Assistant
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email"
              className="w-full px-4 py-2 rounded-lg 
                         bg-gray-100 dark:bg-slate-800 
                         border border-gray-300 dark:border-slate-700 
                         text-gray-900 dark:text-white
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Password"
              className="w-full px-4 py-2 rounded-lg 
                         bg-gray-100 dark:bg-slate-800 
                         border border-gray-300 dark:border-slate-700 
                         text-gray-900 dark:text-white
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg 
                       bg-blue-600 hover:bg-blue-700 
                       text-white transition duration-200 font-medium"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 dark:text-slate-400 mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}