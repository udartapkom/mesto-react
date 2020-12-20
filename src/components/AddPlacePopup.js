import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const { isOpen, onClose, onAddPlace, closePopupForm } = props;
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function nameChange(event) {
    setName(event.target.value);
  }

  function linkChange(event) {
    setLink(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    onAddPlace({
      name,
      link,
    });
    setName("");
    setLink("");
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="add-card"
      isOpen={isOpen}
      onClose={onClose}
      closePopupForm={closePopupForm}
      onSubmit={handleSubmit}
      children={
        <>
          <label className="modal__label">
            <input
              name="placeName"
              type="text"
              required
              value={name}
              placeholder="Название"
              className="modal__input modal__input_name"
              minLength="1"
              maxLength="30"
              autoComplete="off"
              onChange={nameChange}
            />
            <span className="modal__error_visible" id="placeName-error"></span>
          </label>

          <label className="modal__label">
            <input
              name="placeLink"
              type="url"
              required
              value={link}
              placeholder="Ссылка на картинку"
              className="modal__input modal__input_profession"
              autoComplete="off"
              onChange={linkChange}
            />

            <span className="modal__error_visible" id="placeLink-error"></span>
          </label>
        </>
      }
    />
  );
}
export default AddPlacePopup;
