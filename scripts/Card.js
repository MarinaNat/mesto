import { openPopup } from './utils.js'
import { overlayImage, pictureTitle, picture } from './constants.js'

export class Card {
    constructor(data, cardTemplateSelector) {
        this._name = data.name
        this._link = data.link
        this._template = document.querySelector(cardTemplateSelector).content.querySelector('.element')
    }

    _like = () => {
        this._likeButton.classList.toggle('element__like_active');
    };

    _deleteCard = () => {
        this._cardElement.remove();
    };

    //заполнение данными и открытие модального окна
    _openImagePopup = () => {
        pictureTitle.textContent = this._name;
        picture.src = this._link;
        picture.alt = this._name;
        openPopup(overlayImage);
    }

    _setEventListeners() {
        //подписки
        this._likeButton.addEventListener('click', this._like);
        this._deleteButton.addEventListener('click', this._deleteCard);
        this._cardFoto.addEventListener('click', this._openImagePopup);
    }

    _fillCard() {
        //заполнение
        this._cardFoto.src = this._link;
        this._cardText.textContent = this._name;
        this._cardFoto.alt = this._link;
    }

    fillingCard() {
        this._cardElement = this._template.cloneNode(true);
        //нашли
        this._cardFoto = this._cardElement.querySelector('.element__foto');
        this._cardText = this._cardElement.querySelector('.element__text');
        this._likeButton = this._cardElement.querySelector('.like');
        this._deleteButton = this._cardElement.querySelector('.element__delete-btn');

        //заполнение
        this._fillCard()

        //подписки
        this._setEventListeners()

        return this._cardElement;
    };
}

/* const cardTemplateSelector = '#element-template'
const card = new Card({ name: '', link: '' }, cardTemplateSelector)
const cardElement = card.fillingCard()
list.prepend(cardElement) */