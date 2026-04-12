function menuDraw() {
    background(220);
    image(Game.assets.logo, 600, 150, 350, 150);
}

function startButton() {
    image(Game.assets.startbutton, 617.5, 350, 300, 125);

    if (mouseX >= 617 && mouseX <= 917 &&
        mouseY >= 350 && mouseY <= 475) {

        if (mouseIsPressed && !settingsOpen) {
            gameStart = true;
        }
    }
}

function settingButton() {
    image(Game.assets.settingbutton, 617.5, 490, 300, 125);
}
