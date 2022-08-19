// const passport = require("passport");
// const User = require("../models/usermodel");

// passport.use(User.createStrategy());

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// exports.signup_post = function (req, res) {
//   // console.log(req.body);
//   const specialChar = "@*_#$&!%^+-?/><";
//   const password = req.body.password;
//   let a = 0,
//     b = 0,
//     c = 0,
//     d = 0;
//   for (var i = 0; i < password.length; i++) {
//     // console.log(password[i]);
//     if ("a" <= password[i] && password[i] <= "z") a++;
//     else if ("A" <= password[i] && password[i] <= "Z") b++;
//     else if ("0" <= password[i] && password[i] <= "9") c++;
//     if (specialChar.includes(password[i])) d++;
//   }

//   // res.send("Some thing went wrong");

//   if (password.length < 8 || a == 0 || b == 0 || c == 0 || d == 0) {
//     res.send("Check Password Validation");
//   } else {
//     // res.send("Ready to register");
//     User.register(
//       {
//         username: req.body.username,
//         name: req.body.name,
//         email: req.body.email,
//       },
//       password,
//       (err, user) => {
//         // console.log(err.message);
//         user = {
//           username: req.body.username,
//           name: req.body.name,
//           email: req.body.email,
//         };
//         if (err) {
//           console.log(err.message);
//           res.send(err.message);
//         } else {
//           // User.save();
//           passport.authenticate("local")(req, res, function () {
//             console.log(user, 101);
//             res.send("Iam Sreeshanth");
//           });
//         }
//         // console.log(user);
//       }
//     );
//     // User.register(
//     //   {
//     //     username: req.body.username,
//     //     name: req.body.name,
//     //     email: req.body.email,
//     //   },
//     //   password,
//     //   function (err, user) {
//     //     // console.log(user);
//     //     if (err) {
//     //       console.log(err.message);
//     //       res.send(err.message);
//     //     } else {
//     //       user.save();
//     //       // passport.authenticate('local')(req, res, function(){
//     //       //   res.send('Iam Sreeshanth');
//     //       // });
//     //       passport.authenticate("local")(req, res, function () {
//     //         console.log(user, 101);
//     //         res.send("Iam Sreeshanth");
//     //       });
//     //     }
//     //   }
//     // );
//   }
// };

// exports.login_post = async function (req, res) {
//   const user = new User({
//     username: req.body.username,
//     password: req.body.password,
//   });
//   console.log(user, "From request");
//   const user1 = await User.findOne({ username: req.body.username });
//   console.log(user1, "From database");
//   req.login(user, function (err) {
//     if (err) {
//       console.log(err.message);
//       res.send("Error in Login");
//     } else {
//       passport.authenticate("local")(req, res, function () {
//         // Catch the Unauthorized USER
//         res.send("Iam loginned!!!!");
//       });
//     }
//   });
// };

// exports.logout_post = function (req, res) {
//   req.logout();
//   res.send("You have been logged out");
// };

require("dotenv").config();
const User = require("../models/usermodel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { promisify } = require("util");
const { decode } = require("punycode");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.cookie("jwt", token);

  // Remove password from output
  user.password = undefined;

  res.send({
    message: "success",
    statusCode: 200,
    token,
    data: {
      user,
    },
  });
};

exports.signup_post = async function (req, res) {
  try {
    if (req.body.password.length < 8) {
      return res.send({
        statusCode: 400,
        message: "Password must have a size of atleast 8",
      });
    }
    const password = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      name: req.body.name,
      password: password,
    });

    // console.log(user);

    createSendToken(user, 201, res);
  } catch (e) {
    // console.log(e);
    res.send({
      statusCode: 400,
      message: e.message,
    });
  }
};

exports.login_post = async function (req, res) {
  // const user = {
  //   username: req.body.username,
  //   password: req.body.password,
  // };
  let user = await User.findOne({ username: req.body.username });
  if (!user) {
    user = await User.findOne({ email: req.body.username });
  }
  if (!user) {
    return res.send({
      statusCode: 401,
      message: "Incorrcet username or email",
    });
  }
  if ((await bcrypt.compare(req.body.password, user.password)) == false) {
    // return res.send("Succesfully logged in");
    return res.send({
      statusCode: 401,
      message: "Incorrect password",
    });
  }

  // console.log(process.env.JWT_SECRET);
  // const token = signToken(user._id);
  // console.log(token);
  createSendToken(user, 201, res);
  // return res.send("Succesfully logged in");
};

exports.protect = async function (req, res, next) {
  const jwt1 = req.headers.jwt || "";
  req.cookies.jwt = req.cookies.jwt || jwt1;

  if (req.cookies.jwt) {
    const decoded = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRET
    );
    const curruser = await User.findById(decoded.id);
    if (!curruser) {
      return res.send({
        statusCode: 401,
        message: "No such user found",
      });
    }

    next();
  } else {
    return res.send({
      statusCode: 401,
      message: "No user logged in",
    });
  }
};

exports.isLoggedIn = async function (req, res, next) {
  const jwt1 = req.headers.jwt || "";
  req.cookies.jwt = req.cookies.jwt || jwt1;
  if (req.cookies.jwt) {
    try {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );
      // console.log(decoded);

      const curruser = await User.findById(decoded.id);
      if (curruser) {
        return res.send({
          statusCode: 400,
          mesage: "Some user already loggied in",
        });
      }

      next();
    } catch (e) {
      return res.send({
        statusCode: 400,
        message: e.mesage,
      });
    }
  } else {
    next();
  }
};

exports.logout_post = function (req, res) {
  // if (req.cookies.jwt) {
  // }
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 10),
    httpOnly: true,
  });
  res.send({
    statusCode: 200,
    message: "You have been logged out succesfully",
  });
};

exports.changePassword_post = async function (req, res) {
  try {
    const { jwt1, currPassword, newPassword, confirmNewPassword } = req.body;

    if (newPassword !== confirmNewPassword) {
      return res.send({
        statusCode: 400,
        message: "New password and confirm New password are not same",
      });
    }

    const decoded = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRET
    );

    const curruser = await User.findById(decoded.id);
    if (!curruser) {
      return res.send({
        statusCode: 400,
        message: "No such user exists",
      });
    }

    if ((await bcrypt.compare(currPassword, curruser.password)) === false) {
      return res.send({
        statusCode: 400,
        message: "Incorrect Current Password",
      });
    }
    const password = await bcrypt.hash(newPassword, 10);
    curruser.password = password;
    res.send({
      statusCode: 200,
      message: "Password changed succesfully",
    });
    await curruser.save();
  } catch (e) {
    return res.send({
      statusCode: 200,
      message: e.mesage,
    });
  }
};
