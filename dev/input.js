function isInsideButton(x, y, button) {
  return x >= button.x && x <= button.x + button.w && y >= button.y && y <= button.y + button.h;
}

const towerConfigs = {
  1: { cost: 3, range: 100, cooldown: 30, damage: 1 },
  2: { cost: 5, range: 120, cooldown: 55, damage: 1, splashRadius: 60 },
};

function onToggleAutoStart() {
  Game.autoStartLevel = !Game.autoStartLevel;
  if (!Game.autoStartLevel) {
    Game.ui.autoStartButton.html('manual rounds');
  } else {
    Game.ui.autoStartButton.html('auto rounds');
  }
}

function onStartRound() {
  if (!Game.level.levelActive) {
    Game.startLevel = true;
  }
}

function setupRoundButtons() {
  // Round controls are rendered directly on the canvas in ui.js.
}

function mousePressed() {
  if (isInsideButton(mouseX, mouseY, Game.ui.modeToggleButton)) {
    onToggleAutoStart();
    return;
  }

  if (isInsideButton(mouseX, mouseY, Game.ui.startRoundButton)) {
    onStartRound();
    return;
  }

  for (let button of Game.ui.towerButtons) {
    if (isInsideButton(mouseX, mouseY, button)) {
      if (Game.selectedBuyButton === button.type) {
        Game.draggingTowerType = button.type;
      } else {
        Game.selectedBuyButton = button.type;
        Game.draggingTowerType = null;
      }
      return;
    }
  }

  if (Game.draggingTowerType !== null) {
    if (dist(mouseX, mouseY, Game.ui.trashButton.x + 50, Game.ui.trashButton.y + 50) < 50) {
      Game.draggingTowerType = null;
      Game.selectedBuyButton = null;
      return;
    }

    const config = towerConfigs[Game.draggingTowerType];
    const validSpot = !isOnPath(mouseX, mouseY, Game.path) && !isOnSidebar(mouseX, mouseY);

    if (config && Game.gold >= config.cost && validSpot) {
      let placed = false;

      if (Game.draggingTowerType === 1) {
          placed = placeTower(mouseX, mouseY, ArcherTower, config.range, config.cooldown, config.damage);
      }

      if (Game.draggingTowerType === 2) {
        placed = placeWizardTower(mouseX, mouseY, config.range, config.cooldown, config.damage, config.splashRadius);
      }

      if (placed) {
        addGold(-config.cost);
      }
    }

    Game.draggingTowerType = null;
    Game.selectedBuyButton = null;
    return;
  }

  Game.selectedTower = pickTowerAt(mouseX, mouseY);
}
