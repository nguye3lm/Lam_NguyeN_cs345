function placeTower(x, y, attackRange = 100, cooldown = 30, damage = 1) {
  for (let tower of Game.towers) {
    if (dist(x, y, tower.x, tower.y) < 50) {
      return false;
    }
  }

  Game.towers.push(new Tower(x, y, attackRange, cooldown, damage));
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
