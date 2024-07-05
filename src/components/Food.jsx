const Food = ({ key, className1, className2, title, price }) => {
  return (
    <div className={className1}>
      <span className={className2}>{title}</span>
      <span>{price}</span>
    </div>
  );
};
export default Food;
