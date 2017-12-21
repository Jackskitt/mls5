var scale = 3;

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
        comms: "OPERATIONAL"
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
    var messageBox = {
        title: "MESSAGETITLE",
        content: "MESSAGECONTENT",
        optionA: "OPTIONA",
        optionB: "OPTIONB"
    };
    var slickUI;
    
    //State Information
    
    var states = {menu:0, flying:1, map:2};
    var currentState = states.flying;
    var ui_displayingBox = true;
	
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
        
        //SLICK UI LIBRARY
        slickUI = game.plugins.add(Phaser.Plugin.SlickUI);
        slickUI.load('res/ui/kenney/kenney.json');
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
        
		//Initialise UI
        var statusPanel;
        var barX = 0;
        var barY = 99 * scale;
        slickUI.add(statusPanel = new SlickUI.Element.Panel(barX, barY, game.width, game.height));
        statusPanel.add(new SlickUI.Element.Text(4 * scale, 8 * scale, "DAY " + ship.day));
        statusPanel.add(new SlickUI.Element.Text(32 * scale, 2 * scale, "Fuel reserves: " + ship.fuel + " kilotonnes"));
        statusPanel.add(new SlickUI.Element.Text(32 * scale, 12 * scale, "Crew complement: " + ship.passengers));
        statusPanel.add(new SlickUI.Element.Text(164 * scale, 2 * scale, "Oxygen: " + ship.oxygen + "%"));
        statusPanel.add(new SlickUI.Element.Text(164 * scale, 12 * scale, "Comms: " + ship.comms));        
        
        if (ui_displayingBox) {
            displayMessage("DONK", "You received a donk. Nice.", "Return donk", "Accept donk");
        }
		
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
    
    function displayMessage(title, content, optionA, optionB) {
        
        ui_displayingBox = true;
        
        messageBox.title = title;
        messageBox.content = content;
        messageBox.optionA = optionA;
        messageBox.optionB = optionB;
        
        createMessageBox();
    }
    
    function createMessageBox() {

        var x = 128 * scale;
        var y = 7 * scale;
        var panel;
        slickUI.add(panel = new SlickUI.Element.Panel(x, y, 120 * scale, 84 * scale));
        panel.add(new SlickUI.Element.Text(2 * scale, 0, messageBox.title, 24));
        panel.add(new SlickUI.Element.Text(2 * scale, 12 * scale, messageBox.content));

        var buttonA;
        panel.add(buttonA = new SlickUI.Element.Button(0, 50 * scale, 120 * scale, 14 * scale));
        buttonA.events.onInputUp.add(function () {ui_displayingBox = false;panel.destroy();});
        buttonA.add(new SlickUI.Element.Text(0,0, messageBox.optionA)).center();

        var buttonB;
        panel.add(buttonB = new SlickUI.Element.Button(0, 66 * scale, 120 * scale, 14 * scale));
        buttonB.events.onInputUp.add(function () {ui_displayingBox = false; panel.destroy(); changeState(2)});
        buttonB.add(new SlickUI.Element.Text(0,0, messageBox.optionB)).center();
    }
    
    function changeState(newState) {
        switch (newState) {
            case 0:
                
                break;
            case 1:
                initFlying();
                break;
            case 2:
                initMap();
                break;
            default:
                break;
        }
    }
    
    
    function initFlying() {   
        displayMessage("nice", "nice", "nice", "nice");
    }
    
    function initMap() {
        
        var map;
        slickUI.add(map = new SlickUI.Element.Panel(0, 0, game.width, game.height));
        map.add(new SlickUI.Element.Text(4 * scale, 0, "GALACTIC MAP", 24));

        var buttonA;
        map.add(buttonA = new SlickUI.Element.Button(game.width - 48 * scale, game.height-24*scale, 40 * scale, 14 * scale));
        buttonA.events.onInputUp.add(function () {map.destroy(); changeState(1);});
        buttonA.add(new SlickUI.Element.Text(0,0, "Close map")).center();

    }
};











