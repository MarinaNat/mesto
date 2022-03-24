export default class Popup {
    constructor(popup) {
        //this._popup = popup;
        this._popup = document.querySelector(popup);
        this._buttonClose = this._popup.querySelector('#close-btn');
        this._handleEscClose = this._handleEscClose.bind(this);
    };

    open() {
        this._popup.classList.add('overlay_active');
        document.addEventListener('keydown', this._handleEscClose);
        //this.setEventListeners();
    }

    close() {
        this._popup.classList.remove('overlay_active');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose = (event) => {
        if (event.code === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._buttonClose.addEventListener('click', () => {
            this.close();
        })
        this._popup.addEventListener('click', (event) => {
            if (event.target.classList.contains('overlay_active')) {
                this.close();
            }

        })
    }
}