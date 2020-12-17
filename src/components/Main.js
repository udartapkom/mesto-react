import React from "react";
import Card from "./Card";

function Main(props) {
  const {
    onEditProfile,
    onAddPlace,
    onEditAvatar,
    userAvatar,
    userName,
    userAbout,
    cards,
    onCardClick,
  } = props;

  return (
    <>
      <main className="content root__section">
        <section className="profile">
          <button
            className="profile__avatar"
            style={{ backgroundImage: `url(${userAvatar})` }}
            onClick={onEditAvatar}
          ></button>
          <div className="profile-info">
            <div className="profile-info__name">
              <h1 className="profile-info__title profile-info__title_text_ellipsis">
                {userName}
              </h1>
              <button
                className="button profile-info__edit-button"
                aria-label="Редактировать профиль"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile-info__subtitle profile-info__title_text_ellipsis">
              {userAbout}
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
            <Card key={item._id} card={item} onCardClick={onCardClick} />
          ))}
        </section>
      </main>
    </>
  );
}
export default Main;
