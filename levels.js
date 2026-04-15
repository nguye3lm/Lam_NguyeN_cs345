class Levels {
  constructor(path) {
    this.path = path;
    this.levelActive = false;

    this.waveEnemies = [];
    this.spawnIndex = 0;
    this.lastSpawnTime = 0;
    this.spawnDelay = 0;
	this.currentLevel=1
  }

  startWave() {
    this.waveEnemies = this.spawnEnemies();
    if (this.waveEnemies.length === 0) {
      this.levelActive = false;
      return;
    }

    this.spawnIndex = 0;
    this.lastSpawnTime = millis();
    this.spawnDelay = random(100/Game.spawnDelayMultiplier, 1500/Game.spawnDelayMultiplier);
    this.levelActive = true;
  }

  update(enemies) {

    // Spawn immediately when a new wave starts so rounds always visibly begin.
    if (this.levelActive && this.spawnIndex === 0 && this.waveEnemies.length > 0) {
      enemies.push(this.waveEnemies[this.spawnIndex]);
      this.spawnIndex++;
      this.lastSpawnTime = millis();
      this.spawnDelay = random(100/Game.spawnDelayMultiplier, 1500/Game.spawnDelayMultiplier);
    }

    // spawn enemies randomly
    if (this.spawnIndex < this.waveEnemies.length &&
        millis() - this.lastSpawnTime >= this.spawnDelay) {
      
      enemies.push(this.waveEnemies[this.spawnIndex]);
      this.spawnIndex++;

      this.lastSpawnTime = millis();
      this.spawnDelay = random(100/Game.spawnDelayMultiplier, 1500/Game.spawnDelayMultiplier);
    }

    // check if wave finished
    if (this.spawnIndex >= this.waveEnemies.length && enemies.length === 0) {
      this.levelActive = false;
	  this.currentLevel+=1
	  Game.spedUp = false;
		for(let enemy of Game.level.waveEnemies){
			enemy.slowDown()
		}
		for(let tower of Game.towers){
			tower.slowDown()
		}
		Game.spawnDelayMultiplier = 1
    }
  }

  spawnEnemies() {
    let enemies = [];
    let enemyCount = max(1, this.currentLevel * 5);
    for (let i = 0; i < enemyCount; i++) {
      enemies.push(new Enemy(4, 1, 1, this.path));
    }
	console.log(Game.enemies)
    return enemies;
  }
  speedUp(){
	for(let enemy in this.waveEnemies){
		enemy.speed *=2;
	}
  }
}