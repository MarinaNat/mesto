import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popup, handlerSubmit) {
        super(popup);
        this._popupForm = this._popup.querySelector('.popup_form');
        // достаём все элементы полей
        this._inputs = Array.from(this._popupForm.querySelectorAll('.popup__input'));
        this._handlerSubmit = handlerSubmit;
        this._battonSave = this._popup.querySelector('.popup__save-btn');
        this._popupBtn = this._popup.querySelector('.popup__save-btn').textContent;
    }

    //собираем информацию с полей input
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

    //устанавливаем слушатель
    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handlerSubmit(this._getInputValues());
        })
    }

    changeSubmitHandler(newSubmitHandler) {
        this._handlerSubmit = newSubmitHandler
    }

    //закрытие попапа
    close() {
        super.close();
        //очистка полей формы
        this._popupForm.reset();
    }

    //показ загрузки
    renderLoading(isLoading) {
        if (isLoading) {
            this._battonSave.textContent = (`${this._popupBtn} ...`);
        } else {
            this._battonSave.textContent = this._popupBtn;
        }
    }
}