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

  return (
    <div className="h-screen flex overflow-hidden bg-white dark:bg-slate-950 
                  text-gray-900 dark:text-white transition-colors duration-300">

      <ConversationSidebar
        isOpen={isOpen}
        toggle={() => setIsOpen(!isOpen)}
        onLogout={handleLogout}
      />

      <div className="flex-1 flex flex-col min-h-0">
        <ConversationPanel
          isDark={isDark}
          toggleTheme={toggleTheme}
        />
      </div>

    </div>
  );
}