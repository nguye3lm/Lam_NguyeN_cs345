function isInsideButton(x, y, button) {
  return x >= button.x && x <= button.x + button.w && y >= button.y && y <= button.y + button.h;
}

const towerConfigs = {
  1: { cost: 3, range: 100, cooldown: 30, damage: 1 },
  2: { cost: 5, range: 120, cooldown: 55, damage: 1, splashRadius: 60 },
  3: { cost: 1, range: 50, cooldown: 70, damage: 2, splashRadius: 50 },
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
  if(Game.level && Game.level.levelActive){
	  if(isInsideButton(mouseX, mouseY, Game.ui.speedUpButton) && Game.spedUp){
		Game.spedUp = false;
		for(let enemy of Game.level.waveEnemies){
			enemy.slowDown()
		}
		for(let tower of Game.towers){
			tower.slowDown()
		}
		Game.spawnDelayMultiplier = 1
	}
	else if(isInsideButton(mouseX, mouseY, Game.ui.speedUpButton)&&!Game.spedUp){
		Game.spedUp = true;
		for(let enemy of Game.level.waveEnemies){
			enemy.speedUp()
		}
		for(let tower of Game.towers){
			tower.speedUp()
		}
		Game.spawnDelayMultiplier = 5
	}
  }
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
	  if (Game.draggingTowerType === 3) {
        placed = placeStoicKnight(mouseX, mouseY, config.range, config.cooldown, config.damage, config.splashRadius);
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
