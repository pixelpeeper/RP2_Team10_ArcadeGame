class PlayerHud {
  constructor(scene) {
    this.score = scene.add
      .text(10, 10, "Score", {
        font: "18px Arial"
      })
      .setScrollFactor(0);
    this.scoreText = scene.add
      .text(70, 10, "0", {
        font: "18px Arial",
        color: "yellow"
      })
      .setScrollFactor(0);

    this.level = scene.add
      .text(10, 30, "Level", {
        font: "18px Arial"
      })
      .setScrollFactor(0);

    this.level = scene.add
      .text(10, 30, "Level", {
        font: "18px Arial"
      })
      .setScrollFactor(0);

    this.levelText = scene.add
      .text(70, 30, "1", {
        font: "18px Arial",
        color: "yellow"
      })
      .setScrollFactor(0);

    let gameOverText = scene.add.text(275, 100, "Game Over", {
      font: "50px Arial"
    });
    gameOverText.setScrollFactor(0);
    gameOverText.visible = false;

    let restartText = scene.add.text(300, 200, "Press Enter To Restart");
    restartText.setScrollFactor(0);
    restartText.visible = false;

    this.gameOverOverlay = { gameOverText, restartText };
  }

  updateScore(newScore) {
    this.scoreText.setText(newScore);
  }
  updateLevel(newLevel) {
    this.levelText.setText(newLevel);
  }

  displayGameOverOverlay() {
    this.gameOverOverlay.gameOverText.visible = true;
    this.gameOverOverlay.restartText.visible = true;
  }
}

export default PlayerHud;
