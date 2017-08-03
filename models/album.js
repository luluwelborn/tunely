var mongoose = require("mongoose");
var Schema = mongoose.Schema;

let AlbumSchema = new Schema ({
	artistName: String,
    name: String,
    releaseDate: String,
    genres: [ String ]
});

let Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;

// Song model request
var Song = require ('./album');
module.exports.Song = Song;
