import React, { useState } from "react";
import ConversationSidebar from "./components/conversationsidebar";
import ConversationPanel from "./components/conversationpanel";

export default function App() {
  const [isOpen, setIsOpen] = useState(true);

  const [messages] = useState([
    { id: 1, sender: "ASSISTANT", content: "Welcome to Elevance AI Assistant." },
    { id: 2, sender: "USER", content: "Hello, I just joined." },
  ]);

  return (
    <div className="h-screen flex bg-slate-950 text-white">

      <ConversationSidebar
        isOpen={isOpen}
        toggle={() => setIsOpen(!isOpen)}
      />

      <div className="flex-1 flex flex-col">
        <ConversationPanel messages={messages} />
      </div>

    </div>
  );
}