function updateAndRenderEnemies() {
  for (let i = Game.enemies.length - 1; i >= 0; i--) {
    let enemy = Game.enemies[i];

    enemy.updatePos();

    if (enemy.health <= 0 || enemy.targetPos >= Game.path.length) {
      if (enemy.health <= 0) {
        addGold(1);
      } else {
        Game.castleHealth--;
      }
      Game.enemies.splice(i, 1);
      continue;
    }

    enemy.render();
  }
}
