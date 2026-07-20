import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble.jsx";

export default function ChatWindow({ messages, streamingIndex }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="chat-window chat-window-empty">
        <p className="empty-mark">¶</p>
        <p>This entry is blank. Write the first line below.</p>
      </div>
    );
  }

  return (
    <div className="chat-window">
      {messages.map((m, i) => (
        <MessageBubble
          key={i}
          role={m.role}
          content={m.content}
          isStreaming={i === streamingIndex}
        />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
