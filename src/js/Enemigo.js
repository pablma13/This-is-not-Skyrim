'use strict';
module.exports = class Enemigo{
    constructor(index, texture, game)
    {
        var x = game.world.randomX;
        var y = game.world.randomY;
        this.game = game;
        this.health = 2;
        this.alive = true;
        this.enemy = this.game.add.sprite(x, y, 'Enemy_Ter_Yellow');
        this.enemy.scale.set(1.25);
        this.enemy.animations.add('Left', [6,7], 5, true);
        this.enemy.animations.add('Right', [0,1], 5, true);
        this.enemy.animations.add('Down', [4,5], 5, true);
        this.enemy.animations.add('Up', [2,3], 5, true);
        this.enemy.name = index.toString();
        this.game.physics.enable(this.enemy, Phaser.Physics.ARCADE);
        this.enemy.body.inmovable = true;
        this.enemy.body.collideWorldBounds = true;
        this.enemy.body.bounce.setTo(1, 1);
    }
    hit(num) 
    {
         if(this.health > 0) this.health = this.health - num; 
         else 
         {
             this.enemy.kill();
             this.alive = false;
         }
    }
    update(player)
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
}