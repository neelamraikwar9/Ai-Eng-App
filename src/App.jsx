import { Routes, Route,  } from "react-router-dom";
import Login from "./pages/login";
import register from "./pages/register"; 


function App(){
    return(
        <>
            <Routes>
                <Route path="/" element={<Login/>}></Route>
            </Routes>
        </>
    )
}

export default App; 