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
    this.spawnDelay = random(500, 3000);
    this.levelActive = true;
  }

  update(enemies) {

    // Spawn immediately when a new wave starts so rounds always visibly begin.
    if (this.levelActive && this.spawnIndex === 0 && this.waveEnemies.length > 0) {
      enemies.push(this.waveEnemies[this.spawnIndex]);
      this.spawnIndex++;
      this.lastSpawnTime = millis();
      this.spawnDelay = random(500, 1500);
    }

    // spawn enemies randomly
    if (this.spawnIndex < this.waveEnemies.length &&
        millis() - this.lastSpawnTime >= this.spawnDelay) {
      
      enemies.push(this.waveEnemies[this.spawnIndex]);
      this.spawnIndex++;

      this.lastSpawnTime = millis();
      this.spawnDelay = random(500, 1500);
    }

    // check if wave finished
    if (this.spawnIndex >= this.waveEnemies.length && enemies.length === 0) {
      this.levelActive = false;
	  this.currentLevel+=1
    }
  }

  spawnEnemies() {
    let enemies = [];
    let enemyCount = max(1, this.currentLevel * 5);
    for (let i = 0; i < enemyCount; i++) {
      enemies.push(new Enemy(4, 1, 1, this.path));
    }
    return enemies;
  }
}