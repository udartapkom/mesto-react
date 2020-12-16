function PopupWithForm(props) {
  return (
    <div
      onClick={props.closePopupForm}
      className={`modal modal_${props.name} ${
        props.isOpen ? "modal_open" : "modal_close"
      } `}
    >
      <div className="modal__content">
        <button
          type="button"
          class="modal__close-button modal__close-button_profile"
          aria-label="Закрыть окно"
          onClick={props.onClose}
        ></button>
        <h2 className="modal__header">{props.title}</h2>
        {props.children}
      </div>
    </div>
  );
}

export default PopupWithForm;
