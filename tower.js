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

const VALID_TARGET_PRIORITIES = ['first', 'last', 'strong'];

class Tower {
  constructor(x, y, attackRange = 100, cooldown = 30, damage = 1, towerName = null, visualConfig = {}, upgradeType = null) {
    this.x = x;
    this.y = y;
    this.pos = createVector(x, y);

    this.attackRange = attackRange;
    this.cooldown = cooldown;
    this.maxCooldown = cooldown;
    this.damage = damage;
    this.currentCooldown = 0;
    this.towerName = towerName;
    this.upgradeType = upgradeType;

    this.targetEnemy = null;
    this.targetPriority = 'first';
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

  setTargetPriority(priority) {
    if (VALID_TARGET_PRIORITIES.includes(priority)) {
      this.targetPriority = priority;
    }
  }

  getEnemyPathProgress(enemy) {
    if (!enemy || !enemy.path || enemy.path.length === 0) {
      return 0;
    }

    if (enemy.targetPos >= enemy.path.length) {
      return enemy.path.length;
    }

    const previousIndex = Math.max(0, enemy.targetPos - 1);
    const previousNode = enemy.path[previousIndex];
    const nextNode = enemy.path[enemy.targetPos];

    if (!previousNode || !nextNode) {
      return enemy.targetPos;
    }

    const segmentLength = dist(previousNode.x, previousNode.y, nextNode.x, nextNode.y);
    if (segmentLength <= 0) {
      return enemy.targetPos;
    }

    const distanceToNext = dist(enemy.pos.x, enemy.pos.y, nextNode.x, nextNode.y);
    const segmentProgress = constrain(1 - (distanceToNext / segmentLength), 0, 1);
    return previousIndex + segmentProgress;
  }

  findTarget(enemies) {
    this.targetEnemy = null;
    if (!enemies || enemies.length === 0) return;

    const inRangeEnemies = [];
    for (let enemy of enemies) {
      if (enemy.health <= 0) continue;
      let distToEnemyPos = dist(this.x, this.y, enemy.pos.x, enemy.pos.y);
      if (distToEnemyPos <= this.attackRange) {
        inRangeEnemies.push(enemy);
      }
    }

    if (inRangeEnemies.length === 0) {
      return;
    }

    this.targetEnemy = inRangeEnemies[0];

    for (let i = 1; i < inRangeEnemies.length; i++) {
      const candidate = inRangeEnemies[i];
      const best = this.targetEnemy;

      if (this.targetPriority === 'last') {
        const candidateProgress = this.getEnemyPathProgress(candidate);
        const bestProgress = this.getEnemyPathProgress(best);

        if (candidateProgress < bestProgress || (candidateProgress === bestProgress && candidate.health > best.health)) {
          this.targetEnemy = candidate;
        }
      } else if (this.targetPriority === 'strong') {
        if (candidate.health > best.health) {
          this.targetEnemy = candidate;
        } else if (candidate.health === best.health) {
          const candidateProgress = this.getEnemyPathProgress(candidate);
          const bestProgress = this.getEnemyPathProgress(best);
          if (candidateProgress > bestProgress) {
            this.targetEnemy = candidate;
          }
        }
      } else {
        const candidateProgress = this.getEnemyPathProgress(candidate);
        const bestProgress = this.getEnemyPathProgress(best);

        if (candidateProgress > bestProgress || (candidateProgress === bestProgress && candidate.health > best.health)) {
          this.targetEnemy = candidate;
        }
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

    const isAttacking = this.targetEnemy !== null;
    const animationFrame = floor(frameCount / this.sprite.animationRate);
    const frameCol = isAttacking ? animationFrame % this.sprite.frameCols : 0;
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
    
    if (Game.selectedTower === this) {
      this.renderRange();
    }
    if (!this.renderSprite()) {
      this.renderDefaultBody();
    }

    this.renderProjectiles();
  }
}
