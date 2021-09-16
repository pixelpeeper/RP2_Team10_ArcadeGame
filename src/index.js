//import Phaser from "phaser";
import mainGame from "./mainGame.js";
import mainMenu from "./mainMenu.js";

const config = {
  type: Phaser.CANVAS,
  width: 800,
  height: 600,
  pixelArt: true,
  scene: [mainMenu, mainGame],
  physics: {
    default: "arcade",
    arcade: { debug: true, 
      debugShowBody: true,
      debugShowAngularVelocity: true,
      debugAngularVelocityColor: 0xffff00,
      debugBodyColor: 0x0000ff }
  }
};

let game = new Phaser.Game(config);
