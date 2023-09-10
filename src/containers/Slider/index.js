import { useEffect, useState, Fragment } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const [indexRadio, setIndexRadio] = useState(0); // création d'un state pour le radio
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1 // tri par ordre chronologique (>)
  );
  
  const nextCard = () => {  
    // console.log(byDateDesc, data);
    // ajout d'une condition de verif byDateDesc defini et contiens + d'un élément (undefined)
    if (byDateDesc?.length > 0) {
      const newIndex = index < byDateDesc.length -1 ? index + 1 : 0; // mise a jour des index avec prise en compte de l index 0 sur .length (-1) pour suppression de slide vide
      setIndex(newIndex);
      setIndexRadio(newIndex);
    }; 
  };

  // mise en place d'un useEffect pour attente de rendu fini pour declanchement avec dependances
  useEffect(() => {   
    const timer = setTimeout(nextCard, 5000);
    return () => clearTimeout(timer); // arret du timer au clic ou en auto pour eviter progression timer sans prise en compte du clic
  }, [byDateDesc,index]);

  // synchro de l index et de l index radio au changement d indexRadio
  useEffect(()=>{
    setIndex(indexRadio);
  },[indexRadio]);

  // // TEST d'actualisation de synchro de l index du slides et du radio
  // useEffect(()=>{
  //   console.log("radioIndex:", indexRadio, "index:", index);
  // },[index]);

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        // Ajout de Fragment pour assignation d'une key unique à la racine de la boucle
        <Fragment key={`slider_focus-${idx + 1}`}> 
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
                  key={`radio-${radioIdx + 1}`} // création d'une clé unique
                  type="radio"
                  name="radio-button"
                  // création des conditions au check quand clic
                  checked={indexRadio === radioIdx}
                  onChange={() => setIndexRadio(radioIdx)}
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