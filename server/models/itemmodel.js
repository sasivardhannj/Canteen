const { Decimal128 } = require("bson");
const mongoose = require("mongoose");
// var imageSchema = new mongoose.Schema({
//   name: String,
//   desc: String,
//   img:
//   {
//       data: Buffer,
//       contentType: String
//   }
// });

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  itemno: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  ingredients: [
    {
      type: String,
      required: true,
    },
  ],
  cuisineType: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    deafult: "None",
  },
  bld: {
    type: String,
    enum: ["001", "010", "100", "110", "101", "011", "111"],
    required: true,
    minlength: 3,
    maxlength: 3,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  isSpecial: {
    type: Boolean,
    default: false,
  },
  nonVeg: {
    type: Boolean,
    default: false,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    required: true,
  },
  subItems: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("Item", itemSchema);

// const fun = async function () {
//   try {
//     console.log("Hi");
//     const ing = ["atta", "water"];
//     const item = await Item.create({
//       name: "chapathi",
//       ingredients: ing,
//       image: {},
//       cuisineType: "Indian",
//       bld: "111",
//       price: 30,
//       quantity: 2,
//     });

//     //   await item.save();
//     console.log(item);
//   } catch (e) {
//     console.log(e.message);
//   }
// };

// fun();
