export default class Section {

    constructor({ items, renderer }, sectionContainer) {
        this._items = items;
        this._renderer = renderer;
        // this._container = sectionContainer;
        this._container = document.querySelector(sectionContainer);
    }

    addItem(element) {
        this._container.prepend(element);
    }

    renderItems() {
        this._items.forEach(item => {
            this._renderer(item);
        });
    }
}