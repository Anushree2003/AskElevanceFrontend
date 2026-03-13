export default function TypingIndicator() {
  return (
    <div className="flex w-full mb-3 justify-start">
      <div className="flex items-center gap-2 px-4 py-2 rounded-2xl 
                      bg-gray-200 dark:bg-slate-800 
                      text-gray-800 dark:text-gray-200 
                      rounded-bl-none shadow-sm">

        <span className="text-sm font-medium">Elevance Assistant</span>

        <div className="flex gap-1">
          <span className="w-2 h-2 bg-gray-600 dark:bg-gray-300 rounded-full animate-bounce"></span>
          <span className="w-2 h-2 bg-gray-600 dark:bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
          <span className="w-2 h-2 bg-gray-600 dark:bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
        </div>

      </div>
    </div>
  );
}