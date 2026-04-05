function renderHud() {
  fill('#efbf04');
  textSize(22);
  stroke(0);
  strokeWeight(3);
  text('Gold: ' + Game.gold, 1100, 30);
  text('Level: ' + Game.level.currentLevel, 1100, 150);
  text('Enemies: ' + Game.enemies.length, 1100, 60);
  text('Towers: ' + Game.towers.length, 1100, 90);
  text('Castle HP: ' + Game.castleHealth, 1100, 120);
}

function renderSidebar() {
  fill('#7c7c7c');
  rect(1300, 0, 300, 825);
  image(Game.assets.logo, 1300, 0, 240, 100);
}

function renderRoundControls() {
  const start = Game.ui.startRoundButton;
  const mode = Game.ui.modeToggleButton;

  fill(30, 30, 30);
  noStroke();
  textSize(14);
  text('Round Mode: ' + (Game.autoStartLevel ? 'Auto' : 'Manual'), 1320, 730);

  fill(Game.level.levelActive ? '#6f6f6f' : '#4caf50');
  stroke(0);
  strokeWeight(2);
  rect(start.x, start.y, start.w, start.h, 6);

  fill(255);
  noStroke();
  textSize(16);
  textAlign(CENTER, CENTER);
  text(Game.level.levelActive ? 'Round Active' : 'Start Round', start.x + start.w / 2, start.y + start.h / 2);

  fill(Game.autoStartLevel ? '#ef5350' : '#1e88e5');
  stroke(0);
  strokeWeight(2);
  rect(mode.x, mode.y, mode.w, mode.h, 6);

  fill(255);
  noStroke();
  textSize(14);
  text(Game.autoStartLevel ? 'Switch to Manual' : 'Switch to Auto', mode.x + mode.w / 2, mode.y + mode.h / 2);

  textAlign(LEFT, BASELINE);
}

function renderTowerButtons() {
  for (let button of Game.ui.towerButtons) {
    image(Game.assets.tower1, button.x, button.y, button.w, button.h);

    if (Game.selectedBuyButton === button.type) {
      noFill();
      stroke(255, 255, 0);
      strokeWeight(4);
      rect(button.x, button.y, button.w, button.h);
    }
  }
}

function renderSelectedTowerPanel() {
  if (Game.selectedTower === null) return;

  fill(255);
  stroke(0);
  rect(1025, 250, 270, 300, 10);

  fill(0);
  noStroke();
  textSize(18);
  text('Tower Info', 1035, 330);
  text('Damage: ' + Game.selectedTower.damage, 1035, 360);
  text('Range: ' + Game.selectedTower.attackRange, 1035, 390);

  noFill();
  stroke(255, 255, 0);
  strokeWeight(2);
  circle(Game.selectedTower.x, Game.selectedTower.y, 24);
}

function renderDraggingTowerPreview() {
  if (Game.draggingTowerType === null) return;

  if (isOnPath(mouseX, mouseY, Game.path) || isOnSidebar(mouseX, mouseY)) {
    fill(255, 0, 0, 150); //red if on path
  } else {
    fill(0, 255, 0, 150); //green otherwise
  }
  noStroke();
  circle(mouseX, mouseY, 20);

  fill(255);
  noStroke();
  rect(Game.ui.trashButton.x, Game.ui.trashButton.y, Game.ui.trashButton.w, Game.ui.trashButton.h);
  image(Game.assets.trash, 1386, 600, 79, 100);
}

function renderCastle() {
  fill('#8B4513');
  stroke(0);
  strokeWeight(2);
  rect(1250, 680, 40, 40);
  image(Game.assets.castle, 1250, 680, 40, 40);
}

function isOnSidebar(x, y) {
  return x >= 1300 && x <= 1600 && y >= 0 && y <= 825;
}

function syncRoundButtons() {
  // No-op: round controls are now rendered in-canvas.
}
