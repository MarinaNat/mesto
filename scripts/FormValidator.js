export class FormValidator {
    constructor(config, form) {
        this._form = form
        this._config = config

        this._inputs = [...this._form.querySelectorAll(this._config.inputSelector)] //массив инпутов
        this._button = this._form.querySelector(this._config.submitButtonSelector) //поиск кнопки
    }

    //проверка кнопки на отправку
    setSubmitButtonState() {
        this._button.disabled = !this._form.checkValidity(); //выключение кнопки, если форма не валидная
        this._button.classList.toggle(this._config.inactiveButtonClass, !this._form.checkValidity()); //включени/выключение кнопки
    }

    _addFormListeners() {

        this._inputs.forEach(input => input.addEventListener('input', () => {
            this._handleField(input);
            this.setSubmitButtonState()
        })); //реакция на ввод данных

    }

    //показать ошибку
    _showError(input) {
            const { errorClass, inputErrorClass } = this._config
            input.classList.add(inputErrorClass); //добавляется подчеркивание
            const errorElement = this._form.querySelector(`#${input.id}-error`); //поиск ошибки инпута(span)
            errorElement.classList.add(errorClass);
            errorElement.textContent = input.validationMessage; //наполняем текст ошибки стандартным из браузера
        }
        //скрыть ошибку
    _hideError(input) {
        const { errorClass, inputErrorClass } = this._config
        input.classList.remove(inputErrorClass); //скрывается подчеркивание
        const errorElement = this._form.querySelector(`#${input.id}-error`);
        errorElement.classList.remove(errorClass);
        errorElement.textContent = ''; //текст ошибки пустое поле
    }

    //обработка поля при вводе данных
    _handleField = (input) => {
        if (input.validity.valid) { //проверяем валидна ли форма
            this._hideError(input); //если поле валидно скрываем ошибку
        } else {
            this._showError(input); //если поле не валидно показываем ошибку
        }
    }

    _handleSubmit(event) {
        event.preventDefault();
    }

    enableValidation(event) {
        this._form.addEventListener('submit', this._handleSubmit);
        this._addFormListeners();
    }
}