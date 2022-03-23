import './index.css'
import { FormValidator } from './scripts/FormValidator.js'
import {
    initialCards,
    formsValidationConfig,
    overlayImage,
    buttonProfile,
    nameInput,
    jobInput,
    profileUserName,
    profileUserStatus,
    profilePopupForm,
    buttonCreate,
    popupCard,
    page,
}
from './scripts/utils/constants.js'
import { Card } from './scripts/components/Card.js'
import Section from './scripts/components/Section.js'
import PopupWithForm from './scripts/utils/PopupWithForm.js'
import PopupWithImage from './scripts/utils/PopupWithImage.js'
import UserInfo from './scripts/components/UserInfo.js'

const profileFormValidator = new FormValidator(formsValidationConfig, profilePopupForm);
const cardFormValidator = new FormValidator(formsValidationConfig, popupCard);

const createCard = (item) => {
    const card = new Card(item, '#element-template', handleCard);
    const cardElement = card.fillingCard();
    return cardElement;
}

const renderCard = (item) => {
    const card = createCard(item);
    cardsList.addItem(card);
}

const cardsList = new Section({
        items: initialCards,
        renderer: renderCard
    },
    page
);

const popupWithImage = new PopupWithImage(overlayImage);

const handleCard = (evt) => {
    const data = {
        name: evt.target.alt,
        link: evt.target.src
    }
    popupWithImage.open(data);
}

const cardPopup = new PopupWithForm(popupCard, {
    submitFormCallBack: (data) => {
        const itemArray = {
            name: data.elementName,
            link: data.elementLink
        };
        renderCard(itemArray);
        cardPopup.close()
    }
});

const popupProfil = new PopupWithForm(profilePopupForm, {
    submitFormCallBack: (data) => {
        userInfo.setUserInfo(data);
        popupProfil.close();
    }
});

const userInfo = new UserInfo({
    data: {
        name: profileUserName,
        job: profileUserStatus
    }
});

buttonProfile.addEventListener('click', () => {
    const data = userInfo.getUserInfo();
    nameInput.value = data.name;
    jobInput.value = data.job;
    popupProfil.open();
});

buttonCreate.addEventListener('click', () => {
    cardPopup.open();
});

cardsList.renderItems();
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
popupWithImage.setEventListeners();
cardPopup.setEventListeners();
popupProfil.setEventListeners();