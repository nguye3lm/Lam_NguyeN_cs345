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
      this.active = false;
      return;
    }

    toTarget.setMag(this.speed);
    this.pos.add(toTarget);
  }

  render() {
    if (!this.active) return;

    stroke(0);
    strokeWeight(2);
    fill(255, 255, 120);
    circle(this.pos.x, this.pos.y, this.radius * 2);
  }
}

class SplashOrbProjectile extends OrbProjectile {
  constructor(x, y, targetEnemy, damage, speed = 5, splashRadius = 60,pos=targetEnemy.pos) {
    super(x, y, targetEnemy, damage, speed,pos);
    this.splashRadius = splashRadius;
    this.radius = 7;
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
      }
    }
  }

  render() {
    if (!this.active) return;

    stroke(0);
    strokeWeight(2);
    fill(130, 180, 255);
    circle(this.pos.x, this.pos.y, this.radius * 2);
  }
}
