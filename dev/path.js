function createPath(path) {
  path.length = 0;
  path.push(createVector(-10, 100));
  path.push(createVector(300, 100));
  path.push(createVector(300, 600));
  path.push(createVector(700, 600));
  path.push(createVector(900, 350));
  path.push(createVector(1050, 350));
  path.push(createVector(1050, 700));
  path.push(createVector(1250, 700));
}

function renderPath(path) {
  noFill();
  stroke('#4e4848');
  strokeWeight(20);
  beginShape();
  for (let p of path) {
    vertex(p.x, p.y);
  }
  endShape();
  strokeWeight(1);
}

function isOnPath(x, y, path) {
  const PATH_WIDTH = 20;

  for (let i = 0; i < path.length - 1; i++) {
    let a = path[i];
    let b = path[i + 1];

    let ab = p5.Vector.sub(b, a);
    let ap = createVector(x - a.x, y - a.y);
    let t = constrain(ap.dot(ab) / ab.magSq(), 0, 1);

    let closest = p5.Vector.add(a, p5.Vector.mult(ab, t));

    let d = dist(x, y, closest.x, closest.y);
    if (d < PATH_WIDTH) return true;
  }

  return false;
}
