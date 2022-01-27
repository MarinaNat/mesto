const buttonProfile = document.querySelector('.profile__button-edit');
const buttonClose = document.querySelector('.popup__close-btn ');
const overlay = document.querySelector('.overlay');
const overlayCard = document.querySelector('.overlay_element');
const overleyImage = document.querySelector('.overlay_image');
let overlayActive = 'overlay_active';
let profileInfo = document.querySelector('.profile__info');
let buttonSave = document.querySelector('.popup__save-btn');
let nameInput = document.querySelector('.popup__user_type_name');
let jobInput = document.querySelector('.popup__user_type_status');
let profileUserName = document.querySelector('.profile__user-name');
let profileUserStatus = document.querySelector('.profile__user-status');
let popup = document.querySelector('.popup');
let cardAll = document.querySelector('.elements');
const buttonCreate = document.querySelector('.profile__button-add');
let cardNameInput = document.querySelector('.popup__element_type_name');
let cardLinkInput = document.querySelector('.popup__element_type_link');
let buttonCloseCard = document.querySelector('.popup__close-btn_element');
let buttonSaveCard = document.querySelector('.popup__save-btn_element');
let popupCard = document.querySelector('.popup_card');
const picture = document.querySelector('.full-screen__image');
const pictureTitle = document.querySelector('.full-screen__title');
const buttonCloseFullImage = document.querySelector('.full-screen__close-btn');


const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

function openPopupCard(event) {
    event.preventDefault();
    overlayCard.classList.add(overlayActive);
}

buttonCreate.addEventListener('click', openPopupCard);

function deleteCard(e) {
    e.target.closest('.element').remove();
}

function like(event) {
    event.target.classList.toggle('element__like_active');
}

function openFullImage() {
    overleyImage.classList.add(overlayActive);
}

function closeFullImage() {
    overleyImage.classList.remove(overlayActive);
}
buttonCloseFullImage.addEventListener('click', closeFullImage);

//функция добавления карточек
function fillingCards(name, link) {
    const cardTemplate = document.querySelector('#element-template').content.querySelector('.element');
    const cardElement = cardTemplate.cloneNode(true);
    const cardFoto = cardElement.querySelector('.element__foto');
    const cardText = cardElement.querySelector('.element__text');
    const likeButton = cardElement.querySelector('.like');
    const deleteButton = cardElement.querySelector('.element__delete-btn');
    cardFoto.src = link;
    cardText.textContent = name;
    cardFoto.alt = link;
    likeButton.addEventListener('click', like);
    deleteButton.addEventListener('click', deleteCard);
    cardFoto.addEventListener('click', function() {
        pictureTitle.textContent = name;
        picture.src = link;
        picture.alt = name;
        openFullImage()
    });
    return cardElement;
};

function renderCard(cardElement) {
    cardAll.prepend(fillingCards(cardElement.name, cardElement.link));
}
//Перебор массива для создания карточек
initialCards.forEach(function(initialCards) {
    renderCard(initialCards);
});

function closePopupCard() {
    overlayCard.classList.remove(overlayActive);
    cardNameInput.value = '';
    cardLinkInput.value = '';
}

buttonCloseCard.addEventListener('click', closePopupCard)
    //создание карточек из попапа
function NewfillingCards(e) {
    e.preventDefault();
    fillingCards(cardLinkInput.value, cardNameInput);
    cardAll.prepend(fillingCards(cardNameInput.value, cardLinkInput.value))
    closePopupCard()
}

popupCard.addEventListener('submit', NewfillingCards);

function openPopup(event) {
    event.preventDefault();
    nameInput.value = profileUserName.textContent;
    jobInput.value = profileUserStatus.textContent;
    overlay.classList.add(overlayActive);
}

buttonProfile.addEventListener('click', openPopup);

function closePopup() {
    overlay.classList.remove(overlayActive);
}

buttonClose.addEventListener('click', closePopup);

function clickOverlay(event) {
    if (event.target === overlay) {
        closePopup();
    }
}
overlay.addEventListener('click', clickOverlay);

function clickEsc(event) {
    if (event.code === 'Escape') {
        closePopup();
    }
}

document.addEventListener('keydown', clickEsc);

function formSubmitHandler(event) {
    event.preventDefault();
    profileUserName.textContent = nameInput.value;
    profileUserStatus.textContent = jobInput.value;
    closePopup()
};
popup.addEventListener('submit', formSubmitHandler);