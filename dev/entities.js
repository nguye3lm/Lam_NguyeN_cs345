class Enemy {
  constructor(health, damage, speed,path) {
	this.path = path
    this.pos = path[0].copy();
    this.targetPos = 1;
    this.speed = speed;
	this.health = health
	this.damage = damage
  }

  updatePos() {
  	if (this.targetPos >= this.path.length) return;

  	let target = this.path[this.targetPos];
  	let direction = p5.Vector.sub(target, this.pos);  //creates direct arrow vector pointing to target location

	//set entity to target position if close enough
  	if (direction.mag() <= 3) {
    	this.pos = target.copy();
    	this.targetPos++;		//new target position is the next vector in path[]
  	  	return;
  	}
	
	//only runs if we haven't reached the new target position
  	direction.setMag(this.speed);	//sets the distance to travel in next frame
  	this.pos.add(direction);		//travel that distance
	}

  //shows enemy on screen
  render() {
    fill(255, 0, 0);
    ellipse(this.pos.x, this.pos.y, 40);
  }
}


// Tower class with targeting and attack logic
class Tower {
  constructor(x, y, attackRange = 100, cooldown = 30, damage = 1) {
    this.x = x;
    this.y = y;
    this.pos = createVector(x, y);
    
    this.attackRange = attackRange;
    this.cooldown = cooldown;
    this.maxCooldown = cooldown;
    this.damage = damage;
    this.currentCooldown = 0;
    
    this.targetEnemy = null;
  }

  // Find the closest enemy in range (first in sorted array within range)
  findTarget(enemies) {
    this.targetEnemy = null;
    
    // Early exit if no enemies
    if (!enemies || enemies.length === 0) return;
    
    // Scan through enemies (already sorted by distance along path)
    for (let enemy of enemies) {
      let distToEnemyPos = dist(this.x, this.y, enemy.pos.x, enemy.pos.y);
      
      // Return first enemy in range
      if (distToEnemyPos <= this.attackRange) {
        this.targetEnemy = enemy;
        return;
      }
    }
  }

  // Update tower cooldown and targeting
  update(enemies) {
    // Decrease cooldown
    if (this.currentCooldown > 0) {
      this.currentCooldown--;
    }
    
    // Find target
    this.findTarget(enemies);
    
    // Try to attack if target exists and cooldown is ready
    if (this.targetEnemy && this.currentCooldown <= 0) {
      this.attack(this.targetEnemy);
      this.currentCooldown = this.maxCooldown;
    }
  }

  // Deal damage to target enemy
  attack(enemy) {
    enemy.health -= this.damage;
  }

  // Render tower as a circle with range indicator
  render() {
    // Draw attack range (semi-transparent)
    fill(100, 200, 100, 50);
    stroke(100, 200, 100, 100);
    strokeWeight(1);
    circle(this.x, this.y, this.attackRange * 2);
    
    // Draw tower base
    fill(100, 100, 200);
    stroke(0);
    strokeWeight(2);
    circle(this.x, this.y, 20);
    
    // Draw indicator line to target if exists
    if (this.targetEnemy) {
      stroke(255, 100, 100);
      strokeWeight(2);
      line(this.x, this.y, this.targetEnemy.pos.x, this.targetEnemy.pos.y);
    }
  }
}