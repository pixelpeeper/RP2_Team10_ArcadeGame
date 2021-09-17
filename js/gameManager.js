var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            fps: 60,
            gravity: { y: 0 },
            debug: true,
            debugShowBody: true,
            debugShowAngularVelocity: true,
            debugAngularVelocityColor: 0xffff00,
            debugBodyColor: 0x0000ff
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
var cursors; //controls

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('ship', 'images/Spaceship1.png');
    //this.load.image('asteroid_large', 'assets/asteroid_large.png')
}

function create ()
{
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
    
    this.input.keyboard.on("keydown_ENTER", () => {
        if (!this.player.playerAlive)
            this.scene.restart();
    });

    spawnAsteroidWave(this, this.level * this.asteroidIncrease);
}

function update ()
{       
    if (this.player.playerAlive) {
        this.player.shipMovement();
        this.player.shipShooting();

        //screen wrapping
        this.physics.world.wrap(this.player, 32);
        this.physics.world.wrap(this.blasts, 20);
        this.physics.world.wrapArray(this.largeAsteroids, 32);
        this.physics.world.wrapArray(this.mediumAsteroids, 32);
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
    }
}

function createColliders(scene) {
    scene.physics.add.collider(scene.players, scene.asteroids, function (player, asteroid){
        scene.player.killPlayer(player, asteroid, scene);});
    scene.physics.add.collider(scene.asteroids, scene.asteroids); //asteroid self-collisions

    scene.physics.add.collider(scene.blasts, scene.asteroids, (blast, asteroid) => {
        //update score here
        scene.score += scene.scoreIncrement;
        scene.hud.updateScore(scene.score);
        delete blast.destroy();
        asteroid.destroyAsteroid();
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

        super(scene, x + offsetX, y + offsetY, "blast");
        scene.add.existing(this);
        scene.blasts.add(this);

        this.setAngle(scene.player.angle);
        scene.physics.world.enableBody(this);

        scene.physics.velocityFromRotation(
            scene.player.rotation,
            500 + scene.player.body.speed,
            this.body.velocity
        );

        this.time = scene.time.addEvent({
            delay: 800,
            callback: () => {this.destroy()},
            scope: this
        });

        //adjust collider
        this.setSize(12, 12);
        this.setOffset(0, 0);
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
        scene.physics.velocityFromAngle(rotation, speed, this.body.velocity);
    }
}

class LargeAsteroid extends Asteroid {
    constructor(scene, x, y, rotation, speed) {
        super(scene, x, y, "asteroid_large", rotation, speed);
        this.setCircle(56);
        scene.largeAsteroids.push(this);
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

        this.destroy();
    }
}

class MediumAsteroid extends Asteroid {
    constructor(scene, x, y, rotation, speed) {
        super(scene, x, y, "medium_asteroid_a", rotation, speed);
        this.setCircle(12);
        this.setOffset(6);
        scene.mediumAsteroids.push(this);
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

        this.destroy();
    }
}

class SmallAsteroid extends Asteroid {
    constructor(scene, x, y, rotation, speed) {
        //Use these to pass these back to the super class to construct the object
        super(scene, x, y, "small_asteroid", rotation, speed);
        this.setCircle(6);
        this.setOffset(5, 5);
        scene.smallAsteroids.push(this);
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
