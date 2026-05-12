class ArcherTower extends Tower {
  constructor(x, y, attackRange = 100, cooldown = 40, damage = 1) {
    super(x, y, attackRange, cooldown, damage, 'Archer Tower', {
      rangeStyle: {
        fill: [120, 180, 255, 40],
        stroke: [120, 180, 255, 120],
        weight: 1,
      },
      sprite: {
        assetKey: 'archerSprite',
        frameWidth: 128,
        frameHeight: 128,
        frameCols: 4,
        frameRows: 4,
        animationRate: 16,
        directional: true,
        rowByDirection: {
          down: 0,
          left: 1,
          right: 2,
          up: 3,
        },
        defaultRow: 0,
        drawWidth: 52,
        drawHeight: 52,
      },
    });
  }
  
  attack(enemy) {
    let speed = this.spedUp ? 10 : 5;
    if (this.upgradeType === 2) { 
      this.projectiles.push(new PiercingProjectile(this.x, this.y, enemy, this.damage, speed))
    } else {
      this.projectiles.push(new OrbProjectile(this.x, this.y, enemy, this.damage, speed))
    }
  }
  speedUp() {
    this.maxCooldown /= 6;
    this.spedUp = true;
  }

  slowDown() {
    this.spedUp = false;
    this.maxCooldown *= 6;
  }
}