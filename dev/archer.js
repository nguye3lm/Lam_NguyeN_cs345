class ArcherTower extends Tower {
  constructor(x, y, attackRange = 100, cooldown = 30, damage = 1) {
    super(x, y, attackRange, cooldown, damage, 'Archer Tower');
  }
}