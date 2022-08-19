import "./NavBar.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Cart from "./Cart";
import Cookies from "universal-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NavBar = ({ itemChanged, fun1 }) => {
  const cookies = new Cookies();
  const jwt = cookies.get("jwt");
  const [cartData, setcartData] = useState();
  const [cartBreakFast, setCartBreakFast] = useState([]);
  const [cartLunch, setCartLunch] = useState([]);
  const [cartDinner, setCartDinner] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    setToggle((prev) => {
      return !prev;
    });
  }, [itemChanged]);

  useEffect(() => {
    fetch("https://shanann.herokuapp.com/user/allitems", {
      method: "GET",
      // credentials: "same-origin",
      headers: {
        jwt: jwt,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setAllItems(data.data);
      });
  }, []);
  useEffect(() => {
    fetch("https://shanann.herokuapp.com/user/mycart", {
      method: "GET",
      credentials: "same-origin",
      headers: {
        jwt: jwt,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setcartData(data.cart);

        if (
          JSON.stringify(data.cart.breakfast) !== JSON.stringify(cartBreakFast)
        ) {
          setCartBreakFast(data.cart.breakfast);
        }

        if (JSON.stringify(data.cart.lunch) !== JSON.stringify(cartLunch)) {
          setCartLunch(data.cart.lunch);
        }

        if (JSON.stringify(data.cart.dinner) !== JSON.stringify(cartDinner)) {
          setCartDinner(data.cart.dinner);
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
  }, [cartBreakFast, cartLunch, cartDinner, toggle]);

  const add = (sestype, cItem) => {
    if (sestype === "100") {
      for (let i = 0; i < cartBreakFast.length; i++) {
        if (cItem.itemno === cartBreakFast[i].itemno) {
          const val = structuredClone(cartBreakFast);
          val[i].quantity++;
          const body = {
            breakfast: val,
            lunch: cartLunch,
            dinner: cartDinner,
          };

          fetch("https://shanann.herokuapp.com/user/mycart", {
            method: "POST",

            headers: {
              jwt: jwt,
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(body),
          })
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              setCartBreakFast(val);

              toast.success("Cart Updated", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            });
        }
      }
    } else if (sestype === "010") {
      for (let i = 0; i < cartLunch.length; i++) {
        if (cItem.itemno === cartLunch[i].itemno) {
          const val = structuredClone(cartLunch);
          val[i].quantity++;

          const body = {
            breakfast: cartBreakFast,
            lunch: val,
            dinner: cartDinner,
          };

          fetch("https://shanann.herokuapp.com/user/mycart", {
            method: "POST",

            headers: {
              jwt: jwt,
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(body),
          })
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              setCartLunch(val);
              toast.success("Cart Updated", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            });
        }
      }
    } else {
      for (let i = 0; i < cartDinner.length; i++) {
        if (cItem.itemno === cartDinner[i].itemno) {
          const val = structuredClone(cartDinner);
          val[i].quantity++;

          const body = {
            breakfast: cartBreakFast,
            lunch: cartLunch,
            dinner: val,
          };

          fetch("https://shanann.herokuapp.com/user/mycart", {
            method: "POST",

            headers: {
              jwt: jwt,
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(body),
          })
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              setCartDinner(val);
              toast.success("Cart Updated", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            });
        }
      }
    }
  };
  const sub = (sestype, cItem) => {
    if (sestype === "100") {
      for (let i = 0; i < cartBreakFast.length; i++) {
        if (cItem.itemno === cartBreakFast[i].itemno) {
          let val = structuredClone(cartBreakFast);
          if (val[i].quantity > 1) {
            val[i].quantity--;
          } else {
            let val1 = [];
            for (let j = 0; j < cartBreakFast.length; j++) {
              if (i !== j) {
                val1.push(cartBreakFast[j]);
              }
            }
            val = val1;
          }

          const body = {
            breakfast: val,
            lunch: cartLunch,
            dinner: cartDinner,
          };

          fetch("https://shanann.herokuapp.com/user/mycart", {
            method: "POST",

            headers: {
              jwt: jwt,
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(body),
          })
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              setCartBreakFast(val);
              toast.success("Cart Updated", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            });
        }
      }
    } else if (sestype === "010") {
      for (let i = 0; i < cartLunch.length; i++) {
        if (cItem.itemno === cartLunch[i].itemno) {
          let val = structuredClone(cartLunch);
          if (val[i].quantity > 1) {
            val[i].quantity--;
          } else {
            let val1 = [];
            for (let j = 0; j < cartLunch.length; j++) {
              if (i !== j) {
                val1.push(cartLunch[j]);
              }
            }
            val = val1;
          }
          const body = {
            breakfast: cartBreakFast,
            lunch: val,
            dinner: cartDinner,
          };

          fetch("https://shanann.herokuapp.com/user/mycart", {
            method: "POST",

            headers: {
              jwt: jwt,
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(body),
          })
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              setCartLunch(val);
              toast.success("Cart Updated", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            });
        }
      }
    } else {
      for (let i = 0; i < cartDinner.length; i++) {
        if (cItem.itemno === cartDinner[i].itemno) {
          let val = structuredClone(cartDinner);
          if (val[i].quantity > 1) {
            val[i].quantity--;
          } else {
            let val1 = [];
            for (let j = 0; j < cartDinner.length; j++) {
              if (i !== j) {
                val1.push(cartDinner[j]);
              }
            }
            val = val1;
          }

          const body = {
            breakfast: cartBreakFast,
            lunch: cartLunch,
            dinner: val,
          };

          fetch("https://shanann.herokuapp.com/user/mycart", {
            method: "POST",

            headers: {
              jwt: jwt,
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(body),
          })
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              setCartDinner(val);
              toast.success("Cart Updated", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            });
        }
      }
    }
  };
  const placeorder = () => {
    fetch("https://shanann.herokuapp.com/user/myorder", {
      method: "POST",
      headers: {
        jwt: jwt,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.statusCode === 200) {
          var val1 = flag;
          setFlag(!val1);
          setCartBreakFast([]);
          setCartLunch([]);
          setCartDinner([]);

          fun1();
          toast.success(data.message, {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setcartData([]);
        } else {
          toast.error(data.message, {
            position: "top-left",
            autoClose: 5000,
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
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <nav className="navbar">
      <ToastContainer />
      <div className="nav-items-left navbar-items">
        <Link to="/user" className="navbar-link">
          HOME
        </Link>
      </div>

      <div className="nav-items-right navbar-items">
        {/* <Link to="/user/mycart" className="navbar-link" > CART </Link> */}
        <div className="dropdown">
          <Link to="#" className="navbar-link dropbtn">
            CART
          </Link>
          <div className="dropdown-content">
            <Cart
              allItems={allItems}
              breakfast={cartBreakFast}
              lunch={cartLunch}
              dinner={cartDinner}
              add={add}
              sub={sub}
              placeorder={placeorder}
              // changeToggle={changeToggle}
            />
          </div>
        </div>
        <div className="dropdown">
          <Link to="#" className="navbar-link dropbtn">
            PROFILE
          </Link>
          <div className="dropdown-content">
            <Link to="/user/profile">Profile</Link>
            <Link to="/user/myorders">My Orders</Link>
            <Link to="/user/logout">Logout</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
