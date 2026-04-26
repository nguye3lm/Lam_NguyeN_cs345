let settingsOpen = false;

let isDraggingSFXVolume = false;      
let isDraggingMusicVolume = false;     

const POPUP = { x: 517.5, y: 237.5, w: 500, h: 350 };

const CLOSE_BTN = { x: 680, y: 520, w: 165, h: 40 };

// const SLIDER = { x: 615, y: 430, w: 360 };  
const SFX_SLIDER = { x: 615, y: 390, w: 360 };    
const MUSIC_SLIDER = { x: 615, y: 450, w: 360 };  

const MUTE_BTN = { x: 552, y: 379, w: 40, h: 40 };

function drawSettingsMenu() {
  if (!settingsOpen) return;

  fill(255);
  stroke(0);
  strokeWeight(3);
  rect(POPUP.x, POPUP.y, POPUP.w, POPUP.h, 12);

  noStroke();
  fill(0);
  textAlign(CENTER, TOP);
  textSize(36);
  textStyle(BOLD);
  text('Settings', 767, 257);

  textStyle(NORMAL);
  textSize(18);
  textAlign(LEFT, BASELINE);
  fill(0);

  text('Sound Effects', SFX_SLIDER.x, SFX_SLIDER.y - 15);   
  text('Music', MUSIC_SLIDER.x, MUSIC_SLIDER.y - 15);       

  drawSlider(SFX_SLIDER, Game.isMuted ? 0 : Game.sfxVolume);     
  drawSlider(MUSIC_SLIDER, Game.isMuted ? 0 : Game.musicVolume); 

  noStroke();
  fill(80);
  textSize(14);
  textAlign(CENTER, TOP);

  text(Game.isMuted ? 'Muted' : int(Game.sfxVolume * 100) + '%', 767, SFX_SLIDER.y + 22);  
  text(Game.isMuted ? 'Muted' : int(Game.musicVolume * 100) + '%', 767, MUSIC_SLIDER.y + 22); 

  fill(240);
  stroke(0);
  strokeWeight(1.5);
  rect(MUTE_BTN.x, MUTE_BTN.y, MUTE_BTN.w, MUTE_BTN.h, 6);

  if (Game.assets.volumeIcon && Game.assets.muteIcon) {
    image(
      Game.isMuted ? Game.assets.muteIcon : Game.assets.volumeIcon,
      MUTE_BTN.x + 2,
      MUTE_BTN.y + 2,
      36,
      36
    );
  }

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

  // Reset text state so nothing outside this menu is affected
  textAlign(LEFT, BASELINE);
  textStyle(NORMAL);
}


function drawSlider(slider, volume) {
  const handleX = slider.x + volume * slider.w;
  const trackY = slider.y;

  stroke(180);
  strokeWeight(6);
  line(handleX, trackY, slider.x + slider.w, trackY);

  stroke(30, 120, 255);
  strokeWeight(6);
  line(slider.x, trackY, handleX, trackY);

  noStroke();
  fill(0);
  circle(handleX, trackY, 22);
}

function handleSettingsClick() {
  if (!settingsOpen) return;

  if (mouseX >= CLOSE_BTN.x && mouseX <= CLOSE_BTN.x + CLOSE_BTN.w &&
      mouseY >= CLOSE_BTN.y && mouseY <= CLOSE_BTN.y + CLOSE_BTN.h) {
    settingsOpen = false;
    return;
  }

  if (mouseX >= MUTE_BTN.x && mouseX <= MUTE_BTN.x + MUTE_BTN.w &&
      mouseY >= MUTE_BTN.y && mouseY <= MUTE_BTN.y + MUTE_BTN.h) {
    Game.isMuted = !Game.isMuted;
    applyMusicVolume();
    return;
  }

  if (isInsideSlider(SFX_SLIDER)) {
    isDraggingSFXVolume = true;
    updateSFXVolumeFromMouse();
    return;
  }

  if (isInsideSlider(MUSIC_SLIDER)) {
    isDraggingMusicVolume = true;
    updateMusicVolumeFromMouse();
    return;
  }
}

function handleSettingsDrag() {
  if (!settingsOpen) return;

  if (isDraggingSFXVolume) updateSFXVolumeFromMouse();
  if (isDraggingMusicVolume) updateMusicVolumeFromMouse();
}

function handleSettingsRelease() {
  isDraggingSFXVolume = false;   
  isDraggingMusicVolume = false;    
}


function isInsideSlider(slider) {
  return mouseY >= slider.y - 20 &&
         mouseY <= slider.y + 20 &&
         mouseX >= slider.x - 16 &&
         mouseX <= slider.x + slider.w + 16;
}


function updateSFXVolumeFromMouse() {
  let ratio = (mouseX - SFX_SLIDER.x) / SFX_SLIDER.w;
  ratio = constrain(ratio, 0, 1);

  Game.sfxVolume = ratio;
  Game.isMuted = false;
} 


function updateMusicVolumeFromMouse() {
  let ratio = (mouseX - MUSIC_SLIDER.x) / MUSIC_SLIDER.w;
  ratio = constrain(ratio, 0, 1);

  Game.musicVolume = ratio;
  Game.isMuted = false;

  applyMusicVolume();
} 

function setSoundVolume(sound, volume) {
  if (!sound) return;

  if (typeof sound.setVolume === "function") {
    sound.setVolume(volume);        // p5.SoundFile
  } else {
    sound.volume = volume;          // HTML Audio
  }
}

function applyMusicVolume() {
  setSoundVolume(Game.assets.music, Game.isMuted ? 0 : Game.musicVolume);
}

function playSFX(sound) {
  if (Game.isMuted || !sound) return;

  // p5.SoundFile case
  if (typeof sound.setVolume === "function") {
    sound.setVolume(Game.sfxVolume);

    if (typeof sound.playMode === "function") {
      sound.playMode("restart");
    }

    sound.play();
    return;
  }

  // HTML Audio case
  let sfx = sound;
  sfx.volume = Game.sfxVolume;
  sfx.play();
}