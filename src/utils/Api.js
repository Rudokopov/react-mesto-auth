const jwt = localStorage.getItem("jwt");

class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkStatus);
  }

  getMyUserId() {
    this._request(`${this._url}/users/me`, {
      headers: this._headers,
    });
  }

  getInitialCards() {
    return this._request(`${this._url}/cards`, {
      headers: this._headers,
    });
  }

  addNewCard({ name, image }) {
    return this._request(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: image,
      }),
    });
  }

  getProfileInfo() {
    return this._request(`${this._url}/users/me`, {
      headers: this._headers,
    });
  }

  changeProfileInfo({ name, description }) {
    return this._request(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about: description,
      }),
    });
  }

  deleteCard(id) {
    return this._request(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  likeCard(card) {
    return this._request(`${this._url}/cards/${card._id}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  deleteLike(card) {
    return this._request(`${this._url}/cards/${card._id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  setNewAvatar({ imageAvatar }) {
    return this._request(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: imageAvatar,
      }),
    });
  }
}

const api = new Api({
  url: "http://localhost:3000",
  headers: {
    authorization: jwt,
    "Content-Type": "application/json",
  },
});

export { api };
