import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import ChatWindow from "../components/chatWindow";
import InputBox from "../components/inputBox";
import { useAuth } from "../context/AuthContext";

const API_BASE = "https://ai-eng-app-ap-is.vercel.app/api";

const Chat = () => {
  const { token } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [streamingIndex, setStreamingIndex] = useState(null);
  const [sending, setSending] = useState(false);

  // Load the sidebar list once when the page mounts
  useEffect(() => {
    loadConversations();
  }, []);

  // Load messages whenever a different conversation is selected
  useEffect(() => {
    if (activeId) loadMessages(activeId);
  }, [activeId]);

  async function loadConversations() {
    const res = await fetch(`${API_BASE}/chat/conversations`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setConversations(data);
    if (!activeId && data.length > 0) setActiveId(data[0]._id);
  }

  async function loadMessages(conversationId) {
    const res = await fetch(
      `${API_BASE}/chat/conversations/${conversationId}/messages`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    const data = await res.json();
    setMessages(data);
  }

  async function handleNewChat() {
    const res = await fetch(`${API_BASE}/chat/conversations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: "New entry" }),
    });
    const data = await res.json();
    setConversations((prev) => [data, ...prev]);
    setActiveId(data._id);
    setMessages([]);
  }

  async function handleSend(text) {
    if (!activeId) return;

    // Show the user's message right away
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    // Add an empty placeholder for the AI reply, and stream into it
    setMessages((prev) => {
      const next = [...prev, { role: "assistant", content: "" }];
      setStreamingIndex(next.length - 1);
      return next;
    });

    setSending(true);
    try {
      const res = await fetch(`${API_BASE}/chat/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ conversationId: activeId, content: text }),
      });

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const events = buffer.split("\n\n");
        buffer = events.pop();

        for (const rawEvent of events) {
          if (!rawEvent.startsWith("data: ")) continue;
          const payload = JSON.parse(rawEvent.replace("data: ", ""));

          if (payload.chunk) {
            setMessages((prev) => {
              const updated = [...prev];
              const last = updated.length - 1;
              updated[last] = {
                ...updated[last],
                content: updated[last].content + payload.chunk,
              };
              return updated;
            });
          }
          if (payload.done) break;
        }
      }
    } catch (err) {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "Something went wrong reaching the AI. Please try again.",
        };
        return updated;
      });
    } finally {
      setStreamingIndex(null);
      setSending(false);
    }
  }

  return (
    <div className="chat-layout">
      <Sidebar
        conversations={conversations}
        activeId={activeId}
        onSelect={setActiveId}
        onNewChat={handleNewChat}
      />
      <main className="chat-main">
        {activeId ? (
          <>
            <ChatWindow messages={messages} streamingIndex={streamingIndex} />
            <InputBox onSend={handleSend} disabled={sending} />
          </>
        ) : (
          <div className="chat-window chat-window-empty">
            <p>Create your first entry to begin.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Chat;
