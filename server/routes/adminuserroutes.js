const express = require("express");
// const HouseModel = require("../../web_dev/Shan1/Shan/models/house");
const User = require("../models/adminusermodel");
const adminauthController = require("../controllers/adminauthcontroller");
const itemCotroller = require("./../controllers/itemcontroller");
const { authenticate } = require("passport/lib");
const adminController = require("./../controllers/admincontroller.js");

const router = express.Router();

router.get("/", adminauthController.protect, adminController.home_get);

router.post(
  "/signup",
  adminauthController.isLoggedIn,
  adminauthController.signup_post
);
router.post(
  "/login",
  adminauthController.isLoggedIn,
  adminauthController.login_post
);

router.get("/logout", adminauthController.logout_post);
router.post("/additem", adminauthController.protect, itemCotroller.post_item);
router.post(
  "/updatemenu",
  adminauthController.protect,
  itemCotroller.update_menu
);

router.get("/orders", adminauthController.protect, adminController.orders_get);

module.exports = router;
