import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import "./UserItem.js";
import UserItem from "./UserItem.js";
import ItemCard from "./ItemCard.js";
import Session from "./Seesion.js";
import { useState, useEffect } from "react";
import NavBar from "./NavBar.js";
import Cart from "./Cart.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./UserHome.css";

const UserHome = () => {
  const cookies = new Cookies();
  const jwt = cookies.get("jwt");

  const [userData, setUserData] = useState();
  const [itemData, setItemData] = useState();
  const [cartData, setcartData] = useState();
  const [loading, setLoading] = useState(true);

  const [cartBreakFast, setCartBreakFast] = useState([]);
  const [cartLunch, setCartLunch] = useState([]);
  const [cartDinner, setCartDinner] = useState([]);
  const [itemChanged, setItemChanged] = useState(false);
  const [toggle, setToggle] = useState(false);

  const breakFast = [];
  const lunch = [];
  const dinner = [];

  useEffect(() => {
    fetch("https://shanann.herokuapp.com/user/", {
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
        if (data.statusCode === 200) {
          setUserData(data.userdata);
          setItemData(data.itemdata);
          setcartData(data.cartdata[0]);
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

  if (itemData) {
    for (let i = 0; i < itemData.length; i++) {
      if (itemData[i].bld[0] === "1") {
        breakFast.push(itemData[i]);
      }
      if (itemData[i].bld[1] === "1") {
        lunch.push(itemData[i]);
      }
      if (itemData[i].bld[2] === "1") {
        dinner.push(itemData[i]);
      }
    }
  }

  const addtocart = (sesType, cItem) => {
    if (sesType === "100") {
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
              toast.success("Cart Updated", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              setCartBreakFast(val);
            });
          let val1 = itemChanged;
          setItemChanged(val1 === true ? false : true);
          return;
        }
      }
      const val = structuredClone(cartBreakFast);
      val.push(cItem);
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

          toast.success("New Item added to succesfully", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          let val1 = itemChanged;
          setItemChanged(val1 === true ? false : true);
        });
    } else if (sesType === "010") {
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
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            });
          let val1 = itemChanged;
          setItemChanged(val1 === true ? false : true);
          return;
        }
      }
      const val = structuredClone(cartLunch);
      val.push(cItem);
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
          toast.success("New Item added to succesfully", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          let val1 = itemChanged;
          setItemChanged(val1 === true ? false : true);
        });
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
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              let val1 = itemChanged;
              setItemChanged(val1 === true ? false : true);
            });
          return;
        }
      }
      const val = structuredClone(cartDinner);
      val.push(cItem);
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
          toast.success("New Item added to succesfully", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          let val1 = itemChanged;
          setItemChanged(val1 === true ? false : true);
        });
    }
  };

  const fun1 = () => {
    let val = toggle;
    setToggle(!val);
  };

  return (
    <div>
      <ToastContainer></ToastContainer>
      <NavBar itemChanged={itemChanged} fun1={fun1} />
      <div style={{ fontFamily: "Montserrat, sansSerif" }} className="home">
        {loading === true && <h3 style={{ margin: "auto" }}>loading...</h3>}

        <h1>BreakFast</h1>

        {breakFast &&
          breakFast.map((item) => {
            return (
              <ItemCard
                item={item}
                sesType="100"
                key={`home-100-${item.itemno}`}
                addtocart={addtocart}
              ></ItemCard>
            );
          })}
        <h1>Lunch</h1>
        {lunch &&
          lunch.map((item) => {
            return (
              <ItemCard
                item={item}
                sesType="010"
                key={`home-010-${item.itemno}`}
                addtocart={addtocart}
              ></ItemCard>
            );
          })}
        <h1>Dinner</h1>
        {dinner &&
          dinner.map((item) => {
            return (
              <ItemCard
                item={item}
                key={`home-001-${item.itemno}`}
                sesType="001"
                addtocart={addtocart}
              ></ItemCard>
            );
          })}
      </div>
    </div>
  );
};

export default UserHome;
