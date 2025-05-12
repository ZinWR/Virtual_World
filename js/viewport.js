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
        const direction = Math.sign(event.deltaY);
        const step = 0.1;
        this.zoom += direction * step;
        this.zoom = Math.max(1, Math.min(5, this.zoom)); // Limit zoom level between 1 and 5
    }

    getMouse(event) {
        return new Point(event.offsetX * this.zoom, event.offsetY * this.zoom);
    }
}