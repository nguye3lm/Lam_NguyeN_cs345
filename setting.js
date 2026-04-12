let settingsOpen = false;

// Close button: centered horizontally, 30px gap from popup bottom
const CLOSE_BTN = { x: 680, y: 520, w: 165, h: 40 };

function drawSettingsMenu() {
  if (!settingsOpen) 
    return;
  
  // Popup rect
  fill(255);
  stroke(0);
  strokeWeight(3);
  rect(517.5, 237.5, 500, 350, 12);

  // Title "Setting"
  noStroke();
  fill(0);
  textAlign(CENTER, TOP);
  textSize(40);
  textStyle(BOLD);
  text('Settings', 767, 257);

  // Close Button 
  fill(255);
  stroke(0);
  strokeWeight(2);
  rect(CLOSE_BTN.x, CLOSE_BTN.y, CLOSE_BTN.w, CLOSE_BTN.h, 8);

  // The word "Close"
  noStroke();
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(18);
  textStyle(BOLD);
  text('Close', CLOSE_BTN.x + CLOSE_BTN.w / 2, CLOSE_BTN.y + CLOSE_BTN.h / 2);

  // Reset all state back to game defaults
  textAlign(LEFT, BASELINE);
  textStyle(NORMAL);
  textSize(12);
  fill(255);
  stroke(0);
  strokeWeight(1);
}

function handleSettingsClick() {
  if (!settingsOpen) return;

  if (mouseX >= CLOSE_BTN.x && mouseX <= CLOSE_BTN.x + CLOSE_BTN.w &&
      mouseY >= CLOSE_BTN.y && mouseY <= CLOSE_BTN.y + CLOSE_BTN.h) {
    settingsOpen = false;
  }
}
