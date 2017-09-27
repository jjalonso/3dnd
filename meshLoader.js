import 'three-obj-loader';
import 'three-mtl-loader';

class MeshLoader {
    
    constructor() {
        console.log('DEBUG: Creating instance MeshLoader, Im a singleton, you should see this only once.');
        this._objLoader = new THREE.OBJLoader();
        this._mtlLoader = new THREE.MTLLoader();   
    }

    load(path, onSuccess) {
        return new Promise((resolve, reject) => {
            this._objLoader.setPath(path);
            this._mtlLoader.setPath(path);
            this._mtlLoader.setTexturePath(path);
    
            this._mtlLoader.load('materials.mtl', materials => {
                materials.preload();
                this._objLoader.setMaterials(materials);
    
                this._objLoader.load('mesh.obj', mesh => resolve(mesh));
            });        
        })
    }

}

const instance = new MeshLoader();
export default instance;
// export default MeshLoader;