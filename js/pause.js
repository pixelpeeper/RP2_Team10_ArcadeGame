var gameDimentions = {x:0,y:0};
class pauseScreen extends Phaser.Scene {
    constructor(){
        super('pauseScreen');
		
		this.start;
    }
	
	preload(){
		console.log('pause loading');
		this.load.image('menuBackground', 'images/background.jpg');
		this.load.svg('wasd_w', 'images/wasd_w.svg');
		this.load.svg('wasd_a', 'images/wasd_a.svg');
		this.load.svg('wasd_s', 'images/wasd_s.svg');
		this.load.svg('wasd_d', 'images/wasd_d.svg');
		this.load.svg('spacebar', 'images/spacebar.svg');
		this.load.svg('arrows_up', 'images/arrow_Up.svg');
		this.load.svg('arrows_down', 'images/arrow_Down.svg');
		this.load.svg('arrows_left', 'images/arrow_Left.svg');
		this.load.svg('arrows_right', 'images/arrow_Right.svg');
	}
	
	create() {
		this.scene.bringToTop();
		console.log('pause creating');
		gameDimentions.x = this.sys.game.canvas.width;
		gameDimentions.y = this.sys.game.canvas.height;
		console.log(gameDimentions)
		
		//dims the game
		var pauseBackground = this.add.rectangle(0,0, gameDimentions.x, gameDimentions.y, 0x333333);
		pauseBackground.alpha = 0.5;
		pauseBackground.setOrigin(0,0);
		
		//displays controlls
		
		this.controlls_wasd_w = 		this.add.image(gameDimentions.x/2 - gameDimentions.x * 0.3325, 	gameDimentions.y/2			+ gameDimentions.y * 0.34722, 	'wasd_w');
		this.controlls_wasd_a = 		this.add.image(gameDimentions.x/2 - gameDimentions.x * 0.3325, 	gameDimentions.y/2			+ gameDimentions.y * 0.34722, 	'wasd_a');
		this.controlls_wasd_s = 		this.add.image(gameDimentions.x/2 - gameDimentions.x * 0.3325, 	gameDimentions.y/2			+ gameDimentions.y * 0.34722, 	'wasd_s');
		this.controlls_wasd_d = 		this.add.image(gameDimentions.x/2 - gameDimentions.x * 0.3325, 	gameDimentions.y/2			+ gameDimentions.y * 0.34722, 	'wasd_d');
		this.controlls_spacebar = 		this.add.image(gameDimentions.x/2, 								gameDimentions.y/2 			+ gameDimentions.y * 0.38541, 	'spacebar');
		this.controlls_arrows_up = 		this.add.image(gameDimentions.x/2 + gameDimentions.x * 0.33, 	gameDimentions.y/2			+ gameDimentions.y * 0.34722, 	'arrows_up');
		this.controlls_arrows_down = 	this.add.image(gameDimentions.x/2 + gameDimentions.x * 0.33, 	gameDimentions.y/2			+ gameDimentions.y * 0.34722, 	'arrows_down');
		this.controlls_arrows_left = 	this.add.image(gameDimentions.x/2 + gameDimentions.x * 0.33, 	gameDimentions.y/2			+ gameDimentions.y * 0.34722, 	'arrows_left');
		this.controlls_arrows_right = 	this.add.image(gameDimentions.x/2 + gameDimentions.x * 0.33, 	gameDimentions.y/2			+ gameDimentions.y * 0.34722, 	'arrows_right');
		//key binding lables
		this.pewpew = 		this.add.text(gameDimentions.x/2							,gameDimentions.y/2 + gameDimentions.y * 0.38194,'Pew Pew Lazers', 	{font:'40px Sans-Serif',color:'#EAD718',fontFamily: 'Arial'}).setOrigin(0.5,0.5);
		this.turnLeft = 	this.add.text(gameDimentions.x/2 - gameDimentions.x * 0.45	,gameDimentions.y/2 + gameDimentions.y * 0.38194,'Left', 			{font:'40px Sans-Serif',color:'#EAD718',fontFamily: 'Arial'}).setOrigin(0.5,0.5);
		this.turnLeft = 	this.add.text(gameDimentions.x/2 + gameDimentions.x * 0.21	,gameDimentions.y/2 + gameDimentions.y * 0.38194,'Left', 			{font:'40px Sans-Serif',color:'#EAD718',fontFamily: 'Arial'}).setOrigin(0.5,0.5);
		this.turnRight = 	this.add.text(gameDimentions.x/2 - gameDimentions.x * 0.21	,gameDimentions.y/2 + gameDimentions.y * 0.38194,'Right', 			{font:'40px Sans-Serif',color:'#EAD718',fontFamily: 'Arial'}).setOrigin(0.5,0.5);
		this.turnRight = 	this.add.text(gameDimentions.x/2 + gameDimentions.x * 0.44	,gameDimentions.y/2 + gameDimentions.y * 0.38194,'Right', 			{font:'40px Sans-Serif',color:'#EAD718',fontFamily: 'Arial'}).setOrigin(0.5,0.5);
		this.thrust = 		this.add.text(gameDimentions.x/2 - gameDimentions.x * 0.35	,gameDimentions.y/2 + gameDimentions.y * 0.25,	'Thrust', 			{font:'40px Sans-Serif',color:'#EAD718',fontFamily: 'Arial'}).setOrigin(0.5,0.5);
		this.thrust = 		this.add.text(gameDimentions.x/2 + gameDimentions.x * 0.33	,gameDimentions.y/2 + gameDimentions.y * 0.25,	'Thrust', 			{font:'40px Sans-Serif',color:'#EAD718',fontFamily: 'Arial'}).setOrigin(0.5,0.5);
		
		
		const screenText = this.add.text(gameDimentions.x/2,gameDimentions.y/2, 'GAME PAUSED', {font:'80px Sans-Serif',color:'#EAD718',fontFamily: 'Arial',align:'center'}).setOrigin(0.5,0.5);
		TweenHelper.flashElement(this, screenText);
		
		//this.input.on('pointerup', function () {
		//	console.log('down');
		//	this.scene.wake('gameScreen');
		//	this.scene.setVisible(false,'pauseScreen');
		//	this.scene.pause('pauseScreen');
		//}, this);
		//closes the pause menu
		this.input.keyboard.on("keyup-ESC", () => {
			console.log('resuming game');
			this.scene.wake('gameScreen');
			this.scene.wake('uiScreen');
			this.scene.setVisible(false,'pauseScreen');
			this.scene.pause('pauseScreen');
		}, this);
		this.input.keyboard.on("keyup-P", () => {
			console.log('resuming game');
			this.scene.wake('gameScreen');
			this.scene.wake('uiScreen');
			this.scene.setVisible(false,'pauseScreen');
			this.scene.pause('pauseScreen');
		}, this);
		this.input.keyboard.on('keyup-' + 'ENTER',  function () {
			console.log('resuming game');
			this.scene.wake('gameScreen');
			this.scene.wake('uiScreen');
			this.scene.setVisible(false,'pauseScreen');
			this.scene.pause('pauseScreen');
		}, this);
		//resets the game
		this.input.keyboard.on("keyup-SHIFT", () => {
			console.log('restarting game');
			this.scene.start('gameScreen');
			this.scene.start('uiScreen');
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