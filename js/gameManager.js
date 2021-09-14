var config = {
    type: Phaser.AUTO,
    width: 960,
    height: 720,
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
		update: update,
    }
};

var game = new Phaser.Game(config);
var player;
var cursors;
var bullets;
var firebutton;

function preload ()
{
    this.load.image('bullet', 'images/Bullet.png');
	this.load.image('ship', 'images/Spaceship1.png');
}

function create ()
{
    //creates bullets
	bullets = this.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, 'bullet');

//    bullets.setAll('anchor.x', 0.5);
  //  bullets.setAll('anchor.y', 1);
 //   bullets.setAll('outOfBoundsKill', true);
 //   bullets.setAll('checkWorldBounds', true);

    //creates the player
    fireBullet.bind(this);
	player = this.physics.add.sprite(400, 400, 'ship');
	//player.displayWidth=50;
	//player.scaleY = player.scaleX;
    player.setAngle(-90);
    player.setDamping(true);
    player.setDrag(0.99);
    player.setMaxVelocity(200);
    player.setCircle(50);
    player.setMass(2);



    //creates the astroids
    asteroid = this.physics.add.group({
        defaultKey: 'asteroid_large',
        bounceX: 1,
        bounceY: 1,
        circle: 64,
        angularVelocity: 10,
        mass: 10
    });
    asteroid.defaults.setVelocityX = 100;
    asteroid.defaults.setVelocityY = 50;
    
    asteroids = asteroid.createMultiple({
        quantity: 3,
        key: asteroid.defaultKey,
        frame: 0
    });
    var PlaceOnCircle = Phaser.Actions.PlaceOnCircle;
    PlaceOnCircle(asteroids, { x: -200, y: -200, radius: 50 });

    asteroid.children.each(function (asteroid)
    {
        asteroid.setCircle(16);
    });

    //generates random astroids
    randomAsteroids = this.physics.add.group({
        defaultKey: 'asteroid_large',
        bounceX: 1,
        bounceY: 1,
        circle: 16,
        angularVelocity: 10,
        mass: 10
    })
    for (var i = 0; i < 8; i++) {
        var p = Phaser.Geom.Rectangle.RandomOutside(
            new Phaser.Geom.Rectangle(0, 0, 960, 720),
            new Phaser.Geom.Rectangle(350, 250, 256, 256)
        )
        var b = randomAsteroids.create(p.x, p.y, 'asteroid_large');
        this.physics.add.existing(b);
    }
    randomAsteroids.children.each(function (asteroid)
    {
        asteroid.setCircle(16);
        asteroid.body.velocity.x = Phaser.Math.Between(-100, 100);
        asteroid.body.velocity.y = Phaser.Math.Between(-100, 100);
    });
            
    //sets what collides
    this.physics.add.collider(randomAsteroids, randomAsteroids);
    this.physics.add.collider(randomAsteroids, asteroid);
    this.physics.add.collider(randomAsteroids, player);
    this.physics.add.collider(asteroid, asteroid);
    this.physics.add.collider(asteroid, player);

    //handels input
    cursors = this.input.keyboard.createCursorKeys();
    //firebutton = this.input.keyboard.addKey(Phaser.keyboard.SPACEBAR);
}
function update ()
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

    //fires bullets
    if (cursors.down.isDown)
    {
            //  var newbullet = this.physics.add.sprite(player.x, player.y + 5, 'bullet');
        //    newbullet.body.velocity.y = -400;
        var BULLET_SPEED = 300;
        var bulletOffset = 20 * Math.sin(player.angle * 3.14 / 180 );
        var newbullet = this.physics.add.sprite(player.x + bulletOffset, player.y);
        newbullet.angle = player.angle;
        console.log(newbullet.angle);
        console.log(newbullet)
        //  this.physics.Arcade.ArcadePhysics.velocityFromAngle(newbullet.angle - 90, BULLET_SPEED, newbullet.body.velocity);
        //  player.physics.arcade.ArcadePhysics.velocityFromAngle(newbullet.angle - 90, BULLET_SPEED, newbullet.body.velocity);
        this.physics.velocityFromAngle(newbullet.angle - 90, BULLET_SPEED, newbullet.body.velocity)
        newbullet.body.velocity.x += player.body.velocity.x;
    }else{};


    //wraps objects from one side to the other of the screen
    this.physics.world.wrap(player, 32);
    this.physics.world.wrap(asteroid, 32);
    this.physics.world.wrap(randomAsteroids, 32);
}

function fireBullet()
{
	//var bullet = bullets.getFirstExists(false);
    this.physics.add.sprite(player.x, player.y + 5, 'bullet');

  //  if (bullet)
  //  {
        //  And fire it
		//bullet.create(player.x, player.y + 8, 'bullet');
    //    bullet.reset(player.x, player.y + 8);
    //    bullet.body.velocity.y = -400;
  //  }
}
