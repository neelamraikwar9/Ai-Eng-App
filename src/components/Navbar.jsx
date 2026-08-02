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
              <i
                class="bi bi-house-check-fill"
                style={{ fontSize: "1.2rem" }}
              ></i>
              <NavLink to="/dashboard" className="navText">
                Home
              </NavLink>
            </li>

            <li className="navItem">
              <NavLink to="/project" className="navText">
                <i class="bi bi-book-fill"></i>
                Read Novels
              </NavLink>
            </li>

            <li className="navItem">
              <NavLink to="/team" className="navText">
                <i class="bi bi-chat-dots-fill"></i>
                Converse
              </NavLink>
            </li>

            <li className="navItem">
              <NavLink to="/report" className="navText">
                <i class="bi bi-book"></i>
                Grammer Books
              </NavLink>
            </li>

            <li className="navItem">
              <NavLink to="/setting" className="navText">
                <i class="bi bi-person-circle"></i>
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
