let gameLost = false;
let gameWon = false;
let previousStats = null;
function drawLoseScreen() {
  Game.input.hide()
  background(Game.assets.startMenu)
  fill(255);
  textSize(70);
  text("YOU LOSE!", 540, 100);
  textSize(30);
  noStroke();
  fill(20, 15, 10, 195);
  rect(45, 130, 400, 600, 10, 10, 10, 10);
  noStroke();
  fill(20, 15, 10, 195);
  rect(745, 130, 400, 600, 10, 10, 10, 10);
  fill(255);
  textSize(30);

  text("Stats from last round", 100, 200);
  if(previousStats){
	textSize(20);
	text("Gold collected: " + previousStats.goldCollected, 100, 230)
	text("Gold spent: " + previousStats.goldSpent, 100, 260)
	text("Enemies killed: " + previousStats.enemiesKilled, 100, 290)
	text("Defenders placed: " + previousStats.towersPlaced, 100, 320)
	text("Archers placed: " + previousStats.archersPlaced, 100, 350)
	text("Wizards placed: " + previousStats.wizardsPlaced, 100, 380)
	text("Stoic knights placed: " + previousStats.stoicKnightsPlaced, 100, 410)
	text("Defenders sold: " + previousStats.towersSold, 100, 440)
	text("Levels completed: " + previousStats.levelsCompleted, 100, 470)
	text("Defenders upgraded: " + previousStats.numOfUpgrades, 100, 500)
  }
  textSize(30);
  text("Stats from this round", 800, 200);
  textSize(20);
  text("Gold collected: " + gameStats.goldCollected, 800, 230)
  text("Gold spent: " + gameStats.goldSpent, 800, 260)
  text("Enemies killed: " + gameStats.enemiesKilled, 800, 290)
  text("Defenders placed: " + gameStats.towersPlaced, 800, 320)
  text("Archers placed: " + gameStats.archersPlaced, 800, 350)
  text("Wizards placed: " + gameStats.wizardsPlaced, 800, 380)
  text("Stoic knights placed: " + gameStats.stoicKnightsPlaced, 800, 410)
  text("Defenders sold: " + gameStats.towersSold, 800, 440)
  gameStats.levelsCompleted = Game.level.currentLevel-1;
  text("Levels completed: " + gameStats.levelsCompleted, 800, 470)
  text("Defenders upgraded: " + gameStats.numOfUpgrades, 800, 500)
  text("PRESS R TO RESTART", 800, 700);
}

function drawWinScreen() {
  Game.input.hide()
  background(Game.assets.startMenu)
  fill(255);
  textSize(70);
  text("YOU WIN!", 500, 100);
  textSize(30);
  noStroke();
  fill(20, 15, 10, 195);
  rect(45, 130, 400, 600, 10, 10, 10, 10);
  noStroke();
  fill(20, 15, 10, 195);
  rect(745, 130, 400, 600, 10, 10, 10, 10);
  fill(255);
  text("Stats from last round", 100, 200);
  if(previousStats){
	textSize(20);
	text("Gold collected: " + previousStats.goldCollected, 100, 230)
	text("Gold spent: " + previousStats.goldSpent, 100, 260)
	text("Enemies killed: " + previousStats.enemiesKilled, 100, 290)
	text("Defenders placed: " + previousStats.towersPlaced, 100, 320)
	text("Archers placed: " + previousStats.archersPlaced, 100, 350)
	text("Wizards placed: " + previousStats.wizardsPlaced, 100, 380)
	text("Stoic knights placed: " + previousStats.stoicKnightsPlaced, 100, 410)
	text("Defenders sold: " + previousStats.towersSold, 100, 440)
	text("Levels completed: " + previousStats.levelsCompleted, 100, 470)
	text("Defenders upgraded: " + previousStats.numOfUpgrades, 100, 500)
  }
  textSize(30);
  text("Stats from this round", 800, 200);
  textSize(20);
  text("Gold collected: " + gameStats.goldCollected, 800, 230)
  text("Gold spent: " + gameStats.goldSpent, 800, 260)
  text("Enemies killed: " + gameStats.enemiesKilled, 800, 290)
  text("Defenders placed: " + gameStats.towersPlaced, 800, 320)
  text("Archers placed: " + gameStats.archersPlaced, 800, 350)
  text("Wizards placed: " + gameStats.wizardsPlaced, 800, 380)
  text("Stoic knights placed: " + gameStats.stoicKnightsPlaced, 800, 410)
  text("Defenders sold: " + gameStats.towersSold, 800, 440)
  gameStats.levelsCompleted = Game.level.currentLevel-1;
  text("Levels completed: " + gameStats.levelsCompleted, 800, 470)
  text("Defenders upgraded: " + gameStats.numOfUpgrades, 800, 500)
  text("PRESS R TO RESTART", 800, 700);
}	

function resetGameState() {
	Game.reset = true;
  gameLost = false;
  gameWon = false;
  gameStart = false;
  gameInitialized = false;
  Game.castleHealth = 20;
  Game.gold = Game.startGold;
  Game.enemies = [];
  Game.towers = [];
  Game.path = [];
  Game.startLevel = false;
  Game.autoStartLevel = false;
  Game.selectedTower = null;
  Game.selectedBuyButton = null;
  Game.draggingTowerType = null;
  Game.level = null;
  previousStats = { ...gameStats };;
  resetStats();
}

function keyPressed() {
  if ((gameLost || gameWon) && key.toLowerCase() === "r") {
    // Reset all game state back to round 1.
    resetGameState();
  }
}
