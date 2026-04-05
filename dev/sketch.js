function preload() {
  Game.assets.castle = loadImage('assets/Castle.png');
  Game.assets.logo = loadImage('assets/Castle rush placeholder logo.png');
  Game.assets.tower1 = loadImage('assets/Castle Rush tower 1 placeholder.png');
  Game.assets.trash = loadImage('assets/trash-export.png');
}

function setup() {
  createCanvas(1535, 825);
  createPath(Game.path);
  Game.level = new Levels(Game.path);
  setupRoundButtons();
}

function draw() {
  background(220);

  syncRoundButtons();
  renderPath(Game.path);
  updateRoundState();
  updateAndRenderEnemies();
  updateAndRenderTowers();

  renderHud();
  renderSidebar();
  renderRoundControls();
  renderTowerButtons();
  renderSelectedTowerPanel();
  renderDraggingTowerPreview();
  renderCastle();
}