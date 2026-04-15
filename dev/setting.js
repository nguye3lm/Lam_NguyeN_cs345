let settingsOpen = false;
let isDraggingVolume = false;

// Popup bounds
const POPUP = { x: 517.5, y: 237.5, w: 500, h: 350 };

// Close button: centered, near popup bottom
const CLOSE_BTN = { x: 680, y: 520, w: 165, h: 40 };

// Volume slider track
const SLIDER = { x: 615, y: 430, w: 360 };

// Mute icon button
const MUTE_BTN = { x: 552, y: 414, w: 40, h: 40 };

function drawSettingsMenu() {
  if (!settingsOpen) return;

  // Popup rect
  fill(255);
  stroke(0);
  strokeWeight(3);
  rect(POPUP.x, POPUP.y, POPUP.w, POPUP.h, 12);

  // Title
  noStroke();
  fill(0);
  textAlign(CENTER, TOP);
  textSize(36);
  textStyle(BOLD);
  text('Settings', 767, 257);

  // Volume label
  textSize(18);
  textAlign(LEFT, BASELINE);
  fill(0);
  text('Volume', MUTE_BTN.x, MUTE_BTN.y - 8);

  // Mute icon button background
  fill(240);
  stroke(0);
  strokeWeight(1.5);
  rect(MUTE_BTN.x, MUTE_BTN.y, MUTE_BTN.w, MUTE_BTN.h, 6);

  // Volume or mute icon
  if (Game.assets.volumeIcon && Game.assets.muteIcon) {
    if (Game.isMuted) {
      image(Game.assets.muteIcon, MUTE_BTN.x + 2, MUTE_BTN.y + 2, 36, 36);
    } else {
      image(Game.assets.volumeIcon, MUTE_BTN.x + 2, MUTE_BTN.y + 2, 36, 36);
    }
  } else {
    noStroke();
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(14);
    text(Game.isMuted ? 'MUTE' : 'VOL', MUTE_BTN.x + MUTE_BTN.w / 2, MUTE_BTN.y + MUTE_BTN.h / 2);
  }

  // Slider track
  const vol = Game.isMuted ? 0 : Game.volume;
  const handleX = SLIDER.x + vol * SLIDER.w;
  const trackY  = SLIDER.y;

  // Grey right portion
  stroke(180);
  strokeWeight(6);
  line(handleX, trackY, SLIDER.x + SLIDER.w, trackY);

  // Blue left portion
  stroke(30, 120, 255);
  strokeWeight(6);
  line(SLIDER.x, trackY, handleX, trackY);

  // Knob: solid black circle
  noStroke();
  fill(0);
  circle(handleX, trackY, 22);

  // Percentage label
  noStroke();
  fill(80);
  textSize(14);
  textAlign(CENTER, TOP);
  text(Game.isMuted ? 'Muted' : int(Game.volume * 100) + '%', 767, SLIDER.y + 22);

  // Close Button
  fill(255);
  stroke(0);
  strokeWeight(2);
  rect(CLOSE_BTN.x, CLOSE_BTN.y, CLOSE_BTN.w, CLOSE_BTN.h, 8);
  noStroke();
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(18);
  textStyle(BOLD);
  text('Close', CLOSE_BTN.x + CLOSE_BTN.w / 2, CLOSE_BTN.y + CLOSE_BTN.h / 2);

  // Reset p5 state
  textAlign(LEFT, BASELINE);
  textStyle(NORMAL);
  textSize(12);
  fill(255);
  stroke(0);
  strokeWeight(1);
}

function handleSettingsClick() {
  if (!settingsOpen) return;

  // Close button
  if (mouseX >= CLOSE_BTN.x && mouseX <= CLOSE_BTN.x + CLOSE_BTN.w &&
      mouseY >= CLOSE_BTN.y && mouseY <= CLOSE_BTN.y + CLOSE_BTN.h) {
    settingsOpen = false;
    return;
  }

  // Mute toggle
  if (mouseX >= MUTE_BTN.x && mouseX <= MUTE_BTN.x + MUTE_BTN.w &&
      mouseY >= MUTE_BTN.y && mouseY <= MUTE_BTN.y + MUTE_BTN.h) {
    Game.isMuted = !Game.isMuted;
    applyVolume();
    return;
  }

  // Slider click
  if (mouseY >= SLIDER.y - 20 && mouseY <= SLIDER.y + 20 &&
      mouseX >= SLIDER.x - 16 && mouseX <= SLIDER.x + SLIDER.w + 16) {
    isDraggingVolume = true;
    updateVolumeFromMouse();
  }
}

function handleSettingsDrag() {
  if (!settingsOpen || !isDraggingVolume) return;
  updateVolumeFromMouse();
}

function handleSettingsRelease() {
  isDraggingVolume = false;
}

function updateVolumeFromMouse() {
  let ratio = (mouseX - SLIDER.x) / SLIDER.w;
  ratio = constrain(ratio, 0, 1);
  Game.volume = ratio;
  Game.isMuted = false;
  applyVolume();
}

function applyVolume() {
  if (typeof masterVolume === 'function') {
    masterVolume(Game.isMuted ? 0 : Game.volume);
  }
}
