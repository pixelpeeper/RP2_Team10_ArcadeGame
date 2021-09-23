var cursors; //controls
var finalcount;
var globalTHIS;
var activeshockwave;
var shockwavedelay;
var playerlives;
var playerlifedeductordelay = true;
//var SW;
class gameScreen extends Phaser.Scene{
	constructor(){
		super('gameScreen');
	}

	preload ()
	{
		console.log('gameScreen loading assets');

		this.load.image('menuBackground', 'images/backgroundGame.png');
		// visual assets
		this.load.svg('ship', 'images/ship.svg');
		this.load.svg('pewpew', 'images/pewpew.svg');
		this.load.svg('asteroidlarge', 'images/asteroid1.svg');
		this.load.svg('asteroidmedium', 'images/asteroid2.svg');
		this.load.svg('asteroidsmall', 'images/asteroid3.svg');
		this.load.svg('dust', 'images/dust.svg');
		this.load.svg('circle', 'images/circle.svg');
		// audio assets
		this.load.audio('bgm', 'audio/BG_Music.mp3');
		// player sounds
		this.load.audio('gun1', 'audio/Push_Gun_1.mp3');
		this.load.audio('gun2', 'audio/Push_Gun_2.mp3');
		this.load.audio('thrust1', 'audio/1_Thrust.mp3');
		this.load.audio('thrust2', 'audio/Thrust_2.mp3');
		//this.load.audio('explosion', 'audio/.mp3');

		// asteroid sounds
		this.load.audio('coll1', 'audio/Collision_1.mp3');
		this.load.audio('coll2', 'audio/Collision_2.mp3');
		this.load.audio('coll3', 'audio/Collision_3.mp3');

		console.log('gameScreen loading complete');
	}

	create ()
	{
		
		this.background = this.add.image(gameDimentions.x/2,gameDimentions.y/2, 'menuBackground').setOrigin(0.5,0.5);
		shockwavedelay=true;
		playerlives=2;
		activeshockwave=false;
		finalcount=undefined;
		playerlifedeductordelay = true;
		console.log('gameScreen creating');
		globalTHIS = this;
		this.scene.launch('uiScreen');
		//game parameters
		this.score = 0;
		this.scoreIncrement = 50;
		this.asteroidIncrease = 2;
		this.level = 4;

		this.blasts = this.physics.add.group();
		this.powerups = this.physics.add.group();
		this.players = this.physics.add.group();
		this.shockwaves = this.physics.add.group();
		this.player = new Player(this, 600, 400, 0.99, 0.13, 150);

		//create physics for asteroids and track by size
		this.asteroids = this.physics.add.group();
		this.largeAsteroids = [];
		this.mediumAsteroids = [];
		this.smallAsteroids = [];
		this.allDust = [];

		this.physics.add.overlap(this.shockwaves, this.asteroids, overlapAOE);
		this.dust = this.physics.add.group();

		//this.asteroids.add(this.largeAsteroids);

		//add colliders
		createColliders(this);

		this.asteroidController = new AsteroidController();
		this.dustController = new DustController();
		this.soundController = new SoundController(this);
		//this.hud = new HUD(this);
		this.cursors = this.input.keyboard.createCursorKeys();
		this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
		this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
		this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

		//this.input.keyboard.on("keydown_ESCAPE", () => {
		//	if (!this.player.playerAlive)
		//		this.scene.restart();
		//});

		spawnAsteroidWave(this, this.level + this.asteroidIncrease);
		console.log('gameScreen creating complete');
		finalcount = this.level + this.asteroidIncrease;

		//pauses the game
		this.input.keyboard.on("keyup-ESC", () => {
			this.scene.launch('pauseScreen');
			this.scene.pause('gameScreen');
			this.scene.pause('uiScreen');
		});
		//pauses the game
		this.input.keyboard.on("keyup-P", () => {
			this.scene.launch('pauseScreen');
			this.scene.pause('gameScreen');
			this.scene.pause('uiScreen');
		});

		this.soundController.playBGM();
	}

	update ()
	{
		//console.log('gameScreen updating');
		if (this.player.playerAlive) {
			this.player.shipMovement();
			this.player.shipShooting();

			if(activeshockwave)
			{
				activeshockwave.updatescaling();
				}
			else{}
			//screen wrapping
			this.physics.world.wrap(this.player, 32);
			this.physics.world.wrap(this.blasts, 40);
			this.physics.world.wrapArray(this.largeAsteroids, 75);
			this.physics.world.wrapArray(this.mediumAsteroids, 48);
			this.physics.world.wrapArray(this.smallAsteroids, 32);

			//spawn new wave of asteroids if all have been destroyed
			if (this.asteroids.getLength() === 0) {
				this.largeAsteroids = [];
				this.mediumAsteroids = [];
				this.smallAsteroids = [];
				//increase wave?
				this.level += 1;
				//this.hud.updateLevel(this.level);
				this.events.emit('level', this.level);
				finalcount = this.level * this.asteroidIncrease;
				spawnAsteroidWave(this, this.level + this.asteroidIncrease); //make the new asteroids a function of the level & whatever difficulty multiplier we want
			}
		} else {
			//console.log('player is dead');
			////this.scene.remove('menuScreen');
			//this.scene.launch('failScreen');
			//this.scene.pause('gameScreen');
		}
	}
}

function createColliders(scene) {

	scene.physics.add.collider(scene.dust, scene.asteroids);
	scene.physics.add.collider(scene.dust, scene.players);

	//add collisions for players and asteroids
	scene.physics.add.collider(scene.players, scene.asteroids, function (player, asteroid){
		scene.soundController.playCollision();
		scene.player.killPlayer(player, asteroid, scene);
		scene.bgm.stop();
	});

	//add collisions for asteroids and asteroids
	scene.physics.add.collider(scene.asteroids, scene.asteroids, (asteroid1, asteroid2) =>{
		if( asteroid1.getactivated() == true | asteroid2.getactivated() == true )
		{
			if(asteroid1.type!=0 && asteroid2.type !=0)
			{
				asteroid1.destroyAsteroid();
				asteroid2.destroyAsteroid();
				finalcount -= 2;
				scene.score += scene.scoreIncrement;
				//scene.hud.updateScore(scene.score);

				globalTHIS.events.emit('score', scene.score);
				//create powerup
				if(Math.floor(Math.random() * 5) === 0 && scene.player.tripleShot === false){
					new TripleShot(scene, asteroid1.x, asteroid1.y);
				}
			}
		}

		scene.soundController.playCollision();
	}); //asteroid self-collisions
	// scene.physics.add.collider(scene.shockwaves, scene.asteroids, (shockwave, asteroid) => {
	//
	// })

	//add collisions for blasts and asteroids
	scene.physics.add.collider(scene.blasts, scene.asteroids, (blast, asteroid) => {
		if(finalcount<=1 && asteroid.type != 0 )
		{
			asteroid.destroyAsteroid();
		}
		else
		{
			if(asteroid.type == 0)
			{
				asteroid.destroyAsteroid();
				scene.score += scene.scoreIncrement;
				//scene.hud.updateScore(scene.score);
				globalTHIS.events.emit('score', scene.score);
			}
			else if(asteroid.getactivated() == false && asteroid.type!=0)
			{
				asteroid.setactivated(true);
				this.time = scene.time.addEvent({delay: 4000, callback: () => {asteroid.setactivated(false)},
				scope: this})
			}
		}

		scene.soundController.playCollision();

		//update score here
		delete blast.destroy();
	});

	//add collisions for players and powerups
	scene.physics.add.collider(scene.players, scene.powerups, (player, powerup) => {
		console.log("powerup collected");
		scene.player.tripleShot = true;
		powerup.destroy();
	});
}

function spawnAsteroidWave(scene, level) {
	scene.asteroidController.genAsteroids(scene, level);
}

function spawnDusts(scene,quantity, x, y) {
	globalTHIS.dustController.genDust(globalTHIS.scene, quantity, x, y)

	//new dust(
	//	this.scene,
	//	this.x,
	//	this.y,
	//	Math.floor(Math.random() * 360),
	//	Math.floor(Phaser.Math.Between(500,750))
	//);
}

class Player extends Phaser.Physics.Arcade.Sprite {
	constructor(
		scene,
		playerMaxVelocity,
		playerAcceleration,
		playerDrag,
		rotationSpeed,
		bulletFrequency
	) {
		super(scene, scene.game.config.width / 2, scene.game.config.height / 2, "ship");
		this.scene = scene;
		this.rotationSpeed = rotationSpeed;
		this.bulletFrequency = bulletFrequency;
		this.bulletTime = 0;
		this.playerAcceleration = playerAcceleration

		this.tripleShot = false;

		scene.add.existing(this);
		scene.players.add(this);

		this.setDamping(true);
		this.setDrag(playerDrag);
		this.setMaxVelocity(playerMaxVelocity);

		this.setCircle(36);
		this.setOrigin(0.41,0.55);
		this.setMass(4);
		this.setBounce(1);
		//this.setOffset(0, 0);

		// this.scene.physics.add.collider(
		//     this.scene.players,
		//     this.scene.asteroids,
		//     (player, asteroid) => {
		//         this.killPlayer(player, asteroid, scene);
		//         //update overlay to game over screen
		//         //scene.playerHug.displayGameOverOverlay(scene);
		//     }
		// );

		this.playerAlive = true;
		return this;
	}

	killPlayer(player, asteroid, scene) {
		if (this.playerAlive) {
			console.log(playerlives)
			//play death animation
			 if(playerlives>0 && playerlifedeductordelay==true)
			 {
			 playerlifedeductordelay=false;
			 if(playerlives==3)
			 {this.setTint(0xFFFFFF);}
			 else if(playerlives==2)
			 {this.setTint(0xFFFF00);}
			 else if(playerlives==1)
			 {this.setTint(0xff0000);}
			 spawnDusts(scene,50, this.x, this.y);
			 asteroid.destroyAsteroid();
			 //invincibility for some time after getting hit.
			 this.time = scene.time.addEvent({
				delay: 1000,
				callback: () => {
					playerlives--;
					playerlifedeductor();
					},
				scope: this
			});
			 }
			 else if(playerlives<=0)
			{
			spawnDusts(scene,50, this.x, this.y)
			//destroy asteroid
			asteroid.destroyAsteroid();
			this.time = scene.time.addEvent({
				delay: 1500,
				callback: () => {
					console.log('player is dead');
					//this.scene.remove('menuScreen');
					globalTHIS.scene.launch('failScreen');
					globalTHIS.scene.pause('gameScreen');
					},
				scope: this
			});
			this.destroy();
			this.playerAlive = false;
			}
			


			//use a delay before destroying the player object
			// this.on(
			//     "animationcomplete",
			//     () => {
			//     this.destroy();
			//     },
			//     scene
			// );

			
		}

		this.tripleShot = false;
		
	}

	shipMovement() {
		// check for forward movement
		if (this.scene.cursors.up.isDown || this.scene.keyW.isDown)
		{
			this.scene.physics.velocityFromRotation(
				this.scene.player.rotation,
				200,
				this.scene.player.body.acceleration);
			//play thrust sound
			this.scene.soundController.playThrust();
		}
		else
		{
			this.scene.player.setAcceleration(0);
		}

		// check for rotation
		if (this.scene.cursors.left.isDown || this.scene.keyA.isDown)
		{
			this.scene.player.setAngularVelocity(-300);
		}
		else if (this.scene.cursors.right.isDown || this.scene.keyD.isDown)
		{
			this.scene.player.setAngularVelocity(300);
		}
		else
		{
			this.scene.player.setAngularVelocity(0);
		}
	}

	shipShooting() {
		if (this.canShoot()) {
			this.bulletTime = this.scene.time.now + this.bulletFrequency;

			if(this.tripleShot === true) {
				new Blast(this.scene, this.angle, this.rotation);
                new Blast(this.scene, this.angle + 45, this.rotation + 0.35);
                new Blast(this.scene, this.angle - 45, this.rotation - 0.35);
			} else {
				new Blast(this.scene, this.angle, this.rotation);
			}

			//play blast sound
			this.scene.soundController.playGun();
		}
		else if(this.scene.cursors.down.isDown && shockwavedelay==true)
		{
			shockwavedelay = false;
			globalTHIS.events.emit('shockwave', shockwavedelay);
			activeshockwave = new Shockwave(this.scene);
			this.time = this.scene.time.addEvent({
				delay: 8000,
				callback: () => {settrue();},
				scope: this
			});
		}
	}

	reset() {
		this.setPosition(this.scene.game.config.width / 2, this.scene.game.config.height / 2);
		this.setVelocity(0);
		this.setAcceleration(0);
	}

	canShoot() {
		if (this.scene.cursors.space.isDown && this.bulletTime <= this.scene.time.now && this.scene.blasts.getLength() < 3) {
			return true;
		} else {
			return false;
		}
	}
}

class Shockwave extends Phaser.Physics.Arcade.Sprite {
	constructor(scene) {
		const x = scene.player.x;
		const y = scene.player.y;

		let scalex=0.1; let scaley=0.1;
		super(scene, x, y, "circle");
		scene.add.existing(this);
		scene.shockwaves.add(this);
		scene.physics.world.enableBody(this);
		this.setActive(true);
		this.setMass(10);
		this.setScale(scalex,scaley);
		this.time = scene.time.addEvent({
			delay: 400 ,
			callback: () => {this.destroy();},
			scope: this
		});
	}
	 updatescaling()
	 {
	 	this.scaleX += 0.06;
	 	this.scaleY += 0.06;
	 }
}

class Blast extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, angle, rotation) {
		const x = scene.player.x;
		const y = scene.player.y;

        //const offsetX = Math.cos(scene.player.rotation) * 10;
        //const offsetY = Math.sin(scene.player.rotation) * 10;

        const offsetX = Math.cos(rotation) * 10;
        const offsetY = Math.sin(rotation) * 10;

        super(scene, x + offsetX, y + offsetY, "pewpew");
        scene.add.existing(this);
        scene.blasts.add(this);

        //this.setAngle(scene.player.angle);
        this.setAngle(angle);

        scene.physics.world.enableBody(this);

        scene.physics.velocityFromRotation(
            //scene.player.rotation,
            rotation,
            1000 + scene.player.body.speed,
            this.body.velocity
        );

        this.setMass(10);

        this.time = scene.time.addEvent({
            delay: 800,
            callback: () => {this.destroy()},
            scope: this
        });

        //adjust collider
        //this.setSize(75, 12);
        this.setCircle(35);
        this.setOffset(0.5, 0.5);
        this.setMass(1.5);

	}
}

class AsteroidController {
		 genAsteroids(scene, num) {
			 for (let i = 0; i < num; i++) {
				 this.spawnAsteroid(scene);
			 }
		 }

		 //Deletes all asteroids from the field
		 clearAsteroids() {
			 for (let i = 0; i < this.asteroids.length; i++) {
			 this.asteroids[i].destroy();
			 }
		 }

		 spawnAsteroid(scene) {
			 let side = Math.floor(Math.random() * 4);
			 let spawnLocation = this.getSpawn(
				side,
				scene.game.config.width,
				scene.game.config.height
			 );
			 let direction = this.getDirection(side);
			 return new LargeAsteroid(scene, spawnLocation.x, spawnLocation.y, direction, Math.floor(Math.random() * 100) + 50);
		 }

		 getSpawn(side, gameWidth, gameHeight) {
			 switch (side) {
			 case 2:
				 return { x: 0, y: this.randomIntFromInterval(0, gameHeight) };
			 case 3:
				 return { x: gameWidth, y: this.randomIntFromInterval(0, gameHeight) };
			 case 1:
				 return { x: this.randomIntFromInterval(0, gameWidth), y: 0 };
			 case 0:
				 return { x: this.randomIntFromInterval(0, gameWidth), y: gameHeight };
			 }
		 }

		 getDirection(side) {
			 //Left side is tricky because it requires a range (in degrees) of
			 //Left: 270-360 or 0-90
			 switch (side) {
			 case 2:
				 if (this.randomIntFromInterval(0, 1) === 0) {
					 return this.randomIntFromInterval(280, 350);
				 } else {
					 return this.randomIntFromInterval(10, 80);
				 }
			 case 3:
				 return this.randomIntFromInterval(110, 250);
			 case 0:
				 return this.randomIntFromInterval(200, 340);
			 case 1:
				 return this.randomIntFromInterval(20, 160);
			 }
		 }

		 randomIntFromInterval(min, max) {
			 return Math.floor(Math.random() * (max - min + 1) + min);
		 }
}

class Asteroid extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, texture, rotation, speed) {
		super(scene, x, y, texture);
		this.scene = scene;
		scene.add.existing(this);
		scene.asteroids.add(this);

		this.setRotation(rotation);
		scene.physics.world.enableBody(this);
		this.setBounce(1);
		this.setMass(2);
		this.setMaxVelocity(500);
		scene.physics.velocityFromAngle(rotation, speed, this.body.velocity);
	}


}

class LargeAsteroid extends Asteroid {
	constructor(scene, x, y, rotation, speed, activated, type) {
		super(scene, x, y, "asteroidlarge", rotation, speed);
		this.setCircle(95);
		this.activated = false;
		this.type = 2;
		this.setMass(4);
		this.setMaxVelocity(300);
		this.setAngularVelocity(Phaser.Math.Between(2.5,7.5));
		scene.largeAsteroids.push(this);
	}

	setactivated(value)
	{
		this.activated = value;
	}
	getactivated()
	{
		return this.activated;
	}
	destroyAsteroid() {

		spawnDusts(this.scene,8,this.x,this.y);

		new MediumAsteroid(
			this.scene,
			this.x,
			this.y,
			Math.floor(Math.random() * 360),
			Math.floor(Phaser.Math.Between(50,125))
		);

		new MediumAsteroid(
		this.scene,
		this.x,
		this.y,
		Math.floor(Math.random() * 360),
		Math.floor(Phaser.Math.Between(50,125))
		);

		new MediumAsteroid(
		this.scene,
		this.x,
		this.y,
		Math.floor(Math.random() * 360),
		Math.floor(Phaser.Math.Between(50,125))
		);

		new MediumAsteroid(
		this.scene,
		this.x,
		this.y,
		Math.floor(Math.random() * 360),
		Math.floor(Phaser.Math.Between(50,125))
		);

		finalcount += 4;
		this.destroy();
	}
}

class MediumAsteroid extends Asteroid {
	constructor(scene, x, y, rotation, speed, activated, type) {
		super(scene, x, y, "asteroidmedium", rotation, speed);
		this.setCircle(50);
		this.setOffset(6);
		this.activated = false;
		this.type = 1;
		this.setMass(3);
		this.setMaxVelocity(400);
		this.setAngularVelocity(Phaser.Math.Between(5,10));
		scene.mediumAsteroids.push(this);
	}

	setactivated(value)
	{
		this.activated = value;
	}
	getactivated()
	{
		return this.activated;
	}
	//Upon destruction, this method creates 2 small asteroids, launches them in any direction, and then deletes itself.
	destroyAsteroid() {
		spawnDusts(this.scene,4,this.x,this.y);
		new SmallAsteroid(
			this.scene,
			this.x,
			this.y,
			Math.floor(Math.random() * 360),
			Math.floor(Phaser.Math.Between(100,200))
		);

		new SmallAsteroid(
			this.scene,
			this.x,
			this.y,
			Math.floor(Math.random() * 360),
			Math.floor(Phaser.Math.Between(100,200))
		);

		new SmallAsteroid(
			this.scene,
			this.x,
			this.y,
			Math.floor(Math.random() * 360),
			Math.floor(Phaser.Math.Between(100,200))
		);

		this.destroy();
	}
}

class SmallAsteroid extends Asteroid {
	constructor(scene, x, y, rotation, speed, activated , type) {
		//Use these to pass these back to the super class to construct the object
		super(scene, x, y, "asteroidsmall", rotation, speed);
		this.setCircle(25);
		this.setOffset(5, 5);
		this.activated = true;
		this.type = 0;
		this.setAngularVelocity(Phaser.Math.Between(10,20));
		scene.smallAsteroids.push(this);
	}


	getactivated() {
		return this.activated;
	}

	//Upon destruction, the asteroid deletes itself.
	destroyAsteroid() {
		spawnDusts(this.scene,2,this.x,this.y);
		this.destroy();
	}
}

class Powerup extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.scene = scene;
        scene.add.existing(this);
        scene.powerups.add(this);

		scene.physics.world.enableBody(this);
    }
}

class TripleShot extends Powerup {
	constructor(scene, x, y) {
		super(scene, x, y, "tripleshot");
		this.setCircle(25);
		//scene.powerups.push(this);
	}
}

//class HUD {
//	constructor(scene) {
//		this.score = scene.add
//		.text(10, 10, "Score", {
//			font: "36px Arial"
//		})
//		.setScrollFactor(0);
//		this.scoreText = scene.add
//		.text(70, 10, "0", {
//			font: "36px Arial",
//			color: "yellow"
//		})
//		.setScrollFactor(0);
//
//		this.level = scene.add
//		.text(10, 30, "Level", {
//			font: "36px Arial"
//		})
//		.setScrollFactor(0);
//
//		this.level = scene.add
//		.text(10, 30, "Level", {
//			font: "36px Arial"
//		})
//		.setScrollFactor(0);
//
//		this.levelText = scene.add
//		.text(70, 30, "1", {
//			font: "36px Arial",
//			color: "yellow"
//		})
//		.setScrollFactor(0);
//
//		let gameOverText = scene.add.text(275, 100, "Game Over", {
//		font: "50px Arial"
//		});
//		gameOverText.setScrollFactor(0);
//		gameOverText.visible = false;
//
//		let restartText = scene.add.text(300, 200, "Press Enter To Restart");
//		restartText.setScrollFactor(0);
//		restartText.visible = false;
//
//		this.gameOverOverlay = { gameOverText, restartText };
//	}
//
//	updateScore(newScore) {
//		this.scoreText.setText(newScore);
//	}
//	updateLevel(newLevel) {
//		this.levelText.setText(newLevel);
//	}
//
//	displayGameOverOverlay() {
//		this.gameOverOverlay.gameOverText.visible = true;
//		this.gameOverOverlay.restartText.visible = true;
//	}
//}

class DustController {

	//create dust
	genDust(scene, num, x, y) {

		console.log('making lots of dust');
		for (let i = 0; i < num; i++) {
			this.spawnDust(scene, x, y);
		}
	}

	//Deletes all dust from the field
	clearDust() {

		console.log('clearing dust');
		for (let i = 0; i < this.dust.length; i++) {
			this.dust[i].destroy();
		}
	}

	//this is called from genDust
	spawnDust(scene, x, y) {

		console.log('spawning dust');
		let side = Math.floor(Math.random() * 4);
		let direction = this.getDirection(side);
		return new Dust(globalTHIS, x, y, 'dust', direction, Phaser.Math.Between(250,750));
	}

	//this spawns thigns on the edge of the screen which we dont need
	getSpawn(side, gameWidth, gameHeight) {
		switch (side) {
		case 2:
			return { x: 0, y: this.randomIntFromInterval(0, gameHeight) };
		case 3:
			return { x: gameWidth, y: this.randomIntFromInterval(0, gameHeight) };
		case 1:
			return { x: this.randomIntFromInterval(0, gameWidth), y: 0 };
		case 0:
			return { x: this.randomIntFromInterval(0, gameWidth), y: gameHeight };
		}
	}

	getDirection(side) {
		//Left side is tricky because it requires a range (in degrees) of
		//Left: 270-360 or 0-90
		switch (side) {
		case 2:
			if (this.randomIntFromInterval(0, 1) === 0) {
				return this.randomIntFromInterval(280, 350);
			} else {
				return this.randomIntFromInterval(10, 80);
			}
		case 3:
			return this.randomIntFromInterval(110, 250);
		case 0:
			return this.randomIntFromInterval(200, 340);
		case 1:
			return this.randomIntFromInterval(20, 160);
		}
	}

	randomIntFromInterval(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

}

class Dust extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y, texture, rotation, speed) {
		super(scene, x, y, texture);
		this.scene = scene;
		scene.add.existing(this);
		scene.dust.add(this);

		this.setRotation(rotation);
		scene.physics.world.enableBody(this);
		this.setBounce(1);
		this.setMass(0.5);
		this.setMaxVelocity(7500);
		scene.physics.velocityFromAngle(rotation, speed, this.body.velocity);

		this.time = scene.time.addEvent({
			delay: Phaser.Math.Between(3000,1000),
			callback: () => {this.destroy()},
			scope: this
		});
	}
}

class dust extends Dust {
	constructor(scene, x, y, rotation, speed, activated , type) {
		console.log('making dust');
		//Use these to pass these back to the super class to construct the object
		super(scene, x, y, 'dust', rotation, speed);
		this.setCircle(5);
		this.setOffset(0, 0);
		this.activated = true;
		this.type = 0;
		this.setAngularVelocity(Phaser.Math.Between(100,200));
		scene.allDust.push(this);
	}


	getactivated() {
		return this.activated;
	}

	//Upon destruction, the asteroid deletes itself.
	destroyDust() {
		this.destroy();
	}
}

class SoundController {
	constructor(scene) {
		this.scene = scene;

		// initialize sounds
		scene.bgm = scene.sound.add('bgm', { loop: true, volume: 0.5 });
		scene.gun1 = scene.sound.add('gun1');
		scene.gun2 = scene.sound.add('gun2');
		scene.thrust1 = scene.sound.add('thrust1');
		scene.thrust2 = scene.sound.add('thrust2');
		scene.coll1 = scene.sound.add('coll1');
		scene.coll2 = scene.sound.add('coll2');
		scene.coll3 = scene.sound.add('coll3');
	}

	playBGM() {
		if(this.scene.bgm.isPlaying) {
			return;
		}

		this.scene.bgm.play();
	}

	playGun() {
		// if(this.scene.gun1.isPlaying || this.scene.gun2.isPlaying) {
		// 	return;
		// }

		switch (Math.floor(Math.random() * 2)) {
			case 0:
				this.scene.gun1.play();
				break;
			case 1:
				this.scene.gun2.play();
				break;
			default:
				break;
		}
	}

	playThrust() {
		if(this.scene.thrust1.isPlaying || this.scene.thrust2.isPlaying){
			return;
		}

		switch (Math.floor(Math.random() * 2)) {
			case 0:
				this.scene.thrust1.play();
				break;
			case 1:
				this.scene.thrust2.play();
				break;
			default:
				break;
		}
	}

	playCollision() {
		if(this.scene.coll1.isPlaying || this.scene.coll2.isPlaying || this.scene.coll3.isPlaying) {
			return;
		}

		switch (Math.floor(Math.random() * 3)) {
			case 0:
				this.scene.coll1.play();
				break;
			case 1:
				this.scene.coll2.play();
				break;
			case 2:
				this.scene.coll3.play();
				break;
			default:
				break;
		}
	}
}
function settrue()
{
	shockwavedelay=true;
	globalTHIS.events.emit('shockwave', shockwavedelay);
}
function overlapAOE(shockwave, asteroid)
{
	asteroid.destroyAsteroid();
	//asteroid.setVelocity(-asteroid.body.velocity.x  * 2, -asteroid.body.velocity.y * 2);
}
function playerlifedeductor()
{
	playerlifedeductordelay = true;
}