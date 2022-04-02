import { api, userId } from "../pages";

export class Card {
    constructor(data, cardTemplateSelector, handleImageClik, handleDeleteClik, handleLikeClik) {
            this._name = data.name
            this._link = data.link
            this._id = data.id
            this._userId = userId
            this._likes = data.likes
            this._ownerId = data.ownerId
            this._cardTemplateSelector = cardTemplateSelector
            this.handleImageClik = handleImageClik
            this._handleDeleteClik = handleDeleteClik
            this._handleLikeClik = handleLikeClik
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
        this.setLikes(this._likes)
        return this._element;
    };

    _unfillLike() {
        this._likeButton.classList.remove('element__like_active');
    };

    _fillLike() {
        this._likeButton.classList.add('element__like_active');
    };

    //добавленеие счета лайков
    setLikes(newLikes) {
        this._likes = newLikes
        const likeCountElement = this._element.querySelector('.like__counter')
        likeCountElement.textContent = this._likes.length

        if (this.isLiked()) {
            this._fillLike()
        } else {
            this._unfillLike()
        }
    }

    isLiked() {
        const userHasLikedCard = this._likes.find(user => user._id === this._userId)
        return userHasLikedCard
    }

    // удаляет карточку только со страницы; за удаление карточки с сервера отвечает deleteCard из API
    deleteCard(element) {
        this._element.remove();
        this._element = null;
    };

    _setEventListeners() {
        //нашли
        this._cardFoto = this._element.querySelector('.element__foto');
        this._cardText = this._element.querySelector('.element__text');
        this._likeButton = this._element.querySelector('.like__btn');
        this._deleteButton = this._element.querySelector('.element__delete-btn');

        //если ownerId(на карточке) не совпадает с Id пользователя, кнопка удаления прячется
        if (!(this._ownerId === userId)) {
            this._element.querySelector('.element__delete-btn').style.display = 'none';
        }


        //подписки
        this._likeButton.addEventListener('click', () => {
            this._handleLikeClik(this._id)
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