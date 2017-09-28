import AnimatedMesh from './animatedMesh.js';
// import RenderableLoader from './renderableLoader';

class Scene extends THREE.Scene {

    constructor() {
        super();
        this._camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
    }
    
    //
    // PRIVATE
    //


    //
    // PUBLIC
    //
    
    update(delta) {
        this.children.forEach(child => {
            if (child instanceof AnimatedMesh) {
                child.mixer.update(delta);
            }
        });
    }

    //
    // ACCESSOR
    //

    get camera() {
        return this._camera;
    }

}

export default Scene;
