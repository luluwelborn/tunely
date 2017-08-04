var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Song = require('./song.js');

let AlbumSchema = new Schema ({
	artistName: String,
    name: String,
    releaseDate: String,
    genres: [ String ],
    songs: [{
    	name: String,
    	trackNumber: Number
    }]
});

let Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;

// // Song request
// var Song = require ('./album');
// module.exports.Song = Song;
