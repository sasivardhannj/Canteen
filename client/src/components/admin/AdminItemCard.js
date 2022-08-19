import "./AdminItemCard.css";
import Cookies from "universal-cookie";
const AdminAddItem = ({ item, updateItem }) => {
  const cookies = new Cookies();
  const jwt = cookies.get("jwt");
  const fun1 = () => {
    updateItem(item.itemno);
  };
  return (
    <div className={`item ${item.nonVeg ? "nv" : "v"}`} key={`${item.itemno}`}>
      <img src={item.image} alt={item.name} className="img"></img>
      <div className="data">
        <p className="name">{item.name}</p>
        <p className="type">{item.cuisineType}</p>
        <p className="desc">{item.shortDescription}</p>
        <div className="sameline" style={{ padding: "0px 0px" }}>
          <span className="price">Price : &#x20b9;{item.price}</span>
          <span className="quantity">quantity : {item.quantity} </span>
        </div>
      </div>
      <button
        className={`button ${item.isAvailable === true ? "n-a" : "a"}`}
        onClick={fun1}
      >
        {item.isAvailable === true ? "Mark Un Avilable" : "Mark Avilable"}
      </button>
    </div>
  );
};

export default AdminAddItem;
