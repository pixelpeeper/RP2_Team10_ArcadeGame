
class failScreen extends Phaser.Scene {
    constructor(){
        super("failScreen");
    }
	
	preload(){
		console.log('fail loading');
	}
	
	create(){
		console.log('fail creating');
		
		gameDimentions.x = this.sys.game.canvas.width;
		gameDimentions.y = this.sys.game.canvas.height;
		console.log(gameDimentions)
		
		//dims the game
		var pauseBackground = this.add.rectangle(0,0, gameDimentions.x, gameDimentions.y, 0x333333);
		pauseBackground.alpha = 0.5;
		pauseBackground.setOrigin(0,0);
		
		//displays mocking message of player
		this.credits = this.add.text(gameDimentions.x/2,gameDimentions.x/2,'YOU FAILED TO BLAST \'EM ALL.\nPLAY AGAIN?', {font:'40px Sans-Serif',color:'#00ff00',fontFamily: 'Arial',align:'center'});
		this.credits.setOrigin(0.5,0.5);
	}
	update(time, delta){
		console.log('fail update');

	}
}

//put functions here