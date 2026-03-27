const path = []
let gold = 0; //default 0 for now
let enemies = [];
let towers = [];
let waveTimer = 0;
let waveCounter = 0;

function createPath() {
  path.push(createVector(-10, 200));
  path.push(createVector(50, 200));
  path.push(createVector(200, 200));
  path.push(createVector(205, 100));
  path.push(createVector(400, 100));
  path.push(createVector(400, 300));
  path.push(createVector(500, 300));
}

function addGold(amount) {
  gold += amount;
}

function spawnEnemy(health = 2, damage = 1, speed = 2) {
  enemies.push(new Enemy(health, damage, speed, path));
}

function placeTower(x, y, attackRange = 100, cooldown = 30, damage = 1) {
  // Check for minimum spacing (towers must be at least 50px apart)
  for (let tower of towers) {
    if (dist(x, y, tower.x, tower.y) < 50) {
      console.log("Tower too close to another tower!");
      return false;
    }
  }
  
  towers.push(new Tower(x, y, attackRange, cooldown, damage));
  return true;
}

function setup() {
  createCanvas(1920, 1080);
  createPath();
  
  // Place initial test towers
  placeTower(150, 100, 120, 30, 1);
  placeTower(350, 150, 100, 25, 1);
  placeTower(450, 350, 110, 35, 1);
}

function draw() {
  background(220);

  // Draw path visualization
  noFill();
  stroke('#4e4848');
  strokeWeight(20);
  beginShape();
  for (let p of path) {
    vertex(p.x, p.y);
  }
  endShape();
  strokeWeight(1);

  // Spawn waves of enemies periodically
  waveTimer++;
  if (waveTimer > 60) { // Spawn new wave every 60 frames
    spawnEnemy(2, 1, 1.5);
    waveTimer = 0;
    waveCounter++;
  }

  // Update and render enemies
  for (let i = enemies.length - 1; i >= 0; i--) {
    let enemy = enemies[i];
    
    // Update position
    enemy.updatePos();
    
    // Remove if dead or past end of path
    if (enemy.health <= 0 || enemy.targetPos > path.length) {
      if (enemy.health <= 0) {
        addGold(1); // Reward for killing enemy
      }
      enemies.splice(i, 1);
      continue;
    }
    
    // Render enemy
    enemy.render();
  }

  // Update and render towers
  for (let tower of towers) {
    tower.update(enemies);
    tower.render();
  }

  // Draw UI
  fill('#efbf04');
  textSize(22);
  stroke(0);
  strokeWeight(3);
  text('Gold: ' + gold, 10, 30);
  text('Enemies: ' + enemies.length, 10, 60);
  text('Towers: ' + towers.length, 10, 90);
}
