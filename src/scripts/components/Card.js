export class Card {
    constructor(data, cardTemplateSelector, handleCard) {
        this._name = data.name
        this._link = data.link
        this._cardTemplateSelector = cardTemplateSelector
        this._handleCard = handleCard;
        // this._template = document.querySelector(this._cardTemplateSelector).content.querySelector('.element')
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardTemplateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);

        return cardElement;
    }

    fillingCard() {
        this._element = this._getTemplate();
        this._setEventListeners()
            //this._cardElement = this._template.cloneNode(true);
            //const cardElement = document.querySelector(this._cardTemplateSelector).content.querySelector('.element').cloneNode(true);
            //заполнение
        this._cardFoto = this._element.querySelector('.element__foto');
        this._cardText = this._element.querySelector('.element__text');

        this._cardFoto.src = this._link;
        this._cardText.textContent = this._name;
        this._cardFoto.alt = this._name;
        return this._element;
    };

    _like() {
        this._likeButton.classList.toggle('element__like_active');
    };

    _deleteCard() {
        this._deleteButton.closest('.element').remove();
        this._element = null;
    };

    _setEventListeners() {
        //нашли
        this._cardFoto = this._element.querySelector('.element__foto');
        this._cardText = this._element.querySelector('.element__text');
        this._likeButton = this._element.querySelector('.like');
        this._deleteButton = this._element.querySelector('.element__delete-btn');

        //подписки
        this._likeButton.addEventListener('click', () => {
            this._like()
        });

        this._deleteButton.addEventListener('click', () => {
            this._deleteCard();
        });
        /*const popupWithImage = new PopupWithImage({
                name: this._name,
                link: this._link
            },
            overlayImage)*/
        this._cardFoto.addEventListener('click', this._handleCard);
    }
}