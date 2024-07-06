import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Hero from "./components/Hero";
import { v4 as uuidv4 } from "uuid";
import Food from "./components/Food";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [dataOrig, setData] = useState([]);
  const [counterPrice, setCounterPrice] = useState(0);
  const [tabPanier, setPanier] = useState([]);
  const [title, setTitle] = useState("");
  const [sousTotal, setSousTotal] = useState(0);

  const livraison = 2.5;
  const total = livraison + sousTotal;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "https://site--deliveroo-backend--7pddggdgmnqf.code.run/"
        );

        setData(data);
        setIsLoading(false);
      } catch (error) {
        console.log("catch>>>", error);
      }
    };
    fetchData();
  }, []);
  const addPanier = (meals) => {
    const newTabPanier = [...tabPanier];
    const indexToModify = tabPanier.findIndex((item) => item.id === meals.id);
    if (indexToModify === -1) {
      const menu = {
        title: meals.title,
        price: meals.price.replace(".", ",") + " €",
        id: meals.id,
        quantity: 1,
      };
      newTabPanier.push(menu);
    } else {
      newTabPanier[indexToModify].quantity =
        newTabPanier[indexToModify].quantity + 1;
    }
    setPanier(newTabPanier);
  };
  const removeQuantity = (meals) => {
    const newTabPanier = [...tabPanier];

    // A quel index se trouve le repas sur lequel on a cliqué
    const indexToModify = tabPanier.findIndex((item) => item.id === meals.id);

    if (meals.quantity === 1) {
      // S'il est à 1 quantité, c'est qu'il sera à 0 après avoir soustrait 1 donc on le supprime direct du panier
      newTabPanier.splice(indexToModify, 1);
    } else {
      // Soutrait 1 à la quantité existante
      newTabPanier[indexToModify].quantity =
        newTabPanier[indexToModify].quantity - 1;
    }

    setPanier(newTabPanier);
  };
  const newTab = [dataOrig];
  return isLoading ? (
    <main>
      <p>Chargement en cours ...</p>
    </main>
  ) : (
    <div>
      <header>
        <div className="div-logo container">
          {<img className="logo-deliv" src="/Deliveroo-Logo.png" />}
        </div>
      </header>
      {newTab.map((element, index) => {
        return (
          <main key={uuidv4()}>
            <Hero
              nameRest={element.restaurant.name}
              descriptionRest={element.restaurant.description}
              pictureRest={element.restaurant.picture}
              className1="sect-le-pain"
              className2="div-pain container"
              className3="le-pain"
              className4="le-pain-text"
              className5="div-img-resto"
              className6="img-resto"
            />
            <div className="section-2">
              <div className="div-section container">
                <section key={uuidv4()} className="all-categories">
                  {element.categories.map((categorie) => {
                    if (categorie.meals.length > 0) {
                      return (
                        <div key={uuidv4()} className="block-categories">
                          <h2>{categorie.name}</h2>
                          <div className="categories">
                            {categorie.meals.map((meals, index) => {
                              return (
                                <div
                                  key={uuidv4()}
                                  className="block-simp-cat cursor-1"
                                  onClick={() => {
                                    addPanier(meals);

                                    setCounterPrice(meals.price);
                                    setTitle(meals.title);

                                    setSousTotal(
                                      sousTotal + Number(meals.price)
                                    );
                                  }}
                                >
                                  <div className="simp-categorie">
                                    <h3>{meals.title}</h3>
                                    <div className="description">
                                      <p className="parag">
                                        {meals.description}
                                      </p>
                                      <div className="price-div">
                                        <span className="price">
                                          {meals.price.replace(".", ",") + " €"}
                                        </span>
                                        <div>
                                          {meals.popular ? (
                                            <div className="pop">
                                              <i className="icon-star-full"></i>
                                              <span>Popular</span>
                                            </div>
                                          ) : (
                                            ""
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {meals.picture ? (
                                    <div className="img-categorie-div">
                                      <img
                                        className="img-categorie"
                                        src={meals.picture}
                                      />
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    }
                  })}
                </section>
                <div className="relative">
                  {counterPrice !== 0 ? (
                    <div className="panier">
                      <button className="allowed">Valider mon panier</button>
                      {tabPanier.map((menu) => {
                        return (
                          <div className="menu-buttons" key={uuidv4()}>
                            <div className="div-buttons">
                              <button
                                onClick={() => {
                                  removeQuantity(menu);
                                }}
                              >
                                -
                              </button>
                              <span>{menu.quantity}</span>
                              <button
                                onClick={() => {
                                  addPanier(menu);
                                }}
                              >
                                +
                              </button>
                            </div>
                            <Food
                              className1="menu"
                              className2="menu-title"
                              title={menu.title}
                              price={menu.price}
                              quantity={menu.quantity}
                            />
                          </div>
                        );
                      })}
                      <div className="panier-sous">
                        <div className="sous-total">
                          <span>sous-total</span>
                          <span>
                            {sousTotal.toFixed(2).replace(".", ",") + " €"}
                          </span>
                        </div>
                        <div className="sous-total">
                          <span>Frais de livraison</span>
                          <span>
                            {livraison.toFixed(2).replace(".", ",") + " €"}
                          </span>
                        </div>
                      </div>
                      <div className="sous-total">
                        <span>Total</span>
                        <span>{total.toFixed(2).replace(".", ",") + " €"}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="panier-vide">
                      <button className="not-allowed">
                        Valider mon panier
                      </button>
                      <p>Votre panier est vide</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>
        );
      })}
    </div>
  );
}

export default App;
<div className="container"></div>;
