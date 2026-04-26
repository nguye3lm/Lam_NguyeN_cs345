class Enemy {
  constructor(health, damage, speed, path, coolDown) {
    this.path = path;
    this.pos = path[0].copy();
    this.targetPos = 1;
    this.speed = speed;
    this.health = health;
    this.damage = damage;
	this.coolDown = 0;
  }

  speedUp() {
    this.speed = this.speed * 5;
  }

  slowDown() {
    this.speed = this.speed / 5;
  }

 updatePos() {
  if (this.targetPos >= this.path.length) return;

  let target = this.path[this.targetPos];
  let direction = p5.Vector.sub(target, this.pos);
  let dist = direction.mag();

  if (dist <= this.speed) {
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

  direction.setMag(this.speed);
  this.pos.add(direction);
}

  render() {
    fill(255, 0, 0);
    ellipse(this.pos.x, this.pos.y, 40);

    let squareSize = 7;
    let gap = 2;
    let totalWidth = 4 * squareSize + 3 * gap;
    let healthX = this.pos.x - totalWidth / 2;
    let healthY = this.pos.y - 30;

    for (let i = 0; i < 4; i++) {
      let x = healthX + i * (squareSize + gap);
      if (i < this.health) {
        fill(0, 255, 0);
      } else {
        fill(80);
      }
      stroke(0);
      strokeWeight(1);
      rect(x, healthY, squareSize, squareSize);
    }
  }
}
