'use strict';

function proyectil(attack, pos_X, pos_Y, angle, velocity_X, velocity_Y, scale)
{
    attack.scale.x = scale;
    attack.x = pos_X;
    attack.y = pos_Y;
    attack.angle = angle;
    attack.body.velocity.y = velocity_Y;
    attack.body.velocity.x = velocity_X;
    attack.play('magic');
}
module.exports = proyectil;