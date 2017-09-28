import TWEEN from '@tweenjs/tween.js';

class Character  {

    constructor(animatedMesh) {
        this._mesh = animatedMesh;
        this._speed = 15;

        this._initialiseMesh()
    }

    
    //
    // PRIVATE
    //

    _initialiseMesh() {
        this._mesh.animActions.idle.play();
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
        .to(to, duration)        

        return tween;
    }


    //
    // PUBLIC 
    //

    walkTo(x, z) {
        this._getFaceToTween(x, z)
        .onComplete(() => {
            this._mesh.fadeToAnim(this._mesh.animActions.run)
            this._getWalkToTween(x, z)
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

}

export default Character;