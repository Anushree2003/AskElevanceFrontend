import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import ChatPage from "./pages/chat";
import SignUp from "./pages/signup";
import SignIn from "./pages/signin";
import ProtectedRoute from "./components/protectedroute";

export default function App() {

  return (
      <Routes>
        <Route
          path="/"
          element={
            localStorage.getItem("token")
              ? <Navigate to="/chat" />
              : <Navigate to="/signin" />
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />

      </Routes>
  );
}