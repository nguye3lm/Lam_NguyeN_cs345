function menuDraw() {
    image(Game.assets.startMenu, 0, 0, width, height);
    image(Game.assets.logo, 150, 120, 400, 300);
}

function startButton() {
    image(Game.assets.startbutton, 200, 350, 300, 125);

  if (mouseX >= 200 && mouseX <= 500 &&
      mouseY >= 350 && mouseY <= 475) {

    if (mouseIsPressed && !settingsOpen) {
      gameStart = true;
    }

  }
}

function settingButton() {
  image(Game.assets.settingbutton, 200, 490, 300, 125);
}