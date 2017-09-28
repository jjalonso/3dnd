import Scene from '../scene.js';
import Character from '../character.js';

import loader from '../loader.js';


class TableScene extends Scene {

    constructor() {
        super();
        this._demoCharacter = undefined;
        
        this._initialiseCamera();        
        this._initialiseEntities();
        this._initialiseControls();
    }

    _initialiseCamera() {
        this._camera.position.y = 20;
        this._camera.position.z = 15;
        this._camera.rotation.x = -1;
    }

    _initialiseEntities() {
        let directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(0, 5, 0);
        this.add(directionalLight);
    
        // var directionalLightHelper = new THREE.DirectionalLightHelper( directionalLight, 10 );
        // this.add(directionalLightHelper);
        
        let gridSize = 7;
        let grid = new THREE.GridHelper(3 * gridSize, gridSize);
        this.add(grid);

        loader.loadAnimatedMesh('assets/characters/eva/eva-animated.json').then(mesh => {
            mesh.scale.set(3,3,3)            
            this.add(mesh);
            this._demoCharacter = new Character(mesh);
        });
        
    } 

    _initialiseControls() {
        document.addEventListener('keydown', (event) => this._onDocumentKeyDown(event));           
    }
    
    _onDocumentKeyDown(event) {
        // Movement prototype
        var keyCode = event.which;        
        if (keyCode == 13) {
            // Enter key
            this._demoCharacter.walkTo(6, 6);
        }
    }

    update(delta) {
        super.update(delta);
    }


}

export default TableScene;
