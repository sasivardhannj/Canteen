import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
const Logout = ({ changeToggle }) => {
  const cookies = new Cookies();
  const history = useHistory();
  localStorage.clear("jwt");

  cookies.remove("jwt");
  changeToggle();
  history.push("/user/signup");
  return <div></div>;
};

export default Logout;
