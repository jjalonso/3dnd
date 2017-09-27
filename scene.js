
class Scene {

    constructor() {
        this._scene = new THREE.Scene();
        this._camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);        
    }

    update() { }

    get renderingData() {
        return [this._scene, this._camera];
    }

}

export default Scene;
