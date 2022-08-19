const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
// const { Decimal128 } = require("bson");
const mongoose = require("mongoose");
const Cart = require("./cartmodel");

const validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = new mongoose.Schema({
  //   userNo: {
  //     type: Number,
  //   },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  username: {
    //regno
    type: String,
    required: true,
    minlength: 8,
    maxlength: 8,
    unique: true,
    // required: function () {
    //   // console.log(this.regno.includes("U"));
    //   return this.regno.includes("U");
    // },
  },
  // profilePhoto: {
  //   data: Buffer,
  //   contentType: String,
  // },
  password: {
    type: String,
    minlength: 8,
    required: true,
  },
  walletMoney: {
    type: Number,
    default: 0,
  },
  // cartId: {
  //   type: mongoose.SchemaTypes.ObjectId,
  //   ref: "Cart",
  //   required: true,
  // },
});

userSchema.path("username").validate(function (v) {
  return v.includes("U");
}, "Incorrect Registration Number");

// Creating a cart to bind to a particular user
// userSchema.pre("save", function (next) {
//   // console.log("It going through Pre");
//   console.log({ this->name,this.regno, this.email });
//   next();
// });

// userSchema.pre("save", function (next) {
//   try {
//     if (this.Password.length < 8) {
//       throw new Error("Password must be atleast 8 charecters");
//     }
//   } catch (e) {

//   }
//   next();
// });

// userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);

// const fun1 = async function () {
//   try {
//     const user = await User.create({
//       name: "Nandan",
//       email: "nandanreddy83672@gmail.com",
//       regno: "19U10527",
//       password: "ashjgsdgdfgdfgreteewchasfg",
//     });
//     const cart = await Cart.create({
//       userId: user._id,
//     });
//     console.log(user);
//     console.log(cart);
//   } catch (e) {
//     console.log(e.message);
//   }
// };

// fun1();
