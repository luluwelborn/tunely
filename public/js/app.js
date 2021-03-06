/* CLIENT-SIDE JS

/* hard-coded data! */
var sampleAlbums = [];
sampleAlbums.push({
             artistName: 'Ladyhawke',
             name: 'Ladyhawke',
             releaseDate: '2008, November 18',
             genres: [ 'new wave', 'indie rock', 'synth pop' ]
           });
sampleAlbums.push({
             artistName: 'The Knife',
             name: 'Silent Shout',
             releaseDate: '2006, February 17',
             genres: [ 'synth pop', 'electronica', 'experimental' ]
           });
sampleAlbums.push({
             artistName: 'Juno Reactor',
             name: 'Shango',
             releaseDate: '2000, October 9',
             genres: [ 'electronic', 'goa trance', 'tribal house' ]
           });
sampleAlbums.push({
             artistName: 'Philip Wesley',
             name: 'Dark Night of the Soul',
             releaseDate: '2008, September 12',
             genres: [ 'piano' ]
           });
/* end of hard-coded data */


$(document).ready(function() {
  // console.log('app.js loaded!');
  $.get("http://localhost:3000/api/albums")
  .done(function(data) {
    let kanyeAlbums = data;
    kanyeAlbums.forEach(function (kanyeAlbum) {
      renderAlbum(kanyeAlbum);
      console.log('hello data', data);
    });

    // Album id click 
    $('.album').on('click', '.add-song', function(e) {
      // console.log('you clicked');
      var id = $(this).parents('.album').data('album-id');
      console.log('id',id);
      $('#songModal').data('album-id', id);
      $('#songModal').modal();
    });
  });


  // modal buttons click new song
  $('#saveSong').on('click', function handleNewSongSubmit() {
      // var id= $(this).parents('#songModal').data('album-id');
      // $('#saveSong').data('album-id', id);
      // $('#saveSong').modal();
      var newSong = $('#songName').val();
      var theTrack = $('#trackNumber').val(); 
      console.log(newSong, theTrack, "id:", id);
      var datastring = '&name=' + newSong + '&theTrack=' + theTrack;

      $.ajax({
        type: 'POST',
        url: '/api/albums/' + id + '/songs',
        datatype: 'json',
        data: datastring,
        success: successNewSong,
      });
      $(this).trigger("reset");
      $('#songModal').modal("hide");

    // OLD POST SONGS
    // $.ajax({
    //   type: 'POST',
    //   url: '/api/albums/' + id + '/songs',
    //   datatype: 'json',
    //   data: {
    //     name: newSong,
    //     trackNumber: theTrack
    // },
    // success: function() {
    //   console.log('yay');
    // }

    // });
  });
});

  function successNewSong() {
      $.ajax({
            type: 'GET',
            url: '/api/albums/' + id,
            success: renderUpdateAlbum
          });
  }

  function renderUpdateAlbum(json) {
    var albumToUpdate = $("div").find("[data-album-id=" + id + "]");
    console.log(json);
    albumToUpdate.remove();
    renderAlbum(json);
  }

// call form's addAlbum function
addAlbum();

function addAlbum() {
  // need to collect album-form data on submit
  $("form").submit(function() {
    console.log("form exisis");
    // stop from from submitting
     event.preventDefault();
    // Serialize data from #album-form
    var formData = $(this).serialize();
    console.log(formData);

    // reset form fields
    $(this).trigger('reset');

    function aFunction(response){
      console.log(response);
    };
    // this is close, ajax needs to send "POST" form data
    $.ajax({
       type: "POST",
       url: "http://localhost:3000/api/albums",
       data: formData,
       success: aFunction
    });
  });
}

// display song list on album
function buildSongsHtml(songs) {
  var songText = "-";
  var songsHTML = " ";
  Songs.forEach(function(song) {
  // take in song array here & return string
    songText = '(' + song.trackNumber + ') ' + song.name + "-";
    songsHTML += songText + " ";
  });
  return songsHTML;
};

// Display added song on page
function buildSongs(songs) {
  var listOfSongs = " ";
  songs.forEach(function(song) {
    listOfSongs = listOfSongs + "(" + song.trackNumber + ")" + song.name + "-";
  });

  var songHTML = "<li class = 'list-group-item'>" +
  "         <h4 class = 'inline-header'>Songs:</h4>" +
  "         <span>" + listOfSongs + "</span>" +
  "         </li>";

  return songHTML;

}


function renderAlbum(album) {
  var albumHtml =
  "        <!-- one album -->" +
  "        <div class='row album' data-album-id='" + album._id + "'>" +
  "          <div class='col-md-10 col-md-offset-1'>" +
  "            <div class='panel panel-default'>" +
  "              <div class='panel-body'>" +
  "              <!-- begin album internal row -->" +
  "                <div class='row'>" +
  "                  <div class='col-md-3 col-xs-12 thumbnail album-art'>" +
  "                     <img src='" + "http://placehold.it/400x400'" +  " alt='album image'>" +
  "                  </div>" +
  "                  <div class='col-md-9 col-xs-12'>" +
  "                    <ul class='list-group'>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Album Name:</h4>" +
  "                        <span class='album-name'>" + album.name + "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Artist Name:</h4>" +
  "                        <span class='artist-name'>" +  album.artistName + "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Released date:</h4>" +
  "                        <span class='album-releaseDate'>" + album.releaseDate + "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                      <h4 class='inline-header'>Songs:</h4>" +
  "                      <span>  – (1) Famous – (2) All of the Lights – (3) Guilt Trip – (4) Paranoid – (5) Ultralight Beam – (6) Runaway – (7) Stronger – </span>" +
  "                      </li>" +
  "                    </ul>" +
  "                  </div>" +
  "                </div>" +
  "                <!-- end of album internal row -->" +

  "              </div>" + // end of panel-body

                  // Add song button
  "               <div class='panel-footer'>" +
  "               <button class='btn btn-primary add-song'>Add Song</button>" +
  "               </div>" +

  "              <div class='panel-footer'>" +
  "              </div>" +

  "            </div>" +
  "          </div>" +
  "          <!-- end one album -->";

  // render #albums from html to the page with jQuery
  $('#albums').append(albumHtml);
}







