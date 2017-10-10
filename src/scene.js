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

    getPositionOnScreen(screenPos) {
        // Based on https://stackoverflow.com/a/32973741
        screenPos.unproject(this._camera);
        var camPosition = this._camera.position;
        var m = screenPos.y / (screenPos.y - camPosition.y);

        var pos = new THREE.Vector3(0, 0, 0);
        pos.x = screenPos.x + (camPosition.x - screenPos.x) * m;
        pos.z = screenPos.z + (camPosition.z - screenPos.z) * m;
        return pos;
    }

    update(delta) {
        // Limitation: It only update for two children levels!
        this.children.forEach(child => {
            if (child instanceof AnimatedMesh) {
                child.mixer.update(delta);
            }
            child.children.forEach(subChild => {
                if (subChild instanceof AnimatedMesh) {
                    subChild.mixer.update(delta);
                };      
            });
            
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
