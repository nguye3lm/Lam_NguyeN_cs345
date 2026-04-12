let gameLost = false;

function drawLoseScreen() {
  background(0);
  fill(255);
  textSize(70);
  text("YOU LOSE!", 500, 100);
  textSize(30);
  text("PRESS R TO RESTART", 500, 400);
}

function keyPressed() {
  if (gameLost) {
    if (key === "r") {
      // Reset all game state back to level 1
      gameLost = false;
      gameStart = false;
      gameInitialized = false;
      Game.castleHealth = 10;
      Game.gold = 5;
      Game.enemies = [];
      Game.towers = [];
      Game.path = [];
      Game.startLevel = false;
      Game.autoStartLevel = false;
      Game.selectedTower = null;
      Game.selectedBuyButton = null;
      Game.draggingTowerType = null;
      Game.level = null;
    }
  }
}
