import Renderable from './renderable.js';
import MeshLoader from './meshLoader.js';

class Character extends Renderable {

    loadAsset(assetName) {
        let assetPath = 'assets/characters/' + assetName + '/';
        return MeshLoader.load(assetPath).then(mesh => {
            this._mesh = mesh;
            return mesh;
        })        
    }

}

export default Character;