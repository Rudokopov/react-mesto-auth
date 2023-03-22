import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const { isOpen, onClose, onAddCard } = props;
  const iputNamePlaceRef = useRef();
  const iputLinkPlaceRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddCard({
      name: iputNamePlaceRef.current.value,
      image: iputLinkPlaceRef.current.value,
    });
    e.target.reset();
  };

  return (
    <PopupWithForm
      onClose={onClose}
      isOpen={isOpen}
      title="Новое место"
      name="place"
      btnName={"Создать"}
      onSubmit={handleSubmit}
    >
      <input
        name="name"
        ref={iputNamePlaceRef}
        placeholder="Название"
        required
        type="text"
        className="popup__form-input popup__form-place-name"
        id="name"
        minLength="2"
        maxLength="30"
      />
      <span className="name-error error-message"></span>
      <input
        name="link"
        ref={iputLinkPlaceRef}
        placeholder="Ссылка на картинку"
        required
        type="url"
        className="popup__form-input popup__form-place-link"
        id="image"
      />
      <span className="image-error error-message"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
