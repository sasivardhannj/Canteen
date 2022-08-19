const mongoose = require("mongoose");
const Item = require("./itemmodel");

const itemDetailSchema = new mongoose.Schema({
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

const adminViewOrderSchema = new mongoose.Schema({
  items: {
    type: [itemDetailSchema],
    default: [],
  },
});

adminViewOrderSchema.virtual("amountCollected").get(async function () {
  const items = this.items;
  let amount = 0;
  for (let i = 0; i < items.length; i++) {
    const item = await Item.findOne({ itemno: items[i].itemno });
    amount += item.price * items[i].quantity;
  }

  return amount;
});

module.exports = mongoose.model("AdminViewOrder", adminViewOrderSchema);

// const fun4 = async function () {
//   try {
//     const item1 = await Item.findOne({ name: "Dosa" });
//     const item2 = await Item.findOne({ name: "chapathi" });
//     const adminorder = await AdminOrder.create({
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
//     console.log(adminorder);
//     console.log(await adminorder.amountCollected);
//   } catch (e) {
//     console.log(e.message);
//   }
// };

// fun4();
