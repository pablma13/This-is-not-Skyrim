(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';
module.exports = class Enemigo{
    constructor(index, texture, game)
    {
        this.stop = false;
        var x = game.world.randomX;
        var y = game.world.randomY;
        var dragon_Race = (Math.floor((Math.random() * 5)) * 8);
        this.game = game;
        this.alive = true;
        this.direction = true; //True = X
        this.timer = this.game.time.create(false);
        if(x < (800 / 4)) x = x + 200;
        else if(x > ((800 * 3) / 4)) x = x - 200;
        if(y < (600 / 4)) y = y + 200;
        else if(y > ((600 * 3) / 4)) y = y - 200;
        this.enemy = this.game.add.sprite(x, y, 'Dragon');
        this.enemy.visible = false;
        this.game.physics.enable(this.enemy, Phaser.Physics.ARCADE);
        this.enemy.body.mass = 999;
        switch (dragon_Race)
        {
            case 0:
            this.enemy.body.setSize(60, 20, 0, 40);
            this.enemy.scale.set(2);
            this.health = 6;
            this.velocity = 30;
            this.fly = false;
            this.loot = 3;
            break;
            case 8:
            this.enemy.body.setSize(60, 30, 0, 30);
            this.enemy.scale.set(1.25);
            this.health = 2;
            this.velocity = 120;
            this.fly = false;
            this.loot = 1;
            break;
            case 16:
            this.enemy.body.setSize(60, 30, 0, 30);
            this.enemy.scale.set(1.5);
            this.health = 4;
            this.velocity = 50;
            this.fly = false;
            this.loot = 2;
            break;
            case 24:
            this.enemy.body.setSize(60, 60);
            this.enemy.scale.set(1.75);
            this.health = 6;
            this.velocity = 50;
            this.fly = true;
            this.loot = 3;
            break;
            case 32:
            this.enemy.body.setSize(60, 60);
            this.enemy.scale.set(1.25);
            this.health = 2;
            this.velocity = 100;
            this.fly = true;
            this.loot = 1;
            break;
        }
        this.enemy.animations.add('Left', [6 + dragon_Race, 7 + dragon_Race], 5, true);
        this.enemy.animations.add('Right', [0 + dragon_Race, 1 + dragon_Race], 5, true);
        this.enemy.animations.add('Down', [4 + dragon_Race, 5 + dragon_Race], 5, true);
        this.enemy.animations.add('Up', [2 + dragon_Race, 3 + dragon_Race], 5, true);
        this.enemy.name = index.toString();
        this.game.physics.enable(this.enemy, Phaser.Physics.ARCADE);
        this.enemy.body.inmovable = true;
        this.enemy.body.collideWorldBounds = true;
        this.enemy.body.bounce.setTo(1, 1);
    }
    relax() { this.stop = true; }
    move() { this.stop = false; }
    chains() { this.fly = false; }
    hit(num, player) 
    {
         if(this.health > 0) this.health = this.health - num; 
         if(this.health <= 0)
         {
             player.gain_EXP(this.loot);
             this.enemy.kill();
             this.alive = false;
         }
    }
    update(player)
    {
        if(!this.stop)
        {
           if(this.direction)
           {
                this.direction = false;
                this.timer.add(1000, search, this);
                this.timer.start();
           } 
           function search() 
            { 
               if(this.alive)this.enemy.visible = true;
               this.direction = true;
                if(Math.abs(player.x  - this.enemy.x) > Math.abs(player.y  - this.enemy.y))
                {
                    if((player.x  - this.enemy.x) > 0)
                    {
                        this.enemy.play('Right');
                        this.enemy.body.velocity.y = 0;
                        this.enemy.body.velocity.x = this.velocity;
                    }
                    else 
                    {
                        this.enemy.play('Left');
                        this.enemy.body.velocity.y = 0;
                        this.enemy.body.velocity.x = -this.velocity;
                    }   
                }
                else 
                {
                    if((player.y  - this.enemy.y) > 0)
                    {
                        this.enemy.play('Down');
                        this.enemy.body.velocity.x = 0;
                        this.enemy.body.velocity.y = this.velocity;
                    }
                    else 
                    {
                        this.enemy.play('Up');
                        this.enemy.body.velocity.x = 0;
                        this.enemy.body.velocity.y = -this.velocity;
                    }
                }
            }
        }
        else
        {
            this.enemy.body.velocity.y = 0;
            this.enemy.body.velocity.x = 0;
        }
    }
}
},{}],2:[function(require,module,exports){
'use strict';
var magic = 10;
var stamina = 10;
var life = 9;
var thuum = 9;
var skill_Points = 9;

function Magic () { return magic; }
function Use_Magic(num) { magic = magic - num;}
function Recover_Magic() { if(magic < 10) magic++; }

function Stamina () { return stamina; }
function Use_Stamina(num) { stamina = stamina - num;}
function Recover_Stamine() { if(stamina < 10) stamina++; }

function Life () { return life; }
function Use_Life(num) {life = life - num;}

function Thuum () { return thuum; }
function Use_Thuum() {thuum = 9;}
function Recover_Thumm() {thuum--;}

function New_Skill() 
{ 
    if(skill_Points > 0) return true;
    else return false;
}
function Level_UP() { skill_Points++; }
function Use_Skill_Point() { skill_Points--; }

function Restart()
{
    magic = 9;
    stamina = 9;
    life = 9;
    thuum = 9;
}
module.exports = { Life, Use_Life, Stamina, Use_Stamina, Magic,  Use_Magic, 
                   Thuum, Use_Thuum, Recover_Thumm, Recover_Magic, Recover_Stamine, 
                   Restart, New_Skill, Level_UP, Use_Skill_Point};
},{}],3:[function(require,module,exports){
'use strict';
const gameManager = require ('./GameManager.js');
var magic_Create =  require ('./Proyectil.js');
var magic_Cast;

module.exports = class Dovah{
    constructor(texture_Dova, group_Melee, group_Magic, game, level_UP)
    {
        this.dovah_dir = 1;
        this.Talos_Please_Help_Me = false;
        this.dovah = texture_Dova;
        this.melee = group_Melee;
        this.melee_Damage = 1;
        this.melee_Cost = 3;
        this.melee_Recover = 3;
        this.melee_Level = 0;
        this.magic = group_Magic;
        this.magic_Damage = 1;
        this.magic_Cost = 4;
        this.magic_Level = 0;
        this.magic_Recover = 3;
        this.thuum_Recover = 8;
        this.thuum_Level = 0;
        this.game = game;
        this.EXP = 0;
        this.level_UP = level_UP;

        this.timer = this.game.time.create(false);
        this.thuum_Recover_Loop = this.game.time.events.loop(1000 * this.thuum_Recover, thuum, this);
        function thuum () { gameManager.Recover_Thumm(); }
        this.magic_Recover_Loop = this.game.time.events.loop(1000 * this.magic_Recover, magic, this);
        function magic () { gameManager.Recover_Magic(); }
        this.melee_Recover_Loop = this.game.time.events.loop(1000 * this.melee_Recover, stamina, this);
        function stamina () { gameManager.Recover_Stamine(); }
        this.dovah.animations.add('Left', [6,7], 5, true);
        this.dovah.animations.add('Right', [4,5], 5, true);
        this.dovah.animations.add('Down', [2,3], 5, true);
        this.dovah.animations.add('Up', [0,1], 5, true);

        this.game.physics.enable(this.dovah, Phaser.Physics.ARCADE)
    }

    X (){ return this.dovah_X; }
    Y (){ return this.dovah_Y; }

    move(dir) 
    { //Mover jugador
        switch (dir)
        {
            case 1:
            this.dovah.play('Up');
            this.dovah.body.velocity.y = -250;
            break;
            case 2:
            this.dovah.play('Down');
            this.dovah.body.velocity.y = +250;
            break;
            case 3:
            this.dovah.play('Left');
            this.dovah.body.velocity.x = -250;
            break;
            case 4:
            this.dovah.play('Right');
            this.dovah.body.velocity.x = +250;
            break;
        }
        this.dovah_dir = dir;
    }

    stop(){this.dovah.animations.stop();}

    attack_Meele()
    {
        this.attack = this.melee.getFirstExists(false);
        if (this.attack && gameManager.Stamina() > 0)
        {
                switch (this.dovah_dir)
                {
                    case 1:
                    this.attack.reset(this.dovah.x - 5 , this.dovah.y - 15);
                    this.attack.scale.x = 1;
                    this.attack.angle = -40;
                    break;
                    case 2:
                    this.attack.reset(this.dovah.x + 75 , this.dovah.y + 65);
                    this.attack.scale.x = 1;
                    this.attack.angle = 130;
                    break;
                    case 3:
                    this.attack.reset(this.dovah.x - 15 , this.dovah.y + 5);
                    this.attack.scale.x = -1;
                    this.attack.angle = -65;
                    break;
                    case 4:
                    this.attack.reset(this.dovah.x + 95 , this.dovah.y + 5);
                    this.attack.scale.x = 1;
                    this.attack.angle = 65;
                    break;
                }
                gameManager.Use_Stamina(this.melee_Cost);
                this.timer.add(450, stop, this);
                this.timer.start();
                function stop() { this.melee.callAll('kill'); }
        }
    }
    attack_Magic()
    {
        if(gameManager.Magic() > 0)
        {
            this.bullet = this.magic.getFirstExists(false);
            if (this.bullet)
            {
                this.bullet.body.setSize(30, 30, 0, -30);
                switch (this.dovah_dir)
                {
                    case 1:
                //magic_Create(this.game, (this.dovah.x + 65), this.dovah.y, 180, 0, -300, 2, this.magic);
                    this.bullet.reset(this.dovah.x + 65 , this.dovah.y);
                    this.bullet.body.velocity.y = -300;
                    this.bullet.body.velocity.x = 0;
                    this.bullet.scale.x = 2;
                    this.bullet.angle = 180;
                    break;
                    case 2:
                    //magic_Create(this.game, (this.dovah.x + 15), (this.dovah.y + 65), 0, 0, 300, 2, this.magic);
                    this.bullet.reset(this.dovah.x  + 15 , this.dovah.y + 65);
                    this.bullet.body.velocity.y = 300;
                    this.bullet.body.velocity.x = 0;
                    this.bullet.scale.x = 2;
                    this.bullet.angle = 0;
                    break;
                    case 3:
                    //magic_Create(this.game, (this.dovah.x + 15), (this.dovah.y + 65), 90, -300, 0, -2, this.magic);
                    this.bullet.reset(this.dovah.x  + 15 , this.dovah.y  + 65);
                    this.bullet.body.velocity.y = 0;
                    this.bullet.body.velocity.x = -300;
                    this.bullet.scale.x = -2;
                    this.bullet.angle = 90;
                    break;
                    case 4:
                    //magic_Create(this.game, (this.dovah.x + 65), (this.dovah.y + 65), -90, 300, 0, 2, this.magic);
                    this.bullet.reset(this.dovah.x + 65 , this.dovah.y + 65);
                    this.bullet.body.velocity.y = 0;
                    this.bullet.body.velocity.x = 300;
                    this.bullet.scale.x = 2;
                    this.bullet.angle = -90;
                    break;
            }
        }
            gameManager.Use_Magic(this.magic_Cost);
        }
    }
    hit()
    {
        if(!this.Talos_Please_Help_Me)
        {
                gameManager.Use_Life(1);
                this.Talos_Please_Help_Me = true;
                this.timer.add(500, All_God_Things_Ends, this);
                this.timer.start();
            function All_God_Things_Ends() { this.Talos_Please_Help_Me = false; }
        }
        if(gameManager.Life() < 0) this.dovah.kill();
    }
    magic_UP(cost, power, cooldown)
    {
        this.magic_Level++;
        if(this.magic_Cost - cost > 0) this.magic_Cost = this.magic_Cost - cost;
        this.magic_Damage = this.magic_Damage + power;
        if(this.magic_Recover - cooldown > 0) this.magic_Recover = this.magic_Recover - cooldown;
        this.game.time.events.remove(this.magic_Recover_Loop);
        this.magic_Recover_Loop = this.game.time.events.loop(1000 * this.magic_Recover, magic, this);
        function magic () { gameManager.Recover_Magic(); }  
    }
    melee_UP(cost, power, cooldown)
    {
        this.melee_Level++;
        if(this.melee_Cost - cost > 0) this.melee_Cost = this.melee_Cost - cost;
        this.melee_Damage = this.melee_Damage + power;
        if(this.melee_Recover - cooldown > 0) this.melee_Recover = this.melee_Recover - cooldown;
        this.game.time.events.remove(this.melee_Recover_Loop);
        this.melee_Recover_Loop = this.game.time.events.loop(1000 * this.melee_Recover, melee, this);
        function melee () { gameManager.Recover_Stamine(); }  
    }
    thuum_UP(cooldown)
    {
        this.thuum_Level++;
        if(this.thuum_Recover - cooldown > 0) this.thuum_Recover = this.thuum_Recover - cooldown;
        this.game.time.events.remove(this.thuum_Recover_Loop);
        this.thuum_Recover_Loop = this.game.time.events.loop(1000 * this.thuum_Recover, thuum, this);
        function thuum () { gameManager.Recover_Thumm(); }
    }
    gain_EXP(Exp)
    {
        this.EXP = this.EXP + Exp;
        if(this.EXP >= 10)
        {
            console.log('caching!!!');
            this.level_UP.visible = true;
            this.timer.add(1000, end, this);
            this.timer.start();
            function end() 
            {
                this.level_UP.visible = false;
            }
            this.EXP = this.EXP - 10;
            gameManager.Level_UP();
        } 
    }
}
},{"./GameManager.js":2,"./Proyectil.js":4}],4:[function(require,module,exports){
'use strict';
var bullet;
function proyectil(game, pos_X, pos_Y, angle, velocity_X, velocity_Y, scale, group)
{
    bullet = group.getFirstExists(false);

    if (bullet)
    {
        bullet.reset(pos_X , pos_Y);
        bullet.body.velocity.y = velocity_Y;
        bullet.body.velocity.x = velocity_X;
        bullet.scale.x = scale;
        bullet.angle = angle;
    }
}
module.exports = proyectil;
},{}],5:[function(require,module,exports){
'use strict';

var map;
var layer;
const gameManager = require ('./GameManager.js');
var dovah = require ('./Protagonista.js');
var enemy = require ('./Enemigo.js');
var ronda = [2,5,8,9,11];
var ronda_Actual = 0;
var mapa_Actual = 0;
var prota;
var prota_Texture;
var meele_Texture;
var magic_Texture;
var cursor;
var meele_Button;
var magic_Button;
var thuum_Button;
var level_UP_Button;
var restart_Button;
var magic_Interface;
var stamina_Interface;
var health_Interface;
var thuum_Interface;
var util = true;
var fin = false;
var maps = ['tundra', 'desierto'];
var this_Game_Maps = [];
var enemiesTotal = 0;
var enemiesAlive = 0;
var reset = false; //True reseteo ejecutado
    var BootScene = {
        preload: function () {
        // load here assets required for the loading screen
        for (var i = 0; i < maps.length; i++)
        {
            this_Game_Maps[i] = Math.floor(Math.random() * maps.length)
            var same_Number = true;
            var z = 1;
            while(same_Number && i < 0)
            {
                if(this_Game_Maps[i] == this_Game_Maps[i-z])
                {
                    i--;
                    same_Number = false;
                } 
                else z++;
                if(i-z < 0) same_Number = false;
            }
        }
        cursor = this.game.input.keyboard.createCursorKeys();
        meele_Button = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
        magic_Button = this.game.input.keyboard.addKey(Phaser.Keyboard.X);
        thuum_Button = this.game.input.keyboard.addKey(Phaser.Keyboard.C);
        level_UP_Button = this.game.input.keyboard.addKey(Phaser.Keyboard.V);
        restart_Button = this.game.input.keyboard.addKey(Phaser.Keyboard.R);
        this.game.load.image('preloader_bar', 'images/preloader_bar.png');
        this.game.load.image('Tittle', 'images/Titulos-Arte/titulo.png');
        this.game.load.image('Play', 'images/Titulos-Arte/PLAY.png');
        this.game.load.image('Decoración','images/Titulos-Arte/Decoración.png');
        this.game.load.audio('Menu_Music', 'audio/Skyrim-8-Bit-Theme.ogg');
        this.game.load.audio('Game_Music', 'audio/14 - Barbarian King.ogg');
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
          //  this.music_menu.play();
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
        this.game.load.tilemap('map1', 'images/'+ maps[this_Game_Maps[mapa_Actual]] +'.csv', null, Phaser.Tilemap.TILED_CSV);
        this.game.load.image('tileset', 'images/tileset.png');
        this.game.load.spritesheet('snow', 'images/snow.png', 240, 180);
        this.game.load.image('GameOver', 'images/interfaz/Títulos/GameOver.png');
        this.game.load.image('RoundClear', 'images/interfaz/Títulos/Round_Clear.png');
        this.game.load.spritesheet('Thu-um_Screen', 'images/interfaz/Thu-um/thuum_screen.png', 800, 569);
        this.game.load.spritesheet('Thu-um_Interface','images/interfaz/Thu-um/thu-um.png',32,32);
        this.game.load.spritesheet('Health_Interface','images/interfaz/Vida/Vida.png',32,32);
        this.game.load.spritesheet('Magic_Interface','images/interfaz/Mana/Mana.png',32,32);
        this.game.load.spritesheet('Stamina_Interface','images/interfaz/Stamina/Stamina.png',32,32);
        this.game.load.spritesheet('Dovah', 'images/Dovah/SpriteDovah.png', 62, 60);
        this.game.load.spritesheet('Magic', 'images/Dovah/Magic/Magic.png', 30, 30);
        this.game.load.spritesheet('Meele', 'images/Dovah/Meele/Attack.png', 55, 42);
        this.game.load.spritesheet('Level_UP', 'images/Interfaz/Level_UP/level_UP.png', 32, 32);
        this.game.load.image('Level_UP_Screen', 'images/Interfaz/Level_UP/Level_Up_Screen.png');
        this.game.load.image('Magic_UP_Button', 'images/Interfaz/Level_UP/Magic_Button.png');
        this.game.load.image('Melee_UP_Button', 'images/Interfaz/Level_UP/Melee_Button.png');
        this.game.load.image('Thuum_UP_Button', 'images/Interfaz/Level_UP/Thuum_Button.png');
        this.enemy_Texture = this.game.load.spritesheet('Dragon', 'images/Enemigos/Enemigos.png',60,60);
        },
        create: function () {
            this.game.state.start('play');
        }
    };

    var PlayScene = {
    preload: function () {
        this.timer = this.game.time.create(false);
      //  this.game.camera.scale.setTo(4);

        map = this.game.add.tilemap('map1',64,64);

        map.addTilesetImage('tileset');

        map.setCollision([72, 73, 74, 75, 88, 89, 90, 91, 
                        177, 178, 209, 210, 229, 194, 192, 
                        195, 179, 208, 180, 358, 359 , 360,
                        361, 374, 375, 380, 390, 391, 406,
                        407]);

        layer = map.createLayer(0);

        this.music_game = this.game.add.audio('Game_Music');
      //  this.music_game.play();

        prota_Texture = this.game.add.sprite( 300 , 500, 'Dovah');
        prota_Texture.smoothed = false;
        prota_Texture.scale.set(1.25);
        this.game.physics.enable(prota_Texture, Phaser.Physics.ARCADE);
        prota_Texture.body.collideWorldBounds = true;
        prota_Texture.body.setSize(40, 10, 10, 45);
        this.UP = this.game.add.sprite(160, 490, 'Level_UP');
        this.UP.smoothed = false;
        this.UP.scale.y = 4;
        this.UP.scale.x = 5;
        this.UP.animations.add('UP', [0,1,2,3,4,5], 5, true);
        this.UP.play('UP');
        this.UP.visible = false;
        this.snow = this.game.add.sprite(0, 0, 'snow');
        this.snow.visible = false;
        this.snow.scale.set(3.33);
        this.snow.fixedToCamera = true;
        this.snow.animations.add('snowing');
   //     this.snow.animations.play('snowing', 5, true);
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
        for (var i = 0; i < 30; i++)
        {
            var b = this.magic_Group.create(0, 0, 'Magic');
            b.name = 'Magic' + i;
            b.exists = false;
            b.visible = false;
            b.smoothed = false;
            b.scale.y = 2;
            b.checkWorldBounds = true;
            b.events.onOutOfBounds.add(resetFire, this);
        }
        this.magic_Group.callAll('animations.add', 'animations', 'bullet', [0, 1, 2, 3, 4, 5], 5, true);
        this.magic_Group.callAll('animations.play', 'animations', 'bullet');

        prota = new dovah(prota_Texture, this.meele_Group, this.magic_Group, this.game, this.UP);
        this.game.camera.follow(prota_Texture);

        this.enemies = [];
        enemiesTotal = ronda[ronda_Actual];
        enemiesAlive = ronda[ronda_Actual];
        for (var i = 0; i < enemiesTotal; i++)
        {
             this.enemies[i] = new enemy(i, this.enemy_Texture, this.game);
        }

        this.thuum_Screen = this.game.add.sprite(0, 0, 'Thu-um_Screen');
        this.thuum_Screen.visible = false;
        this.thuum_Screen.scale.set(1.05);
        this.thuum_Screen.fixedToCamera = true;
        this.thuum_Screen.animations.add('FUSH_RO_DAH', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21], 7, true);
        thuum_Interface = this.game.add.sprite(320, -60, 'Thu-um_Interface');
        this.t = 5;
        thuum_Interface.smoothed = false;
        thuum_Interface.scale.set(5);
        thuum_Interface.fixedToCamera = true;
        health_Interface = this.game.add.sprite(320, 490, 'Health_Interface');
        this.h = 1;
        health_Interface.smoothed = false;
        health_Interface.scale.set(5);
        health_Interface.fixedToCamera = true;
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
        //layer.scale.set(3); 

        this.GameOver = this.game.add.sprite( 0 , 0, 'GameOver');
        this.GameOver.visible = false;
        this.GameOver.fixedToCamera = true;
        this.round_Clear = this.game.add.sprite(0, 0, 'RoundClear');
        this.round_Clear.visible = false;
        this.round_Clear.fixedToCamera = true;
        this.level_UP_Screen = this.game.add.sprite( 0 , 0, 'Level_UP_Screen');
        this.level_UP_Screen.smoothed = false;
        this.level_UP_Screen.scale.set(1.335);
        this.level_UP_Screen.visible = false;
        this.level_UP_Screen.fixedToCamera = true;
        this.levels = 6;
        this.magic_UP = [];
        for(var i = 0; i < this.levels; i++)
        {
            this.magic_UP[i] = this.game.add.sprite( 2, 80*i, 'Magic_Interface');
            this.magic_UP[i].smoothed = false;
            this.magic_UP[i].scale.set(8);
            this.magic_UP[i].fixedToCamera = true;
            this.magic_UP[i].animations.add('UP_Magic', [9], 5, true);
            this.magic_UP[i].animations.add('Used', [0], 5, true);
            this.magic_UP[i].play('UP_Magic');
            this.magic_UP[i].visible = false;
        }
        this.magic_UP_Button = this.game.add.button(24, 30, 'Magic_UP_Button', magic_UP_Click, this, 2, 1, 0);
        this.magic_UP_Button.fixedToCamera = true;
        this.magic_UP_Button.input.useHandCursor = true;
        this.magic_UP_Button.smoothed = false;
        this.magic_UP_Button.scale.set(1.2);
        this.magic_UP_Button.visible = false;
        this.thuum_UP = [];
        for(var i = 0; i < this.levels; i++)
        {
            this.thuum_UP[i] = this.game.add.sprite( 272, 80*i, 'Thu-um_Interface');
            this.thuum_UP[i].smoothed = false;
            this.thuum_UP[i].scale.set(8);
            this.thuum_UP[i].fixedToCamera = true;
            this.thuum_UP[i].animations.add('UP_Thuum', [0], 5, true);
            this.thuum_UP[i].animations.add('Used', [7], 5, true);
            this.thuum_UP[i].play('UP_Thuum');
            this.thuum_UP[i].visible = false;
        }
        this.thuum_UP_Button = this.game.add.button(280, 30, 'Thuum_UP_Button', thuum_UP_Click, this, 2, 1, 0);
        this.thuum_UP_Button.fixedToCamera = true;
        this.thuum_UP_Button.input.useHandCursor = true;
        this.thuum_UP_Button.smoothed = false;
        this.thuum_UP_Button.scale.set(1.2);
        this.thuum_UP_Button.visible = false;
        this.melee_UP = [];
        for(var i = 0; i < this.levels; i++)
        {
            this.melee_UP[i] = this.game.add.sprite( 542, 80*i, 'Stamina_Interface');
            this.melee_UP[i].smoothed = false;
            this.melee_UP[i].scale.set(8);
            this.melee_UP[i].fixedToCamera = true;
            this.melee_UP[i].animations.add('UP_Melee', [9], 5, true);
            this.melee_UP[i].animations.add('Used', [0], 5, true);
            this.melee_UP[i].play('UP_Melee');
            this.melee_UP[i].visible = false;
        }
        this.melee_UP_Button = this.game.add.button(562 , 30, 'Melee_UP_Button', melee_UP_Click, this, 2, 1, 0);
        this.melee_UP_Button.fixedToCamera = true;
        this.melee_UP_Button.input.useHandCursor = true;
        this.melee_UP_Button.smoothed = false;
        this.melee_UP_Button.scale.set(1.2);
        this.melee_UP_Button.visible = false;
        this.game.time.advancedTiming = true;
        layer.resizeWorld();
    },
    update: function()
    {
        if(!fin)
        {
            this.game.debug.text('FPS: ' + this.game.time.fps || 'FPS: --', 40, 40, "#00ff00");
            this.UP.x = prota.dovah.x -40;
            this.UP.y = prota.dovah.y - 10;
            this.game.physics.arcade.collide(prota_Texture, layer);
            if(gameManager.Stamina() > 0)this.s = Math.abs(gameManager.Stamina() - 10);
            if(gameManager.Magic() > 0)this.m = Math.abs(gameManager.Magic() - 10);
            if(gameManager.Life() > 0)this.h = Math.abs(gameManager.Life() - 10);
            if(gameManager.Thuum() > 2)this.t = Math.abs(gameManager.Thuum() - 10);
            magic_Button.onDown.add(magic, this);
            magic_Interface.animations.add('Use_Magic', [this.m], 5, true);
            magic_Interface.play('Use_Magic');
            meele_Button.onDown.add(stamina, this);
            stamina_Interface.animations.add('Use_Stamina', [this.s], 5, true);
            stamina_Interface.play('Use_Stamina');
            health_Interface.animations.add('Use_Health', [this.h], 5, true);
            thuum_Button.onDown.add(thuum, this);
            thuum_Interface.animations.add('Use_thuum', [this.t], 5, true);
            thuum_Interface.play('Use_thuum');
            level_UP_Button.onDown.add(level_UP, this);
            prota_Texture.body.velocity.set(0);
            if(cursor.left.isDown) prota.move(3);
            else if(cursor.right.isDown) prota.move(4);
            else if(cursor.up.isDown) prota.move(1);
            else if(cursor.down.isDown) prota.move(2);
            else prota.stop();
            for (var i = 0; i < this.enemies.length; i++)
            {
                if(util) enemiesAlive = 0;
                if (this.enemies[i].alive)
                {
                    util = false;
                    this.actual_Enemy = this.enemies[i];
                    if(!this.enemies[i].fly)
                    {
                        for(var o = i + 1; o < this.enemies.length; o++)
                        {
                            this.game.physics.arcade.collide(this.enemies[i].enemy, this.enemies[o].enemy);
                            this.game.physics.arcade.collide(this.enemies[o].enemy, this.enemies[i].enemy);
                        }
                    }
                    enemiesAlive++;
                    if((Math.abs(prota.dovah.x  - this.enemies[i].enemy.x) < 50) && (Math.abs(prota.dovah.y  - this.enemies[i].enemy.y) < 50))
                    {
                        if((this.enemies[i].enemy.y > prota.dovah.y) || this.enemies[i].fly) this.game.world.bringToTop(this.enemies[i].enemy);
                        else this.game.world.bringToTop(prota.dovah);
                    }
                    this.game.physics.arcade.collide(prota.dovah, this.enemies[i].enemy, enemy_Hit, null, this);
                    if(!this.enemies[i].fly) this.game.physics.arcade.collide(prota.attack, this.enemies[i].enemy, meele_Hit, null, this);
                    this.game.physics.arcade.overlap(prota.bullet, this.enemies[i].enemy, magic_Hit, null, this);
                    if(!this.enemies[i].fly) this.game.physics.arcade.collide(this.enemies[i].enemy, layer);
                    this.enemies[i].update(prota_Texture);
                }
            }
            util = true;
            if(enemiesAlive <= 0 && !reset)
            {
                this.timer.add(2000, next, this);
                reset = true;
                this.round_Clear.visible = true;
                this.timer.start();
                function next() 
                { 
                    reset = false;
                    ronda_Actual++;
                    this.round_Clear.visible = false;
                    if(ronda_Actual >= ronda.length)
                    {
                        ronda_Actual = 0;
                        mapa_Actual++;
                        this.game.state.start('preloader');
                    }
                    else
                    {
                        enemiesTotal = ronda[ronda_Actual];
                        enemiesAlive = ronda[ronda_Actual];
                        for (var i = 0; i < enemiesTotal; i++)
                        {
                             this.enemies[i] = new enemy(i, this.enemy_Texture, this.game);
                        }
                    }
                }
                
            }// next_Round();
        }
        else 
        {
            restart_Button.onDown.add(restart, this);
        }
    } 
    };
    function next_Round()
    {
       enemiesTotal = ronda[ronda_Actual];
       enemiesAlive = ronda[ronda_Actual];
       for (var i = 0; i < enemiesTotal; i++)
       {
            this.enemies[i] = new enemy(i, this.enemy_Texture, this.game);
       }
    }
    function stamina ()
    {
        prota.attack_Meele();
    }

    function magic ()
    {
        prota.attack_Magic();
    }
    function thuum()
    {
        if(gameManager.Thuum() <= 2)
        {
            this.timer.add(3000, stop, this);
            this.thuum_Screen.visible = true;
            this.game.world.bringToTop(this.thuum_Screen);
            this.thuum_Screen.play('FUSH_RO_DAH');
            for (var i = 0; i < this.enemies.length; i++)
            {
                this.enemies[i].relax();
            }
            gameManager.Use_Thuum();
            this.timer.start();
            function stop()
            {
                this.thuum_Screen.visible = false;
                this.thuum_Screen.animations.stop();
                this.timer.add(1000, kill, this);
                this.timer.start();
                this.game.camera.shake(0.025, 1000);
                function kill()
                {
                    for (var i = 0; i < this.enemies.length; i++)
                    {
                       if(!this.enemies[i].fly) this.enemies[i].hit(999, prota);
                       else this.enemies[i].chains();
                    }
                }
            }
        }
    }

    function render() {

        //  FPS debug info
     //   this.game.debug.text('FPS: ' + this.game.time.fps || 'FPS: --', 40, 40, "#00ff00");
    
    }
    function level_UP()
    {
        if(this.level_UP_Screen.visible)
        {
            this.level_UP_Screen.visible = false;
            for(var i = 0; i < this.levels; i++)
            {
                this.magic_UP[i].visible = false;
                this.melee_UP[i].visible = false;
                this.thuum_UP[i].visible = false;
            }
            this.magic_UP_Button.visible = false;
            this.melee_UP_Button.visible = false;
            this.thuum_UP_Button.visible = false;
        }
        else 
        {
            this.level_UP_Screen.visible = true;
            for(var i = 0; i < this.levels; i++)
            {
                this.magic_UP[i].visible = true;
                this.melee_UP[i].visible = true;
                this.thuum_UP[i].visible = true;
            }
            this.magic_UP_Button.visible = true;
            this.melee_UP_Button.visible = true;
            this.thuum_UP_Button.visible = true;
        }
    }
    function magic_UP_Click()
    {
        if(gameManager.New_Skill() && prota.magic_Level < this.levels)
        {
            this.magic_UP[prota.magic_Level].play('Used');
            gameManager.Use_Skill_Point();
            if(prota.magic_Level % 2 == 0)
            {
                prota.magic_UP(0,1,0);
            }
            else
            {
                prota.magic_UP(1,1,1);
            }
        }
    }
    function melee_UP_Click()
    {
        if(gameManager.New_Skill() && prota.melee_Level < this.levels)
        {
            this.melee_UP[prota.melee_Level].play('Used');
            gameManager.Use_Skill_Point();
            if(prota.melee_Level % 2 == 0)
            {
                prota.melee_UP(0,1,0);
            }
            else
            {
                prota.melee_UP(1,1,1);
            }
        }
    }
    function thuum_UP_Click()
    {
        if(gameManager.New_Skill() && prota.thuum_Level < this.levels)
        {
            this.thuum_UP[prota.thuum_Level].play('Used');
            gameManager.Use_Skill_Point();
            prota.thuum_UP(1);
        }
    }
    function enemy_Hit ()
    {
        prota.hit();
        health_Interface.play('Use_Health');
        console.log(gameManager.Life());
        if(gameManager.Life() < 0)
        {
            this.GameOver.visible = true;
            this.game.world.bringToTop(this.GameOver);
            fin = true;
        }
    }
    function meele_Hit ()
    {
      //  meele.kill();
      this.actual_Enemy.hit(prota.melee_Damage, prota);
    }
    function magic_Hit ()
    {
        prota.bullet.kill();
        this.actual_Enemy.hit(prota.magic_Damage, prota);
    }
    function restart()
    {
        fin = false;
        gameManager.Restart();
        this.game.state.start('menu');
    }
    function resetFire(fire)
    {
        fire.kill();
    }
window.onload = function () {
    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');
  
    game.state.add('boot', BootScene);
    game.state.add('menu', Menu);
    game.state.add('preloader', PreloaderScene);
    game.state.add('play', PlayScene);
  
    game.state.start('boot');
  };
},{"./Enemigo.js":1,"./GameManager.js":2,"./Protagonista.js":3}]},{},[5]);
