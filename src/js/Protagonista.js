'use strict';
const gameManager = require ('./GameManager.js');
var magic_Create =  require ('./Proyectil.js');
var magic_Cast;

module.exports = class Dovah{
    constructor(texture_Dova, group_Melee, group_Magic, game, level_UP)
    {
        this.dovah_dir = 1;
        this.Talos_Please_Help_Me = false;
        this.dovah = texture_Dova;
        this.melee = group_Melee;
        this.melee_Damage = 1;
        this.melee_Cost = 3;
        this.melee_Recover = 3;
        this.melee_Level = 0;
        this.magic = group_Magic;
        this.magic_Damage = 1;
        this.magic_Cost = 4;
        this.magic_Level = 0;
        this.magic_Recover = 3;
        this.thuum_Recover = 8;
        this.thuum_Level = 0;
        this.game = game;
        this.EXP = 0;
        this.level_UP = level_UP;

        this.timer = this.game.time.create(false);
        this.thuum_Recover_Loop = this.game.time.events.loop(1000 * this.thuum_Recover, thuum, this);
        function thuum () { gameManager.Recover_Thumm(); }
        this.magic_Recover_Loop = this.game.time.events.loop(1000 * this.magic_Recover, magic, this);
        function magic () { gameManager.Recover_Magic(); }
        this.melee_Recover_Loop = this.game.time.events.loop(1000 * this.melee_Recover, stamina, this);
        function stamina () { gameManager.Recover_Stamine(); }
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
        this.attack = this.melee.getFirstExists(false);
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
                gameManager.Use_Stamina(this.melee_Cost);
                this.timer.add(450, stop, this);
                this.timer.start();
                function stop() { this.melee.callAll('kill'); }
        }
    }
    attack_Magic()
    {
        if(gameManager.Magic() > 0)
        {
            this.bullet = this.magic.getFirstExists(false);
            if (this.bullet)
            {
                this.bullet.body.setSize(30, 30, 0, -30);
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
            gameManager.Use_Magic(this.magic_Cost);
        }
    }
    hit()
    {
        if(!this.Talos_Please_Help_Me)
        {
                gameManager.Use_Life(1);
                this.Talos_Please_Help_Me = true;
                this.timer.add(500, All_God_Things_Ends, this);
                this.timer.start();
            function All_God_Things_Ends() { this.Talos_Please_Help_Me = false; }
        }
        if(gameManager.Life() < 0) this.dovah.kill();
    }
    magic_UP(cost, power, cooldown)
    {
        this.magic_Level++;
        if(this.magic_Cost - cost > 0) this.magic_Cost = this.magic_Cost - cost;
        this.magic_Damage = this.magic_Damage + power;
        if(this.magic_Recover - cooldown > 0) this.magic_Recover = this.magic_Recover - cooldown;
        this.game.time.events.remove(this.magic_Recover_Loop);
        this.magic_Recover_Loop = this.game.time.events.loop(1000 * this.magic_Recover, magic, this);
        function magic () { gameManager.Recover_Magic(); }  
    }
    melee_UP(cost, power, cooldown)
    {
        this.melee_Level++;
        if(this.melee_Cost - cost > 0) this.melee_Cost = this.melee_Cost - cost;
        this.melee_Damage = this.melee_Damage + power;
        if(this.melee_Recover - cooldown > 0) this.melee_Recover = this.melee_Recover - cooldown;
        this.game.time.events.remove(this.melee_Recover_Loop);
        this.melee_Recover_Loop = this.game.time.events.loop(1000 * this.melee_Recover, melee, this);
        function melee () { gameManager.Recover_Stamine(); }  
    }
    thuum_UP(cooldown)
    {
        this.thuum_Level++;
        if(this.thuum_Recover - cooldown > 0) this.thuum_Recover = this.thuum_Recover - cooldown;
        this.game.time.events.remove(this.thuum_Recover_Loop);
        this.thuum_Recover_Loop = this.game.time.events.loop(1000 * this.thuum_Recover, thuum, this);
        function thuum () { gameManager.Recover_Thumm(); }
    }
    gain_EXP(Exp)
    {
        this.EXP = this.EXP + Exp;
        if(this.EXP >= 10)
        {
            console.log('caching!!!');
            this.level_UP.visible = true;
            this.timer.add(1000, end, this);
            this.timer.start();
            function end() 
            {
                this.level_UP.visible = false;
            }
            this.EXP = this.EXP - 10;
            gameManager.Level_UP();
        } 
    }
}