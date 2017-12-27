var loadState = {
	
	preload: function() {
		
		var loadingLabel = game.add.text(80, 150, "loading...", {font: "30px Arial", fill: "#fff"});
		
        
		/* SPRITES */
		
		//Scenery & Objects
		game.load.image('bg_starField', 'res/scenery/bg_starField.png');
		game.load.image('img_ship', 'res/ships/img_ship.png');
        game.load.image('img_planet', 'res/scenery/img_planet.png');
		
        //Map screen
        game.load.image('bg_map', 'res/ui/bg_map.png');
        for (var i = 0; i < 4; i++) {
            game.load.image('icon_planet' + i, 'res/ui/icon_planet' + i + '.png');
        }
        game.load.image('icon_planet_selector', 'res/ui/icon_planet_selector.png');
        game.load.image('icon_planet_highlight', 'res/ui/icon_planet_highlight.png');
        
        //Slick UI library
        slickUI = game.plugins.add(Phaser.Plugin.SlickUI);
        slickUI.load('res/ui/kenney/kenney.json');
		
		//Data
		game.load.json("data_encounters", "res/data/data_encounters.json");
		game.load.json("data_map", "res/data/data_map.json");
        
        mapData = {
            systems : undefined,
            shipPosition : undefined
        };
        
        
	},
	
	create: function() {
        mapData.systems = game.cache.getJSON('data_map');
        mapData.shipPosition = mapData.systems[0];
		game.state.start('menu');
	}
	
};