'use strict';
module.exports = class Enemigo{
    constructor(index, texture, game)
    {
        this.stop = true;
        var x = game.world.randomX;
        var y = game.world.randomY;
        var dragon_Type = (Math.floor((Math.random() * 3)) * 8);
        this.game = game;
        this.health = 2;
        this.alive = true;
        this.enemy = this.game.add.sprite(x, y, 'Dragon_Ter');
        this.enemy.scale.set(1.25);
        this.enemy.animations.add('Left', [6 + dragon_Type, 7 + dragon_Type], 5, true);
        this.enemy.animations.add('Right', [0 + dragon_Type, 1 + dragon_Type], 5, true);
        this.enemy.animations.add('Down', [4 + dragon_Type, 5 + dragon_Type], 5, true);
        this.enemy.animations.add('Up', [2 + dragon_Type, 3 + dragon_Type], 5, true);
        this.enemy.name = index.toString();
        this.game.physics.enable(this.enemy, Phaser.Physics.ARCADE);
        this.enemy.body.inmovable = true;
        this.enemy.body.collideWorldBounds = true;
        this.enemy.body.bounce.setTo(1, 1);
    }
    relax() { this.stop = true; }
    move() { this.stop = false; }
    hit(num) 
    {
         if(this.health > 0) this.health = this.health - num; 
         console.log(this.health);
         if(this.health <= 0)
         {
             this.enemy.kill();
             this.alive = false;
         }
    }
    update(player)
    {
        if(!this.stop)
        {
            if(Math.abs(player.x  - this.enemy.x) > Math.abs(player.y  - this.enemy.y))
            {
                if((player.x  - this.enemy.x) > 0)
                {
                    this.enemy.play('Right');
                    this.enemy.body.velocity.y = 0;
                    this.enemy.body.velocity.x = 50;
                }
                else 
                {
                    this.enemy.play('Left');
                    this.enemy.body.velocity.y = 0;
                    this.enemy.body.velocity.x = -50;
                }
            }
            else 
            {
                if((player.y  - this.enemy.y) > 0)
                {
                    this.enemy.play('Down');
                    this.enemy.body.velocity.x = 0;
                    this.enemy.body.velocity.y = 50;
                }
                else 
                {
                    this.enemy.play('Up');
                    this.enemy.body.velocity.x = 0;
                    this.enemy.body.velocity.y = -50;
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