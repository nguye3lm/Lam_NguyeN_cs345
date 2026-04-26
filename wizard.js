class WizardTower extends Tower {
  constructor(x, y, attackRange = 120, cooldown = 55, damage = 1, splashRadius = 60) {
    super(x, y, attackRange, cooldown, damage, 'Wizard Tower', {
      rangeStyle: {
        fill: [120, 180, 255, 40],
        stroke: [120, 180, 255, 120],
        weight: 1,
      },
      sprite: {
        assetKey: 'wizardSprite',
        frameWidth: 128,
        frameHeight: 128,
        frameCols: 2,
        frameRows: 4,
        animationRate: 12,
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
    this.splashRadius = splashRadius;
	this.spedUp = Game.spedUp;
	console.log(this.spedUp)
  }

  attack(enemy) {
	let speed = this.spedUp ? 10 : 5;
    this.projectiles.push(new SplashOrbProjectile(this.x, this.y, enemy, this.damage, speed, this.splashRadius));
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
