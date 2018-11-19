/*'use strict';

var Scene = require('./SceneManager.js');
var PlayScene = require('./GameManager.js')

var BootScene = {
  preload: function () {
    // load here assets required for the loading screen
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
    this.game.load.image('logo', 'images/phaser.png');
    this.game.load.tilemap('map1', 'images/map.csv');
    this.game.load.image('tileset', 'images/0x72_16x16DungeonTileset.v3.png');

  },

  create: function () {
    this.game.state.start('play');
  }
};

var PreloaderScene = {
  preload: function () {
    this.loadingBar = this.game.add.sprite(0, 240, 'preloader_bar');
    this.loadingBar.anchor.setTo(0, 0.5);
    this.load.setPreloadSprite(this.loadingBar);

    // TODO: load here the assets for the game
    this.game.load.image('logo', 'images/phaser.png');
    this.game.load.tilemap('map1', 'images/map.csv');
    this.game.load.image('tileset', 'images/0x72_16x16DungeonTileset.v3.png');

  },
}; */

