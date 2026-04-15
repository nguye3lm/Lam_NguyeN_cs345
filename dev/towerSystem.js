function canPlaceTowerAt(x, y) {
  for (let tower of Game.towers) {
    if (dist(x, y, tower.x, tower.y) < 50) {
      return false;
    }
  }

  return true;
}

function placeTower(x, y, TowerClass = ArcherTower, ...towerArgs) {
  if (!canPlaceTowerAt(x, y)) {
    return false;
  }

  Game.towers.push(new TowerClass(x, y, ...towerArgs));
  return true;
}

function placeWizardTower(x, y, attackRange = 120, cooldown = 55, damage = 1, splashRadius = 60) {
  if (!canPlaceTowerAt(x, y)) {
    return false;
  }

  Game.towers.push(new WizardTower(x, y, attackRange, cooldown, damage, splashRadius));
  return true;
}

function updateAndRenderTowers() {
  for (let tower of Game.towers) {
    tower.update(Game.enemies);
    tower.render();
  }
}

function pickTowerAt(x, y) {
  for (let tower of Game.towers) {
    if (dist(x, y, tower.x, tower.y) < 10) {
      return tower;
    }
  }
  return null;
}
