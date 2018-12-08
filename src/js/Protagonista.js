'use strict';

var magic_Create =  require ('./Proyectil.js');
var magic_Cast;

module.exports = class Dovah{
    constructor(texture_Dova, group_Meele, group_Magic, game)
    {
        this.dovah_dir = 1;

        this.magic_X;
        this.magic_Y;
        this.meele_X;
        this.meele_Y;

        this.dovah = texture_Dova;
        this.meele = group_Meele;
        this.magic = group_Magic;

        this.game = game;

        this.timer = this.game.time.create(false);

        this.dovah.animations.add('Left', [6,7], 5, true);
        this.dovah.animations.add('Right', [4,5], 5, true);
        this.dovah.animations.add('Down', [2,3], 5, true);
        this.dovah.animations.add('Up', [0,1], 5, true);

        this.game.physics.enable(this.dovah, Phaser.Physics.ARCADE)
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
        var attack = this.meele.getFirstExists(false);
        if (attack)
        {
            switch (this.dovah_dir)
            {
                case 1:
                attack.reset(this.dovah.x - 5 , this.dovah.y - 15);
                attack.scale.x = 1;
                attack.angle = -40;
                break;
                case 2:
                attack.reset(this.dovah.x + 75 , this.dovah.y + 65);
                attack.scale.x = 1;
                attack.angle = 130;
                break;
                case 3:
                attack.reset(this.dovah.x - 15 , this.dovah.y + 5);
                attack.scale.x = -1;
                attack.angle = -65;
                break;
                case 4:
                attack.reset(this.dovah.x + 95 , this.dovah.y + 5);
                attack.scale.x = 1;
                attack.angle = 65;
                break;
            }
        }
      //  this.meele.play('attack');
        this.timer.add(450, stop, this);
        this.timer.start();
        function stop() { attack.kill(); }
    }
    attack_Magic()
    {
        switch (this.dovah_dir)
        {
            case 1:
            magic_Create(this.game, (this.dovah.x + 65), this.dovah.y, 180, 0, -300, 2, this.magic);
            break;
            case 2:
            magic_Create(this.game, (this.dovah.x + 15), (this.dovah.y + 65), 0, 0, 300, 2, this.magic);
            break;
            case 3:
            magic_Create(this.game, (this.dovah.x + 15), (this.dovah.y + 65), 90, -300, 0, -2, this.magic);
            break;
            case 4:
            magic_Create(this.game, (this.dovah.x + 65), (this.dovah.y + 65), -90, 300, 0, 2, this.magic);
            break;
        }
    }
}