class GraphEditor {
    constructor(canvas, graph) {
        this.canvas = canvas;
        this.graph = graph;
        this.ctx = this.canvas.getContext('2d');
        this.selected = null;
        this.hovered = null;
        this.dragging = false;
        this.mouse = null;

        this.#addEventListeners();
    }

    display() {
        this.graph.draw(this.ctx);
        if (this.hovered) {
            this.hovered.draw(this.ctx,{ fill: true });
        }
        if (this.selected) {
            const intent = this.hovered ? this.hovered : this.mouse
            new Segment(this.selected, intent).draw(this.ctx, { dash: [3, 3]});
            this.selected.draw(this.ctx,{ outline: true });
        }
    }

    #addEventListeners() {
        this.canvas.addEventListener('mousedown', this.#handleMouseDown.bind(this));
        this.canvas.addEventListener('mousemove', this.#handleMouseMove.bind(this));
        this.canvas.addEventListener('contextmenu', (event) => event.preventDefault());
        this.canvas.addEventListener('mouseup', () => this.dragging = false);
    }

    #removePoint(point) {
        this.graph.removePoint(point);
        this.hovered = null;

        if (this.selected === point) this.selected = null;
    }

    #select(point) {
        if (this.selected) this.graph.tryAddSegment(new Segment(this.selected, point));
        this.selected = point;
    }

    #handleMouseDown(event) {
        // Left Click
        if (event.button === 0) {
            if (this.hovered) {
                this.#select(this.hovered);
                this.dragging = true;
                return;
            }

            this.graph.addPoint(this.mouse);
            this.#select(this.mouse);
            this.hovered = this.mouse;
        }

        // Right Click
        if (event.button === 2) {
            if (this.selected) this.selected = null;
            else if (this.hovered) this.#removePoint(this.hovered);
        }
    }

    #handleMouseMove(event) {
        this.mouse = new Point(event.offsetX, event.offsetY);
            this.hovered = getNearestPoint(this.mouse, this.graph.points, 10);
            if (this.dragging === true) {
                this.selected.x = this.mouse.x;
                this.selected.y = this.mouse.y;
            }
    }

}