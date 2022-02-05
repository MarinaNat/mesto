const buttonProfile = document.querySelector('.profile__button-edit');
const buttonClose = document.querySelector('.popup__close-btn ');
const overlay = document.querySelector('.overlay');
const overlayProfile = document.querySelector('.overlay_profile');
const overlayCard = document.querySelector('.overlay_element');
const overlayImage = document.querySelector('.overlay_image');
const overlayActive = 'overlay_active';
const profileInfo = document.querySelector('.profile__info');
const buttonSave = document.querySelector('.popup__save-btn');
const nameInput = document.querySelector('.popup__user_type_name');
const jobInput = document.querySelector('.popup__user_type_status');
const profileUserName = document.querySelector('.profile__user-name');
const profileUserStatus = document.querySelector('.profile__user-status');
const profilePopupForm = document.querySelector('.popup_profile');
const cardAll = document.querySelector('.elements');
const buttonCreate = document.querySelector('.profile__button-add');
const cardNameInput = document.querySelector('.popup__element_type_name');
const cardLinkInput = document.querySelector('.popup__element_type_link');
const buttonCloseCard = document.querySelector('.popup__close-btn_element');
const buttonSaveCard = document.querySelector('.popup__save-btn_element');
const popupCard = document.querySelector('.popup_card');
const picture = document.querySelector('.full-screen__image');
const pictureTitle = document.querySelector('.full-screen__title');
const buttonCloseFullImage = document.querySelector('.full-screen__close-btn');

buttonCreate.addEventListener('click', () => openPopup(overlayCard));

function deleteCard(e) {
    e.target.closest('.element').remove();
}

function like(event) {
    event.target.classList.toggle('element__like_active');
}

buttonCloseFullImage.addEventListener('click', () => {
    closePopup(overlayImage)
});

//функция добавления карточек
function fillingCard(name, link) {
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
    overlay.addEventListener('click', clickOverlay);
    cardFoto.addEventListener('click', function() {
        pictureTitle.textContent = name;
        picture.src = link;
        picture.alt = name;
        openPopup(overlayImage);
    });
    return cardElement;
};

function renderCard(cardElement) {
    cardAll.prepend(fillingCard(cardElement.name, cardElement.link));
}
//Перебор массива для создания карточек
initialCards.forEach(function(initialCards) {
    renderCard(initialCards);
});

function closePopupCard() {
    cardNameInput.value = '';
    cardLinkInput.value = '';
    closePopup(overlayCard);
}

buttonCloseCard.addEventListener('click', closePopupCard)
    //создание карточек из попапа
function newfillingCards(e) {
    e.preventDefault();
    fillingCard(cardLinkInput.value, cardNameInput);
    cardAll.prepend(fillingCard(cardNameInput.value, cardLinkInput.value))
    closePopupCard()
}

popupCard.addEventListener('submit', newfillingCards);

function openPopupProfile(event) {
    event.preventDefault();
    nameInput.value = profileUserName.textContent;
    jobInput.value = profileUserStatus.textContent;
    openPopup(overlayProfile);
}

buttonProfile.addEventListener('click', openPopupProfile);

function openPopup(overlay) {
    overlay.classList.add(overlayActive);
    document.addEventListener('keydown', clickEsc);
    overlay.addEventListener('click', clickOverlay);
}

function closePopup(overlay) {
    overlay.classList.remove(overlayActive);
}

buttonClose.addEventListener('click', () => {
    closePopup(overlayProfile)
});

function clickOverlay(event) {
    if (event.target.classList.contains('overlay')) {
        closePopup(event.target);
    }
}

function clickEsc(event) {
    if (event.code === 'Escape') {
        const esc = document.querySelector('.overlay_active');
        closePopup(esc);
    }
}

function submiteProfileForm(event) {
    event.preventDefault();
    profileUserName.textContent = nameInput.value;
    profileUserStatus.textContent = jobInput.value;
    closePopup(overlayProfile)
};

profilePopupForm.addEventListener('submit', submiteProfileForm);