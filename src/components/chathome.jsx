import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Home() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const faqs = [
    "How do I reset my password?",
    "How can I apply for leave?",
    "Where can I find company policies?",
    "How do I update my profile information?",
    "Who should I contact for IT support?"
  ];
const createSessionAndSend = async (question) => {
  try {
    const token = localStorage.getItem("token");

    const sessionRes = await API.post(
      "/chat/create",
      { title: question },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    const newSession = sessionRes.data;

    // Navigate and pass the message
    navigate(`/chat/${newSession.id}`, {
      state: { firstMessage: question }
    });

  } catch (err) {
    console.error("Error creating chat", err);
  }
};

  const handleSend = () => {

    if (!message.trim()) return;

    createSessionAndSend(message);
    setMessage("");

  };

  return (

    <div className="flex flex-col justify-between h-full p-8">
      {/* TITLE */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Ask Elevance
        </h1>

        <p className="text-gray-600 dark:text-slate-400 mt-2">
          How can I help you today?
        </p>
      </div>

      {/* FAQ GRID */}
      <div className="grid grid-cols-2 gap-4 max-w-xl mx-auto">

        {faqs.map((question, index) => (

          <div
            key={index}
            onClick={() => createSessionAndSend(question)}
            className="
            cursor-pointer
            bg-gray-100 dark:bg-slate-800
            hover:bg-gray-200 dark:hover:bg-slate-700
            text-gray-900 dark:text-white
            p-4 rounded-lg
            transition
            "
          >
            {question}
          </div>

        ))}

      </div>

      {/* CHAT INPUT */}
      <div className="mt-12 max-w-xl mx-auto w-full">

        <div className="flex gap-2">

          <input
            type="text"
            placeholder="Ask something..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
            className="
            flex-1
            px-4 py-3
            rounded-lg
            bg-gray-100 dark:bg-slate-800
            border-2 border-gray-300 dark:border-slate-700
            text-gray-900 dark:text-white
            outline-none
            "
          />

          <button
            onClick={handleSend}
            className="
            bg-blue-700
            text-white
            px-6 py-3
            rounded-lg
            hover:bg-blue-800
            transition
            "
          >
            Send ➤
          </button>

        </div>

      </div>

    </div>

  );
}