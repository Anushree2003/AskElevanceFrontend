import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/authcontext";
import ChatPage from "./pages/chat";
import SignUp from "./pages/signup";
import SignIn from "./pages/signin";
import ProtectedRoute from "./components/protectedroute";

export default function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/chat" replace />
          ) : (
            <Navigate to="/signin" replace />
          )
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