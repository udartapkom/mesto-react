import React, { useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import api from "../utils/Api";
import ImagePopup from "./ImagePopup";
//import cards from "./Card";

function App() {
  //хуки состояния модалок
  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = useState(false);

  const [userName, setUserName] = useState("");
  const [userDescription, setUseruserDescription] = useState("");
  const [userAvatar, setAvatar] = useState("");
  const [card, setCards] = useState([]);

  const [selectedCard, setSelectedCard] = useState({
    isImageOpen: false,
    link: "",
    name: "",
  });

  // функции меняющие состояния открытия модалок
  function handleEditProfileClick() {
    setisEditProfilePopupOpen(!isEditProfilePopupOpen); //инвертируем состояние
  }

  function handleAddPlaceClick() {
    setisAddPlacePopupOpen(!isAddPlacePopupOpen); //инвертируем состояние
  }

  function handleEditAvatarClick() {
    setisEditAvatarPopupOpen(!isEditAvatarPopupOpen); //инвертируем состояние
  }

  function handleCardClick(card) {
    const { link, name } = card;
    setSelectedCard({ isImageOpen: true, link: link, name: name });
  }
  // Установка данных о пользователе
  React.useEffect(() => {
    Promise.all([api.getProfileInfo(), api.getCards()])

      .then(([userInfo, cardsArray]) => {
        setUserName(userInfo.name); //устанавливаем начальные значения профиля
        setUseruserDescription(userInfo.about);
        setAvatar(userInfo.avatar); //устанавливаем аватар
        setCards(cardsArray); // получение карточек
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  // получение карточек
  /*  React.useEffect(() => {
    api
      .getCards()
      .then((cardsArray) => {
        console.log(cardsArray);
        setCards(cardsArray);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);
 */
  // Закрытие модалок
  function closeAllPopups() {
    //возвращаем состояние false
    setisEditProfilePopupOpen(false);
    setisAddPlacePopupOpen(false);
    setisEditAvatarPopupOpen(false);
    setSelectedCard({
      isImageOpen: false,
      link: "",
      name: "",
    });
  }

  // Закрытие модалки с формой. Клик в любом месте
  function closePopupForm() {
    closeAllPopups();
  }

  // Закрытие модалки с картинкой. Клик в любом месте
  function closeImagePopup() {
    closeAllPopups();
  }

  return (
    <div className="body">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        userName={userName}
        userAbout={userDescription}
        userAvatar={userAvatar}
        cards={card}
        onCardClick={handleCardClick}
      />

      <PopupWithForm
        title="Редактировать профиль"
        name="profile"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        closePopupForm={closePopupForm}
        children={
          <>
            <label className="modal__label">
              <input
                name="name"
                type="text"
                required /* value="" */ // нужно использовать с onChange, но его пока нет! Или со значение по умолчанию
                placeholder="Введите имя"
                className="modal__input modal__input_name"
                minLength="2"
                maxLength="40"
                autoComplete="off"
              />
              <span className="modal__error_visible" id="name-error"></span>
            </label>
            <label className="modal__label">
              <input
                name="profession"
                type="text"
                required
                placeholder="Введите профессию" /* value="" */ // нужно использовать с onChange, но его пока нет! Или со значение по умолчанию
                className="modal__input modal__input_profession"
                minLength="2"
                maxLength="200"
                autoComplete="off"
              />
              <span
                className="modal__error_visible"
                id="profession-error"
              ></span>
            </label>
          </>
        }
      />

      <PopupWithForm
        title="Новое место"
        name="add-card"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        closePopupForm={closePopupForm}
        children={
          <>
            <label className="modal__label">
              <input
                name="placeName"
                type="text"
                required /* value="" */ // нужно использовать с onChange, но его пока нет! Или со значение по умолчанию
                placeholder="Название"
                className="modal__input modal__input_name"
                minLength="1"
                maxLength="30"
                autoComplete="off"
              />
              <span
                className="modal__error_visible"
                id="placeName-error"
              ></span>
            </label>

            <label className="modal__label">
              <input
                name="placeLink"
                type="url"
                required /* value="" */ // нужно использовать с onChange, но его пока нет! Или со значение по умолчанию
                placeholder="Ссылка на картинку"
                className="modal__input modal__input_profession"
                autoComplete="off"
              />

              <span
                className="modal__error_visible"
                id="placeLink-error"
              ></span>
            </label>
          </>
        }
      />
      <PopupWithForm
        title="Обновить аватар"
        name="add-card"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        closePopupForm={closePopupForm}
        children={
          <>
            <label className="modal__label">
              <input
                name="placeLink"
                type="url"
                required /* value="" */ // нужно использовать с onChange, но его пока нет! Или со значение по умолчанию
                placeholder="Ссылка на аватар"
                className="modal__input modal__input_profession"
                autoComplete="off"
              />
              <span
                className="modal__error_visible"
                id="placeLink-error"
              ></span>
            </label>
          </>
        }
      />
      <ImagePopup
        name={selectedCard.name}
        link={selectedCard.link}
        onClose={closeAllPopups}
        isOpen={selectedCard.isImageOpen}
        closeImagePopup={closeImagePopup}
      />
      <Footer />
    </div>
  );
}

export default App;
