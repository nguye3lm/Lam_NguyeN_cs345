let gameLost = false;
let gameWon = false;

function drawLoseScreen() {
  background(0);
  fill(255);
  textSize(70);
  text("YOU LOSE!", 500, 100);
  textSize(30);
  text("PRESS R TO RESTART", 500, 400);
}

function drawWinScreen() {
  background(0);
  fill(255);
  textSize(70);
  text("YOU WIN!", 500, 100);
  textSize(30);
  text("YOU SURVIVED 20 ROUNDS", 430, 280);
  text("PRESS R TO RESTART", 500, 400);
}

function resetGameState() {
  gameLost = false;
  gameWon = false;
  gameStart = false;
  gameInitialized = false;
  Game.castleHealth = 20;
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

function keyPressed() {
  if ((gameLost || gameWon) && key.toLowerCase() === "r") {
    // Reset all game state back to round 1.
    resetGameState();
  }
}
