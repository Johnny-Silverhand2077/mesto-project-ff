import "./styles/index.css";

import { closeModal, openModal } from "./components/modal.js";
import { createCard, deleteCard, handleLikeClick } from "./components/card.js";
import {
  enableValidation,
  clearValidation,
  validationConfig,
} from "./components/validation.js";
import {
  getUserInfo,
  getInitialCards,
  editProfile,
  updateUserAvatar,
  createNewCard,
} from "./components/api.js";

const placesContainer = document.querySelector(".places");
const placesList = placesContainer.querySelector(".places__list");
const popupCard = document.querySelector(".popup_type_new-card");
const popupAddCard = document.querySelector(".profile__add-button");
const popupEdit = document.querySelector(".popup_type_edit");
const popupButtonEdit = document.querySelector(".profile__edit-button");
const profileTitleElement = document.querySelector(".profile__title");
const profileDescriptionElement = document.querySelector(
  ".profile__description"
);
const profileImage = document.querySelector(".profile__image");
const formEditProfile = document.forms["edit-profile"];
const nameInput = formEditProfile.elements.name;
const descriptionInput = formEditProfile.elements.description;
const formEditSubmitButton = formEditProfile.querySelector(".popup__button");
const formCardElement = document.forms["new-place"];
const nameCardInput = formCardElement.elements["place-name"];
const linkCardInput = formCardElement.elements.link;
const formCardSubmitButton = formCardElement.querySelector(".popup__button");
const closeButtons = document.querySelectorAll(".popup__close");
const popupImage = document.querySelector(".popup_type_image");
const imageElement = document.querySelector(".popup__image");
const captionElement = document.querySelector(".popup__caption");
const profileAvatarForm = document.forms["edit-avatar"];
const profileAvatarSubmitbutton =
  profileAvatarForm.querySelector(".popup__button");
const popupAvatar = document.querySelector(".popup_type_edit-avatar");
const popupAvatarInput = document.querySelector(".popup__input_type_url");

let userId;

enableValidation(validationConfig);

function renderLoading(popupSubmit, isLoading) {
  if (isLoading) {
    popupSubmit.textContent = "Сохранение...";
  } else {
    popupSubmit.textContent = "Сохранить";
  }
}

function handleOpenImage(imageLink, imageName) {
  imageElement.src = imageLink;
  imageElement.alt = imageName;

  captionElement.textContent = imageName;

  openModal(popupImage);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(formCardSubmitButton, true);
  createNewCard(nameCardInput.value, linkCardInput.value)
    .then((res) => {
      placesList.prepend(
        createCard(res, 
          deleteCard,
          handleLikeClick,
          handleOpenImage,
          userId,
        )
      );
      formCardElement.reset();
      closeModal(popupCard);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(formCardSubmitButton, false);
    });
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(formEditSubmitButton, true);
  editProfile(nameInput.value, descriptionInput.value)
    .then((res) => {
      profileTitleElement.textContent = nameInput.value;
      profileDescriptionElement.textContent = descriptionInput.value;
      closeModal(popupEdit);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(formEditSubmitButton, false);
    });
}

function handleAvatarSubmit(evt) {
  evt.preventDefault();
  renderLoading(profileAvatarSubmitbutton, true);
  updateUserAvatar(popupAvatarInput.value)
    .then((res) => {
      profileImage.setAttribute("style", `background-image: url('${res.avatar}')`);
      profileAvatarForm.reset();
      closeModal(popupAvatar);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(profileAvatarSubmitbutton, false);
    });
}

formEditProfile.addEventListener("submit", handleFormSubmit);
formCardElement.addEventListener("submit", handleCardFormSubmit);
profileAvatarForm.addEventListener("submit", handleAvatarSubmit);

popupAddCard.addEventListener("click", function () {
  clearValidation(popupCard, validationConfig);
  openModal(popupCard);
});

popupButtonEdit.addEventListener("click", function () {
  openModal(popupEdit);
  nameInput.value = profileTitleElement.textContent;
  descriptionInput.value = profileDescriptionElement.textContent;
});

closeButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const popupElement = button.closest(".popup");
    closeModal(popupElement);
  });
});

profileImage.addEventListener("click", () => {
  clearValidation(popupAvatar, validationConfig);
  openModal(popupAvatar);
});

Promise.all([getUserInfo(), getInitialCards()])
  .then((result) => {
    profileImage.setAttribute(
      "style",
      `background-image: url('${result[0].avatar}')`
    );
    profileTitleElement.textContent = result[0].name;
    profileDescriptionElement.textContent = result[0].about;
    userId = result[0]._id;
    result[1].forEach((item) => {
      placesList.append(
        createCard(item, deleteCard, handleLikeClick, handleOpenImage, userId)
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });