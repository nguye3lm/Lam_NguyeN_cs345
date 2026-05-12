function renderHud() {
  // ── Shaded panel 
  const panelX   = 8;
  const panelY   = 8;
  const iconSize = 26;
  const padding  = 10;
  const gap      = 8;
  const colW     = 80;
  const panelW   = padding + 5.5 * colW + padding;
  const panelH   = iconSize + 20;
  const UNUSED   = 0; // placeholder to avoid unused-var lint

  // transparent background for the icon
  noStroke();
  fill(20, 15, 10, 195);
  rect(panelX, panelY, panelW, panelH, 0, 0, 10, 10);

  // subtle inner border
  noFill();
  stroke(180, 130, 40, 130);
  strokeWeight(1.5);
  rect(panelX + 1, panelY + 1, panelW - 2, panelH - 2, 0, 0, 9, 9);

  // ── Icons + values: enemies → towers → gold → castleHP (LEFT to RIGHT) ──
  const items = [
    { icon: Game.assets.swordIcon,  value: Game.enemies.length },
    { icon: Game.assets.shieldIcon, value: Game.towers.length  },
    { icon: Game.assets.coinIcon,   value: Game.gold           },
    { icon: Game.assets.heartIcon,  value: Game.castleHealth   },
  ];

  const iy = panelY + 10;

  for (let i = 0; i < items.length; i++) {
    const ix = panelX + padding + i * colW;
    image(items[i].icon, ix, iy, iconSize, iconSize);
    fill('#efbf04');
    stroke(0);
    strokeWeight(2.5);
    textSize(18);
    textAlign(LEFT, TOP);
    text(items[i].value, ix + iconSize + gap, iy + 4);
  }
    text("code: ", 340, 22);

  // Level
  const lvl = Game.level ? Game.level.currentLevel : 1;
  textAlign(CENTER, BOTTOM);
  textSize(22);
  fill('#efbf04');
  stroke(0);
  strokeWeight(3);
  text('Level ' + lvl + ' / 20', width / 2, height - 8);

  // reset alignment
  textAlign(LEFT, BASELINE);
  noStroke();
}


function renderSidebar() {
  fill('#7c7c7c');
  // rect(1300, 0, 300, 825);
  image(Game.assets.wall,1300, 0, 300, 825);
  image(Game.assets.logo, 1310, 10, 220, 220);
}

function renderRoundControls() {
  const start = Game.ui.startRoundButton;
  const mode = Game.ui.modeToggleButton;

  fill(35, 30, 30);
  noStroke();
  textSize(20);
  textStyle(BOLD);
  text('Round Mode: ' + (Game.autoStartLevel ? 'Auto' : 'Manual'), 1320, 730);
  textStyle(NORMAL);

  if (Game.level.levelActive) {
    image(Game.assets.roundActiveButton, start.x, start.y, start.w, start.h);
  } else if (isInsideButton(mouseX, mouseY, start)) {
    image(Game.assets.startRoundButtonHover, start.x, start.y, start.w, start.h);
  } else {
    image(Game.assets.startRoundButton, start.x, start.y, start.w, start.h);
  }

  if (Game.autoStartLevel) {
    const img = isInsideButton(mouseX, mouseY, mode)
      ? Game.assets.switchManualButtonHover
      : Game.assets.switchManualButton;
    image(img, mode.x, mode.y, mode.w, mode.h);
  } else {
    const img = isInsideButton(mouseX, mouseY, mode)
      ? Game.assets.switchAutoButtonHover
      : Game.assets.switchAutoButton;
    image(img, mode.x, mode.y, mode.w, mode.h);
  }
}

function renderTowerButtons() {
  const buttonInfo = {
    1: {
      name: 'Archer Tower',
      cost: 15,
      damage: 1,
      range: 130,
      cooldown: 30,
      attackType: 'Single Target',
    },
    2: {
      name: 'Wizard Tower',
      cost: 35,
      damage: 2,
      range: 100,
      cooldown: 55,
      attackType: 'AoE Splash',
      aoe: 60,
    },
    3: {
      name: 'Stoic Knight',
      cost: 20,
      damage: 1.5,
      range: 50,
      cooldown: 70,
      attackType: 'AoE Splash',
      aoe: 70,
    },
  };

  for (let button of Game.ui.towerButtons) {
    if (button.type == 1) {
      image(Game.assets.archerTower, button.x, button.y, button.w, button.h);
    }

    if (button.type === 2) {
      image(Game.assets.wizardTower, button.x, button.y, button.w, button.h);
      // fill(40, 90, 180, 180);
      // noStroke();
      // rect(button.x, button.y, button.w, button.h);
      /// fill(255);
      // textSize(18);
      // textAlign(CENTER, CENTER);
      // text('WIZ', button.x + button.w / 2, button.y + button.h / 2);
    }
    if (button.type === 3) {
      image(Game.assets.knightTower, button.x, button.y, button.w, button.h);
      // fill(40, 90, 180, 180);
      // noStroke();
      // rect(button.x, button.y, button.w, button.h);
      // fill(255);
      // textSize(18);
      // textAlign(CENTER, CENTER);
      // text('Knight', button.x + button.w / 2, button.y + button.h / 2);
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
      const tooltipHeight = info.aoe ? 150 : 125;
      rect(button.x - 160, button.y, 140, tooltipHeight, 8);

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


  // draw selected tower range
  noFill();
  stroke(100, 200, 100, 100);
  strokeWeight(1);
  circle(
    Game.selectedTower.x,
    Game.selectedTower.y,
    Game.selectedTower.attackRange * 2
  );

  fill(255);
  stroke(0);
  rect(1025, 500, 270, 300, 10);
  //rect(1025, 50, 270, 300, 10);

  fill(0);
  noStroke();
  textSize(18);
  text((Game.selectedTower.towerName || 'Tower'), 1035, 525);
  text('Damage: ' + Game.selectedTower.damage, 1035, 550);
  text('Range: ' + Game.selectedTower.attackRange, 1035, 575);
  if (Game.selectedTower.splashRadius) {
    text('AoE: ' + Game.selectedTower.splashRadius, 1035, 600);
  }

  for (let button of Game.ui.targetPriorityButtons) {
    const isSelected = Game.selectedTower.targetPriority === button.mode;
    fill(isSelected ? color(245, 205, 70) : color(215));
    stroke(40);
    strokeWeight(isSelected ? 2 : 1);
    rect(button.x, button.y, button.w, button.h, 5);

    fill(0);
    noStroke();
    textSize(12);
    textAlign(CENTER, CENTER);
    text(button.label, button.x + button.w / 2, button.y + button.h / 2);
  }
  textAlign(LEFT, BASELINE);

  noFill();
  stroke(255, 255, 0);
  strokeWeight(2);
  circle(Game.selectedTower.x, Game.selectedTower.y, 24);
    fill(255);
  noStroke();
  image(Game.assets.trash, Game.ui.trashButton.x, Game.ui.trashButton.y, 79, 100);

  //upgrade button
  for (let button of Game.ui.upgradeButtons) {
    if (button.type == 1) {
		fill(0);
		if(Game.selectedTower.towerName == 'Wizard Tower'){
			image(Game.assets.staff, button.x,button.y, button.w, button.h)
			text("50% Damage increase, 25 Gold", 1100, 645);
		}
		else if(Game.selectedTower.towerName == 'Archer Tower'){
			image(Game.assets.range, button.x,button.y, button.w, button.h)
			text("100% range increase, 20 Gold", 1100, 645);
		}
		else if(Game.selectedTower.towerName == 'Stoic Knight'){
			image(Game.assets.sword, button.x,button.y, button.w, button.h)
			text("hit enemies backwards, 50 gold", 1100, 645);
		}
		else{
		text("Damage + 1", 1100, 645);
		rect(button.x,button.y, button.w, button.h);
	  }
    }
    if (button.type == 2) {
		fill(0);
	  if(Game.selectedTower.towerName == 'Wizard Tower'){
		image(Game.assets.snowflake, button.x,button.y, button.w, button.h)
		text("Slow enemies: 1sec, 30 Gold", 1100, 710);
	  }
	  else if(Game.selectedTower.towerName == 'Archer Tower'){
		image(Game.assets.arrow, button.x,button.y, button.w, button.h)
		text("targets two enemies, 10 Gold", 1100, 710);
	  }
		else if(Game.selectedTower.towerName == 'Stoic Knight'){
			image(Game.assets.speed, button.x,button.y, button.w, button.h)
			text("hit speed increase, 20 gold", 1100, 710);
		}
	  else{
		text("Range + 25", 1100, 710);
		rect(button.x,button.y, button.w, button.h);
	  }
    }
  }
}

function renderDraggingTowerPreview() {
  if (Game.draggingTowerType === null) return;


  //show range when placing
  noFill();
  stroke(150, 0, 150, 100);
  strokeWeight(1);

  const config = towerConfigs[Game.draggingTowerType];
  if (config) {
    circle(mouseX, mouseY, config.range * 2);
  }

  if (isOnPath(mouseX, mouseY, Game.path) || isOnSidebar(mouseX, mouseY)) {
    fill(255, 0, 0, 150); //red if on path
  } else {
    fill(0, 255, 0, 150); //green otherwise
  }
  noStroke();
  circle(mouseX, mouseY, 20);

  // fill(255);
  // noStroke();
  // rect(Game.ui.trashButton.x, Game.ui.trashButton.y, Game.ui.trashButton.w, Game.ui.trashButton.h);
  image(Game.assets.trash, 1375, 600, 100, 100);
}

function renderCastle() {
//   fill('#8B4513');
//   stroke(0);
//   strokeWeight(2);
//   rect(1200, 445, 40, 40);
//   image(Game.assets.castle, 1200, 445, 40, 40);
}

function isOnSidebar(x, y) {
  return x >= 1300 && x <= 1600 && y >= 0 && y <= 825;
}

function syncRoundButtons() {
  // No-op: round controls are now rendered in-canvas.
}

function renderSettingIconButton() {
  const icon = Game.ui.settingIconButton;
  if (isInsideButton(mouseX, mouseY, icon)) {
    image(Game.assets.settingsButtonHover, icon.x, icon.y, icon.w, icon.h);
  } else {
    image(Game.assets.settingsButton, icon.x, icon.y, icon.w, icon.h);
  }
}

function renderSpeedUpButton() {
  const icon = Game.ui.speedUpButton;
  if (!Game.spedUp && Game.level && Game.level.levelActive) {
    if (isInsideButton(mouseX, mouseY, icon)) {
      image(Game.assets.speedDownButtonHover, icon.x, icon.y, icon.w, icon.h);
    } else {
      image(Game.assets.speedDownButton, icon.x, icon.y, icon.w, icon.h);
    }
  } else if (Game.level && Game.level.levelActive) {
    if (isInsideButton(mouseX, mouseY, icon)) {
      image(Game.assets.speedUpButtonHover, icon.x, icon.y, icon.w, icon.h);
    } else {
      image(Game.assets.speedUpButton, icon.x, icon.y, icon.w, icon.h);
    }
  } else {
    image(Game.assets.speedUpButtonInactive, icon.x, icon.y, icon.w, icon.h);
  }
}

function renderTowerUpgrade() {
  for (let tower of Game.towers) {

    if (tower.upgradeType === 1) {
      noFill();
      stroke(255, 0, 0); // red for damage
      strokeWeight(3);
      circle(tower.x, tower.y, 25);
    }

    if (tower.upgradeType === 2) {
      noFill();
      stroke(0, 0, 255); //blue for range
      strokeWeight(3);
      circle(tower.x, tower.y, 25);
    }
  }
}
