import { useState } from "react";
import API from "../services/api";

export default function MessageInput({ sessionId, onNewMessage }) {
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      const response = await API.post("/chat/send", {
        sessionId: sessionId || null,
        message: message,
      });

      const botReply = response.data.reply || response.data;

      onNewMessage(
        message,
        botReply,
        response.data.sessionId
      );

      setMessage("");
    } catch (error) {
      console.error("Send failed:", error);
    }
  };

  // ✅ THIS HANDLES ENTER KEY
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // prevents page refresh
      sendMessage();
    }
  };

  return (
    <div className="p-4 border-t border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}  // ENTER works
          placeholder="Type your message..."
          className="flex-1 px-4 py-3 rounded-lg bg-gray-100 dark:bg-slate-800 border-2 border-gray-300 
                     dark:border-slate-700 text-gray-900 dark:text-white outline-none focus:ring-2"
        />

        <button
          onClick={sendMessage}   // BUTTON works
          className="bg-gray-800 text-white px-6 py-3 rounded-lg"
        >
          Send ➤
        </button>
      </div>
    </div>
  );
}
