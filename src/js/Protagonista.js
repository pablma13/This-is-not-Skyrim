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

        this.meele.animations.add('attack', [1,2,3,4,5], 7, true);
        this.game.physics.enable(this.meele, Phaser.Physics.ARCADE)

        this.magic.animations.add('magic', [0,1,2,3,4,5], 5, true);
        this.game.physics.enable(this.magic, Phaser.Physics.ARCADE)
    }

    X (){ return this.dovah_X; }
    Y (){ return this.dovah_Y; }

    //draw(){ game.add.sprite( this.dovah_X , this.dovah_Y, 'Prota');}

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
        switch (this.dovah_dir)
        {
            case 1:
            this.meele.scale.x = 1;
            this.meele.x = this.dovah.x - 5;
            this.meele.y = this.dovah.y - 15;
            this.meele.angle = -40;
            break;
            case 2:
            this.meele.scale.x = 1;
            this.meele.x = this.dovah.x + 75;
            this.meele.y = this.dovah.y + 65;
            this.meele.angle = 130;
            break;
            case 3:
            this.meele.scale.x = -1;
            this.meele.x = this.dovah.x - 15;
            this.meele.y = this.dovah.y + 5;
            this.meele.angle = -65;
            break;
            case 4:
            this.meele.scale.x = 1;
            this.meele.x = this.dovah.x + 95;
            this.meele.y = this.dovah.y + 5;
            this.meele.angle = 65;
            break;
        }
        this.meele.play('attack');
    }
    attack_Magic()
    {
        switch (this.dovah_dir)
        {
            case 1:
            this.magic.scale.x = 2;
            this.magic.x = this.dovah.x + 65;
            this.magic.y = this.dovah.y;
            this.magic.angle = 180;
            this.magic.body.velocity.y = -300;
            this.magic.body.velocity.x = 0;
            break;
            case 2:
            this.magic.scale.x = 2;
            this.magic.x = this.dovah.x + 15;
            this.magic.y = this.dovah.y + 65;
            this.magic.angle = 0;
            this.magic.body.velocity.y = 300;
            this.magic.body.velocity.x = 0;
            break;
            case 3:
            this.magic.scale.x = -2;
            this.magic.x = this.dovah.x + 15;
            this.magic.y = this.dovah.y + 65;
            this.magic.angle = 90;
            this.magic.body.velocity.y = 0;
            this.magic.body.velocity.x = -300;
            break;
            case 4:
            this.magic.scale.x = 2;
            this.magic.x = this.dovah.x + 65;
            this.magic.y = this.dovah.y + 65;
            this.magic.angle = -90;
            this.magic.body.velocity.y = 0;
            this.magic.body.velocity.x = 300;
            break;
        }
        this.magic.play('magic');
    }
stop_Meele(){/*this.meele.animations.stop();*/}
}