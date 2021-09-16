var gameDimentions = {x:0,y:0};
class menuScreen extends Phaser.Scene {
    constructor(){
        super('menuScreen');
		
		this.start;
    }
	
	preload(){
		console.log('menu loading');
		this.load.image('menuBackground', 'images/background.jpg');
		this.load.image('title', 'iamges/title.png');
		this.load.image('controls', 'images/ANSI.png');
		this.load.svg('wasd', 'images/wasd.svg');
		this.load.svg('spacebar', 'images/spacebar.svg');
		this.load.svg('arrows', 'images/arrows.svg');
	}
	
	create(){
		console.log('menue creating');
		gameDimentions.x = this.sys.game.canvas.width;
		gameDimentions.y = this.sys.game.canvas.height;
		console.log(gameDimentions)
		//background
		this.background = this.add.image(gameDimentions.x/2,gameDimentions.y/2, 'menuBackground');
		this.background.setOrigin(0.5,0.5)
		
		this.controlls = this.add.image(gameDimentions.x/2 - 300, 	gameDimentions.y/2			+ 250, 	'wasd');
		this.controlls = this.add.image(gameDimentions.x/2, 	gameDimentions.y/2 + 27.5	+ 250, 	'spacebar');
		this.controlls = this.add.image(gameDimentions.x/2 + 300, 	gameDimentions.y/2			+ 250, 	'arrows');
		//spacebar text
		this.shoot = this.add.text(gameDimentions.x/2,gameDimentions.y/2 + 275,'Pew Pew Lazers', {font:'20px Sans-Serif',color:'#00ff00',fontFamily: 'Arial'});
		this.shoot.setOrigin(0.5,0.5);
		//start game text
		this.start = this.add.text(gameDimentions.x/2,gameDimentions.y/2,'start game', {font:'20px Sans-Serif',color:'#00ff00',fontFamily: 'Arial'});
		this.start.setInteractive();
		this.start.setOrigin(0.5,0.5);
		//start game
		this.input.on('pointerdown', function () {
			console.log('down');
			//this.scene.remove('menuScreen');
			this.scene.start('gameScreen');
			this.scene.remove('menuScreen');
		}, this);
		//credits
		this.credits = this.add.text(gameDimentions.x/2,50,'Credits:', {font:'20px Sans-Serif',color:'#00ff00',fontFamily: 'Arial'});
		this.credits.setOrigin(0.5,1);
		this.credits = this.add.text(gameDimentions.x/2 - 10,50,'Tech Artist\nEnginear\nArtist\nProduction\nEnginear', {font:'20px Sans-Serif',color:'#00ff00',fontFamily: 'Arial',align:'right'});
		this.credits.setOrigin(1,0);
		this.credits = this.add.text(gameDimentions.x/2 + 10,50,'Avery Byers\nJohnathan Conger\nKaisen Xue\nMykaela Parag\nParabav Bhatt', {font:'20px Sans-Serif',color:'#00ff00',fontFamily: 'Arial'});
		this.credits.setOrigin(0,0);
		//keyboard UI
		//var keyUp = scene.input.keyboard.addKey('pointerup');  // Get key object
		//	keyUp.on('down', function(event) {this.controlls.setTint(0xff0000)});
		//	keyUp.on('up', function(event) {this.controlls.setTint(0xff0000)});
	
	
	}
	update(time, delta){
		console.log('menue update');
		
	}
}

//put functions here