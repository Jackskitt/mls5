var data_eventsStory;
var data_eventsDanger;
var encounterCounter;

var loadState = {
	
	preload: function() {
		
		var loadingLabel = game.add.text(80, 150, "loading...", {font: "30px Arial", fill: "#fff"});
		
        
		/* SPRITES */
		
		//Scenery & Objects
		game.load.image('bg_starField', 'res/scenery/bg_starField.png');
		game.load.image('img_ship', 'res/ships/img_ship.png');
        game.load.image('img_planet', 'res/scenery/img_planet.png');
		
        game.load.image('hud_driveReady', 'res/ui/hud_driveReady.png');
        game.load.image('hud_driveCharge', 'res/ui/hud_driveCharge.png');
		
        //Map screen
        game.load.image('bg_map', 'res/ui/bg_map.png');
        for (var i = 0; i < 6; i++) {
            game.load.image('icon_planet' + i, 'res/ui/icon_planet' + i + '.png');
        }
        game.load.image('icon_planet_selector', 'res/ui/icon_planet_selector.png');
        game.load.image('icon_planet_highlight', 'res/ui/icon_planet_highlight.png');
		
        game.load.image('warning_lowFuel', 'res/ui/warning_lowFuel.png');
        game.load.image('warning_noFuel', 'res/ui/warning_noFuel.png');
		
        game.load.image('icon_asteroids', 'res/ui/icon_asteroids.png');
        
        //Animations
        game.load.spritesheet('anim_ship', 'res/ships/anim_ship_32x16.png', 32, 16);
        
        //Slick UI library
        slickUI = game.plugins.add(Phaser.Plugin.SlickUI);
        slickUI.load('res/ui/kenney/kenney.json');
		
		//Data
		game.load.json("data_eventsStory", "res/data/data_eventsStory.json");		//TODO: randomise encounter list at start of game and iterate through to prevent repetition
		game.load.json("data_eventsDanger", "res/data/data_eventsDanger.json");		//TODO: randomise encounter list at start of game and iterate through to prevent repetition
		game.load.json("data_map", "res/data/data_map.json");
        
        mapData = {
            systems : undefined,
            shipPosition : undefined
        };
        
        
	},
	
	create: function() {
        mapData.systems = game.cache.getJSON('data_map');
        
		//shipPosition is an integer corresponding to the index of the current system in mapData.systems
		mapData.shipPosition = 0;
		
		//Shuffle the encounter list
		
		
		game.state.start('menu');
	}
	
};