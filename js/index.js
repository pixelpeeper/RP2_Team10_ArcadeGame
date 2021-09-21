
console.log('index.js starting');
var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1440,
	antialias: true,
	scale: {
        mode: Phaser.Scale.FIT
    },
    physics: {
        default: 'arcade',
        arcade: {
            fps: 60,
            gravity: { y: 0 },
            debug: false,
            debugShowBody: true,
            debugShowAngularVelocity: true,
            debugAngularVelocityColor: 0xffff00,
            debugBodyColor: 0x0000ff
        }
    },
    scene: [
		menuScreen,
		gameScreen,
		winScreen,
		failScreen,
		pauseScreen
    ]
};

var game = new Phaser.Game(config);

console.log('index.js complete');




class TweenHelper {
    static flashElement(scene, element, repeat = true, easing = 'sine.inout', overallDuration = 750, visiblePauseDuration = 250) {
        if (scene && element) {
            let flashDuration = overallDuration - visiblePauseDuration / 2;

            scene.tweens.timeline({
                tweens: [
                    {
                        targets: element,
                        duration: 0,
                        alpha: 0,
                        ease: easing
                    },
                    {
                        targets: element,
                        duration: flashDuration,
                        alpha: 1,
                        ease: easing
                    },
                    {
                        targets: element,
                        duration: visiblePauseDuration,
                        alpha: 1,
                        ease: easing
                    },
                    {
                        targets: element,
                        duration: flashDuration,
                        alpha: 0,
                        ease: easing,
                        onComplete: () => {
                            if (repeat === true) {
                                this.flashElement(scene, element);
                            }
                        }
                    }
                ]
            });
        }
    }
}