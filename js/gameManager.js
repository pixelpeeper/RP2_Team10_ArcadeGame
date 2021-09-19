var cursors; //controls

class gameScreen extends Phaser.Scene{
	constructor(){
		super('gameScreen');
	}

	preload ()
	{
		console.log('gameScreen loading assets');
		this.load.svg('ship', 'images/ship.svg');
		this.load.svg('pewpew', 'images/pewpew.svg');
		this.load.svg('asteroidlarge', 'images/asteroid1.svg');
		this.load.svg('asteroidmedium', 'images/asteroid2.svg');
		this.load.svg('asteroidsmall', 'images/asteroid3.svg');
		console.log('gameScreen loading complete');
	}

	create ()
	{
		console.log('gameScreen creating');
		//game parameters
		this.score = 0;
		this.scoreIncrement = 50;
		this.asteroidIncrease = 3;
		this.level = 1;

		this.blasts = this.physics.add.group();
		this.players = this.physics.add.group();

		this.player = new Player(this, 600, 400, 0.99, 0.13, 150);

		//create physics for asteroids and track by size
		this.asteroids = this.physics.add.group();
		this.largeAsteroids = [];
		this.mediumAsteroids = [];
		this.smallAsteroids = [];

		//this.asteroids.add(this.largeAsteroids);

		//add colliders
		createColliders(this);

		this.asteroidController = new AsteroidController();
		this.hud = new HUD(this);
		this.cursors = this.input.keyboard.createCursorKeys();

		//this.input.keyboard.on("keydown_ESCAPE", () => {
		//	if (!this.player.playerAlive)
		//		this.scene.restart();
		//});

		spawnAsteroidWave(this, this.level * this.asteroidIncrease);
		console.log('gameScreen creating complete');


		//pauses the game
		this.input.keyboard.on("keyup-ESC", () => {
			this.scene.launch('pauseScreen');
			this.scene.pause('gameScreen');
		});
	}

	update ()
	{
		console.log('gameScreen updating');
		if (this.player.playerAlive) {
			this.player.shipMovement();
			this.player.shipShooting();

			//screen wrapping
			this.physics.world.wrap(this.player, 64);
			this.physics.world.wrap(this.blasts, 40);
			this.physics.world.wrapArray(this.largeAsteroids, 64);
			this.physics.world.wrapArray(this.mediumAsteroids, 48);
			this.physics.world.wrapArray(this.smallAsteroids, 32);

			//spawn new wave of asteroids if all have been destroyed
			if (this.asteroids.getLength() === 0) {
				this.largeAsteroids = [];
				this.mediumAsteroids = [];
				this.smallAsteroids = [];

				//increase wave?
				this.level += 1;
				this.hud.updateLevel(this.level);
				spawnAsteroidWave(this, this.level); //make the new asteroids a function of the level & whatever difficulty multiplier we want
			}
		} else {
			console.log('player is dead');
			//this.scene.remove('menuScreen');
			this.scene.launch('failScreen');
			this.scene.pause('gameScreen');
		}
	}
}

function createColliders(scene) {
	scene.physics.add.collider(scene.players, scene.asteroids, function (player, asteroid){
		scene.player.killPlayer(player, asteroid, scene);
	});
	scene.physics.add.collider(scene.asteroids, scene.asteroids, (asteroid1, asteroid2) =>{
		if( asteroid1.getactivated() == true | asteroid2.getactivated() == true )
		{
			if(asteroid1.type!=0 && asteroid2.type !=0)
			{
			asteroid1.destroyAsteroid();
			asteroid2.destroyAsteroid();
			scene.score += scene.scoreIncrement;
			scene.hud.updateScore(scene.score);
			}
		}
	}); //asteroid self-collisions

	scene.physics.add.collider(scene.blasts, scene.asteroids, (blast, asteroid) => {
		if(asteroid.type == 0)
		{ 
			asteroid.destroyAsteroid();
			scene.score += scene.scoreIncrement;
			scene.hud.updateScore(scene.score);
		}
		else if(asteroid.getactivated() == false && asteroid.type!=0)
		{
			asteroid.setactivated(true);
			this.time = scene.time.addEvent({delay: 1000, callback: () => {asteroid.setactivated(false)},
			scope: this})
		}
		//update score here
		delete blast.destroy();
		
	
	})
}
function spawnAsteroidWave(scene, level) {
	scene.asteroidController.genAsteroids(scene, level);
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

		scene.add.existing(this);
		scene.players.add(this);

		this.setDamping(true);
		this.setDrag(playerDrag);
		this.setMaxVelocity(playerMaxVelocity);

		this.setCircle(32);
		this.setOrigin(0.5,0.5);
		this.setOffset(16, 16);

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
			//play death animation

			//destroy asteroid
			asteroid.destroyAsteroid();

			//use a delay before destroying the player object
			// this.on(
			//     "animationcomplete",
			//     () => {
			//     this.destroy();
			//     },
			//     scene
			// );
			this.destroy();
		}

		this.playerAlive = false;
	}

	shipMovement() {
		// check for forward movement
		if (this.scene.cursors.up.isDown)
		{
			this.scene.physics.velocityFromRotation(
				this.scene.player.rotation,
				200,
				this.scene.player.body.acceleration);
		}
		else
		{
			this.scene.player.setAcceleration(0);
		}

		// check for rotation
		if (this.scene.cursors.left.isDown)
		{
			this.scene.player.setAngularVelocity(-300);
		}
		else if (this.scene.cursors.right.isDown)
		{
			this.scene.player.setAngularVelocity(300);
		}
		else
		{
			this.scene.player.setAngularVelocity(0);
		}
	}

	shipShooting() {
		if (this.scene.cursors.space.isDown && this.bulletTime <= this.scene.time.now && this.scene.blasts.getLength() < 3) {
			this.bulletTime = this.scene.time.now + this.bulletFrequency;
			new Blast(this.scene);
		}
	}

	reset() {
		this.setPosition(this.scene.game.config.width / 2, this.scene.game.config.height / 2);
		this.setVelocity(0);
		this.setAcceleration(0);
	}
}

class Blast extends Phaser.Physics.Arcade.Sprite {
	constructor(scene) {
		const x = scene.player.x;
		const y = scene.player.y;

		const offsetX = Math.cos(scene.player.rotation) * 30;
		const offsetY = Math.sin(scene.player.rotation) * 30;


		super(scene, x + offsetX, y + offsetY, "pewpew");
		scene.add.existing(this);
		scene.blasts.add(this);

		this.setAngle(scene.player.angle);
		scene.physics.world.enableBody(this);

		scene.physics.velocityFromRotation(
			scene.player.rotation,
			1000 + scene.player.body.speed,
			this.body.velocity
		);

		this.setMass(1);
		
		this.time = scene.time.addEvent({
			delay: 800,
			callback: () => {this.destroy()},
			scope: this
		});

		//adjust collider
		this.setSize(75, 12);
		this.setOffset(0.5, 0.5);
	}
}
// Below function will create small asteroids on collision
function createnewsmallasteroids(_asteroid1,_asteroid2)
{
	createsmallasteroids(
		Phaser.Math.Average([_asteroid1.body.center.x, _asteroid2.body.center.x]) + Phaser.Math.Between(-32,32),
		Phaser.Math.Average([_asteroid1.body.center.y, _asteroid2.body.center.y]) + Phaser.Math.Between(-32,32),
		Phaser.Math.Average([_asteroid1.body.velocity.x, _asteroid2.body.velocity.x]) * Phaser.Math.Between(-4,4),
		Phaser.Math.Average([_asteroid1.body.velocity.y, _asteroid2.body.velocity.y]) * Phaser.Math.Between(-4,4),

	);
	_asteroid1.disableBody(true,true);
	_asteroid2.disableBody(true,true);
}
// Below function will create medium asteroids on collision
function createnewmediumasteroids(_asteroid1,_asteroid2)
{
	createmediumasteroids(
		Phaser.Math.Average([_asteroid1.body.center.x, _asteroid2.body.center.x]) + Phaser.Math.Between(-32,32),
		Phaser.Math.Average([_asteroid1.body.center.y, _asteroid2.body.center.y]) + Phaser.Math.Between(-32,32),
		Phaser.Math.Average([_asteroid1.body.velocity.x, _asteroid2.body.velocity.x]) * Phaser.Math.Between(-4,4),
		Phaser.Math.Average([_asteroid1.body.velocity.y, _asteroid2.body.velocity.y]) * Phaser.Math.Between(-4,4),

	);
	_asteroid1.disableBody(true,true);
	_asteroid2.disableBody(true,true);
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
		this.setMass(1);
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
		this.setMass(3);
		this.setMaxVelocity(300);
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
		new MediumAsteroid(
		this.scene,
		this.x,
		this.y,
		Math.floor(Math.random() * 360),
		Math.floor(Math.random() * 75) + 50
		);

		new MediumAsteroid(
		this.scene,
		this.x,
		this.y,
		Math.floor(Math.random() * 360),
		Math.floor(Math.random() * 75) + 50
		);

		new MediumAsteroid(
		this.scene,
		this.x,
		this.y,
		Math.floor(Math.random() * 360),
		Math.floor(Math.random() * 75) + 50
		);

		new MediumAsteroid(
		this.scene,
		this.x,
		this.y,
		Math.floor(Math.random() * 360),
		Math.floor(Math.random() * 75) + 50
		);

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
		this.setMass(2);
		this.setMaxVelocity(400);
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
		new SmallAsteroid(
			this.scene,
			this.x,
			this.y,
			Math.floor(Math.random() * 360),
			Math.floor(Math.random() * 75) + 50
		);

		new SmallAsteroid(
			this.scene,
			this.x,
			this.y,
			Math.floor(Math.random() * 360),
			Math.floor(Math.random() * 75) + 50
		);
		
		new SmallAsteroid(
			this.scene,
			this.x,
			this.y,
			Math.floor(Math.random() * 360),
			Math.floor(Math.random() * 75) + 50
		);

		new SmallAsteroid(
			this.scene,
			this.x,
			this.y,
			Math.floor(Math.random() * 360),
			Math.floor(Math.random() * 75) + 50
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
		scene.smallAsteroids.push(this);
	}

	getactivated() {
		return this.activated;
	}

	//Upon destruction, the asteroid deletes itself.
	destroyAsteroid() {
		this.destroy();
	}
}

class HUD {
	constructor(scene) {
		this.score = scene.add
		.text(10, 10, "Score", {
			font: "18px Arial"
		})
		.setScrollFactor(0);
		this.scoreText = scene.add
		.text(70, 10, "0", {
			font: "18px Arial",
			color: "yellow"
		})
		.setScrollFactor(0);

		this.level = scene.add
		.text(10, 30, "Level", {
			font: "18px Arial"
		})
		.setScrollFactor(0);

		this.level = scene.add
		.text(10, 30, "Level", {
			font: "18px Arial"
		})
		.setScrollFactor(0);

		this.levelText = scene.add
		.text(70, 30, "1", {
			font: "18px Arial",
			color: "yellow"
		})
		.setScrollFactor(0);

		let gameOverText = scene.add.text(275, 100, "Game Over", {
		font: "50px Arial"
		});
		gameOverText.setScrollFactor(0);
		gameOverText.visible = false;

		let restartText = scene.add.text(300, 200, "Press Enter To Restart");
		restartText.setScrollFactor(0);
		restartText.visible = false;

		this.gameOverOverlay = { gameOverText, restartText };
	}

	updateScore(newScore) {
		this.scoreText.setText(newScore);
	}
	updateLevel(newLevel) {
		this.levelText.setText(newLevel);
	}

	displayGameOverOverlay() {
		this.gameOverOverlay.gameOverText.visible = true;
		this.gameOverOverlay.restartText.visible = true;
	}
}
