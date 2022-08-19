// export default AdminAddItem;
import { useEffect, useState } from "react";
import "./AdminAddItem.css";
import AdminNavBar from "./AdminNavBar";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

import FileBase64 from "react-file-base64";

const AdminAddItem = () => {
  const [itemName, setItemName] = useState("");
  const [cuisineType, setCuisineType] = useState("");
  const [b, setB] = useState(false);
  const [l, setL] = useState(false);
  const [d, setD] = useState(false);
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [subItems, setSubItems] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [nonVeg, setNonVeg] = useState(false);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const cookies = new Cookies();
  const jwt = cookies.get("jwt");

  const onsubmit = function (e) {
    e.preventDefault();
    try {
      let bld = "";

      if (b === true) {
        bld = bld + "1";
      } else {
        bld = bld + "0";
      }
      if (l === true) {
        bld = bld + "1";
      } else {
        bld = bld + "0";
      }
      if (d === true) {
        bld = bld + "1";
      } else {
        bld = bld + "0";
      }

      const itemAdd = {
        name: itemName,
        ingredients: ingredients.split(","),
        cuisineType: cuisineType,
        shortDescription: description,
        bld: bld,
        quantity: Number(quantity),
        price: Number(price),
        nonVeg: nonVeg,
        subItems: subItems.split(","),
        image: image,
      };

      fetch("https://shanann.herokuapp.com/admin/additem", {
        method: "POST",
        headers: {
          jwt: jwt,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemAdd),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.statusCode === 200) {
            toast.success(data.message, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            // setItemName("");
            // setB(false);
            // setL(false);
            // setD(false);
            // setCuisineType("");
            // setDescription("");
            // setImage("");
            // setIngredients("");
            // setNonVeg("");
            // setPrice(0);
            // setQuantity(0);
            // setSubItems("");
          } else {
            toast.error(data.message, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            return;
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
          return;
        });
    } catch (e) {
      // setError(e.message);
      toast.error(e.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div>
      <AdminNavBar></AdminNavBar>
      <ToastContainer />
      <form onSubmit={onsubmit} className="admin_item_form">
        <h2 className="admin_item_form-heading">Add Item</h2>
        <div className="admin_item_form-item">
          <label>Item Name</label>
          <br></br>
          <input
            type="text"
            placeholder="Item Name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </div>

        <div className="admin_item_form-item">
          <label>Cuisine Type</label>
          <br></br>
          <input
            type="text"
            placeholder="Cuisine Type"
            value={cuisineType}
            onChange={(e) => setCuisineType(e.target.value)}
          />
        </div>

        <div className="admin_item_form-item">
          <label>Session (BLD)</label>
          <br />
          <input
            className="form-check-input"
            type="checkbox"
            name="languages"
            value={b}
            onChange={() => {
              let val = b;
              setB(!val);
            }}
            id="flexCheckDefault1"
          />
          <label className="form-check-label" htmlFor="flexCheckDefault1">
            BreakFast
          </label>
          <input
            className="form-check-input"
            type="checkbox"
            name="languages"
            value={l}
            id="flexCheckDefault2"
            onChange={() => {
              let val = l;
              setL(!val);
            }}
          />
          <label className="form-check-label" htmlFor="flexCheckDefault2">
            Lunch
          </label>
          <input
            className="form-check-input"
            type="checkbox"
            name="languages"
            value={d}
            id="flexCheckDefault3"
            onChange={() => {
              let val = d;
              setD(!val);
            }}
            // onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="flexCheckDefault3">
            Dinner
          </label>
        </div>

        <div className="admin_item_form-item">
          <label>Price per Item</label>
          <br></br>
          <input
            type="Number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="admin_item_form-item">
          <label>Quantity</label>
          <br></br>
          <input
            type="Number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        <div className="admin_item_form-item">
          <label>Sub Items</label>
          <br></br>
          <input
            type="text"
            placeholder="Sub Items"
            onChange={(e) => setSubItems(e.target.value)}
            value={subItems}
          />
        </div>

        <div className="admin_item_form-item">
          <label>Ingredients</label>
          <br></br>
          <input
            type="text"
            placeholder="Ingredients"
            onChange={(e) => setIngredients(e.target.value)}
            value={ingredients}
          />
        </div>

        <div className="admin_item_form-item">
          <label>Image Url</label>
          <br></br>
          <input
            type="text"
            placeholder="Enter Image url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        <div className="admin_item_form-item">
          <label>Short Description</label>
          <br></br>
          <input
            type="text"
            placeholder="Short Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="admin_item_form-item">
          <label>Is Non-Veg?</label>
          <input
            className="form-check-input"
            type="checkbox"
            name="languages"
            value={nonVeg}
            id="flexCheckDefault4"
            onChange={() => {
              let val = nonVeg;
              setNonVeg(!val);
            }}
          />
        </div>

        <button /*onClick={onsubmit} */>submit</button>
      </form>
    </div>
  );
};

export default AdminAddItem;
