function updateRoundState() {
  if (settingsOpen) {
    return;
  }
  
  if (!Game.level.levelActive && (Game.startLevel || Game.autoStartLevel)) {
    Game.level.startWave();
    Game.startLevel = false;
  }

  if (Game.level.levelActive) {
    Game.level.update(Game.enemies);
  }
}
