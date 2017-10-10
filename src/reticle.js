
class Reticle extends THREE.GridHelper {

    constructor(cells) {
        super(cells * 2.5, cells);
        this._width = cells * 2.5;
        this._cells = cells;
        this._cellSize = this._width / this._cells;
        console.log(this._cellSize);
    }

    getCellAt(worldPos) {
        // let relPos = new THREE.Vector3(worldPos.x, 0, worldPos.z);
        worldPos.sub(this.position);
        
        let pos = new THREE.Vector2();
        console.log('x', worldPos.x / this._cellSize);
        console.log('y', worldPos.z / this._cellSize);

        pos.x = Math.round(worldPos.x / this._cellSize);
        pos.y = Math.round(worldPos.z / this._cellSize);
        
        let halfCells = this._cells / 2;
        if (pos.x > halfCells || pos.x < -halfCells || 
            pos.y > halfCells || pos.y < -halfCells) return undefined;
        return pos;
    };

    getPositionOfCell(position) {
        if (position.x >= this._cells || position.y >= this._cells) return undefined;

        let offset = new THREE.Vector3();
        // offset.x -= (this._width / 2) - (this._cellSize / 2);
        // offset.z -= (this._width / 2) - (this._cellSize / 2);
        offset.x += (position.x * this._cellSize );
        offset.z += (position.y * this._cellSize);
        return offset;
    }

}

export default Reticle;