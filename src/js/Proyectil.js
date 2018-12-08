'use strict';
var bullet;
function proyectil(game, pos_X, pos_Y, angle, velocity_X, velocity_Y, scale, group)
{
    bullet = group.getFirstExists(false);

    if (bullet)
    {
        bullet.reset(pos_X , pos_Y);
        bullet.body.velocity.y = velocity_Y;
        bullet.body.velocity.x = velocity_X;
        bullet.scale.x = scale;
        bullet.angle = angle;
    }
}
module.exports = proyectil;