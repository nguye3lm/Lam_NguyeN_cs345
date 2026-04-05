class OrbProjectile {
  constructor(x, y, targetEnemy, damage, speed = 6) {
    this.pos = createVector(x, y);
    this.targetEnemy = targetEnemy;
    this.damage = damage;
    this.speed = speed;
    this.radius = 6;
    this.active = true;
  }

  update() {
    if (!this.active || !this.targetEnemy) return;

    if (this.targetEnemy.health <= 0) {
      this.active = false;
      return;
    }

    const targetPos = this.targetEnemy.pos;
    const toTarget = p5.Vector.sub(targetPos, this.pos);
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
