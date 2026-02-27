export default function MessageInput() {
  return (
    <div className="p-4 border-t border-slate-800 bg-slate-900">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 rounded-lg bg-slate-800 text-white outline-none"
        />
        <button className="bg-blue-600 px-4 py-2 rounded-lg">
          Send ➤
        </button>
      </div>
    </div>
  );
}