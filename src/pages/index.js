import './index.css'
import { FormValidator } from '../components/FormValidator.js'
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
from '../utils/constants.js'
import { Card } from '../components/Card.js'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js'

const profileFormValidator = new FormValidator(formsValidationConfig, profilePopupForm);
const cardFormValidator = new FormValidator(formsValidationConfig, popupCard);

const createCard = (item) => {
    const card = new Card(item, '#element-template', (item) => handleCard(item));
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

const handleCard = (item) => {
    const data = {
        name: item.name,
        link: item.link
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
    profileFormValidator.resetError();
});

buttonCreate.addEventListener('click', () => {
    cardPopup.open();
    cardFormValidator.setSubmitButtonState();
    cardFormValidator.resetError();
});

cardsList.renderItems();
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
popupWithImage.setEventListeners();
cardPopup.setEventListeners();
popupProfil.setEventListeners();