var menuState = {
	
	create: function() {
		
        
        //Slick UI library
        slickUI = game.plugins.add(Phaser.Plugin.SlickUI);
        slickUI.load('res/ui/kenney/kenney.json');
		
		
        var panel;
        
        //Slick UI library
        slickUI = game.plugins.add(Phaser.Plugin.SlickUI);
        slickUI.load('res/ui/kenney/kenney.json');
		
		
        slickUI.add(panel = new SlickUI.Element.Panel(248, 28, 220, 240));
		
		//Add title and content
        panel.add(new SlickUI.Element.Text(2, 0, "My Little Starship V", 24));
		
		var startButton;
		panel.add(startButton = new SlickUI.Element.Button(4, 88, 180, 84));
		startButton.add(new SlickUI.Element.Text(0,0, "Start Game")).center();
        startButton.events.onInputUp.add(this.start);
		
	},
	
	start: function() {
		game.state.start('play');
	}
	
};