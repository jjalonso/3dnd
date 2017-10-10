import AnimatedMesh from './animatedMesh.js';
// import 'three-mtl-loader';

class Loader {
    
    constructor() {
        this._jsonLoader = new THREE.JSONLoader();        
        // this._objLoader = new THREE.OBJLoader();
        // this._mtlLoader = new THREE.MTLLoader();   
    }

    // load(path, onSuccess) {
    //     return new Promise((resolve, reject) => {
    //         this._objLoader.setPath(path);
    //         this._mtlLoader.setPath(path);
    //         this._mtlLoader.setTexturePath(path);
    
    //         this._mtlLoader.load('materials.mtl', materials => {
    //             materials.preload();
    //             this._objLoader.setMaterials(materials);
    
    //             this._objLoader.load('mesh.obj', mesh => resolve(mesh));
    //         });        
    //     })
    // }


    loadAnimatedMesh(path, onSuccess) {
        return new Promise((resolve, reject) => {

            this._jsonLoader.load(path, (geometry, materials) => {
                materials.forEach((material) => { material.skinning = true });
                var animatedMesh = new AnimatedMesh(geometry, new THREE.MeshFaceMaterial(materials));
                resolve(animatedMesh);
            })
        })
    }

}

// No-safe singleton
export default Loader;
