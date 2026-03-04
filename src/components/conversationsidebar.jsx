export default function ConversationSidebar({ isOpen, toggle, onLogout }) {
  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-16"
      } bg-white dark:bg-slate-900 transition-all duration-300 h-full flex flex-col border-r 
        border-gray-200 dark:border-slate-700`}
    >
      {/* Top Header */}
      <div
        className="p-4 border-b border-gray-200 dark:border-slate-700 
                   flex justify-between items-center 
                   bg-white dark:bg-slate-900"
      >
        {isOpen && (
          <h2 className="font-semibold text-gray-900 dark:text-slate-200">
            AskElevance
          </h2>
        )}

        <button
          onClick={toggle}
          className="text-sm bg-gray-300 dark:bg-slate-700 px-2 py-1 rounded
                     hover:bg-gray-400 dark:hover:bg-slate-600 transition-colors"
        >
          ☰
        </button>
      </div>

      {/* Chat List Section */}
      {isOpen && (
        <div className="p-4 text-sm text-gray-600 dark:text-slate-400 flex-1 overflow-y-auto">
          <p className="mb-2 cursor-pointer hover:text-gray-900 dark:hover:text-white">
            • New Chat
          </p>
          <p className="cursor-pointer hover:text-gray-900 dark:hover:text-white">
            • Previous Chat
          </p>
        </div>
      )}

      {/* Logout Button at Bottom */}
      <div className="p-4 mt-auto">
        {isOpen && (
          <button
            onClick={onLogout}
            className="w-full px-4 py-2 
                       bg-orange-400 hover:bg-orange-500
                       text-white rounded-lg transition"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}