const Order = require("./../models/ordermodel");
const User = require("./../models/usermodel");
const Cart = require("./../models/cartmodel");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const AdminOrder = require("./../models/adminordersmodel");
const Item = require("./../models/itemmodel");

exports.order_post = async function (req, res, next) {
  try {
    const cookie = req.cookies.jwt;
    const decoded = await promisify(jwt.verify)(cookie, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    const itemsdb = await Item.find();

    const cartarr = await Cart.find({ userId: decoded.id });
    const cart = cartarr[0];

    let b = cart.breakfast;
    let l = cart.lunch;
    let d = cart.dinner;
    let breakfast = [],
      lunch = [],
      dinner = [];

    for (let i = 0; i < b.length; i++) {
      for (let j = 0; j < itemsdb.length; j++) {
        if (b[i].itemno === itemsdb[j].itemno) {
          let val = {
            itemno: b[i].itemno,
            quantity: b[i].quantity,
            itemname: itemsdb[j].name,
            price: itemsdb[j].price,
          };
          breakfast.push(val);
          break;
        }
      }
    }

    for (let i = 0; i < l.length; i++) {
      for (let j = 0; j < itemsdb.length; j++) {
        if (l[i].itemno === itemsdb[j].itemno) {
          let val = {
            itemno: l[i].itemno,
            quantity: l[i].quantity,
            itemname: itemsdb[j].name,
            price: itemsdb[j].price,
          };
          lunch.push(val);
          break;
        }
      }
    }

    for (let i = 0; i < d.length; i++) {
      for (let j = 0; j < itemsdb.length; j++) {
        if (d[i].itemno === itemsdb[j].itemno) {
          let val = {
            itemno: d[i].itemno,
            quantity: d[i].quantity,
            itemname: itemsdb[j].name,
            price: itemsdb[j].price,
          };
          dinner.push(val);
        }
      }
    }

    const items = [...breakfast, ...lunch, ...dinner];

    if (items.length == 0) {
      return res.send({
        statusCode: 400,
        message: "Your Cart is Empty",
      });
    }

    let cost = 0;
    for (let i = 0; i < items.length; i++) {
      let no = items[i].itemno;
      for (let j = 0; j < itemsdb.length; j++) {
        if (no === itemsdb[j].itemno) {
          cost += items[i].quantity * itemsdb[j].price;
          break;
        }
      }
    }
    if (cost > user.walletMoney) {
      return res.send({
        statusCode: 402,
        message: "Insufficient funds",
      });
    }

    const adminorderarr = await AdminOrder.find();
    let adminorder = adminorderarr[0];
    if (!adminorder) {
      adminorder = await AdminOrder.create({});
    }

    for (let i = 0; i < items.length; i++) {
      let no = items[i].itemno;
      let index = -1;
      for (let j = 0; j < adminorder.items.length; j++) {
        if (no == adminorder.items[j].itemno) {
          index = j;
          break;
        }
      }
      if (index != -1) {
        adminorder.items[index].quantity += items[i].quantity;
      } else {
        console.log(items[i]);
        adminorder.items.push(items[i]);
      }
    }
    user.walletMoney -= cost;
    await user.save();
    await adminorder.save();

    const order = await Order.create({
      userId: decoded.id,
      breakfast: breakfast,
      lunch: lunch,
      dinner: dinner,
      total_cost: cost,
    });
    // console.log(Date.now());
    cart.breakfast = [];
    cart.lunch = [];
    cart.dinner = [];
    // console.log(cart);
    await cart.save();

    return res.send({
      statusCode: 200,
      message: "Order posted succesfully",
    });
  } catch (e) {
    return res.send({
      statusCode: 400,
      message: e.message,
    });
  }
};

exports.order_get = async function (req, res) {
  try {
    const cookie = req.cookies.jwt;
    const decoded = await promisify(jwt.verify)(cookie, process.env.JWT_SECRET);

    const orderHistory = await Order.find({ userId: decoded.id });
    return res.send({
      statusCode: 200,
      size: orderHistory.length,
      data: {
        orderHistory,
      },
    });
  } catch (e) {
    res.send({
      statusCode: 400,
      message: e.message,
    });
  }
};
