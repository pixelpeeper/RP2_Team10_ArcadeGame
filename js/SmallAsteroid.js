import Asteroid from "./Asteroid.js";
class SmallAsteroid extends Asteroid {
    constructor(scene, x, y, rotation, speed) {
        //Use these to pass these back to the super class to construct the object
        super(scene, x, y, "small_asteroid", rotation, speed);
        this.setSize(12, 12);
        this.setOffset(5, 5);
        scene.smallAsteroids.push(this);
    }

    //Upon destruction, the asteroid deletes itself.
    destroyAsteroid() {
        this.destroy();
    }
}

export default SmallAsteroid;
