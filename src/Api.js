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
        console.log('userData: ')
        console.log(userData)
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
        console.log('data: ')
        console.log(data)
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
    clickedLike(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
                method: 'PUT',
                headers: this._headers
            })
            .then(this._makeRequest);
    }

    //удаление лайка
    removalLike(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
                method: 'DELETE',
                headers: this._headers
            })
            .then(this._makeRequest);
    }


    //отправка данных аватарки
    updateUserAvatar(data) {
        console.log('Аватар: ')
        console.log(data)
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