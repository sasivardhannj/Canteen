import React from "react";
import Cookies from "universal-cookie";
import { useState, useEffect } from "react";
import "./CartItem.css";

function CartItem({ sestype, item, cItem, add, sub }) {
  const fun1 = () => {
    add(sestype, cItem);
  };
  const fun2 = () => {
    sub(sestype, cItem);
  };
  return (
    <div className={`card-shanu ${item.nonVeg === true ? "nonveg" : "veg"}`}>
      <div className="card-data">
        <h3 className="card-name">{item.name}</h3>
        <div className="card-sameline" style={{ padding: "0px 0px" }}>
          <span className="card-price">&#x20b9;{item.price} </span>
          <button className="shanu btn-sub" onClick={fun2}>
            -
          </button>
          <span className="card-quantity">✖ {cItem.quantity} </span>
          <button className="shanu btn-add" onClick={fun1}>
            +
          </button>
        </div>
      </div>
      {/* <button className="button">add to cart</button> */}
    </div>
  );
}

export default CartItem;
