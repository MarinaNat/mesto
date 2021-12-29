const buttonProfile = document.querySelector('.profile__button-edit');
const buttonClose = document.querySelector('.popup__close-btn ');
const overlay = document.querySelector('.overlay');
let overlayActive = 'overlay__active';
let profileInfo = document.querySelector('.profile__info');
let buttonSave = document.querySelector('.popup__save-btn');
let nameInput = document.querySelector('.popup__user-name');
let jobInput = document.querySelector('.popup__user-status');
let profileUserName = document.querySelector('.profile__user-name');
let profileUserStatus = document.querySelector('.profile__user-status');
let popup = document.querySelector('.popup');
let elements = document.querySelector('.elements');
let allElements = elements.querySelectorAll('.element');

buttonProfile.addEventListener('click', function() {
    overlay.classList.add(overlayActive);
});

buttonClose.addEventListener('click', function() {
    overlay.classList.remove(overlayActive);
});

overlay.addEventListener('click', function(event) {
    if (event.target === overlay) {
        overlay.classList.remove(overlayActive);
    }
});

document.addEventListener('keydown', function(event) {
    if (event.code === 'Escape') {
        overlay.classList.remove(overlayActive);
    }
});

function formSubmitHandler(event) {
    event.preventDefault();
    profileUserName.textContent = nameInput.value;
    profileUserStatus.textContent = jobInput.value;
    overlay.classList.remove(overlayActive);
};
popup.addEventListener('submit', formSubmitHandler);

elements.addEventListener('click', function(event) {
    for (let i = 0; i < allElements.length; i += 1) {
        let like = allElements.item(i).querySelector('.like');
        if (event.target === like) {
            like.classList.toggle('element__like');
            like.classList.toggle('element__like_active');
        }
    };
});