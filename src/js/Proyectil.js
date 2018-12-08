'use strict';

function proyectil(attack, pos_X, pos_Y, angle, velocity_X, velocity_Y, scale, group)
{
    bullet = group.getFirstExists(false);

    if (bullet)
    {
        bullet.reset(sprite.x + 6, sprite.y - 8);
        bullet.body.velocity.y = velocity_Y;
        bullet.body.velocity.x = velocity_X;
        bulletTime = game.time.now + 150;
        bullet.play('magic');
   /* attack.scale.x = scale;
    attack.x = pos_X;
    attack.y = pos_Y;
    attack.angle = angle;
    attack.body.velocity.y = velocity_Y;
    attack.body.velocity.x = velocity_X;
    attack.play('magic');*/
    }
}
module.exports = proyectil;