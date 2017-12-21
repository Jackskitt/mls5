var scale = 2;

window.onload = function() {
	
	var game = new Phaser.Game(256 * scale, 128 * scale, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render}, false, false);
    
    
    
	/* GLOBALS */
	
	//Scenery & Objects
	var ship = {
		sprite: null,
		posX: 28,
		posY: 48,
        day: 1,
        fuel: 50,
        passengers: 129,
        oxygen: 100,
        sector: "Sol"
	};
	
	var bg = {
		sprite0: null,
		sprite1: null,
		posX: 0
    };
	
	var groupPlanets;
	var groupBackground;
	var groupShip;
    
	//UI
	var statusBar = {
		bgSprite: null
	};
	
	function preload () {
        
		/* SPRITES */
		
		//Scenery & Objects
		game.load.image('bg_starField', 'res/scenery/bg_starField.png');
		game.load.image('img_ship', 'res/ships/img_ship.png');
        game.load.image('img_planet', 'res/scenery/img_planet.png');
        
		groupBackground = game.add.group();
		groupPlanets = game.add.group();
        groupShip = game.add.group();
		
		//UI
		game.load.image('ui_statusBar', 'res/ui/ui_statusBar.png');
		groupUI = game.add.group();
	}

	function create () {
		
		//Initialise scenery & objects
		bg.sprite0 = groupBackground.create(bg.posX, 0, 'bg_starField');
		bg.sprite1 = groupBackground.create(bg.posX + bg.sprite0.width, 0, 'bg_starField');
		
        ship.sprite = groupShip.create(ship.posX, ship.posY, 'img_ship');
        
		for (i = 0; i < 5; i++) {
			var newPlanet;
			newPlanet = groupPlanets.create(15 + i*50, Math.random() * 150, 'img_planet');
		}
		
        groupPlanets.scale.set(scale);
        groupBackground.scale.set(scale);
        groupShip.scale.set(scale);
		groupUI.scale.set(scale);
		
		//Initialise UI
		statusBar.bgSprite = groupUI.create(0, 99, 'ui_statusBar');
        var barX = statusBar.bgSprite.x;
        var barY = statusBar.bgSprite.y;
        game.add.text(barX + 4, barY + 4, "DAY " + ship.day, {font: "12px Courier New", fill: "#fff"}, groupUI);
        game.add.text(barX + 54, barY + 3, "Fuel: " + ship.fuel + "kt", {font: "10px Courier New", fill: "#fff"}, groupUI);
        game.add.text(barX + 54, barY + 14, "Passengers: " + ship.passengers, {font: "10px Courier New", fill: "#fff"}, groupUI);
        game.add.text(barX + 160, barY + 3, "Oxygen: " + ship.oxygen + "%", {font: "10px Courier New", fill: "#fff"}, groupUI);
        game.add.text(barX + 160, barY + 14, "Sector: " + ship.sector, {font: "10px Courier New", fill: "#fff"}, groupUI);
        
		
	}
	
	function update() {
		
		scrollBackground();
		
	}
	
	function render() {
		
	}
	
	function scrollBackground() {
		
		var backgroundMovement = 0.001 * game.time.elapsed * scale;
		
		bg.posX -= backgroundMovement;
		
		if (bg.posX < 0 - bg.sprite0.width)
			bg.posX = 0;
		
		bg.sprite0.x = bg.posX;
		bg.sprite1.x = bg.posX + bg.sprite0.width;
		
		groupPlanets.x -= backgroundMovement * 45;
		
		if (groupPlanets.x < - 1500 * scale)
			groupPlanets.x = 1000 * scale;
	}
};