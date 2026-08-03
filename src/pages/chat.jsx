import "./chat.css"; 
import React from 'react'; 
import Navbar  from "../components/Navbar"; 
import 


const chat = () => {
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
          <h2>Hi name</h2>
          <i>
            “You have to grow from the inside out. None can teach you, none can
            make you spiritual. There is no other teacher but your own soul.”
          </i>
          <br />
          <div className="inputBox">
            <i
              className="bi bi-pen-fill pencilIcon"

              // style={{position: "absolute", margin: "9px", marginLeft: "20px"}}
            ></i>
            <input
              type="text"
              placeholder="Type your message..."
              className="inp"
            />
            <i class="bi bi-arrow-up-circle-fill promptSender"></i>
          </div>
        </div>
      </div>
    </main>
  );
}

export default chat