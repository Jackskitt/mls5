var mapState = {
	
	preload: function() {
		
		//Slick UI library
		slickUI = game.plugins.add(Phaser.Plugin.SlickUI);
		slickUI.load('res/ui/kenney/kenney.json');
		
	},
	
    create: function () {
        var map;
        slickUI.add(map = new SlickUI.Element.Panel(0, 0, game.width, game.height));
        map.add(new SlickUI.Element.Text(4 * scale, 0, "GALACTIC MAP", 24));
        
        var jumpButton;
        map.add(jumpButton = new SlickUI.Element.Button(game.width/2 - 60, game.height/2-40, 120, 80));
        jumpButton.events.onInputUp.add(function () {ship.day++; ship.fuel--; game.state.start('play'); playState.JSONtest();});
        jumpButton.add(new SlickUI.Element.Text(0, 0, "Jump", 24)).center();
		
        var closeButton;
        map.add(closeButton = new SlickUI.Element.Button(game.width - 48 * scale, game.height-24*scale, 40 * scale, 14 * scale));
        closeButton.events.onInputUp.add(function () {game.state.start('play');});
        closeButton.add(new SlickUI.Element.Text(0,0, "Close map")).center();
    }
	
};