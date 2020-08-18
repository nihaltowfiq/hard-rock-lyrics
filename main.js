//search button event handler
document.getElementById('search-btn').addEventListener('click', function(){
    const inputSongName = document.getElementById('input-song-name').value; 
    getSongName(inputSongName);
    //validation alert that input can not be empty;
    if(inputSongName == '' || inputSongName == ' '){
        alert("Please Enter a Song Name");
    }
    //after clicking the search button lyrics area will be hide;
    document.getElementById('lyrics-show').innerText = '';
});
//this function is for call the API's data;
function getSongName(song){
    fetch(`https://api.lyrics.ovh/suggest/${song}`)
        .then(res => res.json())
        .then(data => {
            displaySongs(data)
            // console.log(data)
        });
};
//this function is for display the 10 searched songs;
function displaySongs(data){
    const parent = document.getElementById("search-result");
    parent.innerHTML = "";
    //this loop is for to capture first 10 object;
    for (let i = 0; i < 10; i++) {
        const element = data.data[i];
    parent.innerHTML += 
        `<div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-9">
                <h2 class="lyrics-name font-weight-bolder">${element.title}</h2>
                <p class="author lead font-weight-lighter">Album by <span class="font-weight-bold font-italic">${element.artist.name}</span></p>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyrics('${element.artist.name}', '${element.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
        </div>`;
    };
};
//this function is for get the Lyrics from the API;
function getLyrics(artist, title){
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
        .then(res => res.json())
        .then(data => {
            displayLyrics(data, title, artist)
            // console.log(data, title, artist);
        })
};
//this function is for display the Lyric;
function displayLyrics(data, title, artist){
    const parent = document.getElementById("lyrics-show");
    //this condition is for validation;
    if (data.lyrics == undefined){
        parent.innerHTML = `</br></br><h2 class="text-success mb-4 font-weight-bold">${title}</h2>
            <h5 class="text-warning mb-4 font-italic">${artist}</h5>
            </br></br><pre class="lyric text-white font-weight-bolder">LYRICS NOT FOUND</pre>`;
    }
    else{
        parent.innerHTML = `</br></br><h2 class="text-success mb-4 font-weight-bold">${title}</h2>
            <h5 class="text-warning mb-4 font-italic">${artist}</h5>
            </br></br><pre class="lyric text-white">${data.lyrics}</pre>`;
    }
};

