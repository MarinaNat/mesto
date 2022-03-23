import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popup, { submitFormCallBack }) {
        super(popup);
        this._popupForm = this._popup.querySelector('.popup_form');
        // достаём все элементы полей
        this._inputs = Array.from(this._popupForm.querySelectorAll('.popup__input'));
        this._submitFormCallBack = submitFormCallBack;

    }

    _getInputValues() {
        // создаём пустой объект
        const data = {};
        // добавляем в этот объект значения всех полей
        this._inputs.forEach((element) => {
            data[element.name] = element.value;
        });
        // возвращаем объект значений
        return data;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitFormCallBack(this._getInputValues());
            this._popupForm.reset();

        })
    }

    close() {
        super.close();
        this._popupForm.reset();

    }
}