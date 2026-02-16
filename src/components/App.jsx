import { useState } from "react";

import "../styles/App.scss";
import avocado from "../images/avocado.png";
import banana from "../images/banana.png";
import chilli from "../images/chilli.png";

const images = [avocado, banana, chilli];

const cards = [...images, ...images].map((image, index) => ({
  id: index,
  image: image,
  claseCarta: "",
}));

function App() {
  const [boardCards, setBoardCards] = useState(
    // eslint-disable-next-line react-hooks/purity
    cards.sort(() => Math.random() - 0.5),
  );
  console.log(boardCards);

  const checkCards = () => {
    // Localizar las cartas ya volteadas
    const [card1, card2] = boardCards.filter(
      (card) => card.claseCarta === "reversed",
    );

    console.log({ card1, card2 });

    if (card1.image !== card2.image) {
      // No son iguales

      card1.claseCarta = "";
      card2.claseCarta = "";
    } else {
      card1.claseCarta = "solved";
      card2.claseCarta = "solved";
    }

    setBoardCards([...boardCards]);
  };

  const handleClick = (ev) => {
    console.log(ev.currentTarget);

    // Localizar las cartas ya volteadas
    const cartasVolteadas = boardCards.filter(
      (card) => card.claseCarta === "reversed",
    );

    if (cartasVolteadas.length >= 2) {
      return;
    }

    // 1. Localizar la carta
    const cartaId = parseInt(ev.currentTarget.id);
    const cartaClicked = boardCards.find((card) => card.id === cartaId);

    console.log(cartaClicked);

    // 2. Cambiar el obj de esa carta
    cartaClicked.claseCarta = "reversed";

    // 3. Guardar una copia del array de datos en la variable de estado
    setBoardCards([...boardCards]);

    // Si en este evento ya había una carta volteada
    // y le acabamos de dar la vuelta a la otra
    if (cartasVolteadas.length === 1) {
      setTimeout(checkCards, 1000);
    }
  };

  return (
    <>
      <div className="content">
        {" "}
        <main className="main">
          <header className="header"></header>
          <ul className="board">
            {boardCards.map((cardObj) => (
              <li
                id={cardObj.id}
                key={cardObj.id}
                className={"card " + cardObj.claseCarta}
                onClick={handleClick}
              >
                <div className="front">🎀</div>
                <div className="back">
                  <img src={cardObj.image} alt="card" />
                </div>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </>
  );
}

export default App;
