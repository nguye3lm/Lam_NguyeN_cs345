function menuDraw() {
  image(Game.assets.startMenu, 0, 0, width, height);
  image(Game.assets.logo, 150, 120, 400, 300);
}

function startButton() {
  const start = Game.ui.menuStartButton;

  if (mouseX >= start.x && mouseX <= start.x + start.w &&
    mouseY >= start.y && mouseY <= start.y + start.h) {

    if (mouseIsPressed && !settingsOpen) {
      gameStart = true;
    }
  }
}

function renderStartButton() {
  const start = Game.ui.menuStartButton;

  if (isInsideButton(mouseX, mouseY, start)) {
    image(Game.assets.startButtonHover, start.x, start.y, start.w, start.h);
  } else {
    image(Game.assets.startButton, start.x, start.y, start.w, start.h);
  }
}

function settingButton() {
  const s = Game.ui.menuSettingsButton;
  image(Game.assets.menuSettingsButton, s.x, s.y, s.w, s.h);
}

function renderSettingButton() {
  const s = Game.ui.menuSettingsButton;

  if (isInsideButton(mouseX, mouseY, s)) {
    image(Game.assets.menuSettingsButtonHover, s.x, s.y, s.w, s.h);
  } else {
    image(Game.assets.menuSettingsButton, s.x, s.y, s.w, s.h);
  }
}
