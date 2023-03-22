function ImagePopup({ onClose, isOpen }) {
  return (
    <div className={isOpen.name ? `popup popup-image popup_opened` : `popup`}>
      <div className="popup-image__container">
        <button
          type="button"
          aria-label="Закрыть форму"
          className="popup__form-close-button popup__form-image-close-button"
          onClick={onClose}
        ></button>
        <img
          className="popup-image__photo"
          src={isOpen.link}
          alt={isOpen.name}
        />
        <p className="popup-image__text">{isOpen.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
