var welcomePanel;
var settingsPanel;
var creditsPanel;


/* GLOBAL AUDIO REFERENCES */
var music;

var sound_jump;
var sound_jump2;
var sound_buoy;
var sound_signal;
var sound_select;
var sound_selectFail;
var sound_beep;
var sound_land;
var sound_beam;

var menuState = {
	
	preload: function() {
        music = game.add.audio('music_airshipSerenity');
		
		sound_jump = game.add.audio('sound_jump');
		sound_jump2 = game.add.audio('sound_jump2');
		sound_buoy = game.add.audio('sound_buoy');
		sound_signal = game.add.audio('sound_signal');
		sound_select = game.add.audio('sound_select');
		sound_selectFail = game.add.audio('sound_selectFail');
		sound_beep = game.add.audio('sound_beep');
		sound_land = game.add.audio('sound_land');
		sound_beam = game.add.audio('sound_beam');
	},
	
	create: function() {
		music.play("", 0, 1, true, false);
		
        //Slick UI library
        slickUI = game.plugins.add(Phaser.Plugin.SlickUI);
        slickUI.load('res/ui/kenney/kenney.json');
		
        var panel;
		
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
        settingsButton.events.onInputUp.add(this.settings);
		
		var creditsButton;
		panel.add(creditsButton = new SlickUI.Element.Button(4, 88 + 48 + 48, 300, 44));
		creditsButton.add(new SlickUI.Element.Text(0,0, "Credits")).center();
        creditsButton.events.onInputUp.add(this.credits);
        
        slickUI.add(welcomePanel = new SlickUI.Element.Panel(48 + 320 + 40, 48, 320, 240));
        
        var welcomeText;
        
        welcomePanel.add(welcomeText = new SlickUI.Element.Text(8, 4, "Welcome to MLS.", 24));
        welcomePanel.add(welcomeText = new SlickUI.Element.Text(8, 44, "You're the captain of a generation ship carrying Earth's last humans. Can you find a new home?\n\nExpect bugs. Send feedback to contact@niallslater.com.", 16));
        
        slickUI.add(creditsPanel = new SlickUI.Element.Panel(48 + 320 + 40, 48, 320, 240));
        
        var closeCreditsButton;
        creditsPanel.add(closeCreditsButton = new SlickUI.Element.Button(320-32, 0, 16, 16));
        closeCreditsButton.events.onInputUp.add(function () {menuState.closeCredits();});
        closeCreditsButton.add(new SlickUI.Element.Text(0,0, "x", 8)).center();
        
        creditsPanel.visible = false;
        
        slickUI.add(settingsPanel = new SlickUI.Element.Panel(48 + 320 + 40, 48, 320, 280));
        
        var nameField_PilotF;
        var nameField_PilotS;
        var label_Pilot;
        settingsPanel.add(label_Pilot = new SlickUI.Element.Text(8, 2, "Pilot name:", 12));
		settingsPanel.add(nameField_PilotF = new SlickUI.Element.TextField(4, 24, 140, 44, 14));
        nameField_PilotF.events.onOK.add(function() {ship.fname_Pilot = nameField_PilotF.value;});
		settingsPanel.add(nameField_PilotS = new SlickUI.Element.TextField(140 + 4, 24, 159, 44, 14));
        nameField_PilotS.events.onOK.add(function() {ship.sname_Pilot = nameField_PilotS.value;});
        
        var nameField_EngineerF;
        var nameField_EngineerS;
        var label_Engineer;
        settingsPanel.add(label_Engineer = new SlickUI.Element.Text(8, 2 + 64, "Engineer name:", 12));
		settingsPanel.add(nameField_EngineerF = new SlickUI.Element.TextField(4, 24 + 64, 140, 44, 14));
        nameField_EngineerF.events.onOK.add(function() {ship.fname_Engineer = nameField_EngineerF.value;});
		settingsPanel.add(nameField_EngineerS = new SlickUI.Element.TextField(140 + 4, 24 + 64, 159, 44, 14));
        nameField_EngineerS.events.onOK.add(function() {ship.sname_Engineer = nameField_EngineerS.value;});
        
        var nameField_NavigatorF;
        var nameField_NavigatorS;
        var label_Navigator;
        settingsPanel.add(label_Navigator = new SlickUI.Element.Text(8, 2 + 64 + 64, "Navigator name:", 12));
		settingsPanel.add(nameField_NavigatorF = new SlickUI.Element.TextField(4, 24 + 64 + 64, 140, 44, 14));
        nameField_NavigatorF.events.onOK.add(function() {ship.fname_Navigator = nameField_NavigatorF.value;});
		settingsPanel.add(nameField_NavigatorS = new SlickUI.Element.TextField(140 + 4, 24 + 64 + 64, 159, 44, 14));
        nameField_NavigatorS.events.onOK.add(function() {ship.sname_Navigator = nameField_NavigatorS.value;});
        
        var nameField_EngineerF;
        var nameField_EngineerS;
        var label_Engineer;
        settingsPanel.add(label_Engineer = new SlickUI.Element.Text(8, 2 + 64 + 64 + 64, "Engineer name:", 12));
		settingsPanel.add(nameField_EngineerF = new SlickUI.Element.TextField(4, 24 + 64 + 64 + 64, 140, 44, 14));
        nameField_EngineerF.events.onOK.add(function() {ship.fname_Engineer = nameField_EngineerF.value;});
		settingsPanel.add(nameField_EngineerS = new SlickUI.Element.TextField(140 + 4, 24 + 64 + 64 + 64, 159, 44, 14));
        nameField_EngineerS.events.onOK.add(function() {ship.sname_Engineer = nameField_EngineerS.value;});
        
        
        var closeSettingsButton;
        settingsPanel.add(closeSettingsButton = new SlickUI.Element.Button(320-32, 0, 16, 16));
        closeSettingsButton.events.onInputUp.add(function () {menuState.closeSettings();});
        closeSettingsButton.add(new SlickUI.Element.Text(0,0, "x", 8)).center();
        
        settingsPanel.visible = false;
	},
	
	start: function() {
		sound_select.play();
		encounterCounter = 0;
		game.state.start('play');
	},
	
    settings: function() {
		sound_select.play();
        creditsPanel.visible = false;
        settingsPanel.visible = true;
    },
    
    closeSettings: function() {
		sound_select.play();
        settingsPanel.visible = false;
    },
    
    credits: function() {
		sound_select.play();
        settingsPanel.visible = false;
        creditsPanel.visible = true;
    },
    
    closeCredits: function() {
		sound_select.play();
        creditsPanel.visible = false;
    }
    
};