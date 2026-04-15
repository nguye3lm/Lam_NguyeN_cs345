class StoicKnight extends Tower {
  constructor(x, y, attackRange = 50, cooldown = 55, damage = 1, splashRadius = 60) {
    super(x, y, attackRange, cooldown, damage, 'StoicKnight');
    this.splashRadius = splashRadius;
  }

  attack(enemy) {
	this.projectiles.push(new SplashOrbProjectile(this.x, this.y, enemy, this.damage, 5, this.splashRadius,this.pos));
  }

  render() {
    fill(120, 180, 255, 40);
    stroke(120, 180, 255, 120);
    strokeWeight(1);
    circle(this.x, this.y, this.attackRange * 2);

    fill(80, 120, 220);
    stroke(0);
    strokeWeight(2);
    circle(this.x, this.y, 20);

    fill(235, 245, 255);
    noStroke();
    circle(this.x, this.y, 8);

    for (let projectile of this.projectiles) {
      projectile.render();
    }
  }
}