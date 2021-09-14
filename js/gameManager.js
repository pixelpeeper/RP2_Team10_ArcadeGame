var config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
           // gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create,
		update: update,
    }
};

var game = new Phaser.Game(config);
var player;
var cursors;
var bullets;

function preload ()
{
  this.load.image('bullet', 'images/Bullet.png');
	this.load.image('ship', 'images/Spaceship1.png');
}

function create ()
{
	bullets = this.add.group();
  bullets.enableBody = true;
  bullets.physicsBodyType = Phaser.Physics.ARCADE;
  bullets.createMultiple(30, 'bullet');


//    bullets.setAll('anchor.x', 0.5);
  //  bullets.setAll('anchor.y', 1);
 //   bullets.setAll('outOfBoundsKill', true);
 //   bullets.setAll('checkWorldBounds', true);
	player = this.physics.add.sprite(400, 400, 'ship');
	player.displayWidth=50;
	player.scaleY = player.scaleX;
  player.setAngle(-90);
  player.setDamping(true);
  player.setDrag(0.99);
  player.setMaxVelocity(200);
  cursors = this.input.keyboard.createCursorKeys();
	//firebutton = this.input.keyboard.addKey(Phaser.keyboard.SPACEBAR);
}
function update (time, delta)
{
	// check for forward movement
        if (cursors.up.isDown)
        {
            this.physics.velocityFromRotation(player.rotation, 200, player.body.acceleration);
        }
        else
        {
            player.setAcceleration(0);
        }

        // check for rotation
        if (cursors.left.isDown)
        {
            player.setAngularVelocity(-300);
        }
        else if (cursors.right.isDown)
        {
            player.setAngularVelocity(300);
        }
        else
        {
            player.setAngularVelocity(0);
        }
		    if (cursors.down.isDown)
		    {
        var BULLET_SPEED = 300;
        var bulletOffset = 20 * Math.sin(player.angle * 3.14 / 180 );
        var newbullet = this.physics.add.sprite(player.x , player.y, 'bullet');
        newbullet.angle = player.angle;

        this.physics.velocityFromAngle(newbullet.angle, BULLET_SPEED, newbullet.body.velocity);
        newbullet.body.velocity.x += player.body.velocity.x;
      }else{};


        this.physics.world.wrap(player, 32);
}
