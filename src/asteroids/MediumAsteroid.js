import Asteroid from "./Asteroid.js";
import smallAsteroid from "./SmallAsteroid.js";

class MediumAsteroid extends Asteroid {
  constructor(scene, x, y, rotation, speed) {
    super(scene, x, y, "medium_asteroid_a", rotation, speed);
    this.setSize(25, 22);
    this.setOffset(3, 5);
    scene.mediumAsteroids.push(this);
  }

  //Upon destruction, this method creates 2 small asteroids, launches them in any direction, and then deletes itself.
  destroyAsteroid() {
    new smallAsteroid(
      this.scene,
      this.x,
      this.y,
      Math.floor(Math.random() * 360),
      Math.floor(Math.random() * 75) + 50
    );
    new smallAsteroid(
      this.scene,
      this.x,
      this.y,
      Math.floor(Math.random() * 360),
      Math.floor(Math.random() * 75) + 50
    );

    this.destroy();
  }
}

export default MediumAsteroid;
