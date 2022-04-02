import './index.css'
import { FormValidator } from '../components/FormValidator.js'
import {

    formsValidationConfig,
    overlayImage,

    buttonProfile,
    buttonAvatar,
    buttonCreate,

    nameInput,
    aboutInput,

    profileUserName,
    profileUserStatus,
    profileUserAvatar,

    profilePopupForm,
    avatarPopupForm,
    popupCard,

    page,
}
from '../utils/constants.js'
import { Card } from '../components/Card.js'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js'
import API from '../components/Api.js'

export let userId

const userInfoData = {
    name: profileUserName,
    about: profileUserStatus,
    avatar: profileUserAvatar
};

const userInfo = new UserInfo(userInfoData);

export const api = new API({
    url: 'https://mesto.nomoreparties.co/v1/cohort-38',
    headers: {
        authorization: '143aa2a9-cefa-4929-a9d6-e76e666a89c9',
        'Content-Type': 'application/json'
    }
});

api.getProfile().then((userData) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
});

api.getCard().then((cardList) => {
    cardList.forEach(data => {
        const card = createCard({
            name: data.name,
            link: data.link,
            likes: data.likes,
            id: data._id,
            userId: userId,
            ownerId: data.owner._id
        })
        section.addItem(card)
    });

});

const profileFormValidator = new FormValidator(formsValidationConfig, profilePopupForm);
const avatarFormValidator = new FormValidator(formsValidationConfig, avatarPopupForm)
const cardFormValidator = new FormValidator(formsValidationConfig, popupCard);

const createCard = (data) => {
    const card = new Card(
        data,
        '#element-template',
        (item) =>
        handleCard(item),
        (id) => {
            confirmPopup.open()
            confirmPopup.changeSubmitHandler(() => {
                api.deleteCard(id)
                    .then(res => {
                        card.deleteCard()
                        confirmPopup.close()
                    })
            })
        },
        (id) => {
            if (card.isLiked()) {
                api.deleteLike(id)
                    .then(res => {
                        card.setLikes(res.likes)
                    })

            } else {
                api.addLike(id)
                    .then(res => {
                        card.setLikes(res.likes)
                    })
            }
        }
    );
    const cardElement = card.fillingCard();
    return cardElement;
}

const renderCard = (item) => {
        const card = createCard(item);
        section.addItem(card);
    }
    //создание карточек из массива
const section = new Section({
        renderer: renderCard
    },
    page
);

const popupWithImage = new PopupWithImage(overlayImage);

const handleCard = (item) => {
    const data = {
        name: item.name,
        link: item.link,
        id: item._id,
        ownerId: item.ownerId,
        likes: item.likes,
        userId: userId,
        //ownerId: item.owner._id
    }
    popupWithImage.open({ name: data.name, link: data.link });
}

//создание карточки из попапа
const cardPopup = new PopupWithForm(popupCard, (data) => {

    // отправка карточки на сервер
    api.addCard(data)
        .then((res) => {
            const card = createCard({
                name: res.name,
                link: res.link,
                likes: res.likes,
                id: res._id
            });
            section.addItem(card);
            cardPopup.close()
        });
});

//редактирование профиля
const editProfilPopup = new PopupWithForm(profilePopupForm, (userData) => {
    editProfilPopup.renderLoading(true);
    api.editProfile(userData)
        .then((obj) => {
            userInfo.setUserInfo(obj);
            editProfilPopup.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            editProfilPopup.renderLoading(false);
        })
});

//редактирование аватарки
const popupAvatar = new PopupWithForm(avatarPopupForm, (avatarData) => {
    popupAvatar.renderLoading(true);
    api.updateUserAvatar(avatarData)
        .then((obj) => {
            userInfo.setUserAvatar(obj);
            popupAvatar.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            popupAvatar.renderLoading(false);
        })
});

//слушатель на кнопку открытия попапа "Редактирование профиля"
buttonProfile.addEventListener('click', () => {
    const data = userInfo.getUserInfo();
    nameInput.value = data.name;
    aboutInput.value = data.about;
    editProfilPopup.open();
    editProfilPopup.renderLoading(false);
    profileFormValidator.resetError();
});

//слушатель на кнопку открытия попапа "Редактирование аватара"
buttonAvatar.addEventListener('click', () => {
    popupAvatar.open();
    popupAvatar.renderLoading(false);
    avatarFormValidator.resetError();
});

//слушатель на кнопку открытия попапа "Добавление новой карточки"
buttonCreate.addEventListener('click', () => {
    cardPopup.open();
    cardFormValidator.setSubmitButtonState();
    cardFormValidator.resetError();
    cardPopup.renderLoading(false);
});

//для удаления карточки
const confirmPopup = new PopupWithForm('.popup_type_delete-confirm')

profileFormValidator.enableValidation(); //вызов валидации попапа профиля
avatarFormValidator.enableValidation() //вызов валидации попапа аватара
cardFormValidator.enableValidation(); //вызов валидации попапа добавления карточек
popupWithImage.setEventListeners();
cardPopup.setEventListeners();
editProfilPopup.setEventListeners();
popupAvatar.setEventListeners()
confirmPopup.setEventListeners()