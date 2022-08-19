import "./ItemCard.css";
const ItemCard = ({ item, sesType, addtocart }) => {
  const nonveg = item.nonVeg;
  const fun1 = () => {
    const cItem = {
      itemno: item.itemno,
      quantity: 1,
    };

    addtocart(sesType, cItem);
  };

  return (
    <div
      className={`item ${nonveg ? "nv" : "v"}`}
      key={`${sesType}${item.itemno}`}
    >
      <img src={item.image} className="img"></img>
      <div className="data">
        <p className="name">{item.name}</p>
        <p className="type">{item.cuisineType}</p>
        <p className="desc">{item.shortDescription}</p>
        <div className="sameline" style={{ padding: "0px 0px" }}>
          <span className="price">Price : &#x20b9;{item.price}</span>
          <span className="quantity">quantity : {item.quantity} </span>
        </div>
      </div>
      <button className="button" onClick={fun1}>
        add to cart
      </button>
    </div>
  );
};

export default ItemCard;
