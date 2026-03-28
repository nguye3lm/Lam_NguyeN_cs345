const path = []
let gold = 0; //default 0 for now
let enemies = [];
let towers = [];
let waveTimer = 0;
let waveCounter = 0;  
let logo;
let tower1Asset;
//castle health
let castleAsset;
let castleHealth = 10;
//for upgrading tower
let selectedTower = null;
//for placing tower
let selectedBuyButton = null;
let draggingTowerType = null;
//allows for more tower buttons
let towerButtons = [
  { type: 1, x: 1375, y: 150, w: 100, h: 100 },
];

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

function mousePressed() {
  // check if clicking a tower button
  for (let button of towerButtons) {
    if (
      mouseX >= button.x &&
      mouseX <= button.x + button.w &&
      mouseY >= button.y &&
      mouseY <= button.y + button.h
    ) {
      if (selectedBuyButton === button.type) {
        draggingTowerType = button.type; //second click starts dragging
      } else {
        selectedBuyButton = button.type; //first click selects the button 
        draggingTowerType = null;
      }
      return
    }
  } 

  //places tower if dragging
  if (draggingTowerType !== null) {
    if (draggingTowerType === 1){ //will need to add more when adding more towers
      placeTower(mouseX, mouseY, 100, 30, 1);
    }
    draggingTowerType = null;
    selectedBuyButton = null;
    return;
  }


  //selects already placed tower
  selectedTower = null; //unselects tower when clicking off of it
  
  //selects a tower
  for (let tower of towers) {
    if (dist(mouseX, mouseY, tower.x, tower.y) < 10) { //will have to change "<10" with size of towers
      selectedTower = tower;
      break;
    }
  }
}

function preload() {
  //test logo
  castleAsset = loadImage("dev/assets/Castle.png");
  logo = loadImage("dev/assets/Castle rush placeholder logo.png");
  tower1Asset = loadImage("dev/assets/Castle Rush tower 1 placeholder.png")
}

function setup() {
  createCanvas(1535, 825);
  createPath();
  
  // Place initial test towers
  /*
  placeTower(150, 100, 120, 30, 1);
  placeTower(350, 150, 100, 25, 1);
  placeTower(450, 350, 110, 35, 1);
  */
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
    if (enemy.health <= 0 || enemy.targetPos >= path.length) {
      if (enemy.health <= 0) {
        addGold(1); // Reward for killing enemy
      } else {
        castleHealth--; // Enemy reached the castle, the castle is losing health
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
  text('Gold: ' + gold, 1100, 30);
  text('Enemies: ' + enemies.length, 1100, 60);
  text('Towers: ' + towers.length, 1100, 90);
  text('Castle HP: ' + castleHealth, 1100, 120); // Castle health in top left (add after gold/enemies/towers text)
  //canvas size = 1535, 825
  fill('#7c7c7c'); 
  rect(1300, 0, 300, 825);
  image(logo, 1300, 0, 240, 100);
  image(tower1Asset, 1375, 150, 100, 100);


  //draw tower UI when selecting a tower
  if (selectedTower !== null) {
    fill(255);
    stroke(0);
    rect(1025, 250, 270, 300, 10);

    fill(0);
    noStroke();
    textSize(18);
    text("Tower Info", 1035, 330);
    text("Damage: " + selectedTower.damage, 1035, 360);
    text("Range: " + selectedTower.attackRange, 1035, 390);
  }

  //placing new tower 
  if (draggingTowerType !== null) {
    fill(0, 150);
    noStroke();
    circle(mouseX, mouseY, 20);
  }
  
  // Draw castle at end of path (500, 300)
  fill('#8B4513');
  stroke(0);
  strokeWeight(2);
  rect(480, 280, 40, 40); // centered around (500, 300)
  image(castleAsset, 480, 280, 40, 40);



}


