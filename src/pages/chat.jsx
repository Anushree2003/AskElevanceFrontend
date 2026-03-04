import React, { useState } from "react";
import ConversationSidebar from "../components/conversationsidebar";
import ConversationPanel from "../components/conversationpanel";
import { useTheme } from "../hooks/useTheme";
import { useAuth } from "../context/authcontext";
import { useNavigate } from "react-router-dom";

export default function ChatPage() {
  const [isOpen, setIsOpen] = useState(true);
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  const [messages] = useState([
    { id: 1, sender: "ASSISTANT", content: "Welcome to Elevance AI Assistant." },
    { id: 2, sender: "USER", content: "Hello, I just joined." },
  ]);

  return (
    <div className="relative h-screen flex bg-white dark:bg-slate-950 
                    text-gray-900 dark:text-white transition-colors duration-300">

      <ConversationSidebar
        isOpen={isOpen}
        toggle={() => setIsOpen(!isOpen)}
        onLogout={handleLogout}
      />

      <div className="flex-1 flex flex-col">
        <ConversationPanel
          messages={messages}
          isDark={isDark}
          toggleTheme={toggleTheme}
        />
      </div>

    </div>
  );
}