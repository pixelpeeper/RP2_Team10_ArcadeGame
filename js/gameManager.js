
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
var player;
var cursors; //controls
//makes instances of the classes
var game = new Phaser.Game(config);
var playerInstance = new playerClass(game,"alive",[0,0],'red',player);
var astroidInstance = new astroidClass(game,"large",[0,0],'brown');

//global preload
function preload ()
{
    console.log('global preload');
    //this pre-loads the graphics into memory and gives it an identifyable name for calling later on
    this.load.image('ship',"./img/ship2.jpg");
    this.load.image('astroidLarge', 'img/astroidLarge.png'),
    this.load.image('astroidMedium', 'img/astroidMedium.png'),
    this.load.image('astroidSmall', 'img/astroidSmall.png')

}
//global create
function create ()
{
    //this asigns the images to the player and astroid objects
    playerInstance.create(this.add.image(0,0,'ship'));
    astroidInstance.create(this.add.image(0,0,'astroidLarge'),this.add.image(0,0,'astroidMedium'),this.add.image(0,0,'astroidSmall'));

    console.log('global create');
    cursors = this.input.keyboard.createCursorKeys();
}
//global update thats ran evey 1/60th of a second
function update ()
{

    console.log('global update');
    playerInstance.update();
    astroidInstance.update();
    
}



//-------------------------------------------------------------
// player class manages all player status and updates
//-------------------------------------------------------------
function playerClass(game, status, velocity, color, player){
    var game = game;
    this.status = status;
    this.velocity = velocity;
    this.color = color;
    this.player = player;

    this.preload = function()
    {
        console.log('pre-loading player');
        return;
    }   
    this.create = function(img)
    {
        this.img = img;
        console.log('creating player');
        player = Phaser.physics.add.image(400, 400, 'ship');
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
            Phaser.physics.velocityFromRotation(player.rotation, 200, player.body.acceleration);
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
        
        Phaser.physics.world.wrap(player, 32);
        return;
    }
}


//-------------------------------------------------------------
// astroid class manages all astroid status and updates. this should be instancieated to an array of them and moved from there probibly
//-------------------------------------------------------------
function astroidClass(game, status, velocity, color, player) {
    var game = game;
    this.status = status;
    this.velocity = velocity;
    this.color = color;
    var player = player;

    this.preload = function()
    {
        console.log('pre-loading astroid');
    }

    this.create = function(imgLarge,imgMedium,imgSmall)
    {
        console.log('creating astroid');
        this.imgLage = imgLarge;
        this.imgMedium = imgMedium;
        this.imgSmall = imgSmall;
    }

    this.update = function()
    {
        console.log('updating astroid');
    }
}