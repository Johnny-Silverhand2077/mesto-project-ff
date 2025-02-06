import "./styles/index.css"; 
import {initialCards} from "./cards.js"; 
import {closeModal, openModal} from "./components/modal.js"; 
import {createCard, deleteCard, placesList, handleLikeClick} from "./components/card.js"; 
 
const popupCard = document.querySelector('.popup_type_new-card');
const popupAddCard = document.querySelector('.profile__add-button');

const popupEdit = document.querySelector('.popup_type_edit');
const popupButtonEdit = document.querySelector('.profile__edit-button');

const profileTitleElement = document.querySelector('.profile__title');
const profileDescriptionElement = document.querySelector('.profile__description');

const formEditProfile = document.forms['edit-profile'];
const nameInput = formEditProfile.elements.name;
const descriptionInput = formEditProfile.elements.description;

const formCardElement = document.forms['new-place'];
const nameCardInput = formCardElement.elements['place-name'];
const linkCardInput = formCardElement.elements.link;

const closeButtons = document.querySelectorAll('.popup__close');

const popupImage = document.querySelector('.popup_type_image');
const imageElement = document.querySelector('.popup__image');
const captionElement = document.querySelector('.popup__caption');

initialCards.forEach(function (element) {
    const card = createCard(element, deleteCard, handleLikeClick, handleOpenImage);
    placesList.append(card);
});


function handleOpenImage(imageLink, imageName) {

    imageElement.src = imageLink;
    imageElement.alt = imageName;

    captionElement.textContent = imageName;

    openModal(popupImage);
}


function handleCardFormSubmit(evt) {
    evt.preventDefault();

    const nameCardValue = nameCardInput.value;
    const linkCardValue = linkCardInput.value;

    const newCard = createCard({
        name: nameCardValue,
        link: linkCardValue,
        alt: nameCardValue
    }, deleteCard, handleLikeClick, handleOpenImage);

    list.prepend(newCard);

    closeModal(popupCard);
    formCardElement.reset();
}


formCardElement.addEventListener('submit', handleCardFormSubmit);
function handleEditProfile(nameValue, descriptionValue) {
    profileTitleElement.textContent = nameValue;
    profileDescriptionElement.textContent = descriptionValue;
}


function handleFormSubmit(evt) {
    evt.preventDefault();
    handleEditProfile(nameInput.value, descriptionInput.value);
    closeModal(popupEdit);
}



formEditProfile.addEventListener('submit', handleFormSubmit);
popupAddCard.addEventListener('click', function () {
    openModal(popupCard);
});
popupButtonEdit.addEventListener('click', function () {
    openModal(popupEdit);
    nameInput.value = profileTitleElement.textContent;
    descriptionInput.value = profileDescriptionElement.textContent;
});
closeButtons.forEach(function (button)  {
    button.addEventListener('click', function () {
        const popupElement = button.closest('.popup');
        closeModal(popupElement);
    });
});
