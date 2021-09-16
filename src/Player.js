import Bolt from "./projectiles/Bolt.js";
class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(
    scene,
    playerMaxVelocity,
    playerAcceleration,
    playerDrag,
    rotationSpeed,
    bulletFrequency
  ) {
    super(scene, scene.worldWidth / 2, scene.worldHeight / 2, "player_sprite");
    this.scene = scene;
    this.rotationSpeed = rotationSpeed;
    this.bulletFrequency = bulletFrequency;
    this.bulletTime = 0;
    this.playerAcceleration = playerAcceleration;
    //Create player in the center of the world
    scene.add.existing(this);
    //In order for this constructor to run you need to add this object to a physics group.
    //If you don't, this constructor will fail due to null error
    scene.players.add(this);

    //Double the size + Play the player idle anim
    this.setScale(2);
    this.play("playerIdle_anim");

    //this.cursorKeys.space.setEmitOnRepeat(true);
    //Drag will use a damping effect rather than a linear approach. Much smoother brakes.
    this.setDamping(true);
    this.setDrag(playerDrag);
    //Used for the toggle in the dampener function
    this.setMaxVelocity(playerMaxVelocity);

    //Alter Player Hitbox
    this.setSize(14, 14);
    this.setOffset(5, 0);

    //In order to play the explosion animation we need the player to exist.
    //This is used to disable player input when the player dies.
    scene.physics.add.collider(
      scene.players,
      scene.asteroids,
      (player, asteroid) => {
        if (!this.disablePlayer) {
          this.killPlayer(player, asteroid, scene);
          scene.playerHud.displayGameOverOverlay(scene);
        }
      }
    );
    //Upon player death we want to play an animation and then kill the player.
    this.playerAlive = true;
    return this;
  }

  killPlayer(player, asteroid, scene) {
    if (this.playerAlive) {
      //Upon Collision, play the explosion animation
      this.play("explosion_anim");
      //Destroy asteroid for a better impact
      asteroid.destroyAsteroid();
      //If we delete the player right after playing the explosion anim the game will crash.
      //This will cut the animation short && the player controller functions will crash the game because
      //they are still lisening for player input on an object that no longer exists.

      //To fix this we wait until the animation is complete BEFORE we destroy the player object.
      this.on(
        "animationcomplete",
        () => {
          this.destroy();
        },
        scene
      );

      //It is possible that before the explosion animation is finished the player will hit another asteroid.
      //This causes this function to be invoked again causes the player to crash because in that time the player object
      //has been deleted.
      this.playerAlive = false;
    }
  }

  speedController() {
    if (this.scene.cursorKeys.up.isDown) {
      //Accelerate
      this.scene.physics.velocityFromRotation(
        this.rotation,
        this.playerAcceleration,
        this.body.acceleration
      );
    } else if (this.scene.cursorKeys.down.isDown) {
      //Decelerate
      this.scene.physics.velocityFromRotation(
        this.rotation,
        -this.playerAcceleration / 2,
        this.body.acceleration
      );
    } else {
      this.setAcceleration(0);
    }
  }

  directionController() {
    if (this.scene.cursorKeys.left.isDown) {
      //Rotate left
      this.setRotation(this.rotation - this.rotationSpeed);
    } else if (this.scene.cursorKeys.right.isDown) {
      //Rotate Right
      this.setRotation(this.rotation + this.rotationSpeed);
    }
  }

  shootingController() {
    //Working solution to not allowing the player to just hold the down key.
    //Later on I want to implement a recharging ammo system. But thats for a later day
    if (
      this.scene.cursorKeys.space.isDown &&
      this.bulletTime <= this.scene.time.now
    ) {
      this.bulletTime = this.scene.time.now + this.bulletFrequency;
      new Bolt(this.scene);
    }
  }

  resetPlayer() {
    this.setPosition(this.scene.worldWidth / 2, this.scene.worldHeight / 2);
    this.setVelocity(0);
    //this.setAcceleration(0);
  }

  /**
  //Fleshing out this feature added to backlog 
  shootingController() {
    //Working solution to not allowing the player to just hold the down key.
    //Later on I want to implement a recharging ammo system. But thats for a later day
    if (this.cursorKeys.space.isDown && this.bulletTime <= this.time.now) {
      this.bulletTime = this.time.now + this.bulletFrequency;
      new Bolt(this);
    }
  }
   */
}

export default Player;
