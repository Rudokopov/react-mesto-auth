import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
  const { onClose, isOpen, onUpdateUser, currentUser } = props;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      description,
    });
  };

  return (
    <PopupWithForm
      onClose={onClose}
      isOpen={isOpen}
      title="Редактировать профиль"
      name="edit"
      btnName="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        name="name"
        value={name || ""}
        placeholder="Имя"
        required
        type="text"
        className="popup__form-input popup__form-user-name"
        minLength="2"
        maxLength="40"
        onChange={handleChangeName}
      />
      <span className="user-error error-message"></span>
      <input
        name="name"
        value={description || ""}
        placeholder="Описание"
        required
        type="text"
        className="popup__form-input popup__form-user-description"
        minLength="2"
        maxLength="200"
        onChange={handleChangeDescription}
      />
      <span className="description-error error-message"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
