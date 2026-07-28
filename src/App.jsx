import { Routes, Route,  } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Chat from './pages/chat'; 
import { Authprovider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";


function App(){
    return (
      <>
        <Authprovider>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/chat" element={<Chat />}></Route>
          </Routes>
          <ToastContainer />
        </Authprovider>
      </>
    );
}

export default App; 