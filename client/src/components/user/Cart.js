import React from "react";
import "./UserItem.js";
import CartItem from "./CartItem.js";
import Cookies from "universal-cookie";
import "./Cart.css";
import { useState, useEffect } from "react";

function Cart({
  allItems,
  breakfast,
  lunch,
  dinner,
  add,
  sub,
  placeorder,
  changeToggle,
}) {
  const cookies = new Cookies();
  const jwt = cookies.get("jwt");

  return (
    <div>
      <div
        style={{ fontFamily: "Montserrat, sansSerif" }}
        className="cart-dropdown"
      >
        <h1>BreakFast</h1>
        {/* {breakfast && <p>{breakfast}</p>} */}
        {breakfast &&
          breakfast.map((item) => {
            var index = allItems.length + 10;
            for (let i = 0; i < allItems.length; i++) {
              if (allItems[i].itemno === item.itemno) {
                index = i;
                break;
              }
            }
            if (index < allItems.length) {
              return (
                <CartItem
                  item={allItems[index]}
                  cItem={item}
                  key={`cart-1-${item.itemno}`}
                  add={add}
                  sestype="100"
                  sub={sub}
                ></CartItem>
              );
            }
          })}
        <h1>Lunch</h1>
        {lunch &&
          lunch.map((item) => {
            var index = allItems.length + 10;
            for (let i = 0; i < allItems.length; i++) {
              if (allItems[i].itemno === item.itemno) {
                index = i;
                break;
              }
            }
            if (index < allItems.length) {
              return (
                <CartItem
                  item={allItems[index]}
                  cItem={item}
                  key={`cart-2-${item.itemno}`}
                  add={add}
                  sub={sub}
                  sestype="010"
                ></CartItem>
              );
            }
          })}
        <h1>Dinner</h1>
        {dinner &&
          dinner.map((item) => {
            var index = allItems.length + 10;
            for (let i = 0; i < allItems.length; i++) {
              if (allItems[i].itemno === item.itemno) {
                index = i;
                break;
              }
            }
            if (index < allItems.length) {
              return (
                <CartItem
                  item={allItems[index]}
                  cItem={item}
                  key={`cart-3-${item.itemno}`}
                  add={add}
                  sub={sub}
                  sestype="001"
                ></CartItem>
              );
            }
          })}
      </div>
      <div className="cart--button">
        <button className="cart-button" onClick={placeorder}>
          Place Order!
        </button>
      </div>
    </div>
  );
}

export default Cart;
