class Background {
  constructor(scene) {
    this.galaxy = scene.add.image(400, 300, "background");
    this.galaxy.setDisplaySize(scene.worldWidth, scene.worldHeight);

    //Add in stars layer
    this.stars = scene.add.tileSprite(
      0,
      0,
      scene.worldWidth,
      scene.worldHeight,
      "stars"
    );
    this.stars.setScale(2);

    //Add in far off planets layer
    this.planet_far = scene.add.image(475, 250, "planet_far");
    this.planet_far.setScale(3);
    this.planet_far.setFlipX(true);

    //Add in ring planet layer
    this.planet_ring = scene.add.image(600, 400, "planet_ring");
    this.planet_ring.setScale(3);
    this.planet_ring.setAngle(90);

    //Add in big planets layer
    this.planet_big = scene.add.image(200, 500, "planet_big");
    this.planet_big.setScale(2);
    this.planet_big.setFlipX(true);
  }
}
export default Background;
