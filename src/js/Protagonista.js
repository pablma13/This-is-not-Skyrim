'use strict';

module.exports = class Dovah{
    constructor(texture_Dova, texture_Meele, texture_Magic, game)
    {
        this.dovah_dir = 1;
        this.magic_X;
        this.magic_Y;
        this.meele_X;
        this.meele_Y;
        this.dovah = texture_Dova;
        this.meele = texture_Meele;
        this.magic = texture_Magic;
        this.game = game;

        this.dovah.animations.add('Left', [6,7], 5, true);
        this.dovah.animations.add('Right', [4,5], 5, true);
        this.dovah.animations.add('Down', [2,3], 5, true);
        this.dovah.animations.add('Up', [0,1], 5, true);
        this.game.physics.enable(this.dovah, Phaser.Physics.ARCADE)
    }

    X (){ return this.dovah_X; }
    Y (){ return this.dovah_Y; }

    //draw(){ game.add.sprite( this.dovah_X , this.dovah_Y, 'Prota');}

    move() 
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
    }

    attack_Magic()
    {
    }
}