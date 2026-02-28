import React, { useState } from "react";
import ConversationSidebar from "./components/conversationsidebar";
import ConversationPanel from "./components/conversationpanel";
import { useTheme } from "./hooks/useTheme";

export default function App() {
  const [isOpen, setIsOpen] = useState(true);
  const { isDark, toggleTheme } = useTheme();

  const [messages] = useState([
    { id: 1, sender: "ASSISTANT", content: "Welcome to Elevance AI Assistant." },
    { id: 2, sender: "USER", content: "Hello, I just joined." },
  ]);

  return (
    <div className="h-screen flex bg-white dark:bg-slate-950 
                    text-gray-900 dark:text-white transition-colors duration-300">

      <ConversationSidebar
        isOpen={isOpen}
        toggle={() => setIsOpen(!isOpen)}
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