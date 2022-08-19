import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";

const AdminLoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const cookies = new Cookies();
  const history = useHistory();

  const onsubmit = function (e) {
    e.preventDefault();
    try {
      const user = {
        username: username,
        password: password,
      };

      fetch("https://shanann.herokuapp.com/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.statusCode === 401) {
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
          }
          if (data.statusCode === 201) {
            localStorage.setItem("jwt", data.token);
            cookies.set("jwt", data.token, { path: "/admin" });
            history.push("/admin/");
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
          return;
        });
    } catch (e) {
      toast.error(e.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <div>
      <ToastContainer />
      <form onSubmit={onsubmit} className="form">
        <h2 className="form-heading">Login</h2>
        <div className="form-item">
          <label> Email</label>
          <br></br>
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-item">
          <label>Password</label>
          <br></br>
          <input
            type="Password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={onsubmit}>submit</button>
      </form>
    </div>
  );
};

export default AdminLoginForm;
