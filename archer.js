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
}