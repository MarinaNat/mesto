# Проект "Место":
сервис Mesto: интерактивная страница, где можно редактировать профиль и ставить лайки на фото. В проекте используется HTML, CSS, JS.
Файловая структура организована по БЭМу.
Вёрстка адаптивная. Минимальная ширина: 320px (одна карточка в ряд). Максимальная: 1280px (три карточки в ряд).
На странице присутствуют 6 карточек с фотографиями, которые добавляет JavaScript из массива.
Валидируется форма «Редактировать профиль»оба (поля обязательные; в поле «Имя» должно быть от 2 до 40 символов;в поле «О себе» должно быть от 2 до 200 символов)  и «Новое место» (оба поля обязательные, в поле «Название» должно быть от 2 до 30 символов, в поле «Ссылка на картинку» должен быть URL..). Используются стандартные браузерные тексты ошибок. Если хотя бы одно из полей не прошло валидацию, кнопка «Сохранить» неактивна. Если оба поля прошли — активна.
Использованы ES6-классы;
Каждый класс ( Card , FormValidator ) описан в отдельном JS-файле и импортирован в index.js ;
Экземпляр класса Card создаётся для каждой карточки. Класс Card:
Принимает в конструктор ссылки на изображение и текст;
Принимает в конструктор селектор для template -элемента с шаблоном разметки;
Обладает приватными методами, которые устанавливают слушателей событий, обрабатывают клики,
подготавливают карточку к публикации;
Обладает публичным методом, который возвращает готовую разметку, с установленными слушателями
событий.
Экземпляр класса FormValidator создаётся для каждой проверяемой формы. Этот класс:
Принимает в конструктор объект настроек с классами формы;
Принимает в конструктор ссылку на HTML-элемент проверяемой формы;
Содержит приватные методы для обработки формы.

### блок header:

Логотип - ссылка

### блок profile:
в блоке находится имя и статус профиля, которые можно редактировать. используется всплытие popup с помощью JS. При редактировании данных профиля из попапа пользователь тоже может ввести длинный текст. для этого реализовано переполнение блока с появляющимся многоточием в конце.
Попап открывается по нажатию кнопки «Редактировать», а закрываются — при клике по крестику в правом верхнем углу или кнопкой на клавиатуре "Esc" а так же кликом на оверлей.
Отслеживается клик по кнопке методом addEventListener. При открытии формы поля «Имя» и «О себе» заполнены теми значениями, которые отображаются на странице. Если пользователь закрывает попап нажав на крестик, то введённые значения не сохраняются. После внесения изменений и нажатия кнопки «Сохранить» информация на странице обновится, а попап автоматически закрывается.

### блок elements :
Блок с фотографиями, на которые можно ставить/убирать лайки с помощью JS. При нажатии на картинку открывается попап с картинкой и закрываются кликом на крестик или кнопкой на клавиатуре "Esc" а так же кликом на оверлей.  Карточка удаляется при клике на иконку "ведерка". Пользователь может добавить сам карточки благодаря форме, открывающейся нажатием на кнопку «+» и закрывается кликом на крестик или кнопкой на клавиатуре "Esc" а так же кликом на оверлей. Можно написать имя карточки и дать ссылку на картинку.

### блок footer:
Информация о разработчике
### блок overlay:
Cоздан для осуществления вспытия popup-формы. Информация с формы отправляется в блок profile с помощью JS. Все попапы плавно открываются.

* [Ссылка на ghjtrn](https://marinanat.github.io/mesto/index.html)