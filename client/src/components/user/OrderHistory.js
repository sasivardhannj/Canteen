import React from "react";
import OrderItem from "./OrderItem.js";
import "./OrderItem.css";

function OrderHistory({ orderItem, ind }) {
  var breakfast = orderItem.breakfast;
  var lunch = orderItem.lunch;
  var dinner = orderItem.dinner;

  let d = orderItem.placedTime.split("T")[0];
  d = d.split("-");
  let dat = new Date(Number(d[0]), Number(d[1]) - 1, Number(d[2]));
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let date = dat.getDate();
  let month = months[dat.getMonth()];
  let year = dat.getFullYear();
  let day = days[dat.getDay()];

  return (
    <div
      className="order_history"
      key={`order-history-${ind}-${orderItem._id}`}
    >
      <h1>
        {month} {date} {year}
      </h1>
      <div className="order_history_comp">
        {breakfast.length !== 0 && (
          <div>
            <h2>BreakFast</h2>
            <div className="order_item_heading">
              <h5>Name</h5>
              <h5>Price</h5>
              <h5>Quantity</h5>
              <h5>Total-Price</h5>
            </div>
          </div>
        )}
        {breakfast.length !== 0 &&
          breakfast.map((item) => {
            return (
              <div>
                <OrderItem
                  item={item}
                  key={`order-item-1-${ind}-${item._id}`}
                ></OrderItem>
              </div>
            );
          })}
      </div>
      <div className="order_history_comp">
        {lunch.length !== 0 && (
          <div>
            <h2>Lunch</h2>
            <div className="order_item_heading">
              <h5>Name</h5>
              <h5>Price</h5>
              <h5>Quantity</h5>
              <h5>Total-Price</h5>
            </div>
          </div>
        )}
        {lunch.length !== 0 &&
          lunch.map((item) => {
            return (
              <div>
                <OrderItem
                  //   item={allItems[index]}
                  item={item}
                  key={`order-item-2-${ind}-${item._id}`}
                ></OrderItem>
              </div>
            );
          })}
      </div>
      <div className="order_history_comp">
        {dinner.length !== 0 && (
          <div>
            <h2>Dinner</h2>
            <div className="order_item_heading">
              <h5>Name</h5>
              <h5>Price</h5>
              <h5>Quantity</h5>
              <h5>Total-Price</h5>
            </div>
          </div>
        )}
        {dinner.length !== 0 &&
          dinner.map((item) => {
            return (
              <div>
                <OrderItem
                  item={item}
                  key={`order-item-3-${ind}-${item._id}`}
                ></OrderItem>
              </div>
            );
          })}
      </div>
      <h4 className="orderhistory-totalcost">
        Total Cost : ₹ {orderItem.total_cost}
      </h4>
    </div>
  );
}

export default OrderHistory;
