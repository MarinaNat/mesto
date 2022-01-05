const buttonProfile = document.querySelector('.profile__button-edit');
const buttonClose = document.querySelector('.popup__close-btn ');
const overlay = document.querySelector('.overlay');
let overlayActive = 'overlay_active';
let profileInfo = document.querySelector('.profile__info');
let buttonSave = document.querySelector('.popup__save-btn');
let nameInput = document.querySelector('.popup__user_type_name');
let jobInput = document.querySelector('.popup__user_type_status');
let profileUserName = document.querySelector('.profile__user-name');
let profileUserStatus = document.querySelector('.profile__user-status');
let popup = document.querySelector('.popup');

function openPopup(event) {
    event.preventDefault();
    nameInput.value = profileUserName.textContent;
    jobInput.value = profileUserStatus.textContent;
    overlay.classList.add(overlayActive);
}

buttonProfile.addEventListener('click', openPopup);

function closePopup() {
    overlay.classList.remove(overlayActive);
}

buttonClose.addEventListener('click', closePopup);

function clickOverlay(event) {
    if (event.target === overlay) {
        closePopup();
    }
}
overlay.addEventListener('click', clickOverlay);

function clickEsc(event) {
    if (event.code === 'Escape') {
        closePopup();
    }
}

document.addEventListener('keydown', clickEsc);

function formSubmitHandler(event) {
    event.preventDefault();
    profileUserName.textContent = nameInput.value;
    profileUserStatus.textContent = jobInput.value;
    closePopup()
};
popup.addEventListener('submit', formSubmitHandler);