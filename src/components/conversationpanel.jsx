import ChatMessage from "./chatmessage";
import MessageInput from "./messageinput";

export default function ConversationPanel({ messages, isDark, toggleTheme }) {
  return (
    <div className="flex flex-col flex-1">

      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-slate-800 bg-white 
                      dark:bg-slate-900 flex justify-between items-center">
        <h1 className="text-lg font-semibold text-gray-900 
                       dark:text-white">Elevance AI Assistant</h1>
        <button
          onClick={toggleTheme}

          className="p-2 rounded-full bg-slate-700 dark:bg-slate-700 
                     hover:bg-slate-600 dark:hover:bg-slate-600 transition-colors"
          title="Toggle Theme"
        >
          {isDark ? "☀️" : "🌙"}
        </button>

      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            sender={msg.sender}
            content={msg.content}
          />
        ))}
      </div>

      {/* Input */}
      <MessageInput />
    </div>
  );
}