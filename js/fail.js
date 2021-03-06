var gameDimentions = {x:0,y:0};
class failScreen extends Phaser.Scene {
    constructor(){
        super("failScreen");
    }
	
	preload(){
		console.log('fail loading');
	}
	
	create(){
		console.log('fail creating');
		this.scene.bringToTop();
		
		gameDimentions.x = this.sys.game.canvas.width;
		gameDimentions.y = this.sys.game.canvas.height;
		console.log(gameDimentions)
		
		//dims the game
		var pauseBackground = this.add.rectangle(0,0, gameDimentions.x, gameDimentions.y, 0x333333);
		pauseBackground.alpha = 0.5;
		pauseBackground.setOrigin(0,0);
		
		//displays mocking message of player
		console.log(globalTHIS.score);
		console.log(this.score);
		this.credits = this.add.text(gameDimentions.x/2,gameDimentions.y/2 - gameDimentions.y * 0.111,'YOU FAILED TO BLAST \'EM ALL.', {font:'80px Sans-Serif',color:'#EAD718',fontFamily: 'Arial',align:'center'}).setOrigin(0.5,0.5);
		
		const screenText = this.add.text(gameDimentions.x/2,gameDimentions.y/2, 'BLAST AGAIN?', {font:'80px Sans-Serif',color:'#EAD718',fontFamily: 'Arial',align:'center'}).setOrigin(0.5,0.5);
		TweenHelper.flashElement(this, screenText);
		
		if (globalTHIS.score > highScore) {
			this.highScore = this.add.text(gameDimentions.x/2,gameDimentions.y/2 - gameDimentions.y * -0.111, 'New High Score! ' + globalTHIS.score, {font:'80px Sans-Serif',color:'#EAD718',fontFamily: 'Arial',align:'center'}).setOrigin(0.5,0.5);
			this.highScore = this.add.text(gameDimentions.x/2,gameDimentions.y/2 - gameDimentions.y * -0.222, 'Previous Best: ' + highScore, {font:'80px Sans-Serif',color:'#EAD718',fontFamily: 'Arial',align:'center'}).setOrigin(0.5,0.5);
			highScore = globalTHIS.score;
		} else {
			this.highScore = this.add.text(gameDimentions.x/2,gameDimentions.y/2 - gameDimentions.y * -0.111, 'Score: ' + globalTHIS.score, {font:'80px Sans-Serif',color:'#EAD718',fontFamily: 'Arial',align:'center'}).setOrigin(0.5,0.5);
			this.highScore = this.add.text(gameDimentions.x/2,gameDimentions.y/2 - gameDimentions.y * -0.222, 'High Score: ' + highScore, {font:'80px Sans-Serif',color:'#EAD718',fontFamily: 'Arial',align:'center'}).setOrigin(0.5,0.5);
		}
		
		//also starts the game
		this.input.keyboard.on('keyup-' + 'ENTER',  function () {
			console.log('starting with enter');
			//this.scene.remove('menuScreen');
			this.scene.start('gameScreen');
			this.scene.setVisible(false,'failScreen');
			this.scene.pause('failScreen');
		}, this);

	}
	update(time, delta){
		console.log('fail update');

	}
}

//put functions here