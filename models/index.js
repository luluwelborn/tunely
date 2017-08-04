var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/tunely");

var Album = require ('./album');
var Song = require ('./song');

module.exports.Album = Album;
module.exports.Song = Song;
// console.log(Song);

// do i need var Song = require ('./song'); or module.exports.Song = require ();