import './messageBubble.css'; 
export default function MessageBubble({ role, content, isStreaming }) {
  const isUser = role === "user";

  return (
    <div
      className={`message-row ${isUser ? "message-row-user" : "message-row-ai"}`}
    >
      <div className="message-margin">{isUser ? "You" : "Claude"}</div>
      <div className={`message-bubble ${isUser ? "bubble-user" : "bubble-ai"}`}>
        {content}
        {isStreaming && <span className="cursor-blink">▌</span>}
      </div>
    </div>
  );
}
