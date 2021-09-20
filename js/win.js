
class winScreen extends Phaser.Scene {
    constructor(){
        super("winScreen");
    }
	
	preload(){
		console.log('win loading');
	}
	
	create(){
		console.log('win creating');
		this.credits = this.add.text(gameDimentions.x/2,gameDimentions.x/2,'WINNER', {font:'40px Sans-Serif',color:'#00ff00',fontFamily: 'Arial'});
		this.credits.setOrigin(0.5,0.5);

	}
	update(time, delta){
		console.log('win update');

	}
}

//put functions here