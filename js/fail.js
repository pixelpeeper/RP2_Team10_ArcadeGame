
class fail extends Phaser.Scene {
    constructor(){
        super("failScreen");
    }
	
	preload(){
		console.log('fail loading');
	}
	
	create(){
		console.log('fail creating');

	}
	update(time, delta){
		console.log('fail update');

	}
}

//put functions here