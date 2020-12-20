import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const {
    onEditProfile,
    onAddPlace,
    onEditAvatar,
    cards,
    onCardClick,
    onCardLike,
    onCardDelete,
  } = props;

  //подписываемся на контекст информации о пользователе
  const currentUser = React.useContext(CurrentUserContext);
  // нужна проверка, потому что если сurrentUser не прогрузился - будет Error

  return (
    <>
      <main className="content root__section">
        <section className="profile">
          <button
            className="profile__avatar"
            style={{
              backgroundImage: `url(${
                currentUser ? currentUser.avatar : null
              })`,
            }}
            onClick={onEditAvatar}
          ></button>
          <div className="profile-info">
            <div className="profile-info__name">
              <h1 className="profile-info__title profile-info__title_text_ellipsis">
                {/* нужна проверка, потому что если сurrentUser не прогрузился - будет Error */}
                {currentUser ? currentUser.name : null}
              </h1>
              <button
                className="button profile-info__edit-button"
                aria-label="Редактировать профиль"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile-info__subtitle profile-info__title_text_ellipsis">
              {currentUser ? currentUser.about : null}
            </p>
          </div>
          <button
            className="profile__add-button"
            aria-label="Добавить профиль"
            onClick={onAddPlace}
          ></button>
        </section>
        <section className="elements">
          {cards.map((item) => (
            <Card
              key={item._id}
              card={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </section>
      </main>
    </>
  );
}
export default Main;
