import Asteroid from "./Asteroid.js";
import MediumAsteroid from "./MediumAsteroid.js";

class LargeAsteroid extends Asteroid {
  constructor(scene, x, y, rotation, speed) {
    super(scene, x, y, "large_asteroid", rotation, speed);
    this.setSize(42, 50);
    this.setOffset(9, 5);
    scene.largeAsteroids.push(this);
  }

  //Upon destruction, this method creates 3 medium asteroids, launches them in any direction, and then deletes itself.
  destroyAsteroid() {
    new MediumAsteroid(
      this.scene,
      this.x,
      this.y,
      Math.floor(Math.random() * 360),
      Math.floor(Math.random() * 75) + 50
    );

    new MediumAsteroid(
      this.scene,
      this.x,
      this.y,
      Math.floor(Math.random() * 360),
      Math.floor(Math.random() * 75) + 50
    );

    new MediumAsteroid(
      this.scene,
      this.x,
      this.y,
      Math.floor(Math.random() * 360),
      Math.floor(Math.random() * 75) + 50
    );
    this.destroy();
  }
}

export default LargeAsteroid;
