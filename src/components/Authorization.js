import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import * as auth from "../utils/Auth";

function Authorization(props) {
  const navigate = useNavigate();
  const { handleLogin, errorPopup } = props;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setUsername(e.target.value);
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }
    auth
      .authorize(username, password, email)
      .then((data) => {
        if (data.jwt) {
          handleLogin();
          navigate("/", { replace: true });
        }
      })
      .catch(() => errorPopup());
  };

  return (
    <>
      <Header link={"/registration"} linkName={"Регистрация"} />
      <div className="authorization__container">
        <h2 className="authorization__title">Вход</h2>
        <form className="authorization__form" onSubmit={handleSubmit}>
          <fieldset className="authorization__top-fieldset">
            <input
              placeholder="Email"
              className="authorization__input"
              name="email"
              type="email"
              onChange={handleEmail}
            />
            <input
              placeholder="Password"
              className="authorization__input"
              name="password"
              type="password"
              onChange={handlePassword}
            />
          </fieldset>
          <button className="authorization__submit-button" type="submit">
            Войти
          </button>
        </form>
      </div>
    </>
  );
}

export default Authorization;
