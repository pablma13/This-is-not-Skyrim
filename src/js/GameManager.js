'use strict';
var magic = 10;
var stamina = 10;
var life = 10;
var thuum = 9;
var skill_Points = 0;
var magic_Damage = 1;
var magic_Cost = 4;
var magic_Level = 0;
var magic_Recover = 3;
var thuum_Recover = 8;
var thuum_Level = 0;
var melee_Damage = 1;
var melee_Cost = 3;
var melee_Recover = 3;
var melee_Level = 0;
var EXP = 0;
var level = 1;

function give_Me(something) {
    switch (something) {
        case 'magic':
            return magic;
            break;
        case 'stamina':
            return stamina;
            break;
        case 'life':
            return life;
            break;
        case 'thuum':
            return thuum;
            break;
        case 'skill_Points':
            return skill_Points;
            break;
        case 'magic_Damage':
            return magic_Damage;
            break;
        case 'magic_Cost':
            return magic_Cost;
            break;
        case 'magic_Recover':
            return magic_Recover;
            break;
        case 'magic_Level':
            return magic_Level;
            break;
        case 'thuum_Recover':
            return thuum_Recover;
            break;
        case 'thuum_Level':
            return thuum_Level;
            break;
        case 'melee_Damage':
            return melee_Damage;
            break;
        case 'melee_Cost':
            return melee_Cost;
            break;
        case 'melee_Recover':
            return melee_Recover;
            break;
        case 'melee_Level':
            return melee_Level;
            break;
        case 'melee_Damage':
            return melee_Damage;
            break;
        case 'EXP':
            return EXP;
            break;
        case 'level':
            return level;
            break;
    }
}

function EXP_UP(loot) {
    EXP = EXP + loot;
    if (EXP >= 5 * (level / 2)) {
        level++;
        skill_Points++;
        EXP = 2 * (level / 2);
        return true;
    }
    else return false;
}

function skill_UP(cost, power, cooldown, skill) {
    switch (skill) {
        case 'magic':
            magic_Level++;
            if (magic_Cost - cost > 0) magic_Cost = magic_Cost - cost;
            magic_Damage = magic_Damage + power;
            if (magic_Recover - cooldown > 0) magic_Recover = magic_Recover - cooldown;
            break;
        case 'melee':
            melee_Level++;
            if (melee_Cost - cost > 0) melee_Cost = melee_Cost - cost;
            melee_Damage = melee_Damage + power;
            if (melee_Recover - cooldown > 0) melee_Recover = melee_Recover - cooldown;
            break;
        case 'thuum':
            thuum_Level++;
            if (thuum_Recover - cooldown > 0) thuum_Recover = thuum_Recover - cooldown;
            break;
    }
}

function Use_Magic() { magic = magic - magic_Cost; }
function Recover_Magic() { if (magic < 10) magic++; }

function Use_Stamina(num) { stamina = stamina - melee_Cost; }
function Recover_Stamine() { if (stamina < 10) stamina++; }

function Use_Life(num) { life = life - num; }
function Recover_Life() { if (life < 10) life++; }

function Use_Thuum() { thuum = 9; }
function Recover_Thumm() { thuum--; }

function New_Skill() {
    if (skill_Points > 0) return true;
    else return false;
}

function Use_Skill_Point() { skill_Points--; }

function Restart() {
    magic = 10;
    stamina = 10;
    life = 10;
    thuum = 9;
    skill_Points = 0;
    magic_Damage = 1;
    magic_Cost = 4;
    magic_Level = 0;
    magic_Recover = 3;
    thuum_Recover = 8;
    thuum_Level = 0;
    melee_Damage = 1;
    melee_Cost = 3;
    melee_Recover = 3;
    melee_Level = 0;
}
module.exports = {
    Use_Life, Use_Stamina, Use_Magic,
    Use_Thuum, Recover_Thumm, Recover_Magic, Recover_Stamine,
    Restart, New_Skill, Use_Skill_Point, Recover_Life,
    EXP_UP, skill_UP, give_Me
};