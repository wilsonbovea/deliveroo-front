const Hero = ({
  nameRest,
  descriptionRest,
  pictureRest,
  className1,
  className2,
  className3,
  className4,
  className5,
  className6,
}) => {
  return (
    <section className={className1}>
      <div className={className2}>
        <div className={className3}>
          <div className={className4}>
            <h1>{nameRest}</h1>
            <p>{descriptionRest}</p>
          </div>
          <div className={className5}>
            {
              <img
                className={className6}
                src={pictureRest}
                alt="image table restaurant"
              />
            }
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
