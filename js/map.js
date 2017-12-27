var connectingLines = [];
var mapOffsetX = 8;
var mapOffsetY = 40;
var groupIcons;
var selectedSystem;
var icon_selector;

var mapState = {
	
	preload: function() {
		
		//Slick UI library
		slickUI = game.plugins.add(Phaser.Plugin.SlickUI);
		slickUI.load('res/ui/kenney/kenney.json');
	},
	
    create: function () {
        var mapPanel;
        slickUI.add(mapPanel = new SlickUI.Element.Panel(0, 0, game.width, game.height));
        mapPanel.add(new SlickUI.Element.Text(4 * scale, 0, "GALACTIC MAP", 24));
        
        var mapBG;
        mapPanel.add(mapBG = new SlickUI.Element.DisplayObject(mapOffsetX, mapOffsetY, game.make.sprite(0, 0, 'bg_map')));
        
        mapBG.add(icon_selector = new SlickUI.Element.DisplayObject(0, 0, game.make.sprite(0, 0, 'icon_planet_selector')));
        
        icon_selector.visible = false;
        
        /*
            Now we read the mapData JSON file, which has details for all the star systems on the map.
            Each system has a position, an index for which sprite to use, a few other bits of data, and
            a small array of indexes for other systems you can jump to from that system.
        */
        
        var systemIcons = [];
        groupIcons = game.add.group();
        
        for (var i = 0; i < mapData.systems.length; i++) {
            
            var starSystem = mapData.systems[i];
            
            for (var j = 0; j < starSystem.reachableSystems.length; j++) {
                
                //Draw lines to show where you can jump to.
                var reachableSystem = mapData.systems[starSystem.reachableSystems[j]];
                var line = new Phaser.Line(starSystem.x, starSystem.y, reachableSystem.x, reachableSystem.y);
                connectingLines[connectingLines.length] = line;
                
                var graphicsLine = game.make.graphics(0, 0);
                graphicsLine.lineStyle(2, 0x00ffe2, .4);
                graphicsLine.moveTo(line.start.x, line.start.y);
                graphicsLine.lineTo(line.end.x, line.end.y);
                graphicsLine.endFill();

                var iconRadius = 10;
                
                /*
                    We're rending the lines as textures for performance reasons, but this means
                    that if the line has a negative angle (that is, it slopes upwards onscreen)
                    it draws too low down. The below is a quick and easy fix that just checks if
                    the line has a negative angle and, if so, subtracts the line's height from
                    the y-position of the render.
                */
                
                var gradientCorrection;
                
                if (line.angle < 0) {
                    gradientCorrection = -line.height;
                } else {
                    gradientCorrection = 0;
                }
                
                var myLine = game.add.image(line.start.x + mapOffsetX + iconRadius, line.start.y + mapOffsetY + iconRadius + gradientCorrection, graphicsLine.generateTexture());
                
                graphicsLine.destroy();
            }
            
            //Now add the icons.
            mapBG.add(systemIcons[i] = new SlickUI.Element.DisplayObject(starSystem.x, starSystem.y, game.make.image(0, 0, 'icon_planet' + starSystem.spriteIndex)));
            
            systemIcons[i].inputEnabled = true;
            
            systemIcons[i].events.onInputDown.add(function (selection) {
                
                //The below magic numbers are half the width and height of the selector icon. (They won't change.)
                
                selectedSystem = selection;
                icon_selector.x = selectedSystem.x - mapOffsetX - 5;
                icon_selector.y = selectedSystem.y - mapOffsetY - 17;
                icon_selector.visible = true;
                
            });
            
            groupIcons.add(systemIcons[i].sprite);
        }
        
        var highlight;
        
        var firstSystem = mapData.systems[0];
        mapBG.add(highlight = new SlickUI.Element.DisplayObject(firstSystem.x, firstSystem.y, game.make.image(0, 0, 'icon_planet_highlight')));
        
        
        var jumpButton;
        mapPanel.add(jumpButton = new SlickUI.Element.Button(game.width/2 - 60, game.height-82, 120, 60));
        jumpButton.events.onInputUp.add(function () {ship.day++; ship.fuel--; game.state.start('play');});
        jumpButton.add(new SlickUI.Element.Text(0, 0, "Jump", 24)).center();
		
        var closeButton;
        mapPanel.add(closeButton = new SlickUI.Element.Button(game.width - 48 * scale, game.height-24*scale, 40 * scale, 14 * scale));
        closeButton.events.onInputUp.add(function () {game.state.start('play');});
        closeButton.add(new SlickUI.Element.Text(0,0, "Close map")).center();
    },
    
    update: function() {
        
        game.world.bringToTop(groupIcons);
        
    }
	
};