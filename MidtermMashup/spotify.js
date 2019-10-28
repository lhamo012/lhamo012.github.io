
// Spotify API requirements
var spotifytoken = 'BQCj96LDoe3jaX54OdePc40QFucVd1ShsYWDH6Nl8GrbwXmnGoFtPVG6uxnyLYTQRxX5Rg96CKcyie303jmNt9tbnD510dDHV7Och-Y-OIz_MkPQn7f6yVF7r6yxqwNugX-5D5fP_nPdj-8oQQ';
// Defining headers
let spotifyh = new Headers();
spotifyh.append('Authorization', 'Bearer ' + spotifytoken);
spotifyh.append('Accept', 'application/json');
spotifyh.append('Content-Type', 'application/json');

const spotifybaseurl = 'https://api.spotify.com/v1';
const search_ex = "/search?";
var art_ex = "/artists/";
var artistID;
var artistTopTracksURL;
var artistname;

function makeRequest(url, h) {
    req = new Request(url, {
        method: 'GET',
        headers: h,
        mode: 'cors'
    });
    return req;
}

async function searchArtist() {
    artistname = document.getElementById("artistname").value;
    clearLyrics();
    if (artistname == "") {
        alert("Please enter an artistname");
        clearFields();
    } else {
        var searchURL = spotifybaseurl + search_ex + 'q=' + artistname + '&type=artist';
        const req = await makeRequest(searchURL, spotifyh);
        // Gets response and sets artist ID
        submit(setArtistID, req);
    }
}

// Sets the artistID and the toptracks url
async function setArtistID(data) {
    // Check if artist is valid
    if (data.artists.items.length == 0) {
        await alert("Could not find artist! Please try again!");
        clearFields();
    } else {
        artistID = data.artists.items[0].id;
        artistTopTracksURL = spotifybaseurl + art_ex + artistID + '/' + 'top-tracks?country=ES';
        const req2 = await makeRequest(artistTopTracksURL, spotifyh)
        submit(printTopSongs, req2);
    }
}

// Prints the top tracks as a list
function printTopSongs(data) {
    if (data.tracks.length == 0) {
        console.log(artistname + "does not have any top songs!");
        alert(artistname + "does not have any top songs!");
        clearFields();
    } else {
        // Capitalize first letter of artistname 
        artistname = artistname[0].toUpperCase() +
            artistname.slice(1);
        let output = `<h2>Top Tracks for ${artistname}</h2>
                   <ol>
                 `;
        for (var i = 0, len = data.tracks.length; i < len; i++) {
            output += `
                    <li>${data.tracks[i].name}   <button id="showlyricsbtn" onclick="showLyrics(this)">Show Lyrics</button>
                    </li>
                       `
        }
        output += "</ol";
        document.getElementById("song_list").innerHTML = output;
    }
}

// Call Spotify API when submit button is clicked
async function submit(callback, request) {
        try {
            const response = await fetch(request);
            if (response.status != 200) {
                console.log("Fetch was not successful! Spotify's OAuth Token only works for 1 hour. Please contact lhamo012@umn.edu to get a new access token for grading Mid-term Mashup!");
            } else {
                const data = await response.json();
                callback(data);
                console.log(data);
            }
        }
        catch (err) {
            console.log('fetch failed', err);
        }
}

// Clear artist name
function clearFields() {
    document.getElementById('artistname').value = "";
}

// Clear lyrics 
function clearLyrics() {
    document.getElementById('lyrics').innerHTML = "";
}

