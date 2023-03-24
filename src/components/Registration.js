import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import AuthForm from "./AuthForm";

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
      <AuthForm
        title="Регистрация"
        buttonText="Зарегистрироваться"
        handleSubmit={handleSubmit}
        handleEmail={handleEmail}
        handlePassword={handlePassword}
        description="Уже зарегестрированы?"
        link="/login"
        linkTitle="Войти"
      />
    </>
  );
}

export default Registration;
