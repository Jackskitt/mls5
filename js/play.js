/* GLOBALS */

var scale = 3;

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

var groupBackground;
var groupPlanets;
var groupShip;

//UI
var statusBar = {
	bgSprite: null
};
var messageBox = {
	title: "MESSAGETITLE",
	content: "MESSAGECONTENT",
	options: null
};
var slickUI;

var playState = {
    
    //State Information
	
	preload: function() {
		groupBackground = game.add.group();
		groupPlanets = game.add.group();
        groupShip = game.add.group();
		
		//Slick UI library
		slickUI = game.plugins.add(Phaser.Plugin.SlickUI);
		slickUI.load('res/ui/kenney/kenney.json');
		
		//Data
		game.load.json("encounters", "res/data/encounters.json");
	},

	create: function () {
		
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
        statusPanel.add(new SlickUI.Element.Text(4 * scale, 2 * scale, "DAY " + ship.day));
        var mapButton = statusPanel.add(new SlickUI.Element.Button(2 * scale, 12 * scale, 24 * scale, 10 * scale));
		mapButton.add(new SlickUI.Element.Text(0, 0, "Map")).center();
        mapButton.events.onInputUp.add(function () {game.state.start('map');});
        statusPanel.add(new SlickUI.Element.Text(32 * scale, 2 * scale, "Fuel reserves: " + ship.fuel + " kilotonnes"));
        statusPanel.add(new SlickUI.Element.Text(32 * scale, 12 * scale, "Crew complement: " + ship.passengers));
        statusPanel.add(new SlickUI.Element.Text(164 * scale, 2 * scale, "Oxygen: " + ship.oxygen + "%"));
        statusPanel.add(new SlickUI.Element.Text(164 * scale, 12 * scale, "Comms: " + ship.comms));
		
		this.JSONtest();
	},
	
	update: function() {
		this.scrollBackground();
	},
	
	render: function() {
		
	},
	
	/* SCENERY MANAGEMENT */
	
	scrollBackground: function() {
		
		var backgroundMovement = 0.001 * game.time.elapsed * scale;
		
		bg.posX -= backgroundMovement;
		
		if (bg.posX < 0 - bg.sprite0.width)
			bg.posX = 0;
		
		bg.sprite0.x = bg.posX;
		bg.sprite1.x = bg.posX + bg.sprite0.width;
		
		groupPlanets.x -= backgroundMovement * 45;
		
		if (groupPlanets.x < - 250 * scale)
			groupPlanets.x = 250 * scale;
	},
	
	/* UI MANAGEMENT */
    
    displayMessage: function(title, content, options) {
		
		messageBox.title = title;
        messageBox.content = content;
		messageBox.options = options;
        
        this.createMessageBox();
    },
    
    displayMessageNoChoice: function(title, content) {
        
		var continueJourney = [{choice: "Continue the journey", diceRoll: false, final: true}];
        
        messageBox.title = title;
        messageBox.content = content;
		messageBox.options = continueJourney;
        
        this.createMessageBox();
    },
    
    createMessageBox: function() {
		
		//Set bounds and instantiate panel
        var x = 128 * scale;
        var y = 7 * scale;
        var panel;
        slickUI.add(panel = new SlickUI.Element.Panel(x, y, 120 * scale, 84 * scale));
		
		//Add title and content
        panel.add(new SlickUI.Element.Text(2 * scale, 0, messageBox.title)).centerHorizontally();
        panel.add(new SlickUI.Element.Text(2 * scale, 12 * scale, messageBox.content));
		
		//Add buttons
		for (i = 0; i < messageBox.options.length; i++) {
			var button;
			var option = messageBox.options[i];
			
			panel.add(button = new SlickUI.Element.Button(0, 50 * scale + i * 14 * scale, 120 * scale, 14 * scale));
			button.add(new SlickUI.Element.Text(0,0, option.choice)).center();
			
			//Make the buttons do different stuff depending on what the JSON data says.
			
			if (option.diceRoll) {
				
				//Save the option for use in the callback later.
				var selectedOption = option;
				
				button.events.onInputUp.add(function () {
					//This event requires a roll of the dice to see the outcome.
					//We grab the probability and the win/lose responses from the JSON data.
					
					var response = "response not set!";
					
					if (Math.random() < selectedOption.winChance) {
						//win! :)
						response = selectedOption.win.response;
						console.log(selectedOption.win.effect);
						
					} else {
						//fail! :(
						response = selectedOption.fail.response;
						console.log(selectedOption.fail.effect);
					}
					
					panel.destroy();
					playState.displayMessageNoChoice(messageBox.title, response);
				});
				
			} else {
				
				button.events.onInputUp.add(function () {
					
					//There's no dice roll needed here. 
					
					panel.destroy();
					
					if (!option.final) {
						//option.final is just a flag to note whether this is the last dialog box.
						playState.displayMessageNoChoice(messageBox.title, option.response);
					}
				});
			}
		}
    },
	
	/* TESTING FOR THE JSON INTERPRETER */
	
	JSONtest: function() {
		var data_encounters = game.cache.getJSON('encounters');
		var selector = Math.floor(Math.random() * data_encounters.length);
		var encounter = data_encounters[selector];
		console.log("Encounter: " + encounter.name);
		
		this.displayMessage(encounter.title, encounter.content, encounter.options);
	}
	
};