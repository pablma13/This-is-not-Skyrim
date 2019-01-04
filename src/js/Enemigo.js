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