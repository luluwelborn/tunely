var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/tunely");

var Album = require ('./album');
module.exports.Album = Album;

// Song model require
var Song = require ('./album');
module.exports.Song = Song;
// console.log(Song);