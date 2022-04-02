import API from "../Api"
import { api, userId } from "../pages";
import PopupDeleteForm from '../components/PopupDeleteForm'
import { popupDeleteForm } from '../utils/constants'

export class Card {
    constructor(data, cardTemplateSelector, handleImageClik, handleDeleteClik) {
            this._name = data.name
            this._link = data.link
            this._id = data.id
            this._likes = data.likes
                //this._ownerId = data.owner._id
            this._cardTemplateSelector = cardTemplateSelector
            this.handleImageClik = handleImageClik
            this._handleDeleteClik = handleDeleteClik
        }
        //получаем разметку карточки
    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardTemplateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
        return cardElement;
    }

    //наполняем карточку
    fillingCard() {
        this._element = this._getTemplate();
        this._setEventListeners()
            //заполнение
        this._cardFoto = this._element.querySelector('.element__foto');
        this._cardText = this._element.querySelector('.element__text');

        this._cardFoto.src = this._link;
        this._cardText.textContent = this._name;
        this._cardFoto.alt = this._name;
        this._setLikes()
        return this._element;
    };

    _like() {
        console.log('лайк this: ')
        console.log(this._likes.length)
        this._likeButton.classList.toggle('element__like_active');
    };

    //добавленеие счета лайков
    _setLikes() {
        const likeCountElement = this._element.querySelector('.like__counter')
        likeCountElement.textContent = this._likes.length
    }

    // удаляет карточку только со страницы; за удаление карточки с сервера отвечает deleteCard из API
    _deleteCard(element) {
        element.remove();
        element = null;
    };

    _setEventListeners() {
        //нашли
        this._cardFoto = this._element.querySelector('.element__foto');
        this._cardText = this._element.querySelector('.element__text');
        this._likeButton = this._element.querySelector('.like__btn');
        this._deleteButton = this._element.querySelector('.element__delete-btn');
        // if (!(this._ownerId === userId)) {
        //     this._element.querySelector('.element__delete-btn').style.display = 'none';
        // }


        //подписки
        this._likeButton.addEventListener('click', () => {
            this._like()
        });

        //слушатель кнопки удаления
        this._deleteButton.addEventListener('click', () => {
            this._handleDeleteClik(this._id)
        });

        this._cardFoto.addEventListener('click', () => this.handleImageClik({
            name: this._name,
            link: this._link,
            id: this._id,
            ownerId: this._ownerId,
            likes: this._likes
        }));
    }
}