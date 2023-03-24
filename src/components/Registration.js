import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "./Header";
import * as auth from "../utils/Auth";

function Registration(props) {
  const navigate = useNavigate();
  const { registration } = props;
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
    if (email) {
      registration(username, password, email, { navigate });
    }
  };

  return (
    <>
      <Header link={"/login"} linkName={"Войти"} />
      <div className="authorization__container">
        <h2 className="authorization__title">Регистрация</h2>
        <form className="authorization__form" onSubmit={handleSubmit}>
          <fieldset className="authorization__top-fieldset">
            <input
              required
              value={email}
              placeholder="Email"
              className="authorization__input"
              name="email"
              type="email"
              onChange={handleEmail}
            />
            <input
              required
              value={password}
              minLength={4}
              placeholder="Password"
              className="authorization__input"
              name="password"
              type="password"
              onChange={handlePassword}
            />
          </fieldset>
          <button className="authorization__submit-button" type="submit">
            Зарегистрироваться
          </button>
          <p className="authorization__description">
            Уже зарегистрированы?{" "}
            <Link to="/login" className="authorization__description-link">
              Войти
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Registration;
