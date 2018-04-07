var combatState = {
	
	preload: function() {
		groupBackground = game.add.group();
		groupEnemies = game.add.group();
        groupShip = game.add.group();
		groupEnemyShots = game.add.group();
		var playerShip;
	},
	
	enemies: [],
	
	create: function () {

    	game.physics.startSystem(Phaser.Physics.ARCADE);
		
		//Initialise scenery & objects
        playerShip = game.add.sprite(108 * scale, 100 * scale, 'anim_ship');
		game.physics.arcade.enable(playerShip);
		
        var animIdle = playerShip.animations.add('anim_ship_idle', [0,1,2,3,4,5,6,7]);
        var animJump = playerShip.animations.add('anim_ship_jump', [8,9,10,11]);
        var animLand = playerShip.animations.add('anim_ship_land', [11,10,9,8]);
        var animCharge = playerShip.animations.add('anim_ship_charge', [12,13,14,15]);
        
        playerShip.animations.play('anim_ship_idle', 8, true);
		
		groupBackground.create(0, 0, 'bg_starField');
		
		for (var i = 0; i < 5; i++) {
			this.spawnEnemy();
		}
		
        groupBackground.scale.set(scale);
        playerShip.scale.set(scale);
        groupEnemies.scale.set(scale);
		groupEnemyShots.scale.set(scale);
		
		playerShip.weaponMissile = game.add.weapon(30, 'img_laser');
		playerShip.weaponMissile.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
		playerShip.weaponMissile.bulletSpeed = 250;
		playerShip.weaponMissile.trackSprite(playerShip, 32, 16, false);
	},
	
	update: function() {
		
		
		this.enemies.forEach(function (enemy) {
			
			enemy.y += .2;
			
			game.physics.arcade.collide(enemy.weapon.bullets, this.playerShip, function(obj1, obj2){obj1.kill(); obj2.kill();});
			
			game.physics.arcade.collide(playerShip.weaponMissile.bullets, enemy, function(obj1, obj2){obj1.kill(); obj2.kill();});
			
			enemy.fireTimer -= game.time.physicsElapsed;
			if (enemy.fireTimer <= 0) {
				enemy.fire();
				enemy.fireTimer = Math.floor(Math.random() * 5) + 2;
			}
			
			
		});
		
		
		if (game.input.activePointer.isDown)
		{
			playerShip.weaponMissile.fireAtPointer();
		}
	},
	
	render: function() {
			
	},
	
	spawnEnemy: function() {
		
		var randomX = Math.floor(Math.random() * 230);
		var randomY = Math.floor(Math.random() * 100) - 110;
		
		var posX = randomX;
		var posY = randomY;
		
        var enemy = groupEnemies.create(posX, posY, 'img_enemy');
		
		enemy.fireTimer = Math.floor(Math.random() * 2) + 2;
		
		enemy.weapon = game.add.weapon(30, 'img_laser');
		enemy.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
		enemy.weapon.bulletSpeed = 120;
		enemy.weapon.trackSprite(enemy, 32, 32, false);
		enemy.weapon.bulletAngleVariance = 15;
		
		enemy.fire = function() {
			this.weapon.fireAtSprite(playerShip);
		}
		
		game.physics.arcade.enable(enemy, Phaser.Physics.ARCADE);
		
		this.enemies.push(enemy);
		
	},
	
	killBoth: function(object1, object2) {
		object1.kill();
		object2.kill();
	}
};