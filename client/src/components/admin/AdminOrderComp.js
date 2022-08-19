import React from "react";
import OrderItem from "../user/OrderItem";
function AdminOrderComp({ items }) {
  let amount = 0;
  for (let i = 0; i < items.length; i++) {
    amount += items[i].price * items[i].quantity;
  }
  return (
    <div className="order_history" key={`order-history-${items._id}`}>
      <h1>Items</h1>
      <div className="order_history_comp">
        {items.length !== 0 && (
          <div>
            <div className="order_item_heading">
              <h5>Name</h5>
              <h5>Price</h5>
              <h5>Quantity</h5>
              <h5>Total-Price</h5>
            </div>
          </div>
        )}
        {items.length !== 0 &&
          items.map((item, ind) => {
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

      <h4 className="orderhistory-totalcost">
        Total Amount collected : ₹ {amount}
      </h4>
    </div>
  );
}

export default AdminOrderComp;
