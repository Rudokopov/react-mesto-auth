import React from "react";
import { CardData } from "./App";

type PopupWithFormProps = {
  title: string;
  name: string;
  btnName: string;
  isOpen: boolean;
  children?: React.ReactNode;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  closeByOverlay?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const PopupWithForm: React.FC<PopupWithFormProps> = (props) => {
  const {
    title,
    name,
    btnName,
    isOpen,
    children,
    onClose,
    onSubmit,
    closeByOverlay,
  } = props;
  return (
    <div
      className={isOpen ? `popup popup_opened` : `popup`}
      onClick={closeByOverlay}
    >
      <div className="popup__container">
        <h2 className="popup__form-title">{title}</h2>
        <button
          type="button"
          aria-label="Закрыть форму"
          className="popup__form-close-button"
          onClick={onClose}
        ></button>
        <form
          name={`form-${name}`}
          className={`popup__form popup__form-${name}`}
          onSubmit={onSubmit}
        >
          {children}
          <input
            name="submit"
            type="submit"
            value={btnName}
            className="popup__form-submtit"
          />
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
