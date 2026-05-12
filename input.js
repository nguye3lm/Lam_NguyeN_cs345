function isInsideButton(x, y, button) {
  return x >= button.x && x <= button.x + button.w && y >= button.y && y <= button.y + button.h;
}

const towerConfigs = {
  1: { cost: 15, range: 130, cooldown: 30, damage: 1 },
  2: { cost: 35, range: 100, cooldown: 55, damage: 2, splashRadius: 60 },
  3: { cost: 20, range: 50, cooldown: 70, damage: 1.5, splashRadius: 50 },
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

  //sell tower
  if (isInsideButton(mouseX, mouseY, Game.ui.trashButton) && Game.selectedTower !== null){
    let index = Game.towers.indexOf(Game.selectedTower);
    if (index !== -1) {
      Game.gold += 10;
      Game.towers.splice(index, 1);
	  gameStats.towersSold+=1;

    }
    Game.selectedTower = null;
  }

  if (Game.selectedTower !== null) {
    for (let button of Game.ui.targetPriorityButtons) {
      if (isInsideButton(mouseX, mouseY, button)) {
        Game.selectedTower.setTargetPriority(button.mode);
        return;
      }
    }
  }

  //upgrade buttons
  if (Game.selectedTower !== null && Game.selectedTower.upgradeType == null) {
    for (let button of Game.ui.upgradeButtons) {
      if (isInsideButton(mouseX, mouseY, button)) {
        if (Game.selectedTower instanceof ArcherTower) {

          if (button.type == 1) {
			if(Game.gold >= 20){
                Game.selectedTower.attackRange *=2;
                Game.selectedTower.upgradeType = 1;
				Game.gold -= 20;
			}

          }
          if (button.type == 2) {
             //Piercing = hit extra enemy
			if(Game.gold >= 10){
				Game.selectedTower.upgradeType = 2;
				Game.gold -= 10;
			}
          }
        }
        if (Game.selectedTower instanceof WizardTower) {

          if (button.type == 1) {
				if(Game.gold >= 25){
            		Game.selectedTower.damage += Game.selectedTower.damage/2; //Burn = damage over time
            		Game.selectedTower.upgradeType = 1;
			   		Game.gold -= 25;
				}
          }
          if (button.type == 2) {
			if(Game.gold >= 30){
				//Slow = reduce enemy speed temporarily
               Game.selectedTower.upgradeType = 2;
			   Game.gold -= 30;
			}

          }

        }
        if (Game.selectedTower instanceof StoicKnight) {

          if (button.type == 1) {
			if(Game.gold >= 50){
				Game.selectedTower.upgradeType = 1;
				Game.gold -= 50;
			}
          }
          if (button.type == 2) {
			if(Game.gold >= 20){
            	Game.selectedTower.maxCooldown /= 2; //Stun Strike = chance to freeze enemy briefly
            	Game.selectedTower.upgradeType = 2  ;
				Game.gold -= 20;
			}
          }
        }
        Game.selectedTower.upgraded = true
		gameStats.numOfUpgrades+=1;
      }
    }
  }

  if (!gameStart) {
    // Open settings menu
    const setting = Game.ui.menuSettingsButton;
    if (!settingsOpen &&
        mouseX >= setting.x && mouseX <= setting.x + setting.w &&
        mouseY >= setting.y   && mouseY <= setting.y + setting.h) {
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
		  gameStats.archersPlaced +=1;
      }

      if (Game.draggingTowerType === 2) {
        placed = placeWizardTower(mouseX, mouseY, config.range, config.cooldown, config.damage, config.splashRadius);
		gameStats.wizardsPlaced +=1;
      }
	  if (Game.draggingTowerType === 3) {
        placed = placeStoicKnight(mouseX, mouseY, config.range, config.cooldown, config.damage, config.splashRadius);
		gameStats.stoicKnightsPlaced+=1;
      }

      if (placed) {
        addGold(-config.cost);
		gameStats.goldSpent +=config.cost;
		gameStats.towersPlaced+=1;
      }
    }

    Game.draggingTowerType = null;
    Game.selectedBuyButton = null;
    return;
  }

  Game.selectedTower = pickTowerAt(mouseX, mouseY);
}

function mouseDragged() {
  handleSettingsDrag();
}

function mouseReleased() {
  handleSettingsRelease();
}
