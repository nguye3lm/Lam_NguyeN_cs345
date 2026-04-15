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
  image(Game.assets.logo, 1310, 10, 220, 220);
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
  const buttonInfo = {
    1: {
      name: 'Archer Tower',
      cost: 3,
      damage: 1,
      range: 100,
      cooldown: 30,
      attackType: 'Single Target',
    },
    2: {
      name: 'Wizard Tower',
      cost: 5,
      damage: 1,
      range: 120,
      cooldown: 55,
      attackType: 'AoE Splash',
      aoe: 60,
    },
    3: {
      name: 'Stoic Knight',
      cost: 5,
      damage: 1,
      range: 100,
      cooldown: 55,
      attackType: 'AoE Splash',
      aoe: 100,
    },
  };

  for (let button of Game.ui.towerButtons) {
    image(Game.assets.archerTower, button.x, button.y, button.w, button.h);

    if (button.type === 2) {
      fill(40, 90, 180, 180);
      noStroke();
      rect(button.x, button.y, button.w, button.h);

      fill(255);
      textSize(18);
      textAlign(CENTER, CENTER);
      text('WIZ', button.x + button.w / 2, button.y + button.h / 2);
    }
    if (button.type === 3) {
      fill(40, 90, 180, 180);
      noStroke();
      rect(button.x, button.y, button.w, button.h);

      fill(255);
      textSize(18);
      textAlign(CENTER, CENTER);
      text('Knight', button.x + button.w / 2, button.y + button.h / 2);
    }

    if (Game.selectedBuyButton === button.type) {
      noFill();
      stroke(255, 255, 0);
      strokeWeight(4);
      rect(button.x, button.y, button.w, button.h);
    }

    // Hover tooltip
    if (mouseX >= button.x && mouseX <= button.x + button.w && mouseY >= button.y && mouseY <= button.y + button.h) {
    // Tooltip box
      fill(30, 30, 30, 220);
      stroke(255, 200, 0);
      strokeWeight(2);
      const info = buttonInfo[button.type];
      const tooltipHeight = info.aoe ? 120 : 100;
      rect(button.x - 160, button.y, 150, tooltipHeight, 8);

    // Tooltip text
      fill(255);
      noStroke();
      textSize(14);
      textAlign(LEFT, BASELINE);
      text(info.name, button.x - 150, button.y + 22);
      text('Cost:   ' + info.cost + ' gold', button.x - 150, button.y + 44);
      text('Damage: ' + info.damage, button.x - 150, button.y + 66);
      text('Range:  ' + info.range, button.x - 150, button.y + 88);
      text('Rate:   ' + info.cooldown, button.x - 150, button.y + 110);
      if (info.aoe) {
        text('AoE:    ' + info.aoe, button.x - 150, button.y + 132);
      }
    }
  }

  textAlign(LEFT, BASELINE);
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
  text('Type: ' + (Game.selectedTower.towerName || 'Tower'), 1035, 345);
  text('Damage: ' + Game.selectedTower.damage, 1035, 360);
  text('Range: ' + Game.selectedTower.attackRange, 1035, 390);
  if (Game.selectedTower.splashRadius) {
    text('AoE: ' + Game.selectedTower.splashRadius, 1035, 420);
  }

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

function renderSettingIconButton() {
  //setting button
  const icon = Game.ui.settingIconButton;
  fill(255);
  stroke(0);
  strokeWeight(2);
  rect(icon.x, icon.y, icon.w, icon.h, 6);
  image(Game.assets.settingIcon, icon.x, icon.y, icon.w, icon.h);
}
function renderSpeedUpButton() {
  //setting button
  const icon = Game.ui.speedUpButton;
  fill(255);
  stroke(0);
  strokeWeight(2);
  rect(icon.x, icon.y, icon.w, icon.h, 6);
  image(Game.assets.twoxicon, icon.x, icon.y, icon.w, icon.h);
}
