export default function ChatMessage({ sender, content }) {
  const isUser = sender === "USER";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-md px-4 py-2 rounded-xl text-sm ${
          isUser
            ? "bg-gray-200 dark:bg-blue-700 text-gray-900 dark:text-gray-100"
            : "bg-gray-300 dark:bg-slate-700 text-gray-900 dark:text-slate-200"
        }`}
      >
        {content}
      </div>
    </div>
  );
}