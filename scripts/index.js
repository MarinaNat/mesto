import { FormValidator } from './FormValidator.js'
import { initialCards, formsValidationConfig, overlayImage } from './constants.js'
import { openPopup } from './utils.js'
import { Card } from './Card.js'

const buttonProfile = document.querySelector('.profile__button-edit');
const buttonClose = document.querySelector('.popup__close-btn ');
const overlay = document.querySelector('.overlay');
const overlayProfile = document.querySelector('.overlay_profile');
const overlayCard = document.querySelector('.overlay_element');
export const overlayActive = 'overlay_active';
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
const buttonCloseFullImage = document.querySelector('.full-screen__close-btn');
const cardTemplateSelector = '#element-template'

const editFormValidator = new FormValidator(formsValidationConfig, profilePopupForm);
const addCardValidator = new FormValidator(formsValidationConfig, popupCard);

editFormValidator.enableValidation()
addCardValidator.enableValidation()

buttonCreate.addEventListener('click', () => {
    disabledButton();
    openPopup(overlayCard);
});

function disabledButton() {
    const buttonSave = document.querySelector('.popup__save-btn_element');
    buttonSave.setAttribute('disabled', false);
    buttonSave.classList.add('popup__save-btn_disabled');
}

buttonCloseFullImage.addEventListener('click', () => {
    closePopup(overlayImage)
});

function renderCard(data, cardAll) {
    const card = new Card(data, cardTemplateSelector)
    cardAll.append(card.fillingCard());
}
//Перебор массива для создания карточек
initialCards.forEach(function(data) {
    renderCard(data, cardAll);
});

function closePopupCard() {
    closePopup(overlayCard);
    cardNameInput.value = '';
    cardLinkInput.value = '';
}

buttonCloseCard.addEventListener('click', closePopupCard)
    //создание карточек из попапа
function newfillingCards(e) {
    e.preventDefault();
    const data = {
        name: cardNameInput.value,
        link: cardLinkInput.value
    }
    const card = new Card(data, cardTemplateSelector)
    cardAll.prepend(card.fillingCard())
    closePopupCard();
}

popupCard.addEventListener('submit', newfillingCards);

function openPopupProfile(event) {
    event.preventDefault();
    nameInput.value = profileUserName.textContent;
    jobInput.value = profileUserStatus.textContent;
    openPopup(overlayProfile);
}

buttonProfile.addEventListener('click', openPopupProfile);

function closePopup(overlay) {
    overlay.classList.remove(overlayActive);
    document.removeEventListener('keydown', clickEsc);
    overlay.removeEventListener('click', clickOverlay);
}

buttonClose.addEventListener('click', () => {
    closePopup(overlayProfile)
});

export function clickOverlay(event) {
    if (event.target.classList.contains('overlay')) {
        closePopup(event.target);
    }
}

export function clickEsc(event) {
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