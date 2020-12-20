function PopupWithForm(props) {
  const {
    isOpen,
    onClose,
    title,
    name,
    closePopupForm,
    children,
    onSubmit,
  } = props;
  return (
    <div
      onClick={closePopupForm}
      className={`modal modal_${name} ${
        isOpen ? "modal_open" : "modal_close"
      } `}
    >
      <div className="modal__content">
        <button
          type="button"
          className="modal__close-button modal__close-button_profile"
          aria-label="Закрыть окно"
          onClick={onClose}
        ></button>
        <h2 className="modal__header">{title}</h2>
        <form
          name={name}
          action="#"
          className="modal__form"
          noValidate
          onSubmit={onSubmit}
        >
          {children}
          <button type="submit" className="modal__save">
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
