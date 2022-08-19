// const User = require("../models/adminusermodel");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const { promisify } = require("util");

// const signToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRES_IN,
//   });
// };

// const createSendToken = (user, statusCode, res) => {
//   const token = signToken(user._id);

//   let val1 = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
//   let val2 = val1.getTime();

//   const cookieOptions = {
//     Max_Age: 21474836482139,
//     httpOnly: true,
//   };

//   res.cookie("jwt", token, cookieOptions);

//   // Remove password from output
//   user.password = undefined;

//   res.status(statusCode).json({
//     statusCode: 201,
//     token,
//     data: {
//       user,
//     },
//   });
// };

// exports.signup_post = async function (req, res) {
//   try {
//     if (req.body.password.length < 8) {
//       return res.send({
//         statusCode: 400,
//         mesage: "Password must have a size of atleast 8",
//       });
//     }
//     const password = await bcrypt.hash(req.body.password, 10);
//     const user = await User.create({
//       username: req.body.username,
//       name: req.body.name,
//       password: password,
//     });
//     console.log(user);

//     createSendToken(user, 201, res);
//   } catch (e) {
//     res.send({
//       statusCode: 400,
//       message: e.message,
//     });
//   }
// };

// exports.login_post = async function (req, res) {
//   let user = await User.findOne({ username: req.body.username });

//   if (!user) {
//     return res.send({
//       statusCode: 401,
//       message: "Incorrcet username or email",
//     });
//   }
//   if ((await bcrypt.compare(req.body.password, user.password)) == false) {
//     return res.send({
//       statusCode: 401,
//       message: "Incorrect password",
//     });
//   }

//   createSendToken(user, 201, res);
// };

// exports.protect = async function (req, res, next) {
//   const jwt1 = req.headers.jwt || "";
//   req.cookies.jwt = req.cookies.jwt || jwt1;

//   if (req.cookies.jwt) {
//     const decoded = await promisify(jwt.verify)(
//       req.cookies.jwt,
//       process.env.JWT_SECRET
//     );

//     const val = await User.find();

//     const adminuser = await User.findById(decoded.id);

//     if (!adminuser) {
//       return res.send({
//         statusCode: 401,
//         message: "No Admin exists with admin Id",
//       });
//     }
//     next();
//   } else {
//     return res.send({
//       statusCode: 401,
//       message: "Your are not logged in as Admin",
//     });
//   }
// };

// exports.isLoggedIn = async function (req, res, next) {
//   if (req.cookies.jwt) {
//     try {
//       const decoded = await promisify(jwt.verify)(
//         req.cookies.jwt,
//         process.env.JWT_SECRET
//       );
//       console.log(decoded);

//       const curruser = await User.findById(decoded.id);
//       if (curruser) {
//         return res.send({
//           statusCode: 400,
//           mesage: "Some admin already loggied in",
//         });
//       }

//       next();
//     } catch (e) {
//       return res.send({
//         statusCode: 400,
//         message: e.mesage,
//       });
//     }
//   } else {
//     // res.send("No user logged in");
//     next();
//   }
// };

// exports.logout_post = function (req, res) {
//   res.cookie("jwt", "loggedout", {
//     expires: new Date(Date.now() + 10 * 10),
//     httpOnly: true,
//   });
//   res.send({
//     statusCode: 200,
//     message: "you has been logged out succesfully",
//   });
// };

const User = require("../models/adminusermodel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { promisify } = require("util");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  let val1 = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  let val2 = val1.getTime();

  const cookieOptions = {
    Max_Age: 21474836482139,
    httpOnly: true,
  };

  res.cookie("jwt", token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    statusCode: 201,
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
        mesage: "Password must have a size of atleast 8",
      });
    }
    const password = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      username: req.body.username,
      name: req.body.name,
      password: password,
    });
    console.log(user);

    createSendToken(user, 201, res);
  } catch (e) {
    res.send({
      statusCode: 400,
      message: e.message,
    });
  }
};

exports.login_post = async function (req, res) {
  let user = await User.findOne({ username: req.body.username });

  if (!user) {
    return res.send({
      statusCode: 401,
      message: "Incorrcet username or email",
    });
  }
  if ((await bcrypt.compare(req.body.password, user.password)) == false) {
    return res.send({
      statusCode: 401,
      message: "Incorrect password",
    });
  }

  createSendToken(user, 201, res);
};

exports.protect = async function (req, res, next) {
  const jwt1 = req.headers.jwt || "";
  req.cookies.jwt = req.cookies.jwt || jwt1;
  // console.log('Hello', req.cookies);
  if (req.cookies.jwt) {
    const decoded = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRET
    );

    const val = await User.find();

    const adminuser = await User.findById(decoded.id);
    // console.log(adminuser);
    if (!adminuser) {
      return res.send({
        statusCode: 401,
        message: "No Admin exists with admin Id",
      });
    }
    next();
  } else {
    return res.send({
      statusCode: 401,
      message: "Your are not logged in as Admin",
    });
  }
};

exports.isLoggedIn = async function (req, res, next) {
  if (req.cookies.jwt) {
    try {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );
      console.log(decoded);

      const curruser = await User.findById(decoded.id);
      if (curruser) {
        return res.send({
          statusCode: 400,
          mesage: "Some admin already loggied in",
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
    // res.send("No user logged in");
    next();
  }
};

exports.logout_post = function (req, res) {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 10),
    httpOnly: true,
  });
  res.send({
    statusCode: 200,
    message: "you has been logged out succesfully",
  });
};
