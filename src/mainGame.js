import { throws } from "assert";
import { runInThisContext } from "vm";

import Bolt from "./projectiles/Bolt.js";
import AsteroidController from "./asteroids/AsteroidController.js";
import PlayerHud from "./PlayerHud.js";
import Player from "./Player.js";
import Background from "./Background.js";

class mainGame extends Phaser.Scene {
  constructor() {
    super("mainGame");
  }

  create() {
    //Game World Deminsions
    this.worldWidth = 800;
    this.worldHeight = 600;
    this.difficultyMultiplier = 5;
    this.level = 1;
    this.scoreIncrease = 30;
    this.score = 0;
    this.cursorKeys = this.input.keyboard.createCursorKeys();

    this.createWorld(this.worldHeight, this.worldWidth);
    this.background = new Background(this);

    //Create physics group, objects will be added automatically when a bolt object/asteroid is created
    this.bolts = this.physics.add.group();
    this.asteroids = this.physics.add.group();
    //In order to prevent popin from larger asteroids and smaller asteroids being off screen for too long.
    //Asteroids needed their own padding values. In order to do this we keep a record of all 3 asteroid types.
    //Which are then called in the update function.
    this.largeAsteroids = [];
    this.mediumAsteroids = [];
    this.smallAsteroids = [];

    this.players = this.physics.add.group();

    this.player = new Player(this, 800, 400, 0.999, 0.13, 75);

    //Colliders are used to trigger functions when two objects collide
    this.createColliders();

    //Camera Setup
    this.myCam = this.cameras.main;
    //Scenes are infinite, so we set boundaries with the camera and the player
    this.myCam.setBounds(0, 0, this.worldWidth, this.worldHeight);
    this.myCam.startFollow(this.player);

    //Create asteroidController
    this.asteroidController = new AsteroidController();
    this.playerHud = new PlayerHud(this);

    //Only allow game to reload when player has died.
    this.input.keyboard.on("keydown_ENTER", () => {
      if (!this.player.playerAlive) {
        this.scene.restart();
      }
    });

    //Start Level 1
    this.spawnWaveOfAsteroids(1);
  }

  update() {
    if (this.player.playerAlive) {
      this.player.speedController();
      this.player.directionController();
      this.player.shootingController();
      //Enables all objects in game to wrap around the environment.
      this.physics.world.wrapArray(this.largeAsteroids, 55);
      this.physics.world.wrapArray(this.mediumAsteroids, 25);
      this.physics.world.wrapArray(this.smallAsteroids, 15);
      this.physics.world.wrap(this.bolts, 20);
      this.physics.world.wrap(this.player, 20);

      //When the number of asteroids in the phyics group is empty, spawn the next wave.
      if (this.asteroids.getLength() === 0) {
        this.largeAsteroids = [];
        this.mediumAsteroids = [];
        this.smallAsteroids = [];

        this.level += 1;
        this.playerHud.updateLevel(this.level);
        this.spawnWaveOfAsteroids(this.level);
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
    this.physics.add.collider(this.bolts, this.asteroids, (bolt, asteroid) => {
      this.score += this.scoreIncrease;
      this.playerHud.updateScore(this.score);
      delete bolt.destroy();
      asteroid.destroyAsteroid();
    });

    //Allows asteroids to collide with one another rather than move through one another.
    this.physics.add.collider(this.asteroids, this.asteroids);
  }

  spawnWaveOfAsteroids(level) {
    this.player.resetPlayer();
    this.asteroidController.genAsteroids(
      this,
      level * this.difficultyMultiplier
    );
  }
}

export default mainGame;
