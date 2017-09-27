import Scene from '../scene.js';
import Character from '../character.js';
import Grid from '../grid.js';

// import 'three-orbit-controls';

class TableScene extends Scene {

    constructor() {
        super();
        this._goblinCharacter = undefined;
        
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
        });
    } 

    _initialiseControls() {
        document.addEventListener('keydown', (event) => this._onDocumentKeyDown(event));           
    }
    
    _onDocumentKeyDown(event) {
        // Movement prototype
        var keyCode = event.which;        
        if (keyCode == 13) {
            // Enter
            this._goblinCharacter.walkTo(6, 6);
        }
    }

    update() {
        // TODO: It should really update only a renderable store.
        this._goblinCharacter.update();
    }

}

export default TableScene;
