import { useState } from "react";
import "./UserSignup.css";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Signup = function ({ changeToggle }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const cookies = new Cookies();
  const history = useHistory();

  const onsubmit = function (e) {
    e.preventDefault();
    const user = {
      name: name,
      username: username,
      password: password,
      email: email,
    };

    fetch("https://shanann.herokuapp.com/user/signup", {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        // Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.statusCode === 400) {
          toast.error(data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          return;
        } else {
          localStorage.setItem("jwt", data.token);
          cookies.set("jwt", data.token, { path: "/user" });
          changeToggle();
          history.push("/user");
        }
      })
      .catch((e) => {
        toast.error(e.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <div className="body">
      <ToastContainer />
      <form onSubmit={onsubmit} className="form">
        <h2 className="form-heading">Signup</h2>
        <div className="form-item">
          <label>Name</label>
          <br></br>
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-item">
          <label>Regno</label>
          <br></br>
          <input
            type="text"
            placeholder="Reg No"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-item">
          <label>Email</label>
          <br></br>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-item">
          <label>Password</label>
          <br></br>
          <input
            type="Password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button>submit</button>
        <h5>
          If already a user ? <Link to="/user/login">Login</Link>
        </h5>
      </form>
    </div>
  );
};

export default Signup;
