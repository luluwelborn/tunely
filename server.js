// SERVER-SIDE JAVASCRIPT

//require express in our app
var express = require('express');
// generate a new express app and call it 'app'
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

const db = require('./models');

/************
 * DATABASE *
 ************/

/* hard-coded data */
// var albumsList = [];
// albumsList.push({
//               artistName: 'the Old Kanye',
//               name: 'The College Dropout',
//               releaseDate: '2004, February 10',
//               genres: [ 'rap', 'hip hop' ]
//             });
// albumsList.push({
//               artistName: 'the New Kanye',
//               name: 'The Life of Pablo',
//               releaseDate: '2016, Febraury 14',
//               genres: [ 'hip hop' ]
//             });
// albumsList.push({
//               artistName: 'the always rude Kanye',
//               name: 'My Beautiful Dark Twisted Fantasy',
//               releaseDate: '2010, November 22',
//               genres: [ 'rap', 'hip hop' ]
//             });
// albumsList.push({
//               artistName: 'the sweet Kanye',
//               name: '808s & Heartbreak',
//               releaseDate: '2008, November 24',
//               genres: [ 'r&b', 'electropop', 'synthpop' ]
//             });



/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index (req, res){
  res.json({
    message: "Welcome to tunely!",
    documentation_url: "https://github.com/tgaff/tunely/api.md",
    base_url: "http://tunely.herokuapp.com",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes available endpoints"}
    ]
  });
});


app.get('/api/albums', function album_index(req, res){
  db.Album.find({}, function(err, albums) {
  res.json(albums);
  });
});


app.post('/api/albums', function album_new(req, res){
  console.log(req.body);
  db.Album.create(req.body, function(err, album) {
    // Split genres into string
    var genres = req.body.genres.split(", ");
    console.log(req.body.genres);
    res.json(album);
  });
});


// Add song to album
app.post('/api/albums/:album_id/songs', function(req, res){
  console.log('post song route');

  db.Album.findOne({
    _id: req.params.album_id
  }, function(err, album) {
    console.log(album);
    album.songs.push({
      name: req.body.name,
      trackNumber: req.body.trackNumber
    });
    album.save();
    res.json(album);
  });
});

// add song to album in modal
app.get('api/albums/:album_id', function(req, res){
  console.log("get album id route");
  db.Album.findOne({
    _id: req.params.album_id
  }, function(err, album) {
      res.json(album);
  });
});



/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});




