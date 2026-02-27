export default function ConversationSidebar({ isOpen, toggle }) {
  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-16"
      } bg-slate-900 transition-all duration-300 h-full flex flex-col`}
    >
      <div className="p-4 border-b border-slate-700 flex justify-between items-center">
        {isOpen && <h2 className="font-semibold">AskElevance</h2>}
        <button
          onClick={toggle}
          className="text-sm bg-slate-700 px-2 py-1 rounded"
        >
          ☰
        </button>
      </div>

      {isOpen && (
        <div className="p-4 text-sm text-slate-400">
          <p>• New Chat</p>
          <p>• Previous Chat</p>
        </div>
      )}
    </div>
  );
}