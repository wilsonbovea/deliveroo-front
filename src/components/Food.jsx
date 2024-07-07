const Food = ({ quantity, className1, className2, title, price }) => {
  const newPrice = price.replace(" €", "");
  console.log(quantity);
  const priceResult = parseFloat(newPrice) * quantity;

  return (
    <div className={className1}>
      <span className={className2}>{title}</span>
      <span>{priceResult.toFixed(2).replace(".", ",") + " €"}</span>
    </div>
  );
};
export default Food;
