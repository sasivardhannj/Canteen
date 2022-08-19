const express = require("express");
const User = require("../models/usermodel");
const authController = require("../controllers/authcontroller");
const userController = require("./../controllers/usercontroller");
const cartController = require("../controllers/cartcontroller");
const orderController = require("./../controllers/ordercontroller");
// const ordercontroller = require("./../controllers/ordercontroller");
const router = express.Router();

router.post("/signup", authController.isLoggedIn, authController.signup_post);
router.post("/login", authController.isLoggedIn, authController.login_post);
router.get("/logout", authController.logout_post);
router.get("/allitems", authController.protect, userController.allItems_get);
router.get("/", authController.protect, userController.home_get);

router.get("/mycart", authController.protect, cartController.cart_get);
router.post("/mycart", authController.protect, cartController.cart_post);

router.post("/myorder", authController.protect, orderController.order_post);
router.get("/myorders", authController.protect, orderController.order_get);
router.get("/profile", authController.protect, userController.profile_get);

router.post(
  "/addmoneytowallet",
  authController.protect,
  userController.addmoneytowallet_post
);
router.post(
  "/updatewalletmoney",
  authController.protect,
  userController.updatewalletmoney_post
);
router.post(
  "/changepassword",
  authController.protect,
  authController.changePassword_post
);

module.exports = router;
