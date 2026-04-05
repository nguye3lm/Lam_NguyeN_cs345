let gameStart = false;
let gameInitialized = false;

function preload() {
  Game.assets.castle = loadImage('assets/Castle.png');
  Game.assets.logo = loadImage('assets/Castle rush placeholder logo.png');
  Game.assets.tower1 = loadImage('assets/Castle Rush tower 1 placeholder.png');
  Game.assets.trash = loadImage('assets/trash-export.png');
  Game.assets.startbutton = loadImage('assets/CastleRush Start Placeholder.png');
}

function setup() {
  createCanvas(1535, 825);
  // if (gameStart == true) {
  //   createPath(Game.path);
  //   Game.level = new Levels(Game.path);
  //   setupRoundButtons();
  // }
    
}

function draw() {
  if (gameStart == false) {
    menuDraw();
    startButton();
  }
  
  if (gameStart == true) {
    
    if (!gameInitialized) {
      createPath(Game.path);
      Game.level = new Levels(Game.path);
      setupRoundButtons();
      gameInitialized = true;
    }

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
}