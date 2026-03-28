# Lam_NguyeN_cs345

I created a **README.md** for your project based directly on your requirements document. You can copy this into a file named:

```text
README.md
```

This matches typical CS345 / software engineering project expectations.

---

# README.md — Castle Rush Tower Defense Game

## Project Name

**Castle Rush — Tower Defense Game**

## Team Members

* Alex Grant
* Nathan Derby
* Lam Nguyen
* Porter Foster
* Sam Day

(From your project credits file.) 

---

# Project Description

**Castle Rush** is a tower defense game built using **JavaScript and p5.js** that runs in a web browser.
Players place defensive units to stop waves of enemies traveling along a path toward a castle. The game continues with increasingly difficult levels until the player loses.

The project is designed to run locally in a browser without external dependencies. 

---

# Features

## Gameplay

* Enemies travel from the left side of the map to the castle
* Towers attack enemies automatically
* Players earn gold for defeating enemies
* Gold is used to place and upgrade towers
* The game continues through progressively harder levels
* The game ends when the castle health reaches zero

These behaviors are defined in the functional requirements. 

---

## Enemy Types

The game includes multiple enemy units:

### Grunt Goblin

* Health: 50
* Speed: 50
* Damage: 50
* Hitspeed: 40

### Bezerker

* Health: 75
* Speed: 60
* Damage: 80
* Hitspeed: 35

### Brute

* Health: 120
* Speed: 35
* Damage: 90
* Hitspeed: 20

### Goblin Overlord

* Health: 300
* Speed: 20
* Damage: 100
* Hitspeed: 25

### Goblin Shaman

* Summons 2–3 goblins every 4 seconds

These enemy specifications are defined in the project requirements. 

---

# Tower Types

## Archer Tower

* Attacks a single enemy
* Can be placed on land
* Upgrade increases damage and range

## Wizard Tower

* Deals splash damage to multiple enemies
* Can be placed on land

## Stoic Knight

* Melee defender
* Cheapest unit
* Placed directly on the path

## Boat

* Expensive defender
* Must be placed in water

## Gold Collector

* Produces gold over time
* Does not attack enemies

Tower placement rules:

* Towers cannot be placed on the path (except Knight)
* Towers cannot overlap other towers or the castle

These constraints are defined in the functional requirements. 

---

# Controls

This is a mouse-based game.

Players can:

* Click to place towers
* Drag and drop defenders
* Click to collect gold
* Start rounds manually
* Enable automatic rounds

Interaction behavior is specified in the requirements document. 

---

# Game Systems

## Gold System

Players earn gold by:

* Killing enemies
* Using gold collector towers

Gold is automatically added to the resource bar. 

---

## Level System

* Infinite levels
* Difficulty increases each round
* Player can start rounds manually
* Player can enable auto-round

Defined in the level progression requirements. 

---

# Technical Requirements

The game:

* Uses JavaScript
* Uses p5.js
* Runs locally in a web browser
* Uses no external libraries

These technical constraints are specified in the requirements document. 

---

# Project Structure

```text
CastleRush/
│
├── index.html
├── sketch.js
├── style.css
├── jsconfig.json
│
├── libraries/
│     ├── p5.min.js
│     └── p5.sound.min.js
│
└── dev/
      ├── entities.js
      └── assets/
            favicon.ico
            grass_and_path_tiles.png
            water_tiles.png
```

---

# How to Run the Project

## Step 1 — Open Terminal

Go to the project folder:

```bash
cd project-folder
```

## Step 2 — Start local server

```bash
python3 -m http.server
```

## Step 3 — Open browser

```text
http://localhost:8000
```

---

# Future Improvements

The system is designed to allow:

* New enemies
* New towers
* New maps

These extensibility goals are part of the non-functional requirements. 

---

If you'd like, I can next help you:

* make a shorter README (for submission)
* add installation instructions
* add UML / design section
* add contribution section (for team project)
* match your professor's rubric

