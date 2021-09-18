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
	
	create() {
		console.log('pause creating');
		var pauseBackground = this.add.rectangle(0,0, gameDimentions.x, gameDimentions.y, 0x333333);
		pauseBackground.alpha = 0.5;
		pauseBackground.setOrigin(0,0);
		
		gameDimentions.x = this.sys.game.canvas.width;
		gameDimentions.y = this.sys.game.canvas.height;
		console.log(gameDimentions)
		
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
		this.shoot = this.add.text(gameDimentions.x/2,		gameDimentions.y/2 + 275,	'Pew Pew Lazers', {font:'20px Sans-Serif',color:'#00ff00',fontFamily: 'Arial'});
		this.shoot.setOrigin(0.5,0.5);
		//start game text
		this.start = this.add.text(gameDimentions.x/2,		gameDimentions.y/2,			'GAME PAUSED', {font:'40px Sans-Serif',color:'#00ff00',fontFamily: 'Arial'});
		this.start.setInteractive();
		this.start.setOrigin(0.5,0.5);
		
		//this.input.on('pointerup', function () {
		//	console.log('down');
		//	this.scene.wake('gameScreen');
		//	this.scene.setVisible(false,'pauseScreen');
		//	this.scene.pause('pauseScreen');
		//}, this);
		//closes the pause menu
		this.input.keyboard.on("keyup-ESC", () => {
			console.log('down');
			this.scene.wake('gameScreen');
			this.scene.setVisible(false,'pauseScreen');
			this.scene.pause('pauseScreen');
		}, this);
		//resets the game
		this.input.keyboard.on("keyup-SHIFT", () => {
			console.log('down');
			this.scene.start('gameScreen');
			this.scene.setVisible(false,'pauseScreen');
			this.scene.pause('pauseScreen');
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

		
	}
	update(time, delta){
		console.log('pause menue update');
		
	}
}

//put functions here