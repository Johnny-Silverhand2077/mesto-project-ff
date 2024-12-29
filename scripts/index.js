const templateCard = document.querySelector("#card-template").content;
const placesContent = document.querySelector(".places");
const placesList = placesContent.querySelector(".places__list");

function createCard(element, deleteCard) {
  const templateCardCopy = templateCard.cloneNode("true");
  templateCardCopy.querySelector(".card__title").textContent = element.name;
  templateCardCopy.querySelector(".card__image").src = element.link;
  templateCardCopy.querySelector(".card__image").src = element.link;
  templateCardCopy
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCard);
  return templateCardCopy;
}

function deleteCard(element) {
  const deleteCard = element.target.closest(".card");
  deleteCard.remove();
}

initialCards.forEach(function (element) {
  const cardItem = createCard(element, deleteCard);
  placesList.append(cardItem);
});
