let gameStart = false;
let gameInitialized = false;
let bg;
function preload() {
  Game.assets.castle = loadImage('assets/Castle.png');
  Game.assets.logo = loadImage('assets/high-resolution-color-logo.png');
  Game.assets.archerTower = loadImage('assets/Castle Rush tower 1 placeholder.png');
  Game.assets.knightTower = loadImage('assets/knightIcon.png');
  Game.assets.wizardTower = loadImage('assets/wizardIcon.png');
  Game.assets.wizardSprite = loadImage('assets/wizard_big.png');
  Game.assets.trash = loadImage('assets/trashIcon.png');
  Game.assets.startbutton = loadImage('assets/CastleRush Start Placeholder.png');
  Game.assets.settingbutton = loadImage('assets/CastleRush Settings Placeholder.png');
  Game.assets.settingIcon   = loadImage('assets/Setting_Icon.png');
  Game.assets.twoxicon   = loadImage('assets/2x.png');
  Game.assets.volumeIcon    = loadImage('assets/Volume.png');
  Game.assets.muteIcon      = loadImage('assets/Muted.png');
  Game.assets.wizardhit     = loadSound('assets/explosion.mp3');
  Game.assets.archerhit     = loadSound('assets/archer.mp3');
  Game.assets.background = loadImage('assets/test.png');
  Game.assets.wall      = loadImage('assets/UIWall.png');
  Game.assets.startRoundButton = loadImage('assets/start_round_big.png');
  Game.assets.startRoundButtonHover = loadImage('assets/start_round_hover_big.png');
  Game.assets.roundActiveButton = loadImage('assets/round_active_big.png');
  Game.assets.switchAutoButton = loadImage('assets/switch_auto_big.png');
  Game.assets.switchAutoButtonHover = loadImage('assets/switch_auto_hover_big.png');
  Game.assets.switchManualButton = loadImage('assets/switch_manual_big.png');
  Game.assets.switchManualButtonHover = loadImage('assets/switch_manual_hover_big.png');
  Game.assets.music                   = loadSound('assets/music.mp3');
  Game.assets.enemyHit = loadSound('assets/swordsound.mp3');
}

function setup() {
  createCanvas(1535, 825);
  userStartAudio();  // unlock audio for browser autoplay policy
  applyMusicVolume();     // apply Game.volume (0.5) immediately at startup
}

function draw() {
	background(Game.assets.background)
  if (gameLost) {
    drawLoseScreen();
    return;
  }

  if (gameWon) {
    drawWinScreen();
    return;
  }

  if (gameStart == false) {
    menuDraw();
    startButton();
    settingButton();
    drawSettingsMenu();
    return;
  }

  if (gameStart == true) {

    if (!gameInitialized) {
      Game.assets.music.play();
      createPath(Game.path);
      Game.level = new Levels(Game.path);
      setupRoundButtons();
      gameInitialized = true;
    }


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
    drawSettingsMenu();
    renderSettingIconButton()
	renderSpeedUpButton()

    if (Game.castleHealth <= 0) {
      gameLost = true;
	  if(Game.spedUp){
		for(let enemy of Game.level.waveEnemies){
			enemy.slowDown()
		}
		for(let tower of Game.towers){
			tower.slowDown()
		}
		Game.spedUp = false;
		Game.spawnDelayMultiplier = 1
	  }
    }

    if (!Game.level.levelActive && Game.level.currentLevel > 20 && Game.enemies.length === 0) {
      gameWon = true;
    }
  }
}
