'use strict';

var map;
var layer;
var dovah = require ('./Protagonista.js');
var prota;
var prota_Texture;
var meele_Texture;
var magic_Texture;
var cursor;
var meele_Button;
var magic_Button;

    var BootScene = {
        preload: function () {
        // load here assets required for the loading screen
        cursor = this.game.input.keyboard.createCursorKeys();
        meele_Button = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
        magic_Button = this.game.input.keyboard.addKey(Phaser.Keyboard.X);
        this.game.load.image('preloader_bar', 'images/preloader_bar.png');
        },
    
        create: function () {
        this.game.state.start('preloader');
        }
    };

    var PreloaderScene = {
        preload: function () {

        this.loadingBar = this.game.add.sprite(0, 240, 'preloader_bar');
        this.loadingBar.anchor.setTo(0, 0.5);
        this.load.setPreloadSprite(this.loadingBar);
    
        // TODO: load here the assets for the game
        this.game.load.tilemap('map1', 'images/map.csv');
        this.game.load.image('tileset', 'images/0x72_16x16DungeonTileset.v3.png');
        this.game.load.spritesheet('Dovah', 'images/Dovah/SpriteDovah.png', 62, 60);
        this.game.load.spritesheet('Magic', 'images/Dovah/Magic/Magic.png', 30, 30);
        this.game.load.spritesheet('Meele', 'images/Dovah/Meele/Attack.png', 55, 42);
        },
        create: function () {
            this.game.state.start('play');
        }
    };

    var PlayScene = {
    preload: function () {
        map = this.game.add.tilemap('map1',16,16);

        map.addTilesetImage('tileset');

        layer = map.createLayer(0);

        prota_Texture = this.game.add.sprite( 100 , 100, 'Dovah');
        meele_Texture = this.game.add.sprite( -100 , -100, 'Meele');
        magic_Texture = this.game.add.sprite( -100 , -100, 'Magic');
        prota = new dovah(prota_Texture,meele_Texture,magic_Texture, this.game);

        layer.smoothed = false;
        layer.scale.set(5);

        layer.resizeWorld();

    },
    update: function()
    {
        prota_Texture.body.velocity.set(0);
        if(cursor.left.isDown) prota.move(3);
        else if(cursor.right.isDown) prota.move(4);
        else if(cursor.up.isDown) prota.move(1);
        else if(cursor.down.isDown) prota.move(2);
        else prota.stop();
    } 
    };

window.onload = function () {
    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');
  
    game.state.add('boot', BootScene);
    game.state.add('preloader', PreloaderScene);
    game.state.add('play', PlayScene);
  
    game.state.start('boot');
  };