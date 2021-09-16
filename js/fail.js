
class failScreen extends Phaser.Scene {
    constructor(){
        super("failScreen");
    }
	
	preload(){
		console.log('fail loading');
	}
	
	create(){
		console.log('fail creating');
		this.credits = this.add.text(gameDimentions.x/2,gameDimentions.x/2,'FAILURE', {font:'40px Sans-Serif',color:'#00ff00',fontFamily: 'Arial'});
		this.credits.setOrigin(0.5,0.5);
	}
	update(time, delta){
		console.log('fail update');

	}
}

//put functions here