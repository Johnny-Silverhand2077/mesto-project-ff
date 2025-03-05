const config = {
  baseUrl: `https://nomoreparties.co/v1/wff-cohort-33`,
  headers: {
    authorization: "8e006fda-5d15-4d58-9886-d6a87150c44c",
    "Content-Type": "application/json",
  },
};

function handleResponse(res)  {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status}`);
};

function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, { headers: config.headers }).then(
    (res) => handleResponse(res)
  );
}

function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => handleResponse(res));
}



function editProfile(profileName, profileAbout) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: profileName,
      about: profileAbout,
    }),
  }).then((res) => handleResponse(res));
}

function updateUserAvatar(avatarLink) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink,
    }),
  }).then((res) => handleResponse(res));
}

function createNewCard(cardName, cardLink) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink,
    }),
  }).then((res) => handleResponse(res));
}

function removeCard(cardID) {
  return fetch(`${config.baseUrl}/cards/${cardID}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => handleResponse(res));
}

function likeCard(cardID) {
  return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => handleResponse(res));
}

function unLikeCard(cardID) {
  return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => handleResponse(res));
}

export {
  getUserInfo,
  getInitialCards,
  editProfile,
  updateUserAvatar,
  createNewCard,
  removeCard,
  likeCard,
  unLikeCard,
};
