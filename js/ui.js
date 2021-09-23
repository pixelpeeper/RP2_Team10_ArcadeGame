var gameDimentions = {x:0,y:0};
class uiScreen extends Phaser.Scene {
    constructor(){
        super('uiScreen');
		//this.start;
    }
	
	preload(){
		console.log('ui loading');
		//this.load.image('menuBackground', 'images/background.jpg');
		//this.load.image('title', 'iamges/title.png');
		//this.load.image('controls', 'images/ANSI.png');
		//this.load.svg('wasd_w', 'images/wasd_w.svg');
		//this.load.svg('wasd_a', 'images/wasd_a.svg');
		//this.load.svg('wasd_s', 'images/wasd_s.svg');
		//this.load.svg('wasd_d', 'images/wasd_d.svg');
		//this.load.svg('spacebar', 'images/spacebar.svg');
		//this.load.svg('arrows_up', 'images/arrow_Up.svg');
		//this.load.svg('arrows_down', 'images/arrow_Down.svg');
		//this.load.svg('arrows_left', 'images/arrow_Left.svg');
		//this.load.svg('arrows_right', 'images/arrow_Right.svg');
	}
	
	create() {
		
		let localTHIS = this;
		
		console.log('ui creating');
		gameDimentions.x = this.sys.game.canvas.width;
		gameDimentions.y = this.sys.game.canvas.height;
		console.log(gameDimentions)
		//localTHIS = this;
		//dims the game
		//var uiBackground = this.add.rectangle(0,0, gameDimentions.x, gameDimentions.y, 0x333333);
		//uiBackground.alpha = 0.5;
		//uiBackground.setOrigin(0,0);
		
		
		//displays UI
        this.score = this.add.text(20, 20, "Score", {
			font: "36px Sans-Serif",
			color:'#EAD718',
			fontFamily: 'Arial',
			align:'left'
		})
		.setScrollFactor(0);
		this.scoreText = this.add.text(140, 20, "0", {
			font: "36px Sans-Serif",
			color:'#EAD718',
			fontFamily: 'Arial',
			align:'left'
		})
		.setScrollFactor(0);

		this.level = this.add.text(20, 60, "Level", {
			font: "36px Sans-Serif",
			color:'#EAD718',
			fontFamily: 'Arial',
			align:'left'
		})
		.setScrollFactor(0);

		this.level = this.add.text(20, 60, "Level", {
			font: "36px Sans-Serif",
			color:'#EAD718',
			fontFamily: 'Arial',
			align:'left'
		})
		.setScrollFactor(0);

		this.levelText = this.add.text(140, 60, "4", {
			font: "36px Sans-Serif",
			color:'#EAD718',
			fontFamily: 'Arial',
			align:'left'
		})
		.setScrollFactor(0);
		
		//this.shockwave = this.add.text(20, 60, "Shokwave:", {
		//	font: "36px Sans-Serif",
		//	color:'#EAD718',
		//	fontFamily: 'Arial',
		//	align:'left'
		//})
		//.setScrollFactor(0);

		//this.shockwaveText = this.add.text(20, 100, "Shockwave Available", {
		//	font: "36px Sans-Serif",
		//	color:'#EAD718',
		//	fontFamily: 'Arial',
		//	align:'left'
		//})
		//.setScrollFactor(0);
		
		//flashing text
		this.shockwaveText = this.add.text(20, 100, 'Shockwave Available', {
			font: "36px Sans-Serif",
			color:'#EAD718',
			fontFamily: 'Arial',
			align:'left'
		})
		.setScrollFactor(0);
		TweenHelper.flashElement(this, this.shockwaveText);
		
		
		
		
		// HUD scene
		this.scene.get('gameScreen').events.on('level', function(newLevel) {
			localTHIS.levelText.setText(newLevel);
		});
		this.scene.get('gameScreen').events.on('score', function(newScore) {
			localTHIS.scoreText.setText(newScore);
		});
		this.scene.get('gameScreen').events.on('shockwave', function(newShokwaveStatus) {
			if (newShokwaveStatus) {
				localTHIS.shockwaveText.setText('Shockwave Available');
			} else {
				localTHIS.shockwaveText.setText('');
			}
		});
		
		
	}
	update(time, delta){
		//console.log('ui menue update');
		
	}
}

//put functions here
// var HUD = new Phaser.Class({
	// Extends: Phaser.Scene,
	// initialize:
	// function HUD() {
        // Phaser.Scene.call(this, { key: 'HUG', active: true });
        // this.frames;
	// }
    // preload: function () {
		
	// }
    // create: function () {
        // this.score = scene.add
		// .text(20, 20, "Score", {
			// font: "36px Arial"
		// })
		// .setScrollFactor(0);
		// this.scoreText = scene.add
		// .text(140, 20, "0", {
			// font: "36px Arial",
			// color: "yellow"
		// })
		// .setScrollFactor(0);

		// this.level = scene.add
		// .text(20, 60, "Level", {
			// font: "36px Arial"
		// })
		// .setScrollFactor(0);

		// this.level = scene.add
		// .text(20, 60, "Level", {
			// font: "36px Arial"
		// })
		// .setScrollFactor(0);

		// this.levelText = scene.add
		// .text(140, 60, "1", {
			// font: "36px Arial",
			// color: "yellow"
		// })
		// .setScrollFactor(0);
    // },

    // updateScore: function (newScore) {
		// this.scoreText.setText(newScore);
	// },
	// updateLevel: function (newLevel) {
		// this.levelText.setText(newLevel);
	// }
// });

//function updateLevel(newLevel) extends phaser.scene {
//	this.levelText.setText(newLevel);
//}