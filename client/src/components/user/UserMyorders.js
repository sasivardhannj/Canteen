import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import NavBar from "./NavBar";
import OrderHistory from "./OrderHistory.js";
import "./OrderItem.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserMyOrders = () => {
  const cookies = new Cookies();
  const jwt = cookies.get("jwt");

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://shanann.herokuapp.com/user/myorders", {
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
        let val = data.data.orderHistory;
        val.reverse();
        setOrders(val);
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
      <NavBar />
      {loading === true && <h3 style={{ margin: "auto" }}>loading...</h3>}
      {orders.length !== 0 && (
        <div>
          <h1 className="my_orders_h1">Hey User, Your Orders</h1>
          <div className="my_orders">
            {orders.length !== 0 &&
              orders.map((order, ind) => {
                return (
                  <OrderHistory
                    key={`order-history-${ind}`}
                    orderItem={order}
                    ind={ind}
                  ></OrderHistory>
                );
              })}
          </div>
        </div>
      )}
      {loading === false && orders.length === 0 && (
        <h1 className="my_orders_h1">No Orders to show</h1>
      )}
    </div>
  );
};

export default UserMyOrders;
