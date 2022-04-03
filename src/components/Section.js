export default class Section {

    constructor({ renderer }, sectionContainer) {
        // this._items = items;
        this._renderer = renderer;
        // this._container = sectionContainer;
        this._container = document.querySelector(sectionContainer);
    }

    //добавление элемента в DOM
    addItem(element) {
        this._container.prepend(element);
    }

    //перебираем массив
    renderItems(array) {
        array.forEach((item) => {
            this._renderer(item)
        })
    }
}