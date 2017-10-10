import { Engine, Scene, Character, Reticle, Loader } from '../../src/index.js';

// import Scene from '../scene.js';
// import Character from '../character.js';
// import Reticle from '../reticle.js';
// import loader from '../loader.js';

// import 'three-orbit-control';


class TableScene extends Scene {

    constructor() {
        super();
        this._demoCharacter = undefined;
        this._reticle;
        this._loader = new Loader();
        
        this._initialiseEntities();
        this._initialiseCamera();              
        this._initialiseControls();
    }

    _initialiseCamera() {
        // let cameraPos = new THREE.Vector3(15, -0.8, 15);
        // cameraPos.add(this._reticle.position);
        // this._camera.position.set(cameraPos);
        this._camera.position.x = this._reticle.position.x;        
        this._camera.position.y = this._reticle.position.y + 15;
        this._camera.position.z = this._reticle.position.z + 15;
        this._camera.lookAt(this._reticle.position);
    }

    _initialiseEntities() {
        
        let directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(0, 5, 0);
        this.add(directionalLight);
    

        this._reticle = new Reticle(7);
        this._reticle.position.set(10, 0, 10);
        this.add(this._reticle);

        // var directionalLightHelper = new THREE.DirectionalLightHelper( directionalLight, 10 );
        // this.add(directionalLightHelper);
        
        this._loader.loadAnimatedMesh('assets/eva-animated.json').then(mesh => {
            mesh.scale.set(3, 3 ,3);        
            this._reticle.add(mesh);
            this._demoCharacter = new Character(mesh);
        });

    } 

    _initialiseControls() {
        // document.addEventListener('touchstart', (event) => this._onDocumentKeyDown(event), false);       
        document.addEventListener('click', (event) => this._onDocumentKeyDown(event), false);   
    }
    
    _onDocumentKeyDown(event) {
        let x = window.clientX;
        let y = window.clientY;
        let mousePos = new THREE.Vector3();
        mousePos.x = (event.clientX / window.innerWidth) * 2 - 1;
        mousePos.y = -(event.clientY / window.innerHeight) * 2 + 1;
        mousePos.z = 1;
        let worldPosition = this.getPositionOnScreen(mousePos);
        let cellClicked = this._reticle.getCellAt(worldPosition);
        console.log('Cell Clicked:', cellClicked);
        let cellPosition = this._reticle.getPositionOfCell(cellClicked);
        console.log('cell center Position!', cellPosition);
        this._demoCharacter.walkTo(cellPosition);

    }

    update(delta) {
        super.update(delta);
    }


}

export default TableScene;
