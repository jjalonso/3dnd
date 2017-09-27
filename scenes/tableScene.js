import Scene from '../scene.js';
import Character from '../character.js';
import Grid from '../grid.js';

import TWEEN from '@tweenjs/tween.js';
// import 'three-orbit-controls';

class TableScene extends Scene {

    constructor() {
        super();
        this._goblinCharacter = undefined;
        
        this._initialiseCamera();        
        this._initialiseEntities();
    }

    _initialiseCamera() {
        this._camera.position.x = 0;
        this._camera.position.y = 20;
        this._camera.position.z = 15;
    
        this._camera.rotation.x = -1;
        this._camera.rotation.y = 0;        
        this._camera.rotation.z = 0;
    }

    _initialiseEntities() {
        let directionalLight = new THREE.DirectionalLight(0xffffff, 5);
        directionalLight.position.set(0, 10, 5);
        this._scene.add(directionalLight);
    
        // var directionalLightHelper = new THREE.DirectionalLightHelper( directionalLight, 10 );
        // this._scene.add(directionalLightHelper);
        
        var grid = new Grid(7);
        this._scene.add(grid.mesh);
        
        // HACK USING THEN UNTIL AWAIT IS IMPLEMENTED, IT SHOULD WAIT UNTIL PROMISE RESOLVED
        this._goblinCharacter = new Character();
        this._goblinCharacter.loadAsset('goblin').then(mesh => {
            this._scene.add(mesh)
            
            // Example of propery animation
            mesh.rotation.z = -0.02;
            var tween = new TWEEN.Tween(mesh.rotation);
            tween.easing(TWEEN.Easing.Sinusoidal.InOut);
            tween.to({ x: 0, y: 0, z: 0.02 }, 1200)
            .repeat(Infinity)
            .yoyo(true)
            .start();           
        });

            
        
    } 

    update() {
        TWEEN.update();
    }

}

export default TableScene;
