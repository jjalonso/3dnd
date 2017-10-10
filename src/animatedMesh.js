
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
        if (this._currentAnimAction) {
            this._currentAnimAction.fadeOut();
            // this._currentAnimAction.play();
            let to = animAction.play();
            to.fadeIn();
            // this._currentAnimAction.crossFadeTo(to, 0.2);   
        } else {
            animAction.play();
        }

        this._currentAnimAction = animAction;
    }
        
	// play(animName, weight) {
    //     //console.log("play('%s', %f)", animName, weight);		
    //     return this.mixer.clipAction(animName).		
    //             setEffectiveWeight(weight).play();	
    // };

    // crossfade(fromAnimName, toAnimName) {
	// 	this.mixer.stopAllAction();		
		
	// 	var fromAction = this.play(fromAnimName, 1);		
	// 	var toAction = this.play(toAnimName, 1);		
		
	// 	fromAction.crossFadeTo(toAction, 0.2, false);
	// };
    

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