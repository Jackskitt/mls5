var scale = 2;

window.onload = function() {
	
	var game = new Phaser.Game(256 * scale, 128 * scale, Phaser.AUTO, '', { preload: preload, create: create }, false, false);
    
	game.antialias = false;
        
	/* GLOBALS */
	
    //Objects
    
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
    
    //Groups
    
    var allSprites;
    
    
	function preload () {
		
		//TODO: Figure out how to scale up without filtering.
		//game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		//game.scale.setMinMax(1024, 512, 1024, 512);
        
		
		game.load.image('bg_starField', 'res/scenery/bg_starField.png');
		game.load.spritesheet('sheetPlanets', 'res/scenery/sheetPlanets5x5.png', 5, 5, 5);
		game.load.spritesheet('sheetShips', 'res/ships/sheetShips32x16.png', 32, 16, 6);
        game.load.image('img_ship', 'res/ships/img_ship.png');
        game.load.image('img_planet', 'res/scenery/img_planet.png');
        
        allSprites = game.add.group();
		
	}

	function create () {
		
		bg.sprite0 = allSprites.create(bg.posX, 0, 'bg_starField');
		bg.sprite1 = allSprites.create(bg.posX + bg.sprite0.width, 0, 'bg_starField');
		
		//ship.sprite = game.add.sprite(ship.posX, ship.posY, 'sheetShips');
        ship.sprite = allSprites.create(ship.posX, ship.posY, 'img_ship');
        
		for (i = 0; i < 5; i++) {
			var newPlanet;
			newPlanet = allSprites.create(15 + i*50, Math.random() * 150, 'img_planet');
			newPlanet.frame = Math.floor(Math.random() * 5);
		}
		
        
        allSprites.scale.set(scale, scale);
        
        //game.world.bringToTop(allSprites);
	}
	
	function update() {
		bg.posX -= game.time.elapsed;
		
		if (bg.posX < bg.sprite0.width)
			bg.posX = 0;
		
	}
};