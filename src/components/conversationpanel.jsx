import ChatMessage from "./chatmessage";
import MessageInput from "./messageinput";

export default function ConversationPanel({ messages }) {
  return (
    <div className="flex flex-col flex-1">
      
      {/* Header */}
      <div className="p-4 border-b border-slate-800 bg-slate-900">
        <h1 className="text-lg font-semibold">Elevance AI Assistant</h1>
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