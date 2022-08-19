const Cart = require("../models/cartmodel");
const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");
const { promisify } = require("util");

exports.cart_post = async function (req, res) {
  try {
    const cookie = req.cookies.jwt;
    const decoded = await promisify(jwt.verify)(cookie, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    let Breakfast = req.body.breakfast;
    let Lunch = req.body.lunch;
    let Dinner = req.body.dinner;

    let cart = await Cart.find({ userId: decoded.id });

    if (cart.length === 0) {
      cart = await Cart.create({
        userId: user._id,
      });
      console.log(cart, "Zero Cart");
    } else {
      cart = cart[0];
    }
    cart.breakfast = Breakfast;
    cart.lunch = Lunch;
    cart.dinner = Dinner;
    await cart.save();
    // // if !cart) {

    return res.send({
      statusCode: 200,
      message: "Cart Updated",
    });
  } catch (e) {
    return res.send({
      statusCode: 400,
      message: e.message,
    });
  }
};

exports.cart_get = async function (req, res) {
  try {
    const cookie = req.cookies.jwt;
    const decoded = await promisify(jwt.verify)(cookie, process.env.JWT_SECRET);

    let cart = await Cart.find({ userId: decoded.id });

    cart = cart[0];

    res.send({
      statusCode: 200,
      cart: cart,
    });
  } catch (e) {
    return res.send({
      statusCode: 400,
      message: "Some thing went wrong",
    });
  }
};
