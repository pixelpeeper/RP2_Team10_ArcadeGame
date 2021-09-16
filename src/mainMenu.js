import background from "../public/backgrounds/space/background.png";
import stars from "../public/backgrounds/space/parallax-space-stars.png";
import planet_big from "../public/backgrounds/space/parallax-space-big-planet.png";
import planet_far from "../public/backgrounds/space/parallax-space-far-planets.png";
import planet_ring from "../public/backgrounds/space/parallax-space-ring-planet.png";
import player_sprite from "../public/sprites/player.png";
import laser_bolt from "../public/sprites/laser-bolts.png";
import asteroids from "../public/sprites/asteroids.png";
import small_asteroid from "../public/sprites/small_asteroid.png";
import medium_asteroid_a from "../public/sprites/medium_asteroids_a.png";
import medium_asteroid_b from "../public/sprites/medium_asteroids_b.png";
import large_asteroid from "../public/sprites/large_asteroid.png";
import explosion from "../public/sprites/explosion.png";

class mainMenu extends Phaser.Scene {
  constructor() {
    super("mainMenu");
  }

  preload() {
    this.load.image("background", background);
    this.load.image("stars", stars);
    this.load.image("planet_big", planet_big);
    this.load.image("planet_far", planet_far);
    this.load.image("planet_ring", planet_ring);
    this.load.spritesheet("player_sprite", player_sprite, {
      frameWidth: 24,
      frameHeight: 16
    });

    this.load.spritesheet("laser_bolt", laser_bolt, {
      frameWidth: 16,
      frameHeight: 16
    });

    this.load.spritesheet("medium_asteroids", asteroids, {
      frameWidth: 50,
      frameHeight: 46,
      endFrame: 3
    });

    this.load.spritesheet("explosion", explosion, {
      frameWidth: 16,
      frameHeight: 16
    });

    this.load.image("large_asteroid", large_asteroid);
    this.load.image("medium_asteroid_a", medium_asteroid_a);
    this.load.image("medium_asteroid_b", medium_asteroid_b);
    this.load.image("small_asteroid", small_asteroid);
  }

  create() {
    //Animations for player
    //Note you can only create anims in the create function, don't try and put in the preload
    this.anims.create({
      key: "playerIdle_anim",
      frames: this.anims.generateFrameNumbers("player_sprite", {
        frames: [4, 5]
      }),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "laserBolt_anim",
      frames: this.anims.generateFrameNumbers("laser_bolt", { frames: [0, 2] }),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "explosion_anim",
      frames: this.anims.generateFrameNumbers("explosion", {
        frames: [0, 1, 2, 3, 4]
      }),
      frameRate: 20,
      repeat: 1
    });

    //After loading everything, move to the main game scene
    this.scene.switch("mainGame");
  }
}

export default mainMenu;
