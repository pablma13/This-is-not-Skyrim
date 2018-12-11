'use strict';

var map;
var layer;
const gameManager = require ('./GameManager.js');
var dovah = require ('./Protagonista.js');
var enemy = require ('./Enemigo.js');
var prota;
var prota_Texture;
var meele_Texture;
var magic_Texture;
var cursor;
var meele_Button;
var magic_Button;
var magic_Interface;
var stamina_Interface;

    var BootScene = {
        preload: function () {
        // load here assets required for the loading screen
        cursor = this.game.input.keyboard.createCursorKeys();
        meele_Button = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
        magic_Button = this.game.input.keyboard.addKey(Phaser.Keyboard.X);
        this.game.load.image('preloader_bar', 'images/preloader_bar.png');
        this.game.load.image('Tittle', 'images/Titulos-Arte/titulo.png');
        this.game.load.image('Play', 'images/Titulos-Arte/PLAY.png');
        this.game.load.image('Decoración','images/Titulos-Arte/Decoración.png');
        this.game.load.audio('Menu_Music', 'audio/Skyrim-8-Bit-Theme.ogg');
        this.game.load.audio('Game_Music', 'audio/08 - Overworld.ogg');
        },
    
        create: function () {
        this.game.state.start('menu');
        }
    };
    var Menu = {
        preload: function (){
            this.music_menu = this.game.add.audio('Menu_Music');
            this.game.add.image(0, 0, 'Tittle');
            this.game.add.image(370, 250, 'Decoración');
            this.play = this.game.add.button(-90, 150, 'Play', Play, this, 2, 1, 0);
            this.play.input.useHandCursor = true;
            this.play.smoothed = false;
            this.play.scale.set(0.75);
           // this.music_menu.play();
        }
    } 
    function Play()
    {
        this.music_menu.stop();
        this.game.state.start('preloader');
    }
    var PreloaderScene = {
        preload: function () {

        this.loadingBar = this.game.add.sprite(0, 240, 'preloader_bar');
        this.loadingBar.anchor.setTo(0, 0.5);
        this.load.setPreloadSprite(this.loadingBar);
    
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // TODO: load here the assets for the game
        this.game.load.tilemap('map1', 'images/map.csv', null, Phaser.Tilemap.CSV);
        this.game.load.image('tileset', 'images/0x72_16x16DungeonTileset.v3.png');
        this.game.load.spritesheet('Magic_Interface','images/interfaz/Mana/Mana.png',32,32);
        this.game.load.spritesheet('Stamina_Interface','images/interfaz/Stamina/Stamina.png',32,32);
        this.game.load.spritesheet('Dovah', 'images/Dovah/SpriteDovah.png', 62, 60);
        this.game.load.spritesheet('Magic', 'images/Dovah/Magic/Magic.png', 30, 30);
        this.game.load.spritesheet('Meele', 'images/Dovah/Meele/Attack.png', 55, 42);
        this.enemy_Texture = this.game.load.spritesheet('Enemy_Ter_Yellow', 'images/Enemigos/TerAmarillo.png',60,60);
        },
        create: function () {
            this.game.state.start('play');
        }
    };

    var PlayScene = {
    preload: function () {

      //  this.game.camera.scale.setTo(4);

        map = this.game.add.tilemap('map1',16,16);

        map.addTilesetImage('tileset');

      //  map.setCollision([1,1000]);

        layer = map.createLayer(0);

        this.music_game = this.game.add.audio('Game_Music');
       // this.music_game.play();
        this.enemies = [];
        this.enemiesTotal = 10;
        this.enemiesAlive = 10;
        for (var i = 0; i < this.enemiesTotal; i++)
        {
            this.enemies.push(new enemy(i, this.enemy_Texture, this.game));
        }
        prota_Texture = this.game.add.sprite( 10 , 50, 'Dovah');
        prota_Texture.smoothed = false;
        prota_Texture.scale.set(1.25);
        this.game.physics.enable(prota_Texture, Phaser.Physics.ARCADE);
        prota_Texture.body.collideWorldBounds = true;
       // prota_Texture.body.setSize(30, 30, 2, 1);

        this.meele_Group = this.game.add.group();
        this.meele_Group.enableBody = true;
        this.meele_Group.physicsBodyType = Phaser.Physics.ARCADE;
        for (var i = 0; i < 20; i++)
        {
            var m = this.meele_Group.create(0, 0, 'Meele');
            m.name = 'Meele' + i;
            m.exists = false;
            m.visible = false;
            m.smoothed = false;
            m.scale.set(1.25);
        }
        this.meele_Group.callAll('animations.add', 'animations', 'attack', [1,2,3,4,5], 7, true);
        this.meele_Group.callAll('animations.play', 'animations', 'attack');

        this.magic_Group = this.game.add.group();
        this.magic_Group.enableBody = true;
        this.magic_Group.physicsBodyType = Phaser.Physics.ARCADE;
        for (var i = 0; i < 20; i++)
        {
            var b = this.magic_Group.create(0, 0, 'Magic');
            b.name = 'Magic' + i;
            b.exists = false;
            b.visible = false;
            b.smoothed = false;
            b.scale.y = 2;
        }
        this.magic_Group.callAll('animations.add', 'animations', 'bullet', [0, 1, 2, 3, 4, 5], 5, true);
        this.magic_Group.callAll('animations.play', 'animations', 'bullet');

        prota = new dovah(prota_Texture, this.meele_Group, this.magic_Group, this.game);
        this.game.camera.follow(prota_Texture);
        
        magic_Interface = this.game.add.sprite(40, 490, 'Magic_Interface');
        this.m = 1;
        magic_Interface.smoothed = false;
        magic_Interface.scale.set(5);
        magic_Interface.fixedToCamera = true;
        stamina_Interface = this.game.add.sprite(600, 490,'Stamina_Interface');
        this.s = 1;
        stamina_Interface.smoothed = false;
        stamina_Interface.scale.set(5);
        stamina_Interface.fixedToCamera = true;
        layer.smoothed = false;
        layer.scale.set(5);

        layer.resizeWorld();
    },
    update: function()
    {
     //   this.game.physics.arcade.collide(prota_Texture, layer, d);
        if(gameManager.Stamina() > 0)this.s = Math.abs(gameManager.Stamina() - 10);
        if(gameManager.Magic() > 0)this.m = Math.abs(gameManager.Magic() - 10);
        magic_Button.onDown.add(magic, this);
        magic_Interface.animations.add('Use_Magic', [this.m], 5, true);
        meele_Button.onDown.add(stamina, this);
        stamina_Interface.animations.add('Use_Stamina', [this.s], 5, true);
        prota_Texture.body.velocity.set(0);
        if(cursor.left.isDown) prota.move(3);
        else if(cursor.right.isDown) prota.move(4);
        else if(cursor.up.isDown) prota.move(1);
        else if(cursor.down.isDown) prota.move(2);
        else prota.stop();
        for (var i = 0; i < this.enemies.length; i++)
        {
            if (this.enemies[i].alive)
            {
                this.actual_Enemy = this.enemies[i];
                this.enemiesAlive++;
                this.game.physics.arcade.collide(prota.dovah, this.enemies[i].enemy, enemy_Hit, null, this);
                this.game.physics.arcade.collide(prota.attack, this.enemies[i].enemy, meele_Hit, null, this);
                this.game.physics.arcade.collide(prota.bullet, this.enemies[i].enemy, magic_Hit, null, this);
                this.enemies[i].update(prota_Texture);
            }
        }
    } 
    };
    function d()
    {
        prota_Texture.body.velocity.set(0);
    }
    function stamina ()
    {
        prota.attack_Meele();
        stamina_Interface.play('Use_Stamina');
    }

    function magic ()
    {
        prota.attack_Magic();
        magic_Interface.play('Use_Magic');
    }
    function enemy_Hit ()
    {
        console.log("ss");
       // console.log("ss");
    }
    function meele_Hit ()
    {
      //  meele.kill();
      this.actual_Enemy.hit(2);
    }
    function magic_Hit ()
    {
        prota.bullet.kill();
        this.actual_Enemy.hit(1);
    }
window.onload = function () {
    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');
  
    game.state.add('boot', BootScene);
    game.state.add('menu', Menu);
    game.state.add('preloader', PreloaderScene);
    game.state.add('play', PlayScene);
  
    game.state.start('boot');
  };