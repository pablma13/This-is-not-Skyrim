'use strict';
const gameManager = require ('./GameManager.js');
var magic_Create =  require ('./Proyectil.js');
var magic_Cast;

module.exports = class Dovah{
    constructor(texture_Dova, group_Meele, group_Magic, game)
    {
        this.dovah_dir = 1;
        this.Talos_Please_Help_Me = false;
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
        this.attack = this.meele.getFirstExists(false);
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
                gameManager.Use_Stamina(1);
                this.timer.add(450, stop, this);
                this.timer.start();
                function stop() { this.attack.kill(); }
        }
    }
    attack_Magic()
    {
        if(gameManager.Magic() > 0)
        {
            this.bullet = this.magic.getFirstExists(false);
            if (this.bullet)
            {
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
            gameManager.Use_Magic(1);
        }
    }

    hit()
    {
        console.log(gameManager.Life());
        if(!this.Talos_Please_Help_Me)
        {
            if(gameManager.Life() > 0)
            {
                gameManager.Use_Life(1);
                this.Talos_Please_Help_Me = true;
                this.timer.add(500, All_God_Things_Ends, this);
                this.timer.start();
            }
            else this.dovah.kill();
            function All_God_Things_Ends() { this.Talos_Please_Help_Me = false; }
        }
    }
}