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
		gameDimentions.x = this.sys.game.canvas.width;
		gameDimentions.y = this.sys.game.canvas.height;
		console.log('menue creating');
		console.log(gameDimentions)
		this.add.image(0,0, 'menuBackground');
		this.add.image(gameDimentions.x/2 - 300, 	gameDimentions.y/2			+ 250, 	'wasd');
		this.add.image(gameDimentions.x/2, 			gameDimentions.y/2 + 27.5	+ 250, 	'spacebar');
		this.add.image(gameDimentions.x/2 + 300, 	gameDimentions.y/2			+ 250, 	'arrows');
		//spacebar text
		this.shoot = this.add.text(gameDimentions.x/2,		gameDimentions.y/2 + 275,			'Shoot', {fontSize:'20px',color:'#ff0000',fontFamily: 'Arial'});
		this.shoot.setOrigin(0.5,0.5);
		//start game text
		this.start = this.add.text(gameDimentions.x/2,		gameDimentions.y/2,			'start game', {fontSize:'20px',color:'#ff0000',fontFamily: 'Arial'});
		this.start.setInteractive();
		this.start.setOrigin(0.5,0.5);
		
		this.input.on('pointerdown', function () {
			console.log('down');
			//this.scene.remove('menuScreen');
			this.scene.start('gameScreen');
		}, this);
	}
	update(time, delta){
		console.log('menue update');
		//this.input.on('pointerup', function (pointer) {
		//	this.scene.start('playing');
		//});
		
	}
}

//put functions here