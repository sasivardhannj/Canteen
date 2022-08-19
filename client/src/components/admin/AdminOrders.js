import { useEffect } from "react";
import Cookies from "universal-cookie";
import AdminNavBar from "./AdminNavBar";
import { useState } from "react";
import AdminOrderComp from "./AdminOrderComp.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminData = () => {
  const cookies = new Cookies();
  const jwt = cookies.get("jwt");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://shanann.herokuapp.com/admin/orders", {
      method: "GET",
      headers: {
        jwt: jwt,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setItems(data.orders.items);
        setLoading(false);
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
  }, []);

  return (
    <div>
      <AdminNavBar></AdminNavBar>
      {loading === true && <h3 style={{ margin: "auto" }}>loading...</h3>}
      {loading === false && <AdminOrderComp items={items}></AdminOrderComp>}
    </div>
  );
};

export default AdminData;
