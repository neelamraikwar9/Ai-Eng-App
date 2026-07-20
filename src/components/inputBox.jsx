import { useState } from "react";

export default function InputBox({ onSend, disabled }) {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setText("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSubmit(e);
    }
  }

  return (
    <form className="input-box" onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Write in English… press Enter to send"
        rows={1}
        disabled={disabled}
      />
      <button
        type="submit"
        className="btn-send"
        disabled={disabled || !text.trim()}
      >
        Send
      </button>
    </form>
  );
}
