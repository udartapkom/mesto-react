class Api {
  constructor(token, cohort, serverUrl) {
    this._token = token;
    this._cohort = cohort;
    this._serverUrl = serverUrl;
  }

  getCards() {
    //нужно вызвать этот метод после добавления карточки, но после завершения запроса setNewCard
    return fetch(`${this._serverUrl}/v1/${this._cohort}/cards`, {
      headers: {
        authorization: this._token,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(
        `Ошибка получения карточек! Неверный запрос: ${res.status}, ${res.statusText}`
      );
    });
  }

  setNewCard(name, link) {
    return fetch(`${this._serverUrl}/v1/${this._cohort}/cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `${name}`,
        link: `${link}`,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(
        `Ошибка добавления карточки! Неверный запрос: ${res.status}, ${res.statusText}`
      );
    });
  }

  removeCard(cardId) {
    return fetch(`${this._serverUrl}/v1/${this._cohort}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(
        `Ошибка удаления карточки: ${res.status}, ${res.statusText}`
      );
    });
  }

  getProfileInfo() {
    return fetch(`${this._serverUrl}/v1/${this._cohort}/users/me`, {
      headers: {
        authorization: this._token,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(
        `Ошибка! Невозможно получить данные пользователя: ${res.status}, ${res.statusText}`
      );
    });
  }

  setProfileInfo(name, about) {
    return fetch(`${this._serverUrl}/v1/${this._cohort}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `${name}`,
        about: `${about}`,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(
        `Ошибка! Невозможно записать данные профиля: ${res.status}, ${res.statusText}`
      );
    });
  }

  setLikes(cardId) {
    return fetch(
      `${this._serverUrl}/v1/${this._cohort}/cards/likes/${cardId}`,
      {
        method: "PUT",
        headers: {
          authorization: this._token,
        },
      }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(
        `Ошибка! Лайк не поставлен: ${res.status}, ${res.statusText}`
      );
    });
  }

  delLikes(cardId) {
    return fetch(
      `${this._serverUrl}/v1/${this._cohort}/cards/likes/${cardId}`,
      {
        method: "DELETE",
        headers: {
          authorization: this._token,
        },
      }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(
        `Ошибка! Лайк не снят: ${res.status}, ${res.statusText}`
      );
    });
  }
  setAvatar(avatarURL) {
    return fetch(`${this._serverUrl}/v1/${this._cohort}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: `${avatarURL}`,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(
        `Ошибка! Аватар не обновлён: ${res.status}, ${res.statusText}`
      );
    });
  }
}
export default new Api(
  "ba6456b8-04fa-4ae4-bfc6-d88a7370f524",
  "cohort-16",
  "https://mesto.nomoreparties.co"
);
