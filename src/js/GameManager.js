'use strict';
var magic = 9;
var stamina = 9;
var life = 9;

function Magic () { return magic; }
function Use_Magic(num) { magic = magic - num;}

function Stamina () { return stamina; }
function Use_Stamina(num) { stamina = stamina - num;}

function Life () { return life; }
function Use_Life(num) {life = life - num;}
module.exports = { Life, Use_Life, Stamina, Use_Stamina, Magic,  Use_Magic };