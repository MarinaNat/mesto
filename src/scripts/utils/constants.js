export const initialCards = [{
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

export const formsValidationConfig = {
    formSelector: '.popup_form',
    inputSelector: '.popup__input',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'error_state_visible',
    submitButtonSelector: '.popup__save-btn',
    inactiveButtonClass: 'popup__save-btn_disabled',
}

export const overlayImage = document.querySelector('#overlay_image');
export const picture = document.querySelector('.full-screen__image');
export const pictureTitle = document.querySelector('.full-screen__title');
export const buttonProfile = document.querySelector('.profile__button-edit');
export const buttonClose = document.querySelector('.popup__close-btn ');
export const overlayProfile = document.querySelector('.overlay_profile');
export const overlayCard = document.querySelector('.overlay_element');
export const overlayActive = 'overlay_active';
export const nameInput = document.querySelector('#user-name');
export const jobInput = document.querySelector('#user-status');
export const profileUserName = document.querySelector('.profile__user-name');
export const profileUserStatus = document.querySelector('.profile__user-status');
export const profilePopupForm = document.querySelector('#popup_profile');
export const buttonCreate = document.querySelector('.profile__button-add');
export const cardNameInput = document.querySelector('.popup__element_type_name');
export const cardLinkInput = document.querySelector('.popup__element_type_link');
export const buttonCloseCard = document.querySelector('.popup__close-btn_element');
export const popupCard = document.querySelector('#popup_card');
export const buttonCloseFullImage = document.querySelector('.full-screen__close-btn');
export const cardTemplateSelector = '#element-template';
export const page = document.querySelector('.elements');