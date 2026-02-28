export default function MessageInput() {
  return (
    <div className="p-4 border-t border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 px-4 py-3 rounded-lg bg-gray-100 dark:bg-slate-800 border-2 border-gray-300 
                      dark:border-slate-700 text-gray-900 dark:text-white outline-none focus:ring-2 
                      focus:ring-gray-400 dark:focus:ring-blue-500 focus:border-gray-400 
                      dark:focus:border-blue-500 transition-all h-12"
        />
        <button className="bg-gray-800 hover:bg-gray-900 text-white 
                           dark:bg-blue-600 dark:hover:bg-blue-700 px-6 py-3 rounded-lg 
                           font-medium transition-all flex items-center min-h-[44px] shadow-sm">
          Send ➤
        </button>

      </div>
    </div>
  );
}
