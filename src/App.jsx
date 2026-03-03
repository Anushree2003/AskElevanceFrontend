import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import ChatPage from "./pages/chat";
import SignUp from "./pages/signup";
import SignIn from "./pages/signin";

export default function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </Router>
  );
}