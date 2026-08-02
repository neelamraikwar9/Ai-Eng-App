import "./login.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  async function handleSignUpSubmit(e) {
    e.preventDefault();

    const res = await fetch(
      "https://ai-eng-app-ap-is.vercel.app/api/auth/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      },
    );

    const data = await res.json(); // ✅ await added

    if (res.status === 201) {
      login(data.token); // ✅ log the new user in immediately
      navigate("/chat"); // ✅ send them to the chat page, not "/"
      toast.success("Account created successfully.");
    } else {
      setError(data.message || "Something went wrong");
      toast.error(data.message || "Registration failed. Try again.");
    }
  }

  function handleEyeClick() {
    setVisible((visible) => !visible);
  }

  return (
    <main>
      <h2 className="textCenter workasana">Workasana</h2>
      <div className="loginCon">
        <h3 className="textCenter">Register your account</h3>
        <p className="textCenter">Please enter your details</p>

        <div className="fields">
          <form onSubmit={handleSignUpSubmit}>
            <div className="inpField">
              <label className="lable" style={{ marginRight: "11rem" }}>
                Name
              </label>
              <br />
              <input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="inpFont"
              />
            </div>

            <div className="inpField">
              <label className="lable" style={{ marginRight: "11.3rem" }}>
                Email
              </label>
              <br />
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="inpFont"
              />
            </div>

            <div className="inpField">
              <label className="lable">Password</label>
              <br />
              <div className="password">
                <input
                  type={visible ? "text" : "password"}
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="inpFont"
                />
                <button
                  type="button"
                  onClick={handleEyeClick}
                  className="eyeBtn"
                >
                  {visible ? (
                    <i
                      className="bi bi-eye"
                      style={{
                        position: "absolute",
                        right: "0.1rem",
                        margin: "0.1rem",
                        bottom: "0.1rem",
                      }}
                    ></i>
                  ) : (
                    <i
                      className="bi bi-eye-slash"
                      style={{
                        position: "absolute",
                        right: "0.1rem",
                        bottom: "0.1rem",
                        margin: "0.1rem",
                      }}
                    ></i>
                  )}
                </button>
              </div>
            </div>

            <div className="btnCon">
              <button className="btn" type="submit">
                Sign Up
              </button>
            </div>

            <Link to="/">
              <p>Already have an account? Sign in.</p>
            </Link>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Register;
