import LargeAsteroid from "./LargeAsteroid.js";
// import MediumAsteroid from "./MediumAsteroid.js";
// import SmallAsteroid from "./SmallAsteroid.js";

const sides = {
    TOP: 0,
    BOTTOM: 1,
    LEFT: 2,
    RIGHT: 3
};

class AsteroidManager {

    createAsteroids(scene, amount) {
        for (let i = 0; i < amount; i++) {
            this.spawnAsteroid(scene);
        }
    }

    removeAsteroids() {
        for (let i = 0; i < this.createAsteroids.length; i++) {
            this.asteroids[i].destroy();
        }
    }

    spawnAsteroid(scene) {
        let side = Math.floor(Math.random() * 4);
        let direction = this.genDirection(side);
        let spawnLocation = this.genSpawnLocation(side, scene.width, scene.height);

        return new LargeAsteroid(scene, spawnLocation.x, spawnLocation.y, direction, Math.floor(Math.random() * 100) + 50);
    }

    genSpawnLocation(side, gameWidth, gameHeight) {
            switch (side) {
            case sides.LEFT:
                return { x: 0, y: this.randomIntFromInterval(0, gameHeight) };
            case sides.RIGHT:
                return { x: gameWidth, y: this.randomIntFromInterval(0, gameHeight) };
            case sides.BOTTOM:
                return { x: this.randomIntFromInterval(0, gameWidth), y: 0 };
            case sides.TOP:
                return { x: this.randomIntFromInterval(0, gameWidth), y: gameHeight };
        }
    }

    genDirection(side) {
        //Left side is tricky because it requires a range (in degrees) of
        //Left: 270-360 or 0-90
        switch (side) {
            case sides.LEFT:
                if (this.randomIntFromInterval(0, 1) === 0) {
                return this.randomIntFromInterval(280, 350);
                } else {
                return this.randomIntFromInterval(10, 80);
                }
            case sides.RIGHT:
                return this.randomIntFromInterval(110, 250);
            case sides.BOTTOM:
                return this.randomIntFromInterval(200, 340);
            case sides.TOP:
                return this.randomIntFromInterval(20, 160);
        }
    }

    randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}

export default AsteroidManager;