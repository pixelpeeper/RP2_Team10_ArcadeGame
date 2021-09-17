var gameDimentions = {x:0,y:0};
class pauseScreen extends Phaser.Scene {
    constructor(){
        super('pauseScreen');
		
		this.start;
    }
	
	preload(){
		console.log('pause loading');
		this.load.image('menuBackground', 'images/background.jpg');
		this.load.image('title', 'iamges/title.png');
		this.load.image('controls', 'images/ANSI.png');
		this.load.svg('wasd', 'images/wasd.svg');
		this.load.svg('spacebar', 'images/spacebar.svg');
		this.load.svg('arrows', 'images/arrows.svg');
	}
	
	create() {
		console.log('pause creating');
		var pauseBackground = this.add.rectangle(0,0, gameDimentions.x, gameDimentions.y, 0x333333);
		pauseBackground.alpha = 0.5;
		pauseBackground.setOrigin(0,0);
		
		gameDimentions.x = this.sys.game.canvas.width;
		gameDimentions.y = this.sys.game.canvas.height;
		console.log(gameDimentions)
		
		this.add.image(gameDimentions.x/2 - 300, 	gameDimentions.y/2			+ 250, 	'wasd');
		this.add.image(gameDimentions.x/2, 			gameDimentions.y/2 + 27.5	+ 250, 	'spacebar');
		this.add.image(gameDimentions.x/2 + 300, 	gameDimentions.y/2			+ 250, 	'arrows');
		//spacebar text
		this.shoot = this.add.text(gameDimentions.x/2,		gameDimentions.y/2 + 275,	'Pew Pew Lazers', {font:'20px Sans-Serif',color:'#00ff00',fontFamily: 'Arial'});
		this.shoot.setOrigin(0.5,0.5);
		//start game text
		this.start = this.add.text(gameDimentions.x/2,		gameDimentions.y/2,			'GAME PAUSED', {font:'40px Sans-Serif',color:'#00ff00',fontFamily: 'Arial'});
		this.start.setInteractive();
		this.start.setOrigin(0.5,0.5);
		
		this.input.on('pointerup', function () {
			console.log('down');
			this.scene.wake('gameScreen');
			this.scene.setVisible(false,'pauseScreen');
		}, this);
	}
	update(time, delta){
		console.log('pause menue update');
		
	}
}

//put functions here