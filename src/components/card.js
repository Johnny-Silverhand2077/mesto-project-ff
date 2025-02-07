

const template = document.querySelector('#card-template').content;

function createCard (element, deleteCard, handleLikeClick, handleOpenImage) {
    const templateCopy = template.cloneNode(true).querySelector('.card');
    const cardImage = templateCopy.querySelector('.card__image');
    const cardTitle = templateCopy.querySelector('.card__title');
    const deleteButton = templateCopy.querySelector('.card__delete-button');
    const likeButton = templateCopy.querySelector('.card__like-button');

    cardTitle.textContent = element.name;
    cardImage.src = element.link;
    cardImage.alt = element.alt;

    cardImage.addEventListener('click', () => handleOpenImage(cardImage.src, cardTitle.textContent));

    deleteButton.addEventListener('click', deleteCard);
    likeButton.addEventListener('click', handleLikeClick);

    return templateCopy;
}

function deleteCard(element) {
    const item = element.target.closest('.card');
    item.remove();
}
function handleLikeClick(evt) {
    if (evt.target.classList.contains('card__like-button')) {
        evt.target.classList.toggle('card__like-button_is-active');
    }
}

export {createCard, deleteCard, handleLikeClick};