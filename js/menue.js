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
		
		this.controlls_wasd = this.add.image(gameDimentions.x/2 - 300, 	gameDimentions.y/2			+ 250, 	'wasd');
		this.controlls_spacebar = this.add.image(gameDimentions.x/2, 	gameDimentions.y/2 + 27.5	+ 250, 	'spacebar');
		this.controlls_arrows = this.add.image(gameDimentions.x/2 + 300, 	gameDimentions.y/2			+ 250, 	'arrows');
		//spacebar text
		this.shoot = this.add.text(gameDimentions.x/2,gameDimentions.y/2 + 275,'Pew Pew Lazers', {font:'20px Sans-Serif',color:'#00ff00',fontFamily: 'Arial'});
		this.shoot.setOrigin(0.5,0.5);
		//start game text
		this.start = this.add.text(gameDimentions.x/2,gameDimentions.y/2,'start game', {font:'20px Sans-Serif',color:'#00ff00',fontFamily: 'Arial'});
		this.start.setInteractive();
		this.start.setOrigin(0.5,0.5);
		//start game
		//this.input.on('pointerup', function () {
		//	console.log('down');
		//	//this.scene.remove('menuScreen');
		//	this.scene.start('gameScreen');
		//	this.scene.setVisible(false,'menuScreen');
		//	this.scene.pause('menuScreen');
		//}, this);
		//also starts the game
		this.input.keyboard.on('keyup-' + 'ENTER',  function () {
			console.log('starting with enter');
			//this.scene.remove('menuScreen');
			this.scene.start('gameScreen');
			this.scene.setVisible(false,'menuScreen');
			this.scene.pause('menuScreen');
		}, this);

		//keybindings demos
		//spacebar
		this.input.keyboard.on('keydown-' + 'SPACE',  function () {
			this.controlls_spacebar.setTint(0xff0000);
		}, this);
		this.input.keyboard.on('keyup-' + 'SPACE',  function () {
			this.controlls_spacebar.setTint(0xFFFFFF);
		}, this);

		//wasd
		this.input.keyboard.on('keydown-' + 'W', function () {
			this.controlls_wasd.setTint(0xff0000);
		}, this);
		this.input.keyboard.on('keyup-' + 'W', function () {
			this.controlls_wasd.setTint(0xFFFFFF);
		}, this);
		this.input.keyboard.on('keydown-' + 'A', function () {
			this.controlls_wasd.setTint(0xff0000);
		}, this);
		this.input.keyboard.on('keyup-' + 'A', function () {
			this.controlls_wasd.setTint(0xFFFFFF);
		}, this);
		this.input.keyboard.on('keydown-' + 'D', function () {
			this.controlls_wasd.setTint(0xff0000);
		}, this);
		this.input.keyboard.on('keyup-' + 'D', function () {
			this.controlls_wasd.setTint(0xFFFFFF);
		}, this);

		//arrows
		this.input.keyboard.on('keydown-' + 'UP', function () {
			this.controlls_arrows.setTint(0xff0000);
		}, this);
		this.input.keyboard.on('keyup-' + 'UP', function () {
			this.controlls_arrows.setTint(0xFFFFFF);
		}, this);
		this.input.keyboard.on('keydown-' + 'LEFT', function () {
			this.controlls_arrows.setTint(0xff0000);
		}, this);
		this.input.keyboard.on('keyup-' + 'LEFT', function () {
			this.controlls_arrows.setTint(0xFFFFFF);
		}, this);
		this.input.keyboard.on('keydown-' + 'RIGHT', function () {
			this.controlls_arrows.setTint(0xff0000);
		}, this);
		this.input.keyboard.on('keyup-' + 'RIGHT', function () {
			this.controlls_arrows.setTint(0xFFFFFF);
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