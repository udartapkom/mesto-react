import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
//import PopupWithForm from "./PopupWithForm";  // этот импорт уже не используется
import api from "../utils/api";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  //хуки состояния модалок
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(
    false
  );
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
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
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen); //инвертируем состояние
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen); //инвертируем состояние
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen); //инвертируем состояние
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
    api
      .changeLikeCardStatus(card.card._id, !isLiked)
      .then((newCard) => {
        // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
        const newCards = cards.map((c) =>
          c._id === card.card._id ? newCard : c
        );
        // Обновляем стейт
        setCards(newCards);
      })
      .catch((error) => {
        alert(error);
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
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({
      isImageOpen: false,
      link: "",
      name: "",
    });
  }
  // Закрытие модалки с формой или картинкой. Клик в любом месте
  function closeByOverlayClick(event) {
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
          closePopupForm={closeByOverlayClick}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          closePopupForm={closeByOverlayClick}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          closePopupForm={closeByOverlayClick}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <ImagePopup
          name={selectedCard.name}
          link={selectedCard.link}
          onClose={closeAllPopups}
          isOpen={selectedCard.isImageOpen}
          closeImagePopup={closeByOverlayClick}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
