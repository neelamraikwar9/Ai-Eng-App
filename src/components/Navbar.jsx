import "./navbar.css";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <main>
      <div>
        <nav className="navCon">
          <div className="logoCon">
            <NavLink to="/dashboard" className="workasana">
              LinguaLeap
            </NavLink>
          </div>

          <ul className="listStyl">
            <li className="navItem">
              //added to check
              <i
                className="bi bi-telephone-fill hoverStyl"
                style={{
                  padding: "0",
                  marginTop: "2rem",
                  color: "greenyellow",
                }}
              ></i>
              <NavLink to="/dashboard" className="navText">
                Home
              </NavLink>
            </li>

            <li className="navItem">
              <NavLink to="/project" className="navText">
                Read Novels
              </NavLink>
            </li>

            <li className="navItem">
              <NavLink to="/team" className="navText">
                Converse
              </NavLink>
            </li>

            <li className="navItem">
              
              <NavLink to="/report" className="navText">
                Grammer Books
              </NavLink>
            </li>

            <li className="navItem">
             
            
              <NavLink to="/setting" className="navText">
                User 
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </main>
  );
}

export default Navbar;
