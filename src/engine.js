import TWEEN from '@tweenjs/tween.js';
// import 'three-stereo-effect';
import "../node_modules/three/examples/js/effects/StereoEffect.js";


class Engine {

    constructor(config) {
        this._renderer = this._buildRenderer(config.stereo);
        this._clock = new THREE.Clock();
        this._requestAnimId = false;          
        this._scene;        
        
        this._initialiseEvents();
    }


    //
    // PRIVATE
    //
    
    _initialiseEvents() {
        window.addEventListener('resize', () => this._onWindowResize(), false);         
    }

    _buildRenderer(isStereo) {
        let renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);        
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);        
        
        if (isStereo) {
            renderer = new THREE.StereoEffect(renderer);
        }
        
        return renderer;
    }

    _onWindowResize() {
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
        this._render();
        this._update();
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