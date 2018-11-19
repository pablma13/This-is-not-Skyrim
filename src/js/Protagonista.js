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
    }

    X (){ return this.dovah_X; }
    Y (){ return this.dovah_Y; }

    //draw(){ game.add.sprite( this.dovah_X , this.dovah_Y, 'Prota');}

    move() 
    { //Mover jugador
    }

    attack_Meele()
    {
    }
    attack_Magic()
    {
    }
}