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
    popupDeleteForm
}
from '../utils/constants.js'
import { Card } from '../components/Card.js'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js'
import API from '../Api.js'
import PopupDeleteForm from '../components/PopupDeleteForm'

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
    console.log('Ответ профиль: ')
    console.log(userData);
    userId = userData._id;
    userInfo.setUserInfo(userData);
    //userId = obj._id;
    //console.log('Ответ профильID: ')
    // console.log(userId);
});

api.getCard().then((cardList) => {
    console.log('Массив карточек, считанных с сервера: ');
    console.log(cardList);
    cardList.forEach(data => {
        const card = createCard({
            name: data.name,
            link: data.link,
            likes: data.likes,
            id: data._id
        })
        section.addItem(card)
    });
    // section.renderItems(cardList)
    // console.log('Раскрываем карты: ')
    //obj.forEach((item) => console.log(item));
    // }).catch((err) => {
    //     console.log('Ошибка карты')
    //     console.log(err)
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
        //  (item) => 
        //  handleDeleteCard(item));
        (id) => {
            console.log('id', id)
            console.log('cliked button')
            confirmPopup.open()
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
    // колбэк карты при нажатии на неё:
    // {
    //     name: this._name,
    //     link: this._link,
    //     id: this._id,
    //     ownerId: this._ownerId,
    //     likes: this._likes
    // }
    const data = {
        name: item.name,
        link: item.link,
        id: item._id,
        ownerId: item.ownerId,
        likes: item.likes
    }
    popupWithImage.open({ name: data.name, link: data.link });
}



// const popupDelConfirmation = new PopupDeleteForm(popupDeleteForm, (card) => {
//     api.deleteCard(card._id)
//         // .then(() => {

//     //     // удаление из html старого набора карточек
//     //     // нужно удалить из html старого набора карточек (иначе новые просто добавляются к старым)
//     //     const cards_section = document.querySelector('.elements')
//     //     const cards_number = cards_section.childElementCount
//     //     var counter = 0
//     //     while (counter < cards_number) {
//     //         cards_section.firstElementChild.remove();
//     //         counter++;
//     //     }

//     //     // загрузка карточек с сервера
//     //     api.getCard()
//     //         .then((obj) => {
//     //             cardsList.renderItems(obj); // отрисовка карточек
//     //         }).catch((err) => {
//     //             console.log('Ошибка карты')
//     //             console.log(err)
//     //         });

//     //     cardPopup.close()
//     // });

//     console.log('call-back handleConfirm from PopupDeleteForm: объект card:')
//     console.log(card)
//     console.log('call-back handleConfirm from PopupDeleteForm: card._id:')
//     console.log(card._id)
//     console.log('Сейчас выскочит алерт...')
//     alert('См. консоль')

// });

const handleDeleteCard = (card) => {
    popupDelConfirmation.open(card);
}

//создание карточки из попапа
const cardPopup = new PopupWithForm(popupCard, (data) => {

    // отправка карточки на сервер
    api.addCard(data)
        .then((res) => {
            console.log('res', res)
            const card = createCard({
                name: res.name,
                link: res.link,
                likes: res.likes,
                id: res._id
            });
            section.addItem(card);
            cardPopup.close()
                // удаление из html старого набора карточек
                // нужно удалить из html старого набора карточек (иначе новые просто добавляются к старым)
                // const cards_section = document.querySelector('.elements')
                // const cards_number = cards_section.childElementCount
                // var counter = 0
                // while (counter < cards_number) {
                //     cards_section.firstElementChild.remove();
                //     counter++;
                // }

            // загрузка карточек с сервера
            // api.getCard()
            //     .then((obj) => {
            //         section.renderItems(obj); // отрисовка карточек
            //     }).catch((err) => {
            //         console.log('Ошибка карты')
            //         console.log(err)
            //     });

            // cardPopup.close()
        });
});

//редактирование профиля
const editProfilPopup = new PopupWithForm(profilePopupForm, (userData) => {
    editProfilPopup.renderLoading(true);
    api.editProfile(userData)
        .then((obj) => {
            console.log('Попап профиля: ')
            console.log(obj)
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
            console.log('Попап аватар: ')
            console.log(obj)
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

const confirmPopup = new PopupWithForm('.popup_type_delete-confirm', () => {
    console.log('delete!')
    api.deleteCard('62484e073407a100bb44ae59')
        .then((res) => {
            console.log('res', res)
        })
})
profileFormValidator.enableValidation(); //вызов валидации попапа профиля
avatarFormValidator.enableValidation() //вызов валидации попапа аватара
cardFormValidator.enableValidation(); //вызов валидации попапа добавления карточек
popupWithImage.setEventListeners();
cardPopup.setEventListeners();
editProfilPopup.setEventListeners();
popupAvatar.setEventListeners()
confirmPopup.setEventListeners()