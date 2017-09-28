import TWEEN from '@tweenjs/tween.js';

class Engine {

    constructor() {
        this._renderer = new THREE.WebGLRenderer();
        this._requestAnimId = false;  
        this._scene = undefined;
        this._clock = new THREE.Clock();
        
        this._initialiseRenderer();
        this._initialiseEvents();
    }


    //
    // PRIVATE
    //
    
    _initialiseRenderer() {
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this._renderer.domElement);
    }

    _initialiseEvents() {
        window.addEventListener('resize', () => this._onWindowResize(), false);        
    }

    _onWindowResize () {
        let camera = this._scene.camera;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        this._renderer.setSize(window.innerWidth, window.innerHeight);
      }

    _update() {
        let delta = this._clock.getDelta();
        TWEEN.update();
        this._scene.update(delta);
    }

    _loop() {
        this._update();
        this._render();
        this._requestAnimId = requestAnimationFrame(() => this._loop());
    }

    _render() {
        this._renderer.render(this._scene, this._scene.camera);
    }


    //
    // PUBLIC
    //

    setScene(scene) {
        this._scene = scene;
    }

    start() {
        this._loop();
    }

    stop() {
        cancelAnimationFrame(this._requestAnimId);
    }

}

export default Engine;