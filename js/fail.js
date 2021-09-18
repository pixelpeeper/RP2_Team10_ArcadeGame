var gameDimentions = {x:0,y:0};
class failScreen extends Phaser.Scene {
    constructor(){
        super("failScreen");
    }
	
	preload(){
		console.log('fail loading');
	}
	
	create(){
		console.log('fail creating');
		
		gameDimentions.x = this.sys.game.canvas.width;
		gameDimentions.y = this.sys.game.canvas.height;
		console.log(gameDimentions)
		
		//dims the game
		var pauseBackground = this.add.rectangle(0,0, gameDimentions.x, gameDimentions.y, 0x333333);
		pauseBackground.alpha = 0.5;
		pauseBackground.setOrigin(0,0);
		
		//displays mocking message of player
		this.credits = this.add.text(gameDimentions.x/2,gameDimentions.y/2 - gameDimentions.y * 0.111,'YOU FAILED TO BLAST \'EM ALL.', {font:'40px Sans-Serif',color:'#00ff00',fontFamily: 'Arial',align:'center'}).setOrigin(0.5,0.5);
		
		const screenText = this.add.text(gameDimentions.x/2,gameDimentions.y/2, 'PLAY AGAIN?', {font:'40px Sans-Serif',color:'#00ff00',fontFamily: 'Arial',align:'center'}).setOrigin(0.5,0.5);
		TweenHelper.flashElement(this, screenText);
		
		
		//also starts the game
		this.input.keyboard.on('keyup-' + 'ENTER',  function () {
			console.log('starting with enter');
			//this.scene.remove('menuScreen');
			this.scene.start('gameScreen');
			this.scene.setVisible(false,'failScreen');
			this.scene.pause('failScreen');
		}, this);

	}
	update(time, delta){
		console.log('fail update');

	}
}


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
//put functions here