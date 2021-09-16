//import Phaser from "./phaser.js";
import gameloop from "./gameloop.js";

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    pixelArt: true,
    scene: [gameloop],
    physics: {
        default: "arcade",
        arcade: { 
            debug: true, 
            debugShowBody: true,
            debugShowAngularVelocity: true,
            debugAngularVelocityColor: 0xffff00,
            debugBodyColor: 0x0000ff }
    }
};

let game = new Phaser.Game(config);