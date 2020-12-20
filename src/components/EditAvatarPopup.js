import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const { isOpen, onClose, onUpdateAvatar, closePopupForm } = props;

  const refAvatar = React.useRef("");
  const avatar = refAvatar.current.value;

  function handleSubmit(event) {
    event.preventDefault();

    onUpdateAvatar({
      avatar,
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="add-card"
      isOpen={isOpen}
      onClose={onClose}
      closePopupForm={closePopupForm}
      onSubmit={handleSubmit}
      children={
        <>
          <label className="modal__label">
            <input
              name="placeLink"
              type="url"
              required
              placeholder="Ссылка на аватар"
              className="modal__input modal__input_profession"
              autoComplete="off"
              ref={refAvatar}
            />
            <span className="modal__error_visible" id="placeLink-error"></span>
          </label>
        </>
      }
    />
  );
}
export default EditAvatarPopup;
