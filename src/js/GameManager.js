'use strict';
var magic = 10;
var stamina = 10;
var life = 9;
var thuum = 9;
var skill_Points = 9;

function Magic () { return magic; }
function Use_Magic(num) { magic = magic - num;}
function Recover_Magic() { if(magic < 10) magic++; }

function Stamina () { return stamina; }
function Use_Stamina(num) { stamina = stamina - num;}
function Recover_Stamine() { if(stamina < 10) stamina++; }

function Life () { return life; }
function Use_Life(num) {life = life - num;}

function Thuum () { return thuum; }
function Use_Thuum() {thuum = 9;}
function Recover_Thumm() {thuum--;}

function New_Skill() 
{ 
    if(skill_Points > 0) return true;
    else return false;
}
function Level_UP() { skill_Points++; }
function Use_Skill_Point() { skill_Points--; }

function Restart()
{
    magic = 9;
    stamina = 9;
    life = 9;
    thuum = 9;
}
module.exports = { Life, Use_Life, Stamina, Use_Stamina, Magic,  Use_Magic, 
                   Thuum, Use_Thuum, Recover_Thumm, Recover_Magic, Recover_Stamine, 
                   Restart, New_Skill, Level_UP, Use_Skill_Point};