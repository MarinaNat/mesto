export default class API {
    constructor(data) {
        this._url = data.url;
        this._headers = data.headers;
    }

    _makeRequest(res) {
        console.log('Результат: ' + res);
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getProfile() {
        console.log('getProfile начал работу...');
        return fetch(`${this._url}/user/me`, {
                method: 'GET',
                headers: this._headers
            })
            .then(this._makeRequest);
    }

    setProfile(profileData) {
        return fetch(`${this._url}/user/me`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    name: profileData.name,
                    about: profileData.about
                })
            })
            .then(this._makeRequest);
    }

    getCard() {
        console.log('getCard начал работу...');
        return fetch(`${this._url}/cards`, {
                method: 'GET',
                headers: this._headers
            })
            .then(this._makeRequest);
    }

    createCard(data) {
        return fetch(`${this._url}/cards`, {
                method: 'POST',
                headers: this._headers,
                body: JSON.stringify({
                    name: data.name,
                    link: data.link
                })
            })
            .then(this._makeRequest);
    }

    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}}`, {
                method: 'DELETE',
                headers: this._headers
            })
            .then(this._makeRequest);
    }

    clickedLike(id) {
        return fetch(`${this._url}/cards/${id}}/likes`, {
                method: 'PUT',
                headers: this._headers
            })
            .then(this._makeRequest);
    }

    removalLike(id) {
        return fetch(`${this._url}/cards/${id}}/likes`, {
                method: 'DELETE',
                headers: this._headers
            })
            .then(this._makeRequest);
    }

    updateUserAvatar(data) {
        return fetch(`${this._url}/user/me/avatar`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    avatar: data.linkAvatar
                })
            })
            .then(this._makeRequest);
    }
}