import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminNavBar from "./AdminNavBar";
import Cookies from "universal-cookie";
import AdminItemCard from "./AdminItemCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminHome = () => {
  const [allitems, setAllItems] = useState([]);
  const [reload, setReload] = useState(true);
  const [loading, setLoading] = useState(true);
  const cookies = new Cookies();
  const jwt = cookies.get("jwt");

  useEffect(() => {
    fetch("https://shanann.herokuapp.com/admin/", {
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
        if (data.statusCode !== 200) {
          toast.error(data.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          setAllItems(data.allitems);
        }
        setLoading(false);
      });
  }, [reload]);
  const updateItem = (itemno) => {
    const body = {
      itemno: itemno,
    };

    fetch("https://shanann.herokuapp.com/admin/updatemenu", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        jwt: jwt,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.statusCode === 200) {
          let val1 = reload;
          setReload(!val1);
          toast.success(data.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error(data.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((e) => {
        toast.error(e.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <div>
      <AdminNavBar></AdminNavBar>
      <ToastContainer></ToastContainer>
      {loading === true && <h3 style={{ margin: "auto" }}>loading...</h3>}
      {loading === false &&
        allitems.length !== 0 &&
        allitems.map((item) => {
          return (
            <AdminItemCard
              item={item}
              updateItem={updateItem}
              key={item.itemno}
            ></AdminItemCard>
          );
        })}
    </div>
  );
};

export default AdminHome;
