import React from "react";
import "./OrderItem.css";

function OrderItem({ item }) {
  return (
    <div className="order_item">
      <h5>{item.itemname}</h5>
      <h5> ₹{item.price}</h5>
      <h5>x{item.quantity}</h5>
      <h5>₹{item.price * item.quantity}</h5>
    </div>
  );
}

export default OrderItem;
