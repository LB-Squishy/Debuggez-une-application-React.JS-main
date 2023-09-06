import { useEffect, useState, Fragment } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1 // tri par ordre chronologique (>)
  );
  const nextCard = () => {
    setTimeout(() => {
        // console.log(byDateDesc, data);
        if (byDateDesc && byDateDesc.length > 0) // ajout d'une condition de verif byDateDesc defini et contiens + d'un élément (undefined)
        {setIndex(index < byDateDesc.length -1 ? index + 1 : 0);}}, // prise en compte de l index 0 sur .length (-1) pour suppression de slide vide
      5000
    );
  };
  useEffect(() => {
    nextCard();
    // console.log(byDateDesc, index);
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        // Ajout de Fragment pour assignation d'une key unique à la racine de la boucle
        <Fragment key={`slider: ${idx + 1}`}> 
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={`radio: ${radioIdx + 1}`} // création d'une clé unique
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx} // checked avec l index des slides (mise en fonctionnement du radio)
                  readOnly
                />
              ))}
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export default Slider;