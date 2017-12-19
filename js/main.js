window.onload = function() {
	
	var game = new Phaser.Game(256, 128, Phaser.AUTO, '', { preload: preload, create: create }, false, false);
	game.antialias = false;
	
	/* GLOBALS */
	
	var ship = {
		sprite: null,
		posX: 8,
		posY: 60
	}
	
	var bg = {
		sprite0: null,
		sprite1: null,
		posX: 0
	}

	function preload () {
		
		//TODO: Figure out how to scale up without filtering.
		//game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		//game.scale.setMinMax(1024, 512, 1024, 512);
		
		game.load.image('bg_starField', 'res/scenery/bg_starField.png');
		game.load.spritesheet('sheetPlanets', 'res/scenery/sheetPlanets5x5.png', 5, 5, 5);
		game.load.spritesheet('sheetShips', 'res/ships/sheetShips32x16.png', 32, 16, 6);
		
	}

	function create () {
		
		bg.sprite0 = game.add.sprite(bg.posX, 0, 'bg_starField');
		bg.sprite1 = game.add.sprite(bg.posX + bg.sprite0.width, 0, 'bg_starField');
		
		ship.sprite = game.add.sprite(ship.posX, ship.posY, 'sheetShips');
		ship.sprite.frame = 0;
		
		for (i = 0; i < 25; i++) {
			var newPlanet;
			newPlanet = game.add.sprite(i*8, 15, 'sheetPlanets');
			newPlanet.frame = Math.floor(Math.random() * 5);
		}
		
	}
	
	function update() {
		bg.posX -= game.time.elapsed;
		
		if (bg.posX < bg.sprite0.width)
			bg.posX = 0;
		
	}
};