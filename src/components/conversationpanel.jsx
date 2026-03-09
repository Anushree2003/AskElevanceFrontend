import { useEffect, useState, useRef } from "react";
import ChatMessage from "./chatmessage";
import MessageInput from "./messageinput";
import api from "../services/api";

export default function ConversationPanel({
  isDark,
  toggleTheme,
  sessionId,
}) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSwitchingSession, setIsSwitchingSession] = useState(false);
  const bottomRef = useRef(null);

  const fetchMessages = async () => {
    if (!sessionId) {
      setMessages([]);
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await api.get(`/chat/messages/${sessionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      if (response.data && Array.isArray(response.data)) {
        setMessages(response.data);
      }
      setError(null);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
      setError("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const switchSession = async () => {
      setIsSwitchingSession(true);
      setTimeout(async () => {
        setLoading(true);
        await fetchMessages();
        setIsSwitchingSession(false);
      }, 200);
    };

    switchSession();
  }, [sessionId]);

  const handleNewMessage = (msg) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: msg.sender,
        content: msg.content
      }
    ]);
  };

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);
  return (
    <div className="flex flex-col flex-1 h-full min-h-0 bg-white dark:bg-slate-900">

      <div className="p-4 border-b border-gray-200 dark:border-slate-800 
                    flex justify-between items-center shrink-0">
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
          Elevance AI Assistant
        </h1>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-slate-700 
                   hover:bg-slate-600 transition-colors"
          title="Toggle Theme"
        >
          {isDark ? "☀️" : "🌙"}
        </button>
      </div>
      <div
        className={`flex-1 min-h-0 overflow-y-auto p-6 space-y-4 transition-opacity duration-300 ${isSwitchingSession ? "opacity-0" : "opacity-100"
          }`}
      >
        {loading && (
          <p className="text-gray-500 dark:text-gray-400">
            Loading messages...
          </p>
        )}

        {error && (
          <p className="text-red-500">Error: {error}</p>
        )}

        {!loading && messages.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400">
            No messages yet. Start a conversation!
          </p>
        )}

        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            sender={msg.sender}
            content={msg.content}
          />
        ))}
        <div ref={bottomRef}></div>
      </div>

      <MessageInput
        sessionId={sessionId}
        onNewMessage={handleNewMessage}
      />
    </div>
  );
}