import { removeCard, likeCard, unLikeCard } from "./api";

const template = document.querySelector("#card-template").content;

function createCard(
  element, 
  deleteCard,
  handleLikeClick,
  handleOpenImage,
  userId
) {
  const templateCopy = template.cloneNode(true).querySelector(".card");
  const cardImage = templateCopy.querySelector(".card__image");
  const cardTitle = templateCopy.querySelector(".card__title");
  const deleteButton = templateCopy.querySelector(".card__delete-button");
  const likeButton = templateCopy.querySelector(".card__like-button");
  const likeCounter = templateCopy.querySelector('.card__like-counter')
  

  likeCounter.textContent = element.likes.length;

  cardTitle.textContent = element.name;
  cardImage.src = element.link;
  cardImage.alt = element.name;

  cardImage.addEventListener("click", () =>
    handleOpenImage(cardImage.src, cardTitle.textContent)
  );

  

  if (element.owner._id === userId) {
    
    deleteButton.addEventListener("click", (evt) => {
      deleteCard(evt, element._id);
    });
  } else {
    deleteButton.remove();
  }

  const isUserLike = element.likes.some((item) => {
    return item._id === userId;
  });
  if (isUserLike) {
    likeButton.classList.add("card__like-button_is-active");
  }
  likeButton.addEventListener("click", (evt) =>
    handleLikeClick(evt, element._id)
  );

  return templateCopy;
}

function deleteCard(element, cardId) {
  const item = element.target.closest(".card");
  removeCard(cardId)
    .then(() => {
      item.remove();
    })
    .catch((err) => console.log(err));
}

function handleLikeClick(evt, cardId) {
  const item = evt.target.closest(".card");
  const likeCount = item.querySelector(".card__like-counter");
  if (evt.target.classList.contains("card__like-button_is-active")) {
    unLikeCard(cardId)
    .then((res) => {
      evt.target.classList.remove("card__like-button_is-active");
      likeCount.textContent = res.likes.length;
    })
    .catch((err) => console.log(err))
  } else {
    likeCard(cardId).then((res) => {
      evt.target.classList.add("card__like-button_is-active");
      likeCount.textContent = res.likes.length;
      
    })
    .catch((err) => console.log(err))
  }
}

export { createCard, deleteCard, handleLikeClick };
