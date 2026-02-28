export default function ConversationSidebar({ isOpen, toggle }) {
  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-16"
      } bg-white dark:bg-slate-900 transition-all duration-300 h-full flex flex-col border-r 
        border-gray-200 dark:border-slate-700`}
    >
      <div className="p-4 border-b border-gray-200 dark:border-slate-700 flex 
                      justify-between items-center bg-white dark:bg-slate-900">
        {isOpen && <h2 className="font-semibold text-gray-900 dark:text-slate-200">AskElevance</h2>}
        <button
          onClick={toggle}
          className="text-sm bg-gray-300 dark:bg-slate-700 px-2 py-1 rounded
                     hover:bg-gray-400 dark:hover:bg-slate-600 transition-colors"
        >
          ☰
        </button>
      </div>

      {isOpen && (
        <div className="p-4 text-sm text-gray-600 dark:text-slate-400 flex-1 overflow-y-auto">
          <p>• New Chat</p>
          <p>• Previous Chat</p>
        </div>
      )}
    </div>
  );
}