class OrbProjectile {
  constructor(x, y, targetEnemy, damage, speed = 6, pos=targetEnemy.pos) {
    this.pos = createVector(x, y);
    this.targetEnemy = targetEnemy;
    this.damage = damage;
    this.speed = speed;
    this.radius = 6;
    this.active = true;
	this.targetPos = pos
  }

  update() {
    if (!this.active || !this.targetEnemy) return;

    if (this.targetEnemy.health <= 0) {
      this.active = false;
      return;
    }


    const toTarget = p5.Vector.sub(this.targetPos, this.pos);
    const distanceToTarget = toTarget.mag();

    if (distanceToTarget <= this.speed + this.radius + 20) {
      this.targetEnemy.health -= this.damage;
	  if(!Game.assets.archerhit.isPlaying()){
		playSFX(Game.assets.archerhit);
	  }
      this.active = false;
      return;
    }

    toTarget.setMag(this.speed);
    this.pos.add(toTarget);
  }

  render() {
    if (!this.active) return;

    // Use sprite if available, otherwise draw arrow-like projectile
    if (Game.assets.arrowProjectile) {
      push();
      imageMode(CENTER);
      image(Game.assets.arrowProjectile, this.pos.x, this.pos.y, this.radius * 2.5, this.radius * 2.5);
      pop();
    } else {
      // Fallback to arrow-like shape
      push();
      translate(this.pos.x, this.pos.y);
      // Calculate direction to target for rotation
      if (this.targetEnemy) {
        const direction = p5.Vector.sub(this.targetPos, this.pos);
        const angle = atan2(direction.y, direction.x);
        rotate(angle);
      }
      
      // Draw arrow
      fill(255, 200, 0);
      stroke(139, 100, 0);
      strokeWeight(1);
      triangle(-this.radius, -this.radius/2, -this.radius, this.radius/2, this.radius, 0);
      pop();
    }
  }
}

class PiercingProjectile extends OrbProjectile {
  constructor(x, y, targetEnemy, damage, speed = 6, pos=targetEnemy.pos) {
    super(x, y, targetEnemy, damage, speed,pos);
    this.radius = 6;
    this.active = true;
	this.targetPos = pos
  }
  update() {
    if (!this.active || !this.targetEnemy) return;

    if (this.targetEnemy.health <= 0) {
      this.active = false;
      return;
    }


    const toTarget = p5.Vector.sub(this.targetPos, this.pos);
    const distanceToTarget = toTarget.mag();

    if (distanceToTarget <= this.speed + this.radius + 20) {
      this.targetEnemy.health -= this.damage;
      let secondTarget = null;
      for (let enemy of Game.enemies) { //looks through all enemies to see if there is one closeby
        if (enemy === this.targetEnemy) {
          continue;
        }
        if (enemy.health <= 0) {
          continue;
        }
        let d = dist(this.targetEnemy.pos.x, this.targetEnemy.pos.y, enemy.pos.x, enemy.pos.y);
        if (d < 40) {
          secondTarget = enemy;
          break;
        }
      }
      if (secondTarget !== null) { //hits second enemy
        secondTarget.health -= this.damage
      }
      this.active = false;
      return;
    }

    toTarget.setMag(this.speed);
    this.pos.add(toTarget);
  }
}

class SplashOrbProjectile extends OrbProjectile {
  constructor(towerType, x, y, targetEnemy, damage, upgradeType, speed = 5, splashRadius = 60,pos=targetEnemy.pos) {
    super(x, y, targetEnemy, damage, speed,pos);
    this.splashRadius = splashRadius;
    this.radius = 7;
	this.upgradeType = upgradeType;
	this.towerType = towerType;
  }

  update() {
    if (!this.active || !this.targetEnemy) return;

    if (this.targetEnemy.health <= 0) {
      this.active = false;
      return;
    }

    const toTarget = p5.Vector.sub(this.targetPos, this.pos);
    const distanceToTarget = toTarget.mag();

    if (distanceToTarget <= this.speed + this.radius + 20) {
      this.dealSplashDamage(this.targetPos);
      this.active = false;
      return;
    }

    toTarget.setMag(this.speed);
    this.pos.add(toTarget);
  }

  dealSplashDamage(centerPos) {
    for (let enemy of Game.enemies) {
      if (enemy.health <= 0) continue;
      if (dist(centerPos.x, centerPos.y, enemy.pos.x, enemy.pos.y) <= this.splashRadius) {
        enemy.health -= this.damage;

		if(this.towerType == 'Wizard Tower'){
			if(this.upgradeType == 2){
				if(!enemy.slowed){
					enemy.speed /= 2;
					enemy.slowed = true;
				}
			}
		}
		else if(this.towerType == 'Stoic Knight'){
			if(this.upgradeType == 1){
				if(!enemy.slowed){
					enemy.slowedDownTimer = 10;
					enemy.speed =-1;
					enemy.slowed = true;
				}
			}
		}
      }
    }
  }

  render() {
    if (!this.active) return;

    // Use sprite if available, otherwise draw explosion-like projectile
    if (Game.assets.explosionProjectile) {
      push();
      imageMode(CENTER);
      image(Game.assets.explosionProjectile, this.pos.x, this.pos.y, this.radius * 3, this.radius * 3);
      pop();
	  if(!Game.assets.wizardhit.isPlaying()){
		playSFX(Game.assets.wizardhit); //works but i need overlap
	  }
    } else {
      // Fallback to fireball-like shape with glow effect
      push();
      // Glow effect
      noStroke();
      fill(255, 100, 0, 50);
      circle(this.pos.x, this.pos.y, this.radius * 4);
      fill(255, 150, 0, 100);
      circle(this.pos.x, this.pos.y, this.radius * 2.5);
      
      // Main fireball
      fill(255, 200, 0);
      stroke(139, 60, 0);
      strokeWeight(1.5);
      circle(this.pos.x, this.pos.y, this.radius * 2);
      pop();
    }
  }
}
