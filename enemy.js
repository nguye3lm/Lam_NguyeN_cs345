class Enemy {
  constructor(health, damage, speed, path, coolDown, type, slowed=false, slowedDownTimer =60) {
	this.originalSpeed = speed;
    this.path = path;
    this.pos = path[0].copy();
    this.targetPos = 1;
    this.speed = speed;
    this.health = health;
    this.initialHealth = health;
    this.damage = damage;
    this.coolDown = 0;
    this.type = type;
	this.slowedDownTimer =  slowedDownTimer
	this.slowed = slowed;

    // Only the basic enemy uses a sprite sheet for now.
    this.sprite = this.createSpriteConfig(type);
    this.facingRow = this.sprite ? this.sprite.defaultRow : 0;
    this.lastMoveDirection = createVector(0, 1);
  }

  createSpriteConfig(type) {
    if (type == 'basic') {
        return {
      assetKey: 'gruntGoblinSprite',
      frameWidth: 128,
      frameHeight: 128,
      frameCols: 4,
      frameRows: 4,
      animationRate: 10,
      directional: true,
      rowByDirection: {
        down: 0,
        left: 1,
        right: 2,
        up: 3,
      },
      defaultRow: 0,
      drawWidth: 56,
      drawHeight: 56,
    };
    }
	else if (type == 'brute'){
	  return {
      assetKey: 'bruteGoblinSprite',
      frameWidth: 128,
      frameHeight: 128,
      frameCols: 4,
      frameRows: 4,
      animationRate: 10,
      directional: true,
      rowByDirection: {
        down: 0,
        left: 1,
        right: 2,
        up: 3,
      },
      defaultRow: 0,
      drawWidth: 56,
      drawHeight: 56,
    };
	}
	else if (type == 'berserker'){
	  return {
      assetKey: 'berserkerGoblinSprite',
      frameWidth: 128,
      frameHeight: 128,
      frameCols: 4,
      frameRows: 4,
      animationRate: 10,
      directional: true,
      rowByDirection: {
        down: 0,
        left: 1,
        right: 2,
        up: 3,
      },
      defaultRow: 0,
      drawWidth: 56,
      drawHeight: 56,
    };
	}
	else if (type == 'boss'){
	  return {
      assetKey: 'finalBoss',
      frameWidth: 128,
      frameHeight: 128,
      frameCols: 4,
      frameRows: 4,
      animationRate: 10,
      directional: true,
      rowByDirection: {
        down: 0,
        left: 1,
        right: 2,
        up: 3,
      },
      defaultRow: 0,
      drawWidth: 56,
      drawHeight: 56,
    };
	}
	return null;
  }

  speedUp() {
    this.speed = this.speed * 5;
  }

  slowDown() {
	console.log("hello")
    this.speed = this.speed / 5;
  }

  updatePos() {
	if(this.slowed){
		this.slowedDownTimer-=1;
	}
	if (this.slowedDownTimer <= 0){
		this.slowed = false;
		this.slowedDownTimer = 60;
		if(Game.spedUp){
			this.speed = this.originalSpeed*5;
		}
		else{
			this.speed = this.originalSpeed;
		}
		
	}
    if (this.targetPos >= this.path.length) return;

    let target = this.path[this.targetPos];
    let direction = p5.Vector.sub(target, this.pos);
    let dist = direction.mag();

    if (dist <= this.speed) {
      if (dist > 0) {
        this.lastMoveDirection = direction.copy();
      }
      this.pos = target.copy();
      this.targetPos++;

      let leftover = this.speed - dist;
      if (this.targetPos < this.path.length && leftover > 0) {
        let nextDir = p5.Vector.sub(this.path[this.targetPos], this.pos);
        nextDir.setMag(leftover);
        this.pos.add(nextDir);
      }
      return;
    }

    if (dist > 0) {
      this.lastMoveDirection = direction.copy();
    }
    direction.setMag(this.speed);
    this.pos.add(direction);
  }

  updateFacingFromMovement() {
    if (!this.sprite || !this.sprite.directional) {
      return;
    }

    const dx = this.lastMoveDirection.x;
    const dy = this.lastMoveDirection.y;

    if (abs(dx) > abs(dy)) {
      this.facingRow = dx >= 0 ? this.sprite.rowByDirection.right : this.sprite.rowByDirection.left;
    } else {
      this.facingRow = dy >= 0 ? this.sprite.rowByDirection.down : this.sprite.rowByDirection.up;
    }
  }

  renderSprite() {
    if (!this.sprite) {
      return false;
    }

    const spriteSheet = Game.assets[this.sprite.assetKey];
    if (!spriteSheet) {
      return false;
    }

    const frameCol = floor(frameCount / this.sprite.animationRate) % this.sprite.frameCols;
    const srcX = frameCol * this.sprite.frameWidth;
    const srcY = this.facingRow * this.sprite.frameHeight;

    push();
    imageMode(CENTER);
    image(
      spriteSheet,
      this.pos.x,
      this.pos.y,
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

  render() {
    this.updateFacingFromMovement();

    if (this.renderSprite()) {
      this.renderHealthBar();
      return;
    }

    if (this.type == "berserker") {
      fill(255, 213, 0);
      ellipse(this.pos.x, this.pos.y, 40);
    }
    else if (this.type == "brute") {
      fill(43, 200, 100);
      ellipse(this.pos.x, this.pos.y, 40);
    }
    else if (this.type == 'boss') {
      fill(0, 0, 0);
      ellipse(this.pos.x, this.pos.y, 40);
    }
    else if (this.type == 'basic') {

    }

    this.renderHealthBar();
  }

  renderHealthBar() {
    let barWidth = 40;
    let barHeight = 7;
    let barOffset = -30;

    if (Game.assets.healthbarOuter && Game.assets.healthbarInner) {
      image(
        Game.assets.healthbarOuter,
        this.pos.x - barWidth / 2,
        this.pos.y + barOffset,
        barWidth,
        barHeight
      );

      image(
        Game.assets.healthbarInner,
        this.pos.x - barWidth / 2,
        this.pos.y + barOffset,
        barWidth * (this.health / this.initialHealth),
        barHeight
      );
      return;
    }
  }
}
