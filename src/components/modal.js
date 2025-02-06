import { deleteCard, handleOpenImage } from "./card";
import { openModal, closeModal } from "./modals";

const popupCard = document.querySelector(".popup_type_new-card");
const popupAddCard = document.querySelector(".profile__add-button");

const popupEdit = document.querySelector(".popup_type_edit");
const popupEditButton = document.querySelector(".profile__edit-button");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const formElement = document.forms["edit-profile"];
const nameInput = formElement.elements.name;
const descriptionInput = formElement.elements.description;

const formCardElement = document.forms["new-place"];
const nameCardInput = formCardElement.elements["place-name"];
const linkCardInput = formCardElement.elements.link;
const cardList = document.querySelector(".places__list");
const popupImage = document.querySelector(".popup_type_image");

function handleAddCard(
  nameCardValue,
  linkCardValue,
  handleLikeClick,
  handleOpenImage
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.cloneNode(true);
  const cardName = cardElement.querySelector(".card__title");
  const cardLink = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardLink.src = linkCardValue;
  cardName.textContent = nameCardValue;

  likeButton.addEventListener("click", handleLikeClick);
  cardLink.addEventListener("click", () =>
    handleOpenImage(linkCardValue, nameCardValue)
  );
  cardList.prepend(cardElement);
  deleteButton.addEventListener("click", deleteCard);
  popupCard.classList.remove("popup_is-opened");

  formCardElement.reset();
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  handleAddCard(
    nameCardInput.value,
    linkCardInput.value,
    handleLikeClick,
    handleOpenImage
  );
}

formCardElement.addEventListener("submit", handleCardFormSubmit);

function handleEditProfile(nameValue, descriptionValue) {
  profileTitle.textContent = nameValue;
  profileDescription.textContent = descriptionValue;
  popupEdit.classList.remove("popup_is-opened");
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  handleEditProfile(nameInput.value, descriptionInput.value);
}

formElement.addEventListener("submit", handleFormSubmit);

function handleOpenModal(modalWindow, element) {
  if (element === popupCard) {
    modalWindow.addEventListener("click", function () {
      openModal(element);
    });
  } else {
    modalWindow.addEventListener("click", function () {
      openModal(element);
      nameInput.value = profileTitle.textContent;
      descriptionInput.value = profileDescription.textContent;
    });
  }
}

handleOpenModal(popupAddCard, popupCard);
handleOpenModal(popupEditButton, popupEdit);

function handleCloseModal(modalWindow) {
  const popupCloses = modalWindow.querySelector(".popup__close");
  popupCloses.addEventListener("click", function () {
    closeModal(modalWindow);
  });
}
handleCloseModal(popupCard);
handleCloseModal(popupEdit);
handleCloseModal(popupImage);

export function handleLikeClick(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}
