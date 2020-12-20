import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
//import PopupWithForm from "./PopupWithForm";  // этот импорт уже не используется
import api from "../utils/Api";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  //хуки состояния модалок
  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = React.useState(
    false
  );
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = React.useState(
    false
  );
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const [selectedCard, setSelectedCard] = React.useState({
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

  /***** Эта функция из брифа *****/
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.card.likes.some(
      (user) => user._id === currentUser._id
    );

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card.card._id, !isLiked).then((newCard) => {
      // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
      const newCards = cards.map((c) =>
        c._id === card.card._id ? newCard : c
      );
      // Обновляем стейт
      setCards(newCards);
    });
  }
  //удаление карточки с сервера
  function handleCardDelete(cardToDelete) {
    api
      .removeCard(cardToDelete._id)
      .then(() => {
        setCards(cards.filter((el) => el !== cardToDelete));
        closeAllPopups();
      })
      .catch((error) => {
        alert(error);
      });
  }
  //установка начальных данных профиля
  React.useEffect(() => {
    api
      .getProfileInfo()
      .then((userInfo) => {
        setCurrentUser(userInfo);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  // получение карточек
  React.useEffect(() => {
    api
      .getCards()
      .then((cardsArray) => {
        setCards(cardsArray);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  //запрос на изменение профиля
  function handleUpdateUser(updateProfile) {
    api
      .setProfileInfo(updateProfile.name, updateProfile.about)
      .then((newProfile) => {
        setCurrentUser(newProfile);
        closeAllPopups();
      })
      .catch((error) => {
        alert(error);
      });
  }
  //запрос на обновление аватара
  function handleUpdateAvatar(avatarURL) {
    console.log(avatarURL);
    api
      .setAvatar(avatarURL)
      .then((updatedAvatar) => {
        setCurrentUser(updatedAvatar);
        closeAllPopups();
      })
      .catch((error) => {
        alert(error);
      });
  }
  //добавление карточки
  function handleAddPlaceSubmit(newCard) {
    api
      .setNewCard(newCard.name, newCard.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        alert(error);
      });
  }
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
  function closePopupForm(event) {
    if (
      event.target.classList.contains("modal") &&
      event.target.classList.contains("modal_open")
    ) {
      closeAllPopups();
    }
  }

  // Закрытие модалки с картинкой. Клик в любом месте
  function closeImagePopup(event) {
    if (
      event.target.classList.contains("modal") &&
      event.target.classList.contains("modal_open")
    ) {
      closeAllPopups();
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
          onCardClick={handleCardClick}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          closePopupForm={closePopupForm}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          closePopupForm={closePopupForm}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          closePopupForm={closePopupForm}
          onUpdateAvatar={handleUpdateAvatar}
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
    </CurrentUserContext.Provider>
  );
}

export default App;
