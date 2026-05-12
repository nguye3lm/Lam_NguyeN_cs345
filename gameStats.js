const gameStats = {
	goldCollected: Game.gold,
	goldSpent: 0,
	enemiesKilled: 0,
	towersPlaced: 0,
	archersPlaced: 0,
	wizardsPlaced: 0,
	stoicKnightsPlaced: 0,
	towersSold: 0,
	levelsCompleted: 0,
	numOfUpgrades: 0,
}
function resetStats(){
	gameStats.goldCollected= Game.gold
	gameStats.goldSpent= 0
	gameStats.enemiesKilled= 0
	gameStats.towersPlaced= 0
	gameStats.archersPlaced= 0
	gameStats.wizardsPlaced= 0
	gameStats.stoicKnightsPlaced= 0
	gameStats.towersSold= 0
	gameStats.levelsCompleted= 0
	gameStats.numOfUpgrades= 0
}