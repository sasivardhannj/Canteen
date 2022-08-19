import ItemCard from "./ItemCard";
const Session = ({ items, sesType }) => {
  return items.map((item) => {
    return (
      <ItemCard
        item={item}
        sesType={sesType}
        key={`${sesType}${item.itemno}`}
      ></ItemCard>
    );
  });
};

export default Session;
