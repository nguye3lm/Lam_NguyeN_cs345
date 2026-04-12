function isInsideButton(x, y, button) {
  return x >= button.x && x <= button.x + button.w && y >= button.y && y <= button.y + button.h;
}

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
  if (!gameStart) {
    // Open settings menu
    if (!settingsOpen &&
        mouseX >= 617.5 && mouseX <= 917.5 &&
        mouseY >= 490   && mouseY <= 615) {
      settingsOpen = true;
      return;
    }
    // Handle clicks inside settings menu (close button)
    handleSettingsClick();
    return;
  }

  // In-game: setting icon button
  if (isInsideButton(mouseX, mouseY, Game.ui.settingIconButton)) {
    settingsOpen = !settingsOpen;
    return;
  }

  // In-game: close settings menu if open
  if (settingsOpen) {
    handleSettingsClick();
    return;
  }
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

    if (Game.draggingTowerType === 1 && Game.gold >= 3 && !isOnPath(mouseX, mouseY, Game.path) && !isOnSidebar(mouseX, mouseY)) {
      placeTower(mouseX, mouseY, 100, 30, 1);
      addGold(-3); // subtract for cost of tower if player has enough
    }

    Game.draggingTowerType = null;
    Game.selectedBuyButton = null;
    return;
  }

  Game.selectedTower = pickTowerAt(mouseX, mouseY);
}
