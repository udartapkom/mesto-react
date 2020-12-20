import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const { card } = props;

  function handleClick() {
    props.onCardClick(card);
  }

  function handleLikeClick() {
    props.onCardLike(props);
  }

  function handleDeleteClick() {
    props.onCardDelete(card);
  }

  //подписываемся на контекст информации о пользователе
  const currentUser = React.useContext(CurrentUserContext);

  /*** это рекомендация из брифа ***/
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  return (
    <div className="cards">
      <button
        type="button"
        className={`cards__trash ${
          card.owner._id === currentUser._id ? "cards__trash_show" : null
        } `} // чтобы поставить корзинку только для карточек, которые добавил сам
        aria-label="Удалить"
        onClick={handleDeleteClick}
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
              className={`cards__like ${
                isLiked ? "cards__like_button_active" : null
              } `}
              aria-label="Лайкнуть"
              onClick={handleLikeClick}
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
