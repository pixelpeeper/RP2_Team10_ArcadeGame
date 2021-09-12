
//-------------------------------------------------------------
// config's Phaz3r
//-------------------------------------------------------------
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 800,
    physics: {
        default: 'arcade',
        arcade: {
            fps: 60,
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

//-------------------------------------------------------------
// starts the game
//-------------------------------------------------------------
//Game fields
var cursors; //controls
//makes instances of the classes
var game = new Phaser.Game(config);
var player = new playerClass(game,"alive",[0,0],'red');
var astroid = new astroidClass(game,"large",[0,0],'brown');

//global preload
function preload ()
{
    console.log('global preload');
    player.preload();
    astroid.preload();
}
//global create
function create ()
{
    console.log('global create');
    cursors = this.input.keyboard.createCursorKeys();
}
//global update thats ran evey 1/60th of a second
function update ()
{

    console.log('global update');
    player.update();
    astroid.update();
    
}



//-------------------------------------------------------------
// player class manages all player status and updates
//-------------------------------------------------------------
function playerClass(game, status, velocity, color){
    var game = game;
    this.status = status;
    this.velocity = velocity;
    this.color = color;

    this.preload = function()
    {
        console.log('pre-loading player');
        this.load.image('ship', './img/ship2.png');
        return;
    }   
    this.create = function()
    {
        console.log('creating player');
        player = this.physics.add.image(400, 400, 'ship');
        player.setAngle(-90);
        player.setDamping(true);
        player.setDrag(0.99);
        player.setMaxVelocity(200);

        cursors = game.input.keyboard.createCursorKeys();
        return;
    }
    this.update = function()
    {
        console.log('updating player');
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
        
        this.physics.world.wrap(player, 32);
        return;
    }
}


//-------------------------------------------------------------
// astroid class manages all astroid status and updates. this should be instancieated to an array of them and moved from there probibly
//-------------------------------------------------------------
function astroidClass(game, status, velocity, color) {
    var game = game;
    this.status = status;
    this.velocity = velocity;
    this.color = color;

    this.preload = function()
    {
        console.log('pre-loading astroid');
        this.load.image('ship', 'img/astroidLarge.png');
        this.load.image('ship', 'img/astroidMedium.png');
        this.load.image('ship', 'img/astroidSmall.png');
    }

    this.create = function()
    {
        console.log('creating astroid');
    }

    this.update = function()
    {
        console.log('updating astroid');
    }
}