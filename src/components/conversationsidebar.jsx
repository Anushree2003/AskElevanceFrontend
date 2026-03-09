import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../services/api";

function ConversationSidebar({ isOpen, toggle, onLogout }) {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [menuOpenFor, setMenuOpenFor] = useState(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const currentId = pathname.split("/").pop();

  useEffect(() => {
    let cancelled = false;

    const loadSessions = async () => {
      try {
        setLoading(true);

        const res = await API.get("/chat/sessions");
        const newSessions = res.data || [];

        if (!cancelled) {
          setSessions((prev) => {
            if (JSON.stringify(prev) === JSON.stringify(newSessions)) {
              return prev; // prevents unnecessary re-render
            }
            return newSessions;
          });
        }

      } catch (err) {
        console.error("error fetching sessions", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadSessions();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (!event.target.closest(".session-menu")) {
        setMenuOpenFor(null);
      }
    };

    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, []);

  const handleEditSessionTitle = async (session) => {
    const newTitle = window.prompt("Edit session title", session.title);
    if (!newTitle || newTitle.trim() === "" || newTitle === session.title) {
      return;
    }

    try {
      const res = await API.put(`/chat/sessions/${session.id}/title`, { title: newTitle });
      const updated = res.data;
      setSessions((prev) =>
        prev.map((s) => (s.id === session.id ? { ...s, title: updated?.title ?? newTitle } : s))
      );
    } catch (err) {
      console.error("error updating session title", err);
      alert("Could not update session title. Please try again.");
    } finally {
      setMenuOpenFor(null);
    }
  };

  const handleDeleteSession = async (session) => {
    const sure = window.confirm("Delete this session? This cannot be undone.");
    if (!sure) return;

    try {
      await API.delete(`/chat/sessions/${session.id}`);
      setSessions((prev) => prev.filter((s) => s.id !== session.id));
      if (String(session.id) === currentId) {
        navigate("/chat");
      }
    } catch (err) {
      console.error("error deleting session", err);
      alert("Could not delete session. Please try again.");
    } finally {
      setMenuOpenFor(null);
    }
  };

  const handleNewChat = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.post(
        "/chat/create",
        {
          title: "user's new chat session"
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          withCredentials: true
        }
      );

      const newSession = res.data;

      setSessions((prev) => [newSession, ...prev]);

      if (newSession?.id) {
        navigate(`/chat/${newSession.id}`);
      }

    } catch (err) {
      console.error("error creating session", err);
    }
  };

  return (
    <div
      className={`${isOpen ? "w-64" : "w-16"
        } bg-white dark:bg-slate-900 transition-all duration-300 h-full flex flex-col border-r 
        border-gray-200 dark:border-slate-700`}
    >
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

      {isOpen && (
        <div className="p-4 text-sm text-gray-600 dark:text-slate-400 flex-1 overflow-y-auto">
          <button
            onClick={() => navigate("/chat")}
            className="w-full mb-3 px-3 py-2 text-left rounded-lg 
             bg-gray-100 dark:bg-slate-800
             hover:bg-gray-200 dark:hover:bg-slate-700
             text-gray-900 dark:text-white transition"
          >
            🏠 Home
          </button>
          <button
            onClick={handleNewChat}
            className="w-full mb-3 px-3 py-2 text-left rounded-lg 
             bg-gray-100 dark:bg-slate-800
             hover:bg-gray-200 dark:hover:bg-slate-700
             text-gray-900 dark:text-white transition"
          >
            💬 New Chat
          </button>
          {loading && <p className="text-xs">Loading sessions…</p>}
          {sessions.map((session) => (
            <div
              key={session.id}
              onClick={() => {
                setMenuOpenFor(null);
                navigate(`/chat/${session.id}`);
              }}
              className={`group cursor-pointer px-3 py-2 rounded-lg mb-1 transition-all duration-200
                  ${String(session.id) === currentId
                  ? "bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-white"
                  : "hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-300"
                }`}
            >
              <div className="flex items-center justify-between">
                <span className="truncate text-sm font-medium">
                  {session.title}
                </span>

                <div className="relative session-menu">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuOpenFor((openId) => (openId === session.id ? null : session.id));
                    }}
                    className="ml-2 p-1 rounded hover:bg-gray-200 dark:hover:bg-slate-700"
                    aria-label="Session menu"
                  >
                    ⋮
                  </button>

                  {menuOpenFor === session.id && (
                    <div className="absolute right-0 mt-1 w-32 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded shadow-lg z-10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditSessionTitle(session);
                        }}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-slate-700"
                      >
                        Edit title
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteSession(session);
                        }}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-slate-700 text-red-600 dark:text-red-400"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          {!loading && sessions.length === 0 && (
            <p className="text-xs text-gray-500">No sessions</p>
          )}
        </div>
      )}

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
export default React.memo(ConversationSidebar);