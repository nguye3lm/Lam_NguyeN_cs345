class StoicKnight extends Tower {
  constructor(x, y, attackRange = 50, cooldown = 55, damage = 1, splashRadius = 60) {
    super(x, y, attackRange, cooldown, damage, 'Stoic Knight', {
      rangeStyle: {
        fill: [120, 180, 255, 40],
        stroke: [120, 180, 255, 120],
        weight: 1,
      },
      bodyStyle: {
        outerFill: [80, 120, 220],
        outerStroke: [0],
        outerStrokeWeight: 2,
        outerSize: 20,
        innerFill: [235, 245, 255],
        innerSize: 8,
      },
      sprite: {
        assetKey: 'knightSprite',
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
        drawWidth: 54,
        drawHeight: 54,
      },
    });
    this.splashRadius = splashRadius;
  }

  attack(enemy) {
	  this.projectiles.push(new SplashOrbProjectile('Stoic Knight',this.x, this.y, enemy, this.damage, this.upgradeType, 5, this.splashRadius,this.pos));
	if(!Game.assets.enemyHit.isPlaying()){
		playSFX(Game.assets.enemyHit);
	}
  }
}