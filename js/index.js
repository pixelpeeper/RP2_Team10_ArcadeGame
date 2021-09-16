
console.log('index.js starting');
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
    scene: [
		menue,
		playing,
		win,
		fail
    ]
};

var game = new Phaser.Game(config);

console.log('index.js complete');