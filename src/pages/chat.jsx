import React, { useState, useEffect } from "react";
import ConversationSidebar from "../components/conversationsidebar";
import ConversationPanel from "../components/conversationpanel";
import { useTheme } from "../hooks/useTheme";
import { useAuth } from "../context/authcontext";
import { useParams, useNavigate } from "react-router-dom";
// import FaqPanel from "../components/faq";
import ChatHome from "../components/chathome";

export default function ChatPage() {
  const [isOpen, setIsOpen] = useState(true);
  const { isDark, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { sessionId } = useParams();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  useEffect(() => {

    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);  
    return () => clearTimeout(timer);

  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center 
                      bg-white dark:bg-slate-950">
        <div className="w-10 h-10 border-4 border-blue-500 
                        border-t-transparent rounded-full animate-spin">
        </div>
      </div>
    );
  }

  // when a message creates a new session, update route
  const handleNewMessage = (user, bot, newSessionId) => {
    if (newSessionId && newSessionId !== sessionId) {
      navigate(`/chat/${newSessionId}`);
    }
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
        {sessionId ? (
          <ConversationPanel
            isDark={isDark}
            toggleTheme={toggleTheme}
            sessionId={sessionId}
            onNewMessage={handleNewMessage}
          />
        ) : (
          // <FaqPanel />
          <ChatHome />
        )}
      </div>

    </div>
  );
}