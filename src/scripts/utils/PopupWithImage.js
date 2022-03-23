import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup);
        this._picture = popup.querySelector('.full-screen__image');
        this._pictureTitle = popup.querySelector('.full-screen__title');
        //this._name = data.name;
        //this._link = data.link;
    }

    open(data) {
        this._pictureTitle.textContent = data.name;
        this._picture.src = data.link;
        this._picture.alt = data.name;
        super.open();
        // super.setEventListeners();
    }

}