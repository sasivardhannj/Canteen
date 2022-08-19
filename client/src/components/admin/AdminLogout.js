import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
const AdminLogout = () => {
  const cookies = new Cookies();
  const history = useHistory();

  localStorage.clear("jwt");
  cookies.remove("jwt");
  history.push("/admin/login");
  return <div></div>;
};

export default AdminLogout;
