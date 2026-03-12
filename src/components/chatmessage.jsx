export default function ChatMessage({ sender, content }) {
  const isUser = sender?.toLowerCase() === "user";

  const formatMessage = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    return text.split(urlRegex).map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };
  return (
    <div className={`flex w-full mb-3 ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`
          max-w-[85%] px-4 py-3 rounded-2xl shadow-sm
          whitespace-pre-wrap break-words
          ${isUser
            ? "bg-gray-400 text-gray-900 dark:bg-blue-600 dark:text-white rounded-br-none"
            : "bg-gray-200 dark:bg-slate-800 text-gray-900 dark:text-white rounded-bl-none"
          }
        `}
      >
        {formatMessage(content)}
      </div>
    </div>
  );
}