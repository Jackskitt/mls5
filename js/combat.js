var combatState = {
	
	preload: function() {
		groupBackground = game.add.group();
		groupEnemies = game.add.group();
        groupShip = game.add.group();
		groupTargets = game.add.group();
		groupExplosions = game.add.group();
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
		
		for (var i = 0; i < 8; i++) {
			this.spawnEnemy();
		}
		
        groupBackground.scale.set(scale);
        playerShip.scale.set(scale);
        groupEnemies.scale.set(scale);
		groupTargets.scale.set(scale);
		groupExplosions.scale.set(scale);
		
		playerShip.weaponMissile = game.add.weapon(30, 'img_missile');
		playerShip.weaponMissile.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
		playerShip.weaponMissile.bulletSpeed = 450;
		playerShip.weaponMissile.fireRate = 800;
		playerShip.weaponMissile.trackSprite(playerShip, 32, 16, false);
	},
	
	update: function() {
		
		
		this.enemies.forEach(function (enemy) {
			
			enemy.y += .15;
			
			game.physics.arcade.collide(enemy.weapon.bullets, this.playerShip, function(obj1, obj2){obj1.kill(); obj2.kill();});
			
			game.physics.arcade.overlap(enemy.weapon.bullets, groupExplosions, function(obj1, obj2){obj1.kill();});
			
			enemy.fireTimer -= game.time.physicsElapsed;
			if (enemy.fireTimer <= 0) {
				enemy.fire();
				enemy.fireTimer = Math.floor(Math.random() * 5) + 2;
			}
		});
		
		game.physics.arcade.collide(playerShip.weaponMissile.bullets, groupTargets, function(obj1, obj2){obj1.kill(); obj2.kill(); combatState.spawnExplosion(obj1.x/scale - 16, obj1.y/scale - 16);}); //16 is half the width of the explosion sprite

		if (game.input.activePointer.isDown)
		{
			var didFire = playerShip.weaponMissile.fireAtPointer();
			
			if (didFire) {
				var reticle = groupTargets.create(game.input.x/scale, game.input.y/scale, 'img_reticle');
				game.physics.arcade.enable(reticle, Phaser.Physics.ARCADE);
			}

		}
	},
	
	render: function() {
		
	},
	
	spawnEnemy: function() {
		
		var randomX = Math.floor(Math.random() * 150);
		
		//This is a trick to make sure enemies don't spawn on a player collision course
		if (randomX > 60)
			randomX += Math.floor(Math.random() * 100) + 100;
		
		var randomY = Math.floor(Math.random() * 100) - 110;
		
		var posX = randomX;
		var posY = randomY;
		
        var enemy = groupEnemies.create(posX, posY, 'img_enemy');
		
		enemy.fireTimer = Math.floor(Math.random() * 2) + 2;
		
		enemy.weapon = game.add.weapon(30, 'img_laser');
		enemy.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
		enemy.weapon.bulletSpeed = 80;
		enemy.weapon.trackSprite(enemy, 32, 32, false);
		enemy.weapon.bulletAngleVariance = 15;
		
		enemy.fire = function() {
			this.weapon.fireAtSprite(playerShip);
		}
		
		game.physics.arcade.enable(enemy, Phaser.Physics.ARCADE);
		enemy.body.setSize(enemy.width * scale, enemy.height * scale)
		this.enemies.push(enemy);
		
	},
	
	killBoth: function(object1, object2) {
		object1.kill();
		object2.kill();
	},
	
	spawnExplosion: function(x, y) {
		var explosion = groupExplosions.create(x, y, 'anim_explosion');
        var explosionAnim = explosion.animations.add('anim_splode', [0,1,2,3,4,5,6,7,8]);
        explosion.animations.play('anim_splode', 20, false);
		game.physics.arcade.enable(explosion);
		explosion.body.setSize(explosion.width * scale, explosion.height * scale)
		explosion.lifespan = 400;
		explosion.body.immovable = true;
		explosion.body.setCircle();
	}
};