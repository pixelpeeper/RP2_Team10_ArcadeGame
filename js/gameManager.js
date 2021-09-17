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
var asteroidsG;
var maxsizeofasteroids = 12;
function preload ()
{
  this.load.image('bullet', 'images/Bullet.png');
	this.load.image('ship', 'images/Spaceship1.png');
  this.load.image('asteroidmedium', 'images/Asteriod1.png');
  this.load.image('asteroidlarge', 'images/Asteriod2.png');
}

function create ()
{

    player = this.physics.add.sprite(400, 400, 'ship');
    player.setAngle(-90);
    player.setDamping(true);
    player.setDrag(0.99);
    player.setMaxVelocity(200);
    player.setCircle(50);
    player.setMass(2);
    player.setBounce(1)
    this.data.set('lives', 5);
    this.data.set('score', 0);
    this.data.set('wave', 1);
    var text = this.add.text(80,120,'',{font: '32px Courier', fill: '#00ff00'});
    text.setText([
      'Lives: ' + this.data.get('lives'),
      'Score: ' + this.data.get('score'),
      'Wave: ' + this.data.get('wave')
    ]);
    asteroidsG = this.physics.add.group({
        defaultKey: 'asteroid_large',
        alive: false,
        frameQuantity: 12,
        active: false,
        visibile: false,
        enable: false,
        bounceX: 1,
        bounceY: 1,
        circle: 16,
        angularVelocity: 10,
        mass: 10,
        maxSize: 12,
    })
    console.log(asteroidsG.Bull)
    asteroidsM = this.physics.add.group({
        defaultKey: 'asteroid_medium',
        frameQuantity: 12,
        active: false,
        visibile: false,
        enable: false,
        bounceX: 1,
        bounceY: 1,
        circle: 16,
        angularVelocity: 10,
        mass: 10,
        maxSize: 12
    })
    asteroidsS = this.physics.add.group({
        defaultKey: 'asteroid_small',
        frameQuantity: 12,
        active: false,
        visibile: false,
        enable: false,
        bounceX: 1,
        bounceY: 1,
        circle: 16,
        angularVelocity: 10,
        mass: 10,
        maxSize: -1
    })

    startingasteroidcreation(maxsizeofasteroids);

    //startcollision check for small asteroids only
    this.physics.add.collider(asteroidsS, asteroidsS, function (_asteroid1, _asteroid2){
        console.log('small and small Asteroids colidded');
      });
    //End collision for small asteroids
    //startcollision check for medium asteroids only
    this.physics.add.collider(asteroidsM, asteroidsM, function (_asteroid1, _asteroid2){
       createnewsmallasteroids(_asteroid1,_asteroid2);
    });
    //End collision for medium asteroids
    //startcollision check for big asteroids only
   this.physics.add.collider(asteroidsG, asteroidsG, function (_asteroid1, _asteroid2){
       
       createnewmediumasteroids(_asteroid1,_asteroid2);
    });
      //End collision for big asteroids
      // Begin collision for small and big rocks only
    this.physics.add.collider(asteroidsS , asteroidsG, function (_asteroid1, _asteroid2){
        createnewmediumasteroids(_asteroid1,_asteroid2);
    });
      // End collision for small and big rocks
      // start collision for medium and big rocks
    this.physics.add.collider(asteroidsM , asteroidsG, function (_asteroid1, _asteroid2){
        createnewmediumasteroids(_asteroid1,_asteroid2);
    });
      // end collision for medium and big rocks
      // start collision for small and medium rocks
    this.physics.add.collider(asteroidsS, asteroidsM , function (_asteroid1, _asteroid2){
        createnewsmallasteroids(_asteroid1,_asteroid2);
    });
    //large asteroid collision with player
    this.physics.add.collider(asteroidsG, player, function () {
        console.log('asteroidsG collided with player'); // you  can add the lives logic here if you want
    });
    //medium asteroid collision with player
    this.physics.add.collider(asteroidsM, player, function () {
        console.log('asteroidsM collided with player');  // you  can add the lives logic here if you want
    });
    //small asteroid collision with player
    this.physics.add.collider(asteroidsS, player, function () {
        console.log('asteroidsS collided with player');  // you  can add the lives logic here if you want
    });
    //handels input

    cursors = this.input.keyboard.createCursorKeys();
}
var canshoot;
canshoot = true;
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
          if(canshoot)
        {
        var BULLET_SPEED = 500;
        var bulletOffset = 20 * Math.sin(player.angle * 3.14 / 180 );
        var newbullet = this.physics.add.sprite(player.x , player.y, 'bullet');
        newbullet.angle = player.angle;
        this.physics.velocityFromAngle(newbullet.angle, BULLET_SPEED, newbullet.body.velocity);
        newbullet.body.velocity.x += player.body.velocity.x;
        canshoot=false;
        //check for bullet collision with small asteroid
        this.physics.add.collider(newbullet, asteroidsS, function (_bullet, _asteroidhit)
        {
         _asteroidhit.disableBody(true,true);
         _bullet.disableBody(true,true);  // you  can add the score logic here if you want
        });
        //check for bullet collision with medium asteroid
        this.physics.add.collider(newbullet, asteroidsM, function (_bullet, _asteroidhit)
        {
        createnewsmallasteroids(_bullet, _asteroidhit);
        _bullet.disableBody(true,true);  // you  can add the score logic here if you want
        });
        //check for bullet collision with large asteroid
        this.physics.add.collider(newbullet, asteroidsG, function (_bullet, _asteroidhit)
        {
        console.log("Shockwave logic, big asteroid hit");
        createnewmediumasteroids(_bullet, _asteroidhit); // technically we dont want this feature, this is just for first playable.
        _bullet.disableBody(true,true);  // you  can add the score logic here if you want
        });
        this.time.delayedCall(500, setshoottotrue, [], this);
        }

    }else{};
    if(asteroidsG.getFirstAlive() == null && asteroidsM.getFirstAlive() == null && asteroidsS.getFirstAlive() == null)
    {
      asteroidsS.setActive();
      asteroidsM.setActive();
      asteroidsG.setActive();
      maxsizeofasteroids += 5;
      startingasteroidcreation(maxsizeofasteroids);
      console.log(asteroidsS);
    //  printwavecompleted();
    }

    this.physics.world.wrap(player, 32);
    this.physics.world.wrap(asteroidsG, 32);
    this.physics.world.wrap(asteroidsM, 32);
    this.physics.world.wrap(asteroidsS, 32);
}

function startingasteroidcreation(maxsizeofasteroids)
{
  for (var i = 0; i < maxsizeofasteroids; i++) {

      var p = Phaser.Geom.Rectangle.RandomOutside(
              new Phaser.Geom.Rectangle(0, 0, 960, 720),
              new Phaser.Geom.Rectangle(350, 250, 256, 256)
          )
      createAstroid(p.x, p.y, Phaser.Math.Between(-100,100), Phaser.Math.Between(-100,100))
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
//actual function that creates small asteroids only
function createsmallasteroids(x, y, vx, vy)
{
  var astroids = asteroidsS.get();
  if(!astroids) return;
  astroids.enableBody(true, x, y, true, true);
  astroids.setVelocity(vx, vy);
  astroids.setCircle(16);
  astroids.setMaxVelocity(200,200);
}
//actual function that creates medium asteroids only
function createmediumasteroids(x, y, vx, vy)
{
  var astroidM = asteroidsM.get();
  if(!astroidM) return;
  astroidM.enableBody(true, x, y, true, true);
  astroidM.setVelocity(vx, vy);
  astroidM.setCircle(16);
  astroidM.setMaxVelocity(200,200);
}

// create all asteroids to begin the game
function createAstroid(x, y, vx, vy)
{
    var asteroid = asteroidsG.get();
    var astroidM = asteroidsM.get();
    var astroids = asteroidsS.get();
    if (!asteroid | !astroidM | !astroids) return;
    if(asteroid)
    {
      console.log("Big asteroids are created");
      asteroid.enableBody(true, x, y, true, true);
      asteroid.setVelocity(vx, vy);
      asteroid.setCircle(16);
      asteroid.setMaxVelocity(200,200);

    }
    if(astroidM)
    {
      astroidM.enableBody(true, x, y, true, true);
      astroidM.setVelocity(vx, vy);
      astroidM.setCircle(16);
      astroidM.setMaxVelocity(200,200);

    }
    if(astroids)
    {
      astroids.enableBody(true, x, y, true, true);
      astroids.setVelocity(vx, vy);
      astroids.setCircle(16);
      astroids.setMaxVelocity(200,200);
    }
}

function setshoottotrue()
{canshoot=true;}

function printwavecompleted()
{
  var wavecompletetext = this.add.text(150,70,'',{font: '32px Courier', fill: '#00ff00'});
  wavecompletetext.setText([
    'Wave ' + this.data.get('wave') + ' completed'
  ]);
}
