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
        <h1>chat</h1>
      </div>  
    </main>
  );
}

export default chat