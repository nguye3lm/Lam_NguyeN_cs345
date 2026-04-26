const DEFAULT_DIRECTION_ROWS = {
  down: 0,
  left: 1,
  right: 2,
  up: 3,
};

const DEFAULT_RANGE_STYLE = {
  fill: [100, 200, 100, 50],
  stroke: [100, 200, 100, 100],
  weight: 1,
};

const DEFAULT_BODY_STYLE = {
  outerFill: [100, 100, 200],
  outerStroke: [0],
  outerStrokeWeight: 2,
  outerSize: 20,
  innerFill: null,
  innerSize: 8,
};

class Tower {
  constructor(x, y, attackRange = 100, cooldown = 30, damage = 1, towerName = null, visualConfig = {}) {
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
    this.spedUp = false;

    this.rangeStyle = this.createRangeStyle(visualConfig.rangeStyle);
    this.bodyStyle = this.createBodyStyle(visualConfig.bodyStyle);
    // Sprite data is optional. If a tower does not pass a sprite config,
    // the tower falls back to a simple shape-based body.
    this.sprite = this.createSpriteConfig(visualConfig.sprite);

    this.facingRow = this.sprite ? this.sprite.defaultRow : 0;
		if(Game.spedUp){
		this.speedUp()
	}
  }

  createRangeStyle(overrideStyle = {}) {
    return {
      ...DEFAULT_RANGE_STYLE,
      ...overrideStyle,
    };
  }

  createBodyStyle(overrideStyle = {}) {
    return {
      ...DEFAULT_BODY_STYLE,
      ...overrideStyle,
    };
  }

  createSpriteConfig(spriteConfig = null) {
    if (!spriteConfig) {
      return null;
    }

    // The tower only needs to know how to slice one sprite sheet.
    // The actual image is loaded once in preload and stored in Game.assets.
    const frameWidth = spriteConfig.frameWidth || 32;
    const frameHeight = spriteConfig.frameHeight || 32;

    return {
      assetKey: spriteConfig.assetKey,
      frameWidth,
      frameHeight,
      frameCols: spriteConfig.frameCols || 1,
      frameRows: spriteConfig.frameRows || 1,
      animationRate: spriteConfig.animationRate || 12,
      directional: spriteConfig.directional !== false,
      rowByDirection: {
        ...DEFAULT_DIRECTION_ROWS,
        ...(spriteConfig.rowByDirection || {}),
      },
      defaultRow: spriteConfig.defaultRow ?? 0,
      drawWidth: spriteConfig.drawWidth || frameWidth,
      drawHeight: spriteConfig.drawHeight || frameHeight,
    };
  }

  speedUp() {
    this.maxCooldown /= 4;
    this.spedUp = true;
  }

  slowDown() {
    this.spedUp = false;
    this.maxCooldown *= 4;
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
    let speed = this.spedUp ? 5 : 1;
    this.projectiles.push(new OrbProjectile(this.x, this.y, enemy, this.damage, 6 * speed));
  }

  updateFacingFromTarget() {
    if (!this.sprite || !this.sprite.directional) {
      return;
    }

    // Pick the row that matches the direction of the current target.
    // This makes the tower look like it turns toward enemies.
    if (!this.targetEnemy) {
      this.facingRow = this.sprite.defaultRow;
      return;
    }

    const dx = this.targetEnemy.pos.x - this.x;
    const dy = this.targetEnemy.pos.y - this.y;

    if (abs(dx) > abs(dy)) {
      this.facingRow = dx >= 0 ? this.sprite.rowByDirection.right : this.sprite.rowByDirection.left;
    } else {
      this.facingRow = dy >= 0 ? this.sprite.rowByDirection.down : this.sprite.rowByDirection.up;
    }
  }

  renderRange() {
    fill(...this.rangeStyle.fill);
    stroke(...this.rangeStyle.stroke);
    strokeWeight(this.rangeStyle.weight);
    circle(this.x, this.y, this.attackRange * 2);
  }

  renderDefaultBody() {
    // Fallback body for towers that do not provide a sprite sheet.
    fill(...this.bodyStyle.outerFill);
    stroke(...this.bodyStyle.outerStroke);
    strokeWeight(this.bodyStyle.outerStrokeWeight);
    circle(this.x, this.y, this.bodyStyle.outerSize);

    if (this.bodyStyle.innerFill) {
      fill(...this.bodyStyle.innerFill);
      noStroke();
      circle(this.x, this.y, this.bodyStyle.innerSize);
    }
  }

  renderSprite() {
    if (!this.sprite) {
      return false;
    }

    // Look up the loaded image by key. If the asset is missing, return false
    // so render() can draw the fallback body instead.
    const spriteSheet = Game.assets[this.sprite.assetKey];
    if (!spriteSheet) {
      return false;
    }

    // Use the current target direction and a simple frame counter for animation.
    const frameCol = floor(frameCount / this.sprite.animationRate) % this.sprite.frameCols;
    const srcX = frameCol * this.sprite.frameWidth;
    const srcY = this.facingRow * this.sprite.frameHeight;

    push();
    imageMode(CENTER);
    image(
      spriteSheet,
      this.x,
      this.y,
      this.sprite.drawWidth,
      this.sprite.drawHeight,
      srcX,
      srcY,
      this.sprite.frameWidth,
      this.sprite.frameHeight
    );
    pop();

    return true;
  }

  renderProjectiles() {
    for (let projectile of this.projectiles) {
      projectile.render();
    }
  }

  render() {
    // Render order: update direction, draw range, then sprite/body, then projectiles.
    this.updateFacingFromTarget();
    this.renderRange();

    if (!this.renderSprite()) {
      this.renderDefaultBody();
    }

    this.renderProjectiles();
  }
}
