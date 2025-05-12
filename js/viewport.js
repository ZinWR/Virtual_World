class Viewport {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.zoom = 1;

        this.#addEventListeners();
    }

    #addEventListeners() {
        this.canvas.addEventListener('mousewheel', this.#handleMouseWheel.bind(this)); 
    }

    #handleMouseWheel(event) {
        console.log(event.deltaY);
    }
}