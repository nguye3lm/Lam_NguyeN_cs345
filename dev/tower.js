class Tower {
  constructor(x, y, attackRange = 100, cooldown = 30, damage = 1, towerName = null) {
    this.x = x;
    this.y = y;
    this.pos = createVector(x, y);

    this.attackRange = attackRange;
    this.cooldown = cooldown;
    this.maxCooldown = cooldown;
    this.damage = damage;
    this.currentCooldown = 0;
    this.towerName = towerName;

    this.targetEnemy = null;
    this.projectiles = [];
  }

  findTarget(enemies) {
    this.targetEnemy = null;
    if (!enemies || enemies.length === 0) return;

    for (let enemy of enemies) {
      let distToEnemyPos = dist(this.x, this.y, enemy.pos.x, enemy.pos.y);
      if (distToEnemyPos <= this.attackRange) {
        this.targetEnemy = enemy;
        return;
      }
    }
  }

  update(enemies) {
    if (this.currentCooldown > 0) {
      this.currentCooldown--;
    }

    this.findTarget(enemies);

    if (this.targetEnemy && this.currentCooldown <= 0) {
      this.attack(this.targetEnemy);
      this.currentCooldown = this.maxCooldown;
    }

    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const projectile = this.projectiles[i];
      projectile.update();
      if (!projectile.active) {
        this.projectiles.splice(i, 1);
      }
    }
  }

  attack(enemy) {
    this.projectiles.push(new OrbProjectile(this.x, this.y, enemy, this.damage));
  }

  render() {
    fill(100, 200, 100, 50);
    stroke(100, 200, 100, 100);
    strokeWeight(1);
    circle(this.x, this.y, this.attackRange * 2);

    fill(100, 100, 200);
    stroke(0);
    strokeWeight(2);
    circle(this.x, this.y, 20);

    for (let projectile of this.projectiles) {
      projectile.render();
    }
  }
}
