// import "./chat.css";
// import React from 'react';
// import { useState } from 'react';
// import axios from "axios";
// import Navbar  from "../components/Navbar";
// import { useAuth } from "../context/AuthContext";

// const Chat = (  ) => {
//   const { user, logout } = useAuth();
//   console.log(user, "user");

//   const [conversationId, setConversationId] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [sending, setSending] = useState(false);

//   async function ensureConversation(){
//     // creating conversation
//     const res = await axios.post(
//       "https://ai-eng-app-ap-is.vercel.app/api/chat/conversations",
//       {title: "New Chat"},
//       {headers: {Authorization: `Bearer ${token}`}}
//     );

//     setConversationId(res.data._id);
//     return res.data._id;
//   }

//   async function handleSendMsg(e) {
//     e.preventDefault();

//     //
//     const text = input.trim();
//     if (!text || sending) return;

//     setInput("");
//     setSending(true);

//     const activeId = await ensureConversation();

//     // Show the user's message immediately
//     setMessages((prev) => [...prev, { role: "user", content: text }]);

//     // Add an empty AI message that fills in as chunks stream in
//     setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

//       let lastLength = 0;

//       try{
//         await axios.post("https://ai-eng-app-ap-is.vercel.app/api/chat/messages", {conversationId: activeId, content: text}, {
//           headers: {Authorization:  `Bearer ${token}`},
//             onDownloadProgress: (progressEvent) => {
//                     const fullText = progressEvent.event.target.responseText;
//             const newText = fullText.slice(lastLength);
//             lastLength = fullText.length;

//              const events = newText.split("\n\n").filter(Boolean);
//             for (const event of events) {
//               if (!event.startsWith("data: ")) continue;
//               try {
//                 const payload = JSON.parse(event.replace("data: ", ""));
//                 if (payload.chunk) {
//                   setMessages((prev) => {
//                     const updated = [...prev];
//                     const last = updated.length - 1;
//                     updated[last] = {
//                       ...updated[last],
//                       content: updated[last].content + payload.chunk,
//                     };
//                     return updated;
//                   });
//                 }
//               } catch {
//                 // incomplete chunk, ignore, next progress event completes it
//               }
//             }
//           },
//         }
//       );
//     } catch (err) {
//       setMessages((prev) => {
//         const updated = [...prev];
//         updated[updated.length - 1] = {
//           role: "assistant",
//           content: "Something went wrong. Please try again.",
//         };
//         return updated;
//       });
//     } finally {
//       setSending(false);
//     }
//   }

//   return (
//     <main className="MainContainer">
//       <div className="navbar">
//         <Navbar />
//       </div>
//       <div className="chatContainer">
//         <div className="converse">
//           <h1>Converse</h1>
//         </div>

//         <div className="midChatCon">

//             <h2>Hi {user?.name}</h2>
//             <i>
//               “You have to grow from the inside out. None can teach you, none
//               can make you spiritual. There is no other teacher but your own
//               soul.”
//             </i>

//           <br />
//           <div className="inputBox">
//             <i
//               className="bi bi-pen-fill pencilIcon"

//               // style={{position: "absolute", margin: "9px", marginLeft: "20px"}}
//             ></i>
//             <input
//               type="text"
//               placeholder="Type your message..."
//               className="inp"
//             />
//             <i className="bi bi-arrow-up-circle-fill promptSender"></i>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

// export default Chat

import "./chat.css";
import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

const API_BASE = "https://ai-eng-app-ap-is.vercel.app/api";

const Chat = () => {
  const { user, token } = useAuth();

  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  async function ensureConversation() {
    // If this is the very first message, create a conversation first
    if (conversationId) return conversationId;

    const res = await axios.post(
      `${API_BASE}/chat/conversations`,
      { title: "New chat" },
      { headers: { Authorization: `Bearer ${token}` } },
    );
    setConversationId(res.data._id);
    return res.data._id;
  }

  async function handleSend(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text || sending) return;

    setInput("");
    setSending(true);

    const activeId = await ensureConversation();

    // Show the user's message immediately
    setMessages((prev) => [...prev, { role: "user", content: text }]);

    // Add an empty AI message that fills in as chunks stream in
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    let lastLength = 0;

    try {
      await axios.post(
        `${API_BASE}/chat/messages`,
        { conversationId: activeId, content: text },
        {
          headers: { Authorization: `Bearer ${token}` },
          onDownloadProgress: (progressEvent) => {
            const fullText = progressEvent.event.target.responseText;
            const newText = fullText.slice(lastLength);
            lastLength = fullText.length;

            const events = newText.split("\n\n").filter(Boolean);
            for (const event of events) {
              if (!event.startsWith("data: ")) continue;
              try {
                const payload = JSON.parse(event.replace("data: ", ""));
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
              } catch {
                // incomplete chunk, ignore, next progress event completes it
              }
            }
          },
        },
      );
    } catch (err) {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "Something went wrong. Please try again.",
        };
        return updated;
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="MainContainer">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="chatContainer">
        <div className="converse">
          <h1>Converse</h1>
        </div>

        <div className="midChatCon">
          {messages.length === 0 ? (
            <>
              <h2>Hi {user?.name}</h2>
              <i>
                "You have to grow from the inside out. None can teach you, none
                can make you spiritual. There is no other teacher but your own
                soul."
              </i>
            </>
          ) : (
            <div className="messageList">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`msgBubble ${m.role === "user" ? "userMsg" : "aiMsg"}`}
                >
                  {m.content}
                </div>
              ))}
            </div>
          )}

          <br />
          <form className="inputBox" onSubmit={handleSend}>
            <i className="bi bi-pen-fill pencilIcon"></i>
            <input
              type="text"
              placeholder="Type your message..."
              className="inp"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={sending}
            />
            <button type="submit" className="sendBtn" disabled={sending}>
              <i className="bi bi-arrow-up-circle-fill promptSender"></i>
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Chat;