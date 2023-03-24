// auth.js
// Немного запутался в реализации checkStatus с функциональными компонентами, это было непривычно после классовых в Api
// Но не стал переписывать на классовые, а попытался сделать на функциональных, как мне кажется, выглядит топорно и сложно для восприятия
// Хотя возможно потому что я впервые такое вижу :) Дайте пожалуйста фидбек по поводу такой реализации, основная логика запросов лежит в app.js

export const BASE_URL = "https://api.nomoreparties.co";

export const checkStatus = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Что-то пошло не так: ${res.status}`);
};

export const register = (username, password, email) => {
  return fetch(`${BASE_URL}/auth/local/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password, email }),
  });
};

export const authorize = (identifier, password) => {
  return fetch(`${BASE_URL}/auth/local`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ identifier, password }),
  });
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
