/**
 * G = (V, E) where G = graph, V = nodes/vertices, E = edges/links
 * 
 * Spatial Graph represents interconnected nodes (intersection) in a 2D space.
 */

class Graph {
    constructor(points = [], segments = []) {
        this.points = points;
        this.segments = segments;
    }

    draw(ctx) {
        for (const segment of this.segments) {
            segment.draw(ctx);
        }

        for (const point of this.points) {
            point.draw(ctx);
        }
    }
}