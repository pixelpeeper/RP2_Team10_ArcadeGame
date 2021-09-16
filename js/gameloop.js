import Blast from "./Blast.js";
import AsteroidManager from "./asteroidManager.js";
import Player from "./Player.js";

class gameloop extends Phaser.Scene {
    constructor() {
      super("gameloop");
    }
  
    create() {
        this.width = 800;
        this.height = 600;
      
        this.controls = this.input.keyboard.createCursorKeys();
        this.createWorld(this.width, this.height);

        this.blasts = this.physics.add.group();
        this.asteroids = this.physics.add.group();

        this.largeAsteroids = [];
        this.mediumAsteroids = [];
        this.smallAsteroids = [];

        this.players = this.physics.add.group();
        this.player = new Player(this, 400, 200, 0.99, 0.13, 75);

        this.createColliders();

        this.asteroidManager = new AsteroidManager();

        this.input.keyboard.on("keydown_ENTER", function(){ if (!this.player.playerAlive){ this.scene.restart() }});

        this.spawnAsteroids(1);
    }
  
    update() {
        if (this.player.playerAlive) {
            this.player.movement();
            this.player.shooting();

            this.physics.world.wrapArray(this.largeAsteroids, 55);
            this.physics.world.wrapArray(this.mediumAsteroids, 25);
            this.physics.world.wrapArray(this.smallAsteroids, 15);

            this.physics.world.wrap(this.blasts, 20);
            this.physics.world.wrap(this.player, 20);

            if (this.asteroids.getLength() === 0) {
                this.largeAsteroids = [];
                this.mediumAsteroids = [];
                this.smallAsteroids = [];

                this.level++;
                this.spawnAsteroids(this.level);
            }
        }
    }
  
    createWorld(worldHeight, worldWidth) {
        this.bounds = this.physics.world.setBounds(
            0,
            0,
            worldWidth,
            worldHeight,
            true,
            true,
            true,
            true
        );
    }
  
    createColliders() {
        this.physics.add.collider(this.blasts, this.asteroids, (blast, asteroid) => {
            //this.score += this.scoreIncrease;
            delete blast.destroy();
            asteroid.destroyAsteroid();
        });
    
        //Creates collisions between asteroids
        //this.physics.add.collider(this.asteroids, this.asteroids);
    }
  
    spawnAsteroids(level) {
      this.player.resetPlayer();
      this.asteroidManager.createAsteroids(
        this,
        level * 1
      );
    }
  }
  
  export default gameloop;