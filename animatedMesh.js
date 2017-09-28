
class AnimatedMesh extends THREE.SkinnedMesh {

    constructor(geometry, material) {    
        super(geometry, material);  
        this._mixer = new THREE.AnimationMixer(this);
        this._animActions = {};
        this._currentAnimAction = undefined;

        this._initialiseAnimActions();
    }


    //
    // PRIVATE
    //

    _initialiseAnimActions() {
        this.geometry.animations.forEach(animClip => {
            let name = animClip.name;
            this._animActions[name] = this._mixer.clipAction(name);
        })
    }

    //
    // PUBLIC
    //

    fadeToAnim(animAction) {
        if ( this._currentAnimAction) {
            let from = this._currentAnimAction.play();
            let to = animAction.play();
            from.crossFadeTo(to, 0.2, true);
            
        } else {
            animAction.play();
        }

        this._currentAnimAction = animAction;
    }

    
    //
    // ACCESSOR
    //

    get animActions() {
        return this._animActions;
    }

    get mixer() {
        return this._mixer;
    }    

}

export default AnimatedMesh;