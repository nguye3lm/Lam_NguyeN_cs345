let gameStart = false;
let gameInitialized = false;
let bg;
function preload() {
  Game.assets.castle = loadImage('assets/Castle.png');
  Game.assets.logo = loadImage('assets/high-resolution-color-logo.png');
  Game.assets.archerTower = loadImage('assets/archerIcon.png');
  Game.assets.knightTower = loadImage('assets/knightIcon.png');
  Game.assets.wizardTower = loadImage('assets/wizardIcon.png');
  Game.assets.archerSprite = loadImage('assets/archer_big.png');
  Game.assets.knightSprite = loadImage('assets/knight_big.png');
  Game.assets.wizardSprite = loadImage('assets/wizard_big.png');
  Game.assets.gruntGoblinSprite = loadImage('assets/gruntGoblin-export.png');
  Game.assets.bruteGoblinSprite = loadImage('assets/brute_big.png');
  Game.assets.berserkerGoblinSprite = loadImage('assets/bezerker_big.png');
  // Projectile sprites
  Game.assets.arrowProjectile = loadImage('assets/arrow_big.png');
  Game.assets.explosionProjectile = loadImage('assets/coin_big.png');
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
  Game.assets.settingsButton = loadImage('assets/settings_button.png');
  Game.assets.settingsButtonHover = loadImage('assets/settings_button_hover.png');
  Game.assets.speedUpButton = loadImage('assets/speed_up_button.png');
  Game.assets.speedUpButtonHover = loadImage('assets/speed_up_button_hover.png');
  Game.assets.speedUpButtonInactive = loadImage('assets/speed_up_button_inactive.png');
  Game.assets.speedDownButton = loadImage('assets/speed_down_button.png');
  Game.assets.speedDownButtonHover = loadImage('assets/speed_down_button_hover.png');
  Game.assets.startButton = loadImage('assets/start_main_menu.png');
  Game.assets.startButtonHover = loadImage('assets/start_main_menu_hover.png');
  Game.assets.menuSettingsButton = loadImage('assets/settings_main_menu.png');
  Game.assets.menuSettingsButtonHover = loadImage('assets/settings_main_menu_hover.png');
  Game.assets.music                   = loadSound('assets/music.mp3');
  Game.assets.enemyHit = loadSound('assets/swordsound.mp3');
  Game.assets.startMenu = loadImage('assets/Start menu2.jpg');
  Game.assets.healthbarOuter = loadImage('assets/healthbar_outer.png');
  Game.assets.healthbarInner = loadImage('assets/healthbar_inner.png');
   Game.assets.coinIcon   = loadImage('assets/coin.png');
  Game.assets.swordIcon  = loadImage('assets/swordIcon.png');
  Game.assets.shieldIcon = loadImage('assets/sheildIcon.png');
  Game.assets.heartIcon  = loadImage('assets/heartIcon.png');
  Game.assets.wall      = loadImage('assets/UIWall.png');
  Game.assets.finalBoss = loadImage('assets/goblinOverlord_big.png');
  Game.assets.snowflake = loadImage('assets/snowflake.jpg');
  Game.assets.staff = loadImage('assets/staff.webp');
  Game.assets.arrow = loadImage('assets/arrow.avif');
  Game.assets.range = loadImage('assets/range.avif');
  Game.assets.sword = loadImage('assets/swordIcon_big.png');
  Game.assets.speed = loadImage('assets/speed.jpg');
}

function setup() {
  createCanvas(1535, 825);
  userStartAudio();  // unlock audio for browser autoplay policy
  applyMusicVolume();     // apply Game.volume (0.5) immediately at startup
  Game.input = createInput("");
  Game.input.position(390, 20)
  Game.input.size(60)
  Game.input.hide()
  Game.input.input(()=>{
  checkInput(Game.input.value());
  })

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
    renderStartButton();
    renderSettingButton();
    drawSettingsMenu();
    return;
  }

  if (gameStart == true) {
	Game.input.show();
    if (!gameInitialized) {
	  if(!Game.reset){
		Game.assets.music.play();
	  }
      createPath(Game.path);
      Game.level = new Levels(Game.path);
      setupRoundButtons();
      gameInitialized = true;
    }

    renderSidebar();
    syncRoundButtons();
    renderPath(Game.path);
    updateRoundState();
    updateAndRenderEnemies();
    renderTowerUpgrade();
    renderSelectedTowerPanel();
    updateAndRenderTowers();

    renderHud();
    renderRoundControls();
    renderTowerButtons();

    renderDraggingTowerPreview();
    renderCastle();
    drawSettingsMenu();
    renderSettingIconButton()
	renderSpeedUpButton()

    if (Game.castleHealth <= 0) {
      gameLost = true;
	  Game.startGold+=5;
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
	  Game.startGold-=5;
    }
  }
}

function checkInput(value){
	if(value == 'gold'){
		Game.gold = 9999;
	}
	else if(value == 'level'){
		Game.level.currentLevel = 20;
	}
	else if(value == 'health'){
		Game.castleHealth = 9999
	}
}
