class Blast extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        //Get players coordinates
        const x = scene.player.x;
        const y = scene.player.y;
    
        const offsetX = Math.cos(scene.player.rotation) * 30;
        const offsetY = Math.sin(scene.player.rotation) * 30;
    
        //Use these to pass these back to the super class to construct the object
        super(scene, x + offsetX, y + offsetY, "laser_bolt");
        //Then add to scene
        scene.add.existing(this);
        //Add to physics group
        scene.blasts.add(this);
    
        this.setScale(2);
        //this.play("laserBolt_anim");
        //Set angle of bolt to that of what player is facing
        this.setAngle(scene.player.angle);
        //Enable this object in the scene's physics, without this line adding velocity will have no effect.
        scene.physics.world.enableBody(this);
    
        //Sets the angular velocity from the players current angle of rotation, so that projectiles fly in the direction player is facing
        //for the third parameter pass this.body.velocity rather than this.body.acceleration. This makes it so projectiles
        //fly at a constant rate. Might make use of this for bombs or something.
        scene.physics.velocityFromRotation(
            scene.player.rotation,
            850 + scene.player.body.speed,
            this.body.velocity
        );
    
        //Destroys bolts after 500 milliseconds
        this.timer = scene.time.addEvent({
            delay: 800,
            callback: () => {
            this.destroy();
            },
            scope: this
        });
    
        //Alter Blast Hitbox
        this.setSize(12, 12);
        this.setOffset(0, 0);
    }
}
  
export default Blast;