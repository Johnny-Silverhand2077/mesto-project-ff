import { initialCards } from "../cards";
import { handleLikeClick } from "./modal";
import { openModal } from "./modals";

const templateCard = document.querySelector("#card-template").content;
const placesContent = document.querySelector(".places");
const placesList = placesContent.querySelector(".places__list");
const popupImage = document.querySelector(".popup_type_image");

function createCard(element, deleteCard, handleLikeClick, handleOpenImage) {
  const templateCardCopy = templateCard.cloneNode("true");
  const cardImage = templateCardCopy.querySelector(".card__image");
  const cardTitle = templateCardCopy.querySelector(".card__title");
  const deleteButton = templateCardCopy.querySelector(".card__delete-button");
  const likeButton = templateCardCopy.querySelector(".card__like-button");

  cardTitle.textContent = element.name;
  cardImage.src = element.link;
  cardImage.alt = element.alt;

  cardImage.addEventListener("click", () =>
    handleOpenImage(cardImage.src, cardTitle.textContent)
  );

  deleteButton.addEventListener("click", deleteCard);
  likeButton.addEventListener("click", handleLikeClick);

  return templateCardCopy;
}

function deleteCard(element) {
  const deleteCard = element.target.closest(".card");
  deleteCard.remove();
}

initialCards.forEach(function (element) {
  const cardItem = createCard(
    element,
    deleteCard,
    handleLikeClick,
    handleOpenImage
  );
  placesList.append(cardItem);
});

function handleOpenImage(imageLink, imageName) {
  const imageElement = document.querySelector(".popup__image");
  const captionElement = document.querySelector(".popup__caption");

  imageElement.src = imageLink;
  imageElement.alt = imageName;

  captionElement.textContent = imageName;

  openModal(popupImage);
}

export { placesList, createCard, deleteCard, handleOpenImage };
