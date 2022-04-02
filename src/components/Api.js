export default class API {
    constructor(data) {
        this._url = data.url;
        this._headers = data.headers;
    }

    _makeRequest(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    //данные с сервера о профиле
    getProfile() {
        return fetch(`${this._url}/users/me`, {
                method: 'GET',
                headers: this._headers
            })
            .then(this._makeRequest);
    }

    //данные с сервера о карточках
    getCard() {
        return fetch(`${this._url}/cards`, {
                method: 'GET',
                headers: this._headers
            })
            .then(this._makeRequest);
    }

    //отправка данных профиля
    editProfile(userData) {
        return fetch(`${this._url}/users/me`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    name: userData.userName,
                    about: userData.userStatus
                })
            })
            .then(this._makeRequest);
    }

    //отправка данных карты
    addCard(data) {
        return fetch(`${this._url}/cards`, {
                method: 'POST',
                headers: this._headers,
                body: JSON.stringify({
                    name: data.elementName,
                    link: data.elementLink
                })
            })
            .then(this._makeRequest);
    }

    //удаление карточек
    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
                method: 'DELETE',
                headers: this._headers
            })
            .then(this._makeRequest);
    }

    //добавление лайка
    addLike(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
                method: 'PUT',
                headers: this._headers
            })
            .then(this._makeRequest);
    }

    //удаление лайка
    deleteLike(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
                method: 'DELETE',
                headers: this._headers
            })
            .then(this._makeRequest);
    }


    //отправка данных аватарки
    updateUserAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    avatar: data.userAvatar
                })
            })
            .then(this._makeRequest);
    }
}