const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const mongoose = require("mongoose");
const res = require("express/lib/response");

const validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};


const adminUserSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Admin",
  },
  username: { //email
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
  password: {
    type: String,
    required: true,
  },
});

// adminUserSchema.pre("save", function (next) {
//   try {
    
//     if (!this.username.includes('admin')) {
//       console.log(this.username);
//       res.send("Your are not allowed to be Admin, please signin as User");
//       // throw new Error(" Your are not allowed to be Admin, please signin as User");
//     }
//   } catch (e) {
//     console.log(e.message);
//     // return res.send(e.message);
//   }
//   next();
// });


adminUserSchema.plugin(passportLocalMongoose);


module.exports = mongoose.model("AdminUser", adminUserSchema);


// const fun3 = async function () {
//   try {
//     const adminuser = await AdminUser.create({
//       email: "admin12@gmail.com",
//       password: "Canteen@123",
//     });
//     console.log(adminuser);
//   } catch (e) {
//     console.log(e.message);
//   }
// };

// fun3();