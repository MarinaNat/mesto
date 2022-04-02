import Popup from './Popup.js';

export default class PopupDeleteForm extends Popup {
    constructor(popup, handleConfirm) {
        super(popup);
        this._popupForm = this._popup.querySelector('.popup_form');
        this._handleConfirm = handleConfirm
            // достаём все элементы полей
        this._YesButton = this._popup.querySelector('.popup__save-btn');
    }

    open(card) {
        super.open()
        super.setEventListeners()
        this._card = card
        this.setEventListeners()
    }

    //устанавливаем слушатель
    setEventListeners() {
        this._YesButton.addEventListener('click', () => {
            this._handleConfirm(this._card);
            super.close();
        })
    }

}