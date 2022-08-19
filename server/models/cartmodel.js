const mongoose = require("mongoose");
const User = require("./usermodel");
const Item = require("./itemmodel");

const itemDetailSchema = new mongoose.Schema({
  // default: [],
  itemno: {
    type: Number,
    // ref: "Item",
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  // session:{
  //   type: String,
  //   enum: ["B", "L", "D"],
  //   required: true,
  //   minlength: 1,
  //   maxlength: 1,
  // }
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  breakfast: {
    type: [itemDetailSchema],
    default: [],
  },
  lunch: {
    type: [itemDetailSchema],
    default: [],
  },
  dinner: {
    type: [itemDetailSchema],
    default: [],
  },
  // lunch: [itemDetailSchema],
  // dinner: [itemDetailSchema],
});

// cartSchema.virtual("orderPrice", function () {
//   const items = this.items;
//   let price = 0;
//   for (let i = 0; i < items.length; i++) {
//     const item = Item.findById(items[i].itemId);
//     price = item.price * items[i].quantity;
//   }
//   return price;
// });

module.exports = mongoose.model("Cart", cartSchema);

// const fun2 = async function () {
//   try {
//     const user = await User.findOne({ name: "Nandan" });
//     const item1 = await Item.findOne({ name: "chapathi" });
//     const item2 = await Item.create({
//       name: "Dosa",
//       ingredients: ["rice", "water", "dal"],
//       cuisineType: "South Indain",
//       bld: "100",
//       price: 25,
//       quantity: 1,
//     });
//     // console.log(user);
//     // console.log(item1);
//     // console.log(item2);

//     const cart = await Cart.create({
//       userId: user._id,
//       items: [
//         {
//           itemId: item1._id,
//           quantity: 1,
//         },
//         {
//           itemId: item2._id,
//           quantity: 3,
//         },
//       ],
//     });
//     console.log(cart);
//   } catch (e) {
//     console.log(e.message);
//   }
// };

// fun2();
