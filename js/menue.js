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
		this.load.svg('wasd_w', 'images/wasd_w.svg');
		this.load.svg('wasd_a', 'images/wasd_a.svg');
		this.load.svg('wasd_s', 'images/wasd_s.svg');
		this.load.svg('wasd_d', 'images/wasd_d.svg');
		this.load.svg('spacebar', 'images/spacebar.svg');
		this.load.svg('arrows_up', 'images/arrow_up.svg');
		this.load.svg('arrows_down', 'images/arrow_down.svg');
		this.load.svg('arrows_left', 'images/arrow_left.svg');
		this.load.svg('arrows_right', 'images/arrow_right.svg');
	}
	
	create(){
		console.log('menue creating');
		gameDimentions.x = this.sys.game.canvas.width;
		gameDimentions.y = this.sys.game.canvas.height;
		console.log(gameDimentions)
		//background
		this.background = this.add.image(gameDimentions.x/2,gameDimentions.y/2, 'menuBackground').setOrigin(0.5,0.5);
		
		this.controlls_wasd_w = 		this.add.image(gameDimentions.x/2 - 300, 	gameDimentions.y/2			+ 250, 	'wasd_w');
		this.controlls_wasd_a = 		this.add.image(gameDimentions.x/2 - 300, 	gameDimentions.y/2			+ 250, 	'wasd_a');
		this.controlls_wasd_s = 		this.add.image(gameDimentions.x/2 - 300, 	gameDimentions.y/2			+ 250, 	'wasd_s');
		this.controlls_wasd_d = 		this.add.image(gameDimentions.x/2 - 300, 	gameDimentions.y/2			+ 250, 	'wasd_d');
		this.controlls_spacebar = 		this.add.image(gameDimentions.x/2, 			gameDimentions.y/2 + 27.5	+ 250, 	'spacebar');
		this.controlls_arrows_up = 		this.add.image(gameDimentions.x/2 + 300, 	gameDimentions.y/2			+ 250, 	'arrows_up');
		this.controlls_arrows_down = 	this.add.image(gameDimentions.x/2 + 300, 	gameDimentions.y/2			+ 250, 	'arrows_down');
		this.controlls_arrows_left = 	this.add.image(gameDimentions.x/2 + 300, 	gameDimentions.y/2			+ 250, 	'arrows_left');
		this.controlls_arrows_right = 	this.add.image(gameDimentions.x/2 + 300, 	gameDimentions.y/2			+ 250, 	'arrows_right');
		//spacebar text
		this.shoot = this.add.text(gameDimentions.x/2,gameDimentions.y/2 + 275,'Pew Pew Lazers', {font:'20px Sans-Serif',color:'#00ff00',fontFamily: 'Arial'}).setOrigin(0.5,0.5);
		//start game text
		//this.start = this.add.text(gameDimentions.x/2,gameDimentions.y/2,'start game', {font:'20px Sans-Serif',color:'#00ff00',fontFamily: 'Arial'}).setOrigin(0.5,0.5);
		//this.start.setInteractive();
		
		
		const screenText = this.add.text(gameDimentions.x/2,gameDimentions.y/2, 'Press ENTER to Start', {font:'40px Sans-Serif',color:'#00ff00',fontFamily: 'Arial',align:'center'}).setOrigin(0.5,0.5);
		TweenHelper.flashElement(this, screenText);
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
			this.controlls_wasd_w.setTint(0xff0000);
		}, this);
		this.input.keyboard.on('keyup-' + 'W', function () {
			this.controlls_wasd_w.setTint(0xFFFFFF);
		}, this);
		this.input.keyboard.on('keydown-' + 'A', function () {
			this.controlls_wasd_a.setTint(0xff0000);
		}, this);
		this.input.keyboard.on('keyup-' + 'A', function () {
			this.controlls_wasd_a.setTint(0xFFFFFF);
		}, this);
		this.input.keyboard.on('keydown-' + 'S', function () {
			this.controlls_wasd_s.setTint(0xff0000);
		}, this);
		this.input.keyboard.on('keyup-' + 'S', function () {
			this.controlls_wasd_s.setTint(0xFFFFFF);
		}, this);
		this.input.keyboard.on('keydown-' + 'D', function () {
			this.controlls_wasd_d.setTint(0xff0000);
		}, this);
		this.input.keyboard.on('keyup-' + 'D', function () {
			this.controlls_wasd_d.setTint(0xFFFFFF);
		}, this);

		//arrows
		this.input.keyboard.on('keydown-' + 'UP', function () {
			this.controlls_arrows_up.setTint(0xff0000);
		}, this);
		this.input.keyboard.on('keyup-' + 'UP', function () {
			this.controlls_arrows_up.setTint(0xFFFFFF);
		}, this);
		this.input.keyboard.on('keydown-' + 'DOWN', function () {
			this.controlls_arrows_down.setTint(0xff0000);
		}, this);
		this.input.keyboard.on('keyup-' + 'DOWN', function () {
			this.controlls_arrows_down.setTint(0xFFFFFF);
		}, this);
		this.input.keyboard.on('keydown-' + 'LEFT', function () {
			this.controlls_arrows_left.setTint(0xff0000);
		}, this);
		this.input.keyboard.on('keyup-' + 'LEFT', function () {
			this.controlls_arrows_left.setTint(0xFFFFFF);
		}, this);
		this.input.keyboard.on('keydown-' + 'RIGHT', function () {
			this.controlls_arrows_right.setTint(0xff0000);
		}, this);
		this.input.keyboard.on('keyup-' + 'RIGHT', function () {
			this.controlls_arrows_right.setTint(0xFFFFFF);
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