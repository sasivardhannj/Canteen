const Order = require("./../models/ordermodel");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("./../models/usermodel");
const Item = require("./../models/itemmodel");
const Cart = require("./../models/cartmodel");
const stripe = require("stripe")(process.env.STRIPE_KEY);
const res = require("express/lib/response");
const req = require("express/lib/request");
const uuid = require("uuid");

exports.profile_get = async function (req, res) {
  try {
    const decoded = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRET
    );
    const curruser = await User.findById(decoded.id);
    const user = {
      name: curruser.name,
      username: curruser.username,
      email: curruser.email,
      walletMoney: curruser.walletMoney,
    };
    res.send({
      statusCode: 200,
      details: {
        user,
      },
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
    const decoded = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRET
    );
    const curruser = await User.findById(decoded.id);
    const userdata = {
      name: curruser.name,
      username: curruser.username,
      email: curruser.email,
      walletMoney: curruser.walletMoney,
    };
    const itemdata = await Item.find({ isAvailable: true });
    // // console.log(itemdata);
    // let items = [];
    // for (let i = 0; itemsdata.length; i++) {
    //   if (itemsdata[i].isAvailable === true) {
    //     items.push(itemsdata[i]);
    //   }
    // }

    const cartdata = await Cart.find({ userId: decoded.id });
    res.send({
      statusCode: 200,
      userdata: userdata,
      cartdata: cartdata,
      itemdata: itemdata,
    });
  } catch (e) {
    res.send({
      statusCode: 400,
      message: e.message,
    });
  }
};

exports.allItems_get = async (req, res) => {
  try {
    const itemdata = await Item.find({ isAvailable: true });
    res.send({
      statusCode: 200,
      data: itemdata,
    });
  } catch (e) {
    res.send({
      statusCode: 400,
      message: "Some thing went wrong",
    });
  }
};

// exports.addmoneytowallet_post = async (req, res) => {
//   try {
//     const decoded = await promisify(jwt.verify)(
//       req.cookies.jwt,
//       process.env.JWT_SECRET
//     );
//     const curruser = await User.findById(decoded.id);
//     const successUrl = "http://localhost:3000/user/";
//     const failureUrl = "http://localhost:3000/user/profile";
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       mode: "payment",
//       customer_email: curruser.email,
//       line_items: [
//         {
//           price_data: {
//             currency: "inr",
//             product_data: {
//               name: "Add Money to Wallet",
//             },
//             unit_amount: Number(req.body.amount),
//           },
//           quantity: 1,
//         },
//       ],
//       success_url: successUrl,
//       cancel_url: failureUrl,
//     });
//     // console.log(session.success_url, "Success url");
//     console.log(session);
//     res.send({
//       statusCode: 200,
//       url: session.url,
//     });
//   } catch (e) {
//     res.send({
//       statusCode: 500,
//       message: e.message,
//     });
//   }
// };

exports.addmoneytowallet_post = async (req, res) => {
  console.log("Request : ", req.body);
  let status, error;
  try {
    const { product, token } = req.body;
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const idepotency_key = uuid();
    const charge = await stripe.charge.create(
      {
        amount: product.price * 100,
        currency: "inr",
        customer: customer.id,
        receipt_email: token.email,
        description: "Add money to wallet",
      },
      {
        idepotency_key,
      }
    );
    // console.log("Charge : ", { charge });
    status = "success";
    res.send({
      statusCode: 200,
      status: "success",
    });
  } catch (e) {
    res.send({
      statusCode: 200,
      status: "success",
    });
  }
};

exports.updatewalletmoney_post = async (req, res) => {
  try {
    const decoded = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRET
    );
    const curruser = await User.findById(decoded.id);
    const userdata = {
      name: curruser.name,
      username: curruser.username,
      email: curruser.email,
      walletMoney: curruser.walletMoney,
    };
    curruser.walletMoney = curruser.walletMoney + req.body.amount;
    await curruser.save();
    res.send({
      statusCode: 200,
      message: "Money added to wallet succesfully",
    });
  } catch (e) {
    res.send({
      statuscode: 400,
      message: e.message,
    });
  }
};
