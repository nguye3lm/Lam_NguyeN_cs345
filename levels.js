class Levels {
  constructor(path) {
    this.path = path;
    this.levelActive = false;
    this.waveEnemies = [];
    this.spawnIndex = 0;
    this.lastSpawnTime = 0;
    this.spawnDelay = 0;
	this.currentLevel=1

	//each row in this array corresponds to a level.
	//each row contains the number of enemies of a particular type to spawn index 0 = basic unit, index 1 = fast unit, index 2 = slow tank
	this.numOfEnemiesPerRound = [
		[5,0,0], [10,0,0],
		[15,0,0], [10,3,0],
		[10,8,0], [15,10,0],
		[15,10,5], [5,15,10],
		[0,20,15], [30,30,20],
		[30,30,30], [30,30,30],
		[30,30,30], [30,30,30],
		[30,30,30], [30,30,30],
		[30,30,30], [30,30,30],
		[30,30,30], [30,30,30],
	]
  }

  startWave() {
    this.waveEnemies = this.spawnEnemies();
    if (this.waveEnemies.length === 0) {
      this.levelActive = false;
      return;
    }

    this.spawnIndex = 0;
    this.lastSpawnTime = millis();
    this.spawnDelay = random(0, 1/Game.spawnDelayMultiplier);
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
	  if(Game.level.currentLevel >= 10){
		this.spawnDelay = random(1/Game.spawnDelayMultiplier, 400/Game.spawnDelayMultiplier);
	  }
	  else{
		this.spawnDelay = random(100/Game.spawnDelayMultiplier, 1500/Game.spawnDelayMultiplier);
	  }
      
    }

    // check if wave finished
    if (this.spawnIndex >= this.waveEnemies.length && enemies.length === 0) {
      this.levelActive = false;
	  this.currentLevel+=1
	  if(Game.spedUp && !Game.autoStartLevel){
		for(let enemy of Game.level.waveEnemies){
			enemy.slowDown()
		}
		for(let tower of Game.towers){
			tower.slowDown()
		}
		Game.spedUp = false;
		Game.spawnDelayMultiplier = 1
	  }
    }
  }

  spawnEnemies() {
    let enemies = [];
	let levelIndex = this.currentLevel-1;
	let healthBonus = 0;
	if(this.currentLevel >= 15){
		healthBonus+=20;
	}
	if(this.currentLevel >= 10){
		healthBonus +=10;
	}
	if(this.currentLevel == 20){
		enemies.push(new Enemy(1000, 5, 1, this.path, 10, 'boss'))
		return enemies;
	}
	for(let index = 0; index < this.numOfEnemiesPerRound[levelIndex].length;index++){
		let num = this.numOfEnemiesPerRound[levelIndex][index];

		//add basic units to enemy array
		if(index === 0){
			for(let x = 0;x<num;x++){
				enemies.push(new Enemy(4+healthBonus, 1, 1, this.path, 10, 'basic'))
			}
		}
		//add fast units to enemy array
		else if(index === 1){
			for(let x = 0;x<num;x++){
				enemies.push(new Enemy(6+healthBonus, 1, 2, this.path, 10, 'berserker'))
			}
		}
		//add slow tank units to enemy array
		else if(index === 2){
			for(let x = 0;x<num;x++){
				enemies.push(new Enemy(15+healthBonus, 2, 0.5, this.path, 10, 'brute'))
			}
		}
  }
  if(Game.spedUp){
	for(let enemy of enemies){
			enemy.speedUp()
		}
  }
  return enemies.sort(() => Math.random() - 0.5);
}
//   speedUp(){
// 	for(let enemy in this.waveEnemies){
// 		enemy.speed *=2;
// 	}
//   }
}