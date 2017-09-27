import TWEEN from '@tweenjs/tween.js';

import Renderable from './renderable.js';
import MeshLoader from './meshLoader.js';

class Character extends Renderable {

    constructor() {
        super();
        this._speed = 15;
    }


    //
    // PRIVATE
    //

    _startSwayTween() {
        // Example of property animation 
        this._mesh.rotation.z = -0.015;
        var tween = new TWEEN.Tween(this._mesh.rotation)
            .easing(TWEEN.Easing.Sinusoidal.InOut)
            .to({ z: 0.015 }, 1200)
            .repeat(Infinity)
            .yoyo(true)
            .start();
    }

    _getFaceToTween(x, z) {
        let from = new THREE.Vector3(1, 1, 1);//this._mesh.position;
        let to = new THREE.Vector3(2, 2, 3);
        let sub = to.sub(from);
        let angle = Math.atan2(sub.x, sub.z);
        let tween = new TWEEN.Tween(this._mesh.rotation)
        .easing(TWEEN.Easing.Sinusoidal.In)
        .to({y: angle}, 300)

        return tween;
    }

    _getWalkToTween(x, z) {
        // This should be one action that change to WalkingState and this code be in the walking state.
        let from = this._mesh.position;
        let to = new THREE.Vector3(x, 0, z);
        let distance = from.distanceToSquared(to);
        let duration = this._speed * distance;
        let tween = new TWEEN.Tween(this._mesh.position)
        .easing(TWEEN.Easing.Sinusoidal.InOut)
        .to(to, duration);

        return tween;
    }


    //
    // PUBLIC 
    //

    loadAsset(assetName) {
        let assetPath = 'assets/characters/' + assetName + '/';
        return MeshLoader.load(assetPath).then(mesh => {
            this._mesh = mesh;
            this._startSwayTween();   
            return mesh;
        })
    }

    update() {
        // TODO: Implement a machine state
        // And from here we should be changing the state
    }

    walkTo(x, z) {
        this._getFaceToTween(x, z)
        .chain(this._getWalkToTween(x, z))
        .start();
    }


    //
    // ACCESSORS
    //

    get speed() {
        return this._speed;
    }

    set speed(speed) {
        this._speed = speed;
    }

}

export default Character;