import React from "react";

function Card(props) {
  const { card } = props;

  function handleClick() {
    props.onCardClick(card);
  }

  return (
    <div className="cards">
      <button
        type="button"
        className="cards__trash"
        aria-label="Удалить"
      ></button>
      <img
        className="cards__photo"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      ></img>
      <div className="cards__title">
        <h2 className="cards__title-style cards__title_text_ellipsis">
          {card.name}
        </h2>
        <ul className="cards__likes-data">
          <li>
            <button
              type="button"
              className="cards__like"
              aria-label="Лайкнуть"
            ></button>
          </li>
          <li>
            <p className="cards__likes-quantity">{card.likes.length}</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Card;
