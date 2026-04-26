function createPath(path) {
  path.length = 0;
  path.push(createVector(-10, 250));
  path.push(createVector(150, 250));

  path.push(createVector(160, 250));
  path.push(createVector(175, 251));
  path.push(createVector(188, 254));
  path.push(createVector(198, 262));
  path.push(createVector(204, 273));
  path.push(createVector(207, 287));
  path.push(createVector(208, 300));


  path.push(createVector(208, 550));

  path.push(createVector(208, 563));
  path.push(createVector(209, 578));
  path.push(createVector(212, 591));
  path.push(createVector(219, 602));
  path.push(createVector(229, 610));
  path.push(createVector(242, 615));
  path.push(createVector(258, 616));


  path.push(createVector(300, 616));

  path.push(createVector(313, 616));
  path.push(createVector(328, 615));
  path.push(createVector(341, 612));
  path.push(createVector(352, 605));
  path.push(createVector(359, 594));
  path.push(createVector(363, 580));
  path.push(createVector(364, 566));


  path.push(createVector(364, 400));
  path.push(createVector(364, 387));
  path.push(createVector(365, 372));
  path.push(createVector(368, 359));
  path.push(createVector(375, 348));
  path.push(createVector(385, 341));
  path.push(createVector(398, 337));
  path.push(createVector(414, 336));


  path.push(createVector(500, 336));

  path.push(createVector(513, 336));
  path.push(createVector(528, 335));
  path.push(createVector(541, 332));
  path.push(createVector(552, 325));
  path.push(createVector(559, 314));
  path.push(createVector(563, 300));
  path.push(createVector(564, 286));
  path.push(createVector(564, 200));

  path.push(createVector(564, 187));
  path.push(createVector(565, 172));
  path.push(createVector(568, 159));
  path.push(createVector(575, 148));
  path.push(createVector(585, 141));
  path.push(createVector(598, 137));
  path.push(createVector(614, 136));


  path.push(createVector(713, 136));
  path.push(createVector(728, 137));
  path.push(createVector(741, 140));
  path.push(createVector(752, 147));
  path.push(createVector(759, 158));
  path.push(createVector(763, 172));
  path.push(createVector(764, 186));

  path.push(createVector(764, 400));

  path.push(createVector(764, 413));
  path.push(createVector(765, 428));
  path.push(createVector(768, 441));
  path.push(createVector(775, 452));
  path.push(createVector(785, 459));
  path.push(createVector(798, 463));
  path.push(createVector(814, 464));

  path.push(createVector(1200, 464));
}

function renderPath(path) {
//   noFill();
//   stroke('#4e4848');
//   strokeWeight(20);
//   beginShape();
//   for (let p of path) {
//     vertex(p.x, p.y);
//   }
//   endShape();
//   strokeWeight(1);
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
