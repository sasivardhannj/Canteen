import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserRouter from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";

import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
// import SignupForm from "./components/signup/SignupForm.js";
// import LoginForm from "./components/login/LoginForm.js";

function App() {
  const cookies = new Cookies();
  const jwt = localStorage.getItem("jwt");
  if (cookies.jwt) {
    cookies.set("jwt", jwt);
  }

  return (
    <Router>
      <Switch>
        {jwt !== null && jwt !== "null" && (
          <Route path="/user">
            <UserRouter></UserRouter>
          </Route>
        )}
        <Route path="/user">
          <UserRouter></UserRouter>
        </Route>
        <Route path="/admin">
          <AdminRoutes></AdminRoutes>
        </Route>
        <Route path="/">
          <div className="root_style">
            <div className="root-center">
              <h4>Login/Signup as User</h4>
              {(jwt === null || jwt === "null") && (
                <Link
                  style={{ textDecoration: "none" }}
                  to="/user/signup"
                  className="root-center-link"
                >
                  <h3>user</h3>
                </Link>
              )}
              {jwt !== null && jwt !== "null" && (
                <Link
                  style={{ textDecoration: "none" }}
                  to="/user/"
                  className="root-center-link"
                >
                  <h3>user</h3>
                </Link>
              )}
            </div>
            <hr></hr>
            <div className="root-center">
              <h4>Login as Admin</h4>
              <Link
                style={{ textDecoration: "none" }}
                to="/admin/login"
                className="root-center-link"
              >
                <h3>Admin</h3>
              </Link>
            </div>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
