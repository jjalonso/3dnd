import Renderable from './renderable.js';

class Grid extends Renderable {

    constructor(size) {
        super();
        this._size = size;
        this._mesh = new THREE.GridHelper(3 * size, size);
    }
}

export default Grid;