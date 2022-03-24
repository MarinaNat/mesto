export default class UserInfo {
    constructor({ data }) {
        this._name = document.querySelector(data.name);
        this._job = document.querySelector(data.job);

    }

    getUserInfo() {
        const userData = {
            name: this._name.textContent,
            job: this._job.textContent
        }
        return userData;
    }

    setUserInfo(userData) {
        this._name.textContent = userData.userName;
        this._job.textContent = userData.userStatus;
    }
}