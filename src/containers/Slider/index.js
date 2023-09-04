import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const [radioIndex, setRadioIndex] = useState(0);
  // gestion state du radio
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
    // inversion de l ordre de tri (>)
  );
  const nextCard = () => {
    setTimeout(
      () => {
        const newIndex = index < byDateDesc.length -1 ? index + 1 : 0;
        setIndex(newIndex);
        setRadioIndex(newIndex);},
        // ajout du changement de radio 
      5000
    );
    // prise en compte de l index 0 sur .length (-1)
  };
  useEffect(() => {
    nextCard();
    // console.log(byDateDesc, index);
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <>
          <div
            key={event.title}
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
                  key={`${event.id}`}
                  type="radio"
                  name="radio-button"
                  checked={radioIndex === radioIdx}
                  onChange={()=>setRadioIndex(radioIdx)}
                  // ajout du changement de radio au onChange avec suivi de l index
                />
              ))}
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Slider;
