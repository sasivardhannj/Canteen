const Item = require("./../models/itemmodel");

exports.post_item = async function (req, res) {
  try {
    let noofitems = await Item.find();
    let val =
      noofitems.length === 0 ? 1 : noofitems[noofitems.length - 1].itemno + 1;
    // console.log(req.body.image);
    const item = await Item.create({
      name: req.body.name,
      itemno: val,
      cuisineType: req.body.cuisineType,
      ingredients: req.body.ingredients,
      shortDescription: req.body.shortDescription,
      image: req.body.image,
      bld: req.body.bld,
      quantity: Number(req.body.quantity),
      price: Number(req.body.price),
      isAvailable: false,
      nonVeg: req.body.nonVeg,
      subItems: req.body.subItems,
    });
    console.log(item, "Saved Item");
    res.send({ statusCode: 200, message: "Item saved Succesfully" });
  } catch (e) {
    // res.send('Sreeshanth')
    res.send({ statusCode: 400, message: e.message });
  }
};

exports.update_menu = async function (req, res) {
  try {
    const itemno = req.body.itemno;
    let item = await Item.find({ itemno: itemno });
    item = item[0];

    let val = !item.isAvailable;
    let val1 = await Item.findOneAndUpdate(
      { itemno: itemno },
      { isAvailable: val }
    );

    res.send({
      statusCode: 200,
      message: `Items Marked as ${val === true ? "Available" : "Un Available"}`,
    });
  } catch (e) {
    return res.send({
      statusCode: 400,
      message: e.message,
    });
  }
};
