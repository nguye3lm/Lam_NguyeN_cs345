function updateAndRenderEnemies() {
  for (let i = Game.enemies.length - 1; i >= 0; i--) {
    let enemy = Game.enemies[i];


    if (!settingsOpen) {
      enemy.updatePos();
    }

    if (enemy.health <= 0) {
      if (enemy.health <= 0) {
        addGold(1);
      }
      Game.enemies.splice(i, 1);
      continue;
    }
	if(enemy.targetPos >= Game.path.length){
		enemy.coolDown-=1;
		if(enemy.coolDown <= 0){
			Game.assets.enemyHit.setVolume(0.7);
			Game.assets.enemyHit.play();
			Game.castleHealth -= enemy.damage
			enemy.coolDown = 100;
		}
		
	}

    enemy.render();
  }
}
