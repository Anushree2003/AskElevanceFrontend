import React, { useState, useEffect } from "react";
import ConversationSidebar from "../components/conversationsidebar";
import ConversationPanel from "../components/conversationpanel";
import { useTheme } from "../hooks/useTheme";
import { useAuth } from "../context/authcontext";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function ChatPage() {
  const [isOpen, setIsOpen] = useState(true);
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState(null);

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  // Create Chat Session When Page Loads
  useEffect(() => {
    createSession();
  }, []);

  const createSession = async () => {
    try {
      const response = await API.post("/chat/create", {
        title: "New Chat",
      });

      setSessionId(response.data.id);

    } catch (error) {
      console.error("Session creation failed:", error);
    }
  };

  // Add New Messages To UI
 const handleNewMessage = (user, bot, newSessionId) => {
  setMessages(prev => [
    ...prev,
    { id: Date.now(), sender: "user", content: user },
    { id: Date.now() + 1, sender: "bot", content: bot }
  ]);

  if (newSessionId && !sessionId) {
    setSessionId(newSessionId);
  }
};

  return (
    <div className="relative h-screen flex bg-white dark:bg-slate-950 
                    text-gray-900 dark:text-white transition-colors duration-300">

      {/* Sidebar */}
      <ConversationSidebar
        isOpen={isOpen}
        toggle={() => setIsOpen(!isOpen)}
        onLogout={handleLogout}
      />

      {/* Main Panel */}
      <div className="flex-1 flex flex-col">
        <ConversationPanel
          messages={messages}
          isDark={isDark}
          toggleTheme={toggleTheme}
          sessionId={sessionId}
          onNewMessage={handleNewMessage}
        />
      </div>

    </div>
  );
}