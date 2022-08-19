import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AdminAddItem from "../components/admin/AdminAddItem";
// import AdminData from "../components/admin/AdminData";
import AdminHome from "../components/admin/AdminHome";
import AdminLoginForm from "../components/admin/AdminLogin";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import AdminOrders from "./../components/admin/AdminOrders.js";
import AdminLogout from "../components/admin/AdminLogout";

const AdminRouter = () => {
  const cookies = new Cookies();
  const history = useHistory();
  const jwt = localStorage.getItem("jwt");
  if (!cookies.jwt) {
    cookies.set("jwt", jwt);
  }

  if (jwt === null || jwt === "null" || !jwt) {
    history.push("/admin/login");
  }
  return (
    <Router>
      <Switch>
        <Route path="/admin" exact>
          <AdminHome></AdminHome>
        </Route>
        <Route path="/admin/additem" eact>
          <AdminAddItem></AdminAddItem>
        </Route>
        <Route path="/admin/login">
          <AdminLoginForm></AdminLoginForm>
        </Route>
        <Route path="/admin/orders" exact>
          <AdminOrders></AdminOrders>
        </Route>
        <Route path="/admin/logout" exact>
          <AdminLogout></AdminLogout>
        </Route>
        <Route path="*">
          <p>Invalid Route</p>
        </Route>
      </Switch>
    </Router>
  );
};

export default AdminRouter;
