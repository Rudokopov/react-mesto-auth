import React, { useState, useEffect } from "react";
import { api } from "../utils/Api";
import { AppContext } from "../contexts/AppContext";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CurrentUserCardsContext } from "../contexts/CurrentUserCardsContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvattarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { EmailContext } from "../contexts/EmailContext";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";

import ProtectedRouteElement from "./ProtectedRoute";
import Authorization from "./Authorization";
import Registration from "./Registration";
import PageNotFound404 from "./PageNotFound404";
import RequestPopup from "./RequestPopup";
import * as auth from "../utils/Auth";

import imageSucess from "../images/Icons/Sucess.png";
import imageBad from "../images/Icons/Bad.png";

function App() {
  const navigate = useNavigate();
  const [loggedIn, setloggedIn] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAvatarPopupOpen, setAvatarPopupOpen] = useState(false);
  const [isPlacePopupOpen, setPlacePopupOpen] = useState(false);
  const [isRequestSucessPopupOpen, setRequestSucessPopupOpen] = useState(false);
  const [isRequestBadPopupOpen, setRequestBadPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    tokenCheck();
    Promise.all([api.getProfileInfo(), api.getInitialCards()])
      .then(([userData, cards]) => {
        setCurrentUser(userData);
        setCards(cards);
      })
      .catch((err) => console.log(err));
  }, []);

  const tokenCheck = () => {
    // если у пользователя есть токен в localStorage,
    // эта функция проверит, действующий он или нет
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
        auth
          .getContent(jwt)
          .then(() => {
            setloggedIn(true);
            navigate("/", { replace: true });
          })
          .catch((err) => console.log(err));
      }
    }
  };

  useEffect(() => {
    emailSetter();
  }, [loggedIn]);

  const emailSetter = () => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
        auth
          .getContent(jwt)
          .then((res) => {
            setUserEmail(res.email);
          })
          .catch((err) => console.log(err));
      }
    }
  };

  const signOut = () => {
    localStorage.removeItem("jwt");
    setloggedIn(false);
    setUserEmail("");
    <Navigate to="/login" replace={true} />;
  };

  const registration = (username, password, email, { navigate }) => {
    auth
      .register(username, password, email)
      .then(() => {
        handleRequestSucessPopupOpen();
        navigate("/login", { replace: true });
      })
      .catch(() => handleRequestBadPopupOpen());
  };

  const authorization = (username, password, email, { navigate }) => {
    auth
      .authorize(username, password, email)
      .then((data) => {
        if (data.jwt) {
          localStorage.setItem("jwt", data.jwt);
          handleLogin();
          navigate("/", { replace: true });
        }
        return;
      })
      // Не сразу понял что имелось ввиду, убрать попап об ошибке, думал по UX так будет удобнее)
      .catch((err) => console.log(err));
  };

  const handleCardLike = (card) => {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    if ((card, !isLiked)) {
      api
        .likeCard(card)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(err));
    } else {
      api
        .deleteLike(card)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(err));
    }
  };

  const handleUpdateUser = ({ name, description }) => {
    api
      .changeProfileInfo({ name, description })
      .then((state) => {
        setCurrentUser(state);
        handleClosePopup();
      })
      .catch((err) => console.log(err));
  };

  const handleCardDelete = (id) => {
    api
      .deleteCard(id)
      .then(setCards((cards) => cards.filter((q) => q._id !== id)))
      .catch((err) => console.log(err));
  };

  const handleAvatarChange = ({ imageAvatar }) => {
    api
      .setNewAvatar({ imageAvatar })
      .then((result) => {
        setCurrentUser(result);
        handleClosePopup();
      })
      .catch((err) => console.log(err));
  };

  const handleAddPlaceSubmit = ({ name, image }) => {
    api
      .addNewCard({ name, image })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        handleClosePopup();
      })
      .catch((err) => console.log(err));
  };

  const handleLogin = () => {
    setloggedIn(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleEditPopupOpen = () => {
    setEditProfilePopupOpen(true);
  };

  const handleAvatarPopupOpen = () => {
    setAvatarPopupOpen(true);
  };

  const handlePlacePopupOpen = () => {
    setPlacePopupOpen(true);
  };

  const handleRequestSucessPopupOpen = () => {
    setRequestSucessPopupOpen(true);
  };

  const handleRequestBadPopupOpen = () => {
    setRequestBadPopupOpen(true);
  };

  const handleClosePopup = () => {
    setSelectedCard({});
    setAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setPlacePopupOpen(false);
    setRequestBadPopupOpen(false);
    setRequestSucessPopupOpen(false);
  };

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <CurrentUserCardsContext.Provider value={cards}>
          <AppContext.Provider value={loggedIn}>
            <EmailContext.Provider value={userEmail}>
              <Routes>
                <Route
                  path="/"
                  element={
                    <ProtectedRouteElement
                      onEditProfile={handleEditPopupOpen}
                      onAvatarPopup={handleAvatarPopupOpen}
                      onPlacePopup={handlePlacePopupOpen}
                      onCardClick={(card) => handleCardClick(card)}
                      onCardLike={handleCardLike}
                      onCardDelete={handleCardDelete}
                      cards={cards}
                      currentUser={currentUser}
                      email={userEmail}
                      signOut={signOut}
                      element={Main}
                    />
                  }
                />
                {!loggedIn && (
                  <Route
                    path="/login"
                    element={
                      <Authorization
                        handleLogin={handleLogin}
                        authorization={authorization}
                        loggedIn={loggedIn}
                        errorPopup={handleRequestBadPopupOpen}
                      />
                    }
                  />
                )}
                {!loggedIn && (
                  <Route
                    path="/registration"
                    element={
                      <Registration
                        loggedIn={loggedIn}
                        registration={registration}
                        errorPopup={handleRequestBadPopupOpen}
                        sucessPopup={handleRequestSucessPopupOpen}
                      />
                    }
                  />
                )}

                <Route path="*" element={<PageNotFound404 />} />
              </Routes>
              <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={handleClosePopup}
                onUpdateUser={handleUpdateUser}
                currentUser={currentUser}
              />
              <EditAvattarPopup
                isOpen={isAvatarPopupOpen}
                onClose={handleClosePopup}
                onEditAvatar={handleAvatarChange}
              />
              <AddPlacePopup
                isOpen={isPlacePopupOpen}
                onClose={handleClosePopup}
                onAddCard={handleAddPlaceSubmit}
              />
              {loggedIn ? <Footer /> : ""}
              <ImagePopup
                onClose={() => handleClosePopup({})}
                isOpen={selectedCard}
              />
              <RequestPopup
                isOpen={isRequestSucessPopupOpen}
                onClose={handleClosePopup}
                title="Вы успешно зарегистрировались!"
                image={imageSucess}
              />
              <RequestPopup
                isOpen={isRequestBadPopupOpen}
                onClose={handleClosePopup}
                title="Что-то пошло не так!
              Попробуйте ещё раз."
                image={imageBad}
              />
            </EmailContext.Provider>
          </AppContext.Provider>
        </CurrentUserCardsContext.Provider>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
