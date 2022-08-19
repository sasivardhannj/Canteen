import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useLocation } from "react-router-dom";
import UserLogin from "./../components/user/UserLogin";
import UserSignup from "./../components/user/UserSignup";
import UserHome from "./../components/user/UserHome.js";
import UserMyorders from "./../components/user/UserMyorders.js";
// import UserProfile from "./../components/user/UserProfile";
import Cookies from "universal-cookie";
import UserProfile from "../components/user/UserProfile";
import NavBar from "../components/user/NavBar";
import { useHistory } from "react-router-dom";
import Logout from "../components/user/Logout";
import { useState } from "react";

const UserRouter = () => {
  const [toggle, setToggle] = useState(true);
  const cookies = new Cookies();
  const history = useHistory();
  const jwt = localStorage.getItem("jwt");

  if (!cookies.jwt) {
    cookies.set("jwt", jwt);
  }
  const changeToggle = () => {
    const val = !toggle;
    setToggle(val);
  };

  const loc = window.location.pathname;

  if ((jwt === null || jwt === "null") && loc !== "/user/signup") {
    history.push("/user/login");
  }

  return (
    <Router>
      <Switch>
        <Route path="/user/" exact>
          <div>
            <UserHome></UserHome>
          </div>
        </Route>
        <Route path="/user/login" exact>
          {jwt === null && <UserLogin changeToggle={changeToggle}></UserLogin>}
        </Route>
        <Route path="/user/signup" exact>
          {jwt === null && (
            <UserSignup changeToggle={changeToggle}></UserSignup>
          )}
        </Route>
        <Route path="/user/myorders" exact>
          {jwt && (
            <div>
              <UserMyorders></UserMyorders>
            </div>
          )}
        </Route>
        <Route path="/user/profile" exact>
          {jwt && (
            <div>
              <UserProfile></UserProfile>
            </div>
          )}
        </Route>
        <Route path="/user/logout" exact>
          <Logout changeToggle={changeToggle}></Logout>
        </Route>
      </Switch>
    </Router>
  );
};

export default UserRouter;
