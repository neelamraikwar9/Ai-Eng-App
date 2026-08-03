import "./chat.css"; 
import React from 'react'; 
import Navbar  from "../components/Navbar"; 


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
          <div className="typeInputCon">
          
            <input type="text" className="inp" />
          </div>
        </div>
      </div>
    </main>
  );
}

export default chat