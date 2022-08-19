const mongoose = require("mongoose");
const User = require("./usermodel");
const Item = require("./itemmodel");
const sessionItem = new mongoose.Schema({
  itemno: {
    type: Number,
    required: true,
  },
  itemname: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  placedTime: {
    type: Date,
    default: Date.now(),
  },
  breakfast: [sessionItem],
  lunch: [sessionItem],
  dinner: [sessionItem],
  suggestions: {
    type: String,
    enum: ["Normal", "Spicy", "Sugar Free"],
    default: "Normal",
  },
  total_cost: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Order", orderSchema);

// const fun5 = async function () {
//   try {
//     const user = await User.findOne({ name: "Nandan" });
//     const item1 = await Item.findOne({ name: "Dosa" });
//     const item2 = await Item.findOne({ name: "chapathi" });
//     const order = await Order.create({
//       userId: user._id,
//       breakfast: [{ itemId: item1._id }, { itemId: item2._id }],
//       lunch: [{ itemId: item2._id }],
//       dinner: [{ itemId: item2._id }],
//       suggestions: "Spicy",
//     });
//     console.log(order);
//   } catch (e) {
//     console.log(e.message);
//   }
// };

// fun5();
