export default class UserInfo {
    constructor(data) {
        this._name = document.querySelector(data.name);
        this._about = document.querySelector(data.about);
        this._avatar = document.querySelector(data.avatar);

    }

    getUserInfo() {
        const userData = {
            name: this._name.textContent,
            about: this._about.textContent
        }
        return userData;
    }

    setUserInfo(userData) {
        this._name.textContent = userData.name;
        this._about.textContent = userData.about;
        this.setUserAvatar(userData);
    }

    setUserAvatar(data) {
        this._avatar.src = data.avatar;
    }
}