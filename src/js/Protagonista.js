'use strict';
const gameManager = require('./GameManager.js');
var magic_Create = require('./Proyectil.js');
var magic_Cast;

module.exports = class Dovah {
    constructor(texture_Dova, group_Melee, group_Magic, game, level_UP, level_UP_Sound) {
        this.dovah_dir = 1;
        this.Talos_Please_Help_Me = false;
        this.dovah = texture_Dova;
        this.melee = group_Melee;
        this.magic = group_Magic;

        this.game = game;
        this.level_UP = level_UP;
        this.level_UP_Sound = level_UP_Sound;
        this.dovah.body.mass = 300;

        this.timer = this.game.time.create(false);
        this.thuum_Recover_Loop = this.game.time.events.loop(1000 * gameManager.give_Me('thuum_Recover'), thuum, this);
        function thuum() { gameManager.Recover_Thumm(); }
        this.magic_Recover_Loop = this.game.time.events.loop(1000 * gameManager.give_Me('magic_Recover'), magic, this);
        function magic() { gameManager.Recover_Magic(); }
        this.melee_Recover_Loop = this.game.time.events.loop(1000 * gameManager.give_Me('melee_Recover'), stamina, this);
        function stamina() { gameManager.Recover_Stamine(); }
        this.life_Recover_Loop = this.game.time.events.loop(3000, life, this);
        function life() { gameManager.Recover_Life(); }
        this.dovah.animations.add('Left', [6, 7], 5, true);
        this.dovah.animations.add('Right', [4, 5], 5, true);
        this.dovah.animations.add('Down', [2, 3], 5, true);
        this.dovah.animations.add('Up', [0, 1], 5, true);

        this.game.physics.enable(this.dovah, Phaser.Physics.ARCADE)
    }

    X() { return this.dovah_X; }
    Y() { return this.dovah_Y; }

    anchor() { this.dovah.body.mass = 999; }

    move(dir) { //Mover jugador
        switch (dir) {
            case 1:
                this.dovah.play('Up');
                this.dovah.body.velocity.y = -250 / (this.game.time.fps / 60);
                break;
            case 2:
                this.dovah.play('Down');
                this.dovah.body.velocity.y = +250 / (this.game.time.fps / 60);
                break;
            case 3:
                this.dovah.play('Left');
                this.dovah.body.velocity.x = -250 / (this.game.time.fps / 60);
                break;
            case 4:
                this.dovah.play('Right');
                this.dovah.body.velocity.x = +250 / (this.game.time.fps / 60);
                break;
        }
        this.dovah_dir = dir;
    }

    stop() { this.dovah.animations.stop(); }

    attack_Meele() {
        this.attack = this.melee.getFirstExists(false);
        if (this.attack && gameManager.give_Me('stamina') - gameManager.give_Me('melee_Cost') > 0) {
            switch (this.dovah_dir) {
                case 1:
                    this.attack.reset(this.dovah.x - 5, this.dovah.y - 15);
                    this.attack.scale.x = 1;
                    this.attack.angle = -40;
                    break;
                case 2:
                    this.attack.reset(this.dovah.x + 75, this.dovah.y + 65);
                    this.attack.scale.x = 1;
                    this.attack.angle = 130;
                    break;
                case 3:
                    this.attack.reset(this.dovah.x - 15, this.dovah.y + 5);
                    this.attack.scale.x = -1;
                    this.attack.angle = -65;
                    break;
                case 4:
                    this.attack.reset(this.dovah.x + 95, this.dovah.y + 5);
                    this.attack.scale.x = 1;
                    this.attack.angle = 65;
                    break;
            }
            gameManager.Use_Stamina();
            this.timer.add(450, stop, this);
            this.timer.start();
            function stop() { this.melee.callAll('kill'); }
        }
    }
    attack_Magic() {
        if (gameManager.give_Me('magic') - gameManager.give_Me('magic_Cost') > 0) {
            console.log('pip!');
            this.bullet = this.magic.getFirstExists(false);
            if (this.bullet) {
                this.bullet.body.setSize(30, 30, 0, -30);
                switch (this.dovah_dir) {
                    case 1:
                        //magic_Create(this.game, (this.dovah.x + 65), this.dovah.y, 180, 0, -300, 2, this.magic);
                        this.bullet.reset(this.dovah.x + 65, this.dovah.y);
                        this.bullet.body.velocity.y = -300 / (this.game.time.fps / 60);
                        this.bullet.body.velocity.x = 0;
                        this.bullet.scale.x = 2;
                        this.bullet.angle = 180;
                        break;
                    case 2:
                        //magic_Create(this.game, (this.dovah.x + 15), (this.dovah.y + 65), 0, 0, 300, 2, this.magic);
                        this.bullet.reset(this.dovah.x + 15, this.dovah.y + 65);
                        this.bullet.body.velocity.y = 300 / (this.game.time.fps / 60);
                        this.bullet.body.velocity.x = 0;
                        this.bullet.scale.x = 2;
                        this.bullet.angle = 0;
                        break;
                    case 3:
                        //magic_Create(this.game, (this.dovah.x + 15), (this.dovah.y + 65), 90, -300, 0, -2, this.magic);
                        this.bullet.reset(this.dovah.x + 15, this.dovah.y + 65);
                        this.bullet.body.velocity.y = 0;
                        this.bullet.body.velocity.x = -300 / (this.game.time.fps / 60);
                        this.bullet.scale.x = -2;
                        this.bullet.angle = 90;
                        break;
                    case 4:
                        //magic_Create(this.game, (this.dovah.x + 65), (this.dovah.y + 65), -90, 300, 0, 2, this.magic);
                        this.bullet.reset(this.dovah.x + 65, this.dovah.y + 65);
                        this.bullet.body.velocity.y = 0;
                        this.bullet.body.velocity.x = 300 / (this.game.time.fps / 60);
                        this.bullet.scale.x = 2;
                        this.bullet.angle = -90;
                        break;
                }
            }
            gameManager.Use_Magic();
        }
    }
    hit() {
        if (!this.Talos_Please_Help_Me) {
            gameManager.Use_Life(2);
            this.Talos_Please_Help_Me = true;
            this.timer.add(300, All_God_Things_Ends, this);
            this.timer.start();
            function All_God_Things_Ends() { this.Talos_Please_Help_Me = false; }
        }
        if (gameManager.give_Me('life') < 0) this.dovah.kill();
    }
    magic_UP(cost, power, cooldown) {
        gameManager.skill_UP(cost, power, cooldown, 'magic');
        this.game.time.events.remove(this.magic_Recover_Loop);
        this.magic_Recover_Loop = this.game.time.events.loop(1000 * gameManager.give_Me('magic_Recover'), magic, this);
        function magic() { gameManager.Recover_Magic(); }
    }
    melee_UP(cost, power, cooldown) {
        gameManager.skill_UP(cost, power, cooldown, 'melee');
        this.game.time.events.remove(this.melee_Recover_Loop);
        this.melee_Recover_Loop = this.game.time.events.loop(1000 * gameManager.give_Me('melee_Recover'), melee, this);
        function melee() { gameManager.Recover_Stamine(); }
    }
    thuum_UP(cooldown) {
        gameManager.skill_UP(0, 0, cooldown, 'thuum');
        this.game.time.events.remove(this.thuum_Recover_Loop);
        this.thuum_Recover_Loop = this.game.time.events.loop(1000 * gameManager.give_Me('thuum_Recover'), thuum, this);
        function thuum() { gameManager.Recover_Thumm(); }
    }
    gain_EXP(Exp) {
        if (gameManager.EXP_UP(Exp)) {
            this.level_UP.visible = true;
            this.level_UP_Sound.play();
            this.game.world.bringToTop(this.level_UP);
            this.timer.add(1000, end, this);
            this.timer.start();
            function end() {
                this.level_UP.visible = false;
            }
        }
    }
}