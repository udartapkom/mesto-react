import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState({});
  const [description, setDescription] = React.useState({});

  const { isOpen, onClose, onUpdateUser, closePopupForm } = props;

  function nameChange(event) {
    setName(event.target.value);
  }

  function descriptionChange(event) {
    setDescription(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser ? currentUser.name : "");
    setDescription(currentUser ? currentUser.about : "");
  }, [currentUser]);

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      isOpen={isOpen}
      onClose={onClose}
      closePopupForm={closePopupForm}
      onSubmit={handleSubmit}
      children={
        <>
          <label className="modal__label">
            <input
              name="name"
              type="text"
              required
              value={name || ""} //  || '' - иначе "warning!" в консоли о том, что Компонент изменяет контролируемый вход на неконтролируемый...
              placeholder="Введите имя"
              className="modal__input modal__input_name"
              minLength="2"
              maxLength="40"
              autoComplete="off"
              onChange={nameChange}
            />
            <span className="modal__error_visible" id="name-error"></span>
          </label>
          <label className="modal__label">
            <input
              name="profession"
              type="text"
              required
              placeholder="Введите профессию"
              value={description || ""}
              className="modal__input modal__input_profession"
              minLength="2"
              maxLength="200"
              autoComplete="off"
              onChange={descriptionChange}
            />
            <span className="modal__error_visible" id="profession-error"></span>
          </label>
        </>
      }
    />
  );
}

export default EditProfilePopup;
