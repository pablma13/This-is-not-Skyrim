'use strict';
module.exports = class Enemigo {
    constructor(index, texture, game, boss) {
        this.stop = false;
        var x = game.world.randomX;
        var y = game.world.randomY;
        var dragon_Race = (Math.floor((Math.random() * 5)) * 8);
        if(boss) dragon_Race = 40;
        this.game = game;
        this.alive = true;
        this.direction = true; //True = X
        this.timer = this.game.time.create(false);
        this.Alduin_Please_Help_Me = false;
        this.enemy = this.game.add.sprite(x, y, 'Dragon');
        this.enemy.visible = false;
        this.game.physics.enable(this.enemy, Phaser.Physics.ARCADE);
        this.enemy.body.mass = 999;
        switch (dragon_Race) {
            case 0:
                this.enemy.body.setSize(60, 20, 0, 40);
                this.enemy.scale.set(2);
                this.health = 4;
                this.velocity = 30;
                this.fly = false;
                this.loot = 4;
                break;
            case 8:
                this.enemy.body.setSize(60, 30, 0, 30);
                this.enemy.scale.set(1.25);
                this.health = 1;
                this.velocity = 120;
                this.fly = false;
                this.loot = 2;
                break;
            case 16:
                this.enemy.body.setSize(60, 30, 0, 30);
                this.enemy.scale.set(1.5);
                this.health = 2;
                this.velocity = 50;
                this.fly = false;
                this.loot = 3;
                break;
            case 24:
                this.enemy.body.setSize(60, 60);
                this.enemy.scale.set(1.75);
                this.health = 4;
                this.velocity = 50;
                this.fly = true;
                this.loot = 4;
                break;
            case 32:
                this.enemy.body.setSize(60, 60);
                this.enemy.scale.set(1.25);
                this.health = 1;
                this.velocity = 100;
                this.fly = true;
                this.loot = 2;
                break;
            case 40:
                this.enemy.body.setSize(60, 60);
                this.enemy.scale.set(4);
                this.health = 1;
                this.velocity = 120;
                this.fly = true;
                this.loot = 999;
                break;
        }
        if (!this.fly) {
            switch (Math.floor((Math.random() * 3))) {
                case 0:
                    this.enemy.x = 300;
                    this.enemy.y = 450;
                    break;
                case 1:
                    this.enemy.x = 400;
                    this.enemy.y = 300;
                    break;
                case 2:
                    this.enemy.x = 500;
                    this.enemy.y = 500;
                    break;
            }
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
    hit(num, player) {
        if (!this.Alduin_Please_Help_Me) {
            if (this.health > 0) this.health = this.health - num;
            if (this.health <= 0) {
                player.gain_EXP(this.loot);
                this.enemy.kill();
                this.alive = false;
            }
            this.Alduin_Please_Help_Me = true;
            this.timer.add(500, All_God_Things_Ends, this);
            this.timer.start();
            function All_God_Things_Ends() { this.Alduin_Please_Help_Me = false; }
        }
    }
    update(player) {
        if (!this.stop) {
            if (this.direction) {
                this.direction = false;
                this.timer.add(1500, search, this);
                this.timer.start();
            }
            function search() {
                if (this.alive) this.enemy.visible = true;
                this.direction = true;
                if (Math.abs(player.dovah.x - this.enemy.x) > Math.abs(player.dovah.y - this.enemy.y)) {
                    if ((player.dovah.x - this.enemy.x) > 0) {
                        this.enemy.play('Right');
                        this.enemy.body.velocity.y = 0;
                        this.enemy.body.velocity.x = this.velocity / (this.game.time.fps / 60);
                    }
                    else {
                        this.enemy.play('Left');
                        this.enemy.body.velocity.y = 0;
                        this.enemy.body.velocity.x = -this.velocity / (this.game.time.fps / 60);
                    }
                }
                else {
                    if ((player.dovah.y - this.enemy.y) > 0) {
                        this.enemy.play('Down');
                        this.enemy.body.velocity.x = 0;
                        this.enemy.body.velocity.y = this.velocity / (this.game.time.fps / 60);
                    }
                    else {
                        this.enemy.play('Up');
                        this.enemy.body.velocity.x = 0;
                        this.enemy.body.velocity.y = -this.velocity / (this.game.time.fps / 60);
                    }
                }
            }
        }
        else {
            this.enemy.body.velocity.y = 0;
            this.enemy.body.velocity.x = 0;
        }
    }
}