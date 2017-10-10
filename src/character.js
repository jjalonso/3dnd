import TWEEN from '@tweenjs/tween.js';
import characterSizes from './data/characterSizes.json';

class Character  {

    constructor(animatedMesh) {
        this._currentPosition = THREE.Vector2(0, 0);        
        this._mesh = animatedMesh;
        this._speed = 35;
        this._size = characterSizes.medium;

        this._initialiseMesh()
    }


    //
    // PRIVATE
    //

    _initialiseMesh() {
        this._mesh.animActions.idle.play();
        
    }

    _buildFaceToTween(x, z) {
        let from = this._mesh.position;
        let to = new THREE.Vector3(x, 0, z);
        let sub = to.sub(from);
        let angle = Math.atan2(sub.x, sub.z);
        let tween = new TWEEN.Tween(this._mesh.rotation)
        .easing(TWEEN.Easing.Sinusoidal.In)
        .to({y: angle}, 350)

        return tween;
    }

    _buildWalkToTween(x, z) {        
        let from = this._mesh.position;
        console.log('CHAR IS in:', from)
        let to = new THREE.Vector3(x, 0, z);        
        let distance = from.distanceTo(to);
        console.log(distance);
        let duration = 95 * distance;
        console.log('duration', duration);
        let tween = new TWEEN.Tween(this._mesh.position)
        .easing(TWEEN.Easing.Sinusoidal.InOut)
        .to(to, duration)        

        return tween;
    }


    //
    // PUBLIC 
    //

    walkTo(position) {
        this._buildFaceToTween(position.x, position.z)
        .onComplete(() => {
            this._mesh.fadeToAnim(this._mesh.animActions.run)
            this._buildWalkToTween(position.x, position.z)
            .onComplete(() => {
                this._mesh.fadeToAnim(this._mesh.animActions.idle)
            })
            .start();
        })
        .start();
    }


    //
    // ACCESSOR
    //

    get speed() {
        return this._speed;
    }

    set speed(speed) {
        this._speed = speed;
    }

    get size() {
        return size;
    }

    set size(sizeConstant) {
        this._size = sizeConstant
    }

}

export default Character;