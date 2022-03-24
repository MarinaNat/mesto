import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup);
        this._picture = this._popup.querySelector('.full-screen__image');
        this._pictureTitle = this._popup.querySelector('.full-screen__title');
    }

    open(data) {
        this._pictureTitle.textContent = data.name;
        this._picture.src = data.link;
        this._picture.alt = data.name;
        super.open();
    }

}