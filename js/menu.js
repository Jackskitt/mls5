var menuState = {
	
	create: function() {
		
        
        //Slick UI library
        slickUI = game.plugins.add(Phaser.Plugin.SlickUI);
        slickUI.load('res/ui/kenney/kenney.json');
		
		
        var panel;
        
        //Slick UI library
        slickUI = game.plugins.add(Phaser.Plugin.SlickUI);
        slickUI.load('res/ui/kenney/kenney.json');
		
		
        slickUI.add(panel = new SlickUI.Element.Panel(48, 48, 320, 240));
		
		//Add title and content
        panel.add(new SlickUI.Element.Text(12, 0, "My Little Starship", 24));
        panel.add(new SlickUI.Element.Text(12, 38, "Tales of failure", 16));
		
		var startButton;
		panel.add(startButton = new SlickUI.Element.Button(4, 88, 300, 44));
		startButton.add(new SlickUI.Element.Text(0,0, "Start Game")).center();
        startButton.events.onInputUp.add(this.start);
        
		var settingsButton;
		panel.add(settingsButton = new SlickUI.Element.Button(4, 88 + 48, 300, 44));
		settingsButton.add(new SlickUI.Element.Text(0,0, "Settings")).center();
        settingsButton.events.onInputUp.add(this.start);
		
		var creditsButton;
		panel.add(creditsButton = new SlickUI.Element.Button(4, 88 + 48 + 48, 300, 44));
		creditsButton.add(new SlickUI.Element.Text(0,0, "Credits")).center();
        creditsButton.events.onInputUp.add(this.start);
        
        var welcomePanel;
        
        slickUI.add(welcomePanel = new SlickUI.Element.Panel(48 + 320 + 40, 48, 320, 240));
        
        var welcomeText;
        
        welcomePanel.add(welcomeText = new SlickUI.Element.Text(8, 4, "Welcome to MLS.", 24));
        welcomePanel.add(welcomeText = new SlickUI.Element.Text(8, 44, "My Little Starship is a game about safely running a generation ship carrying refugees from Earth.\n\nCan you reach Earth 2?", 15));
	},
	
	start: function() {
		game.state.start('play');
	}
	
};