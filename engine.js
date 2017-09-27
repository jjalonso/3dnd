import TWEEN from '@tweenjs/tween.js';

class Engine {

    constructor() {
        this._renderer = new THREE.WebGLRenderer();
        this._requestAnimId = false;  
        this._scene = undefined;

        this._initialiseRenderer();
    }

    _initialiseRenderer() {
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this._renderer.domElement);
    }

    _update() {
        // console.log('Engine::update');
        TWEEN.update();
        this._scene.update();
    }

    _loop() {
        this._update();
        this._render();
        this._requestAnimId = requestAnimationFrame(() => this._loop());
    }

    _render() {
        // console.log('Engine::render');
        let renderingData = this._scene.renderingData;
        this._renderer.render(...renderingData);
    }

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