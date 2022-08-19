const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const AdminOrder = require("./../models/adminordersmodel");
const Item = require("./../models/itemmodel");
exports.orders_get = async function (req, res) {
  try {
    const ordersarr = await AdminOrder.find();
    const orders = ordersarr[0];
    res.send({
      statusCode: 200,
      orders: orders,
    });
  } catch (e) {
    res.send({
      statusCode: 400,
      message: e.message,
    });
  }
};

exports.home_get = async (req, res) => {
  try {
    const allitems = await Item.find();

    return res.send({
      statusCode: 200,
      allitems: allitems,
    });
  } catch {
    return res.send({
      statusCode: 400,
      message: e.message,
    });
  }
};
