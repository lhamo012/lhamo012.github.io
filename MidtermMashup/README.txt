
var musixtoken = "f675e6b3016cca4313771ec978c56751";
var musixbaseurl = "https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/";

let musixh = new Headers();
musixh.append('Authorization', musixtoken);

async function showLyrics(button) {
    clearLyrics();
    var buttonText = button.innerText;
    var fullText = button.parentElement.innerText;
    var trackname = fullText.replace(buttonText, '');
    // get the track to get it's track id
    var searchURL = musixbaseurl + 'track.search?q_track=' + trackname + '&apikey='+ musixtoken;
    const req = await makeRequest(searchURL, musixh);
    submit(setTrackID, req);
}

async function setTrackID(data) {
    if (data.message.body.track_list.length == 0) {
        console.log("Musixmatch does not have a trackID for this song. Please choose another song!");
        alert("Musixmatch does not have a trackID for this song. Please choose another song!");
    } else {
        const trackid = data.message.body.track_list[0].track.track_id;
        var trackURL = musixbaseurl + 'track.lyrics.get?track_id=' + trackid + '&apikey=' + musixtoken;
        const req = await makeRequest(trackURL, musixh);
        submit(displayLyrics, req);
    }
}

function displayLyrics(data) {
    if (data.message.body.length == 0 || data.message.body.lyrics.lyrics_body == "") {
        document.getElementById("lyrics").innerHTML = "Oops MusixMatch API does not have lyrics for this song! ☹️";
    } else {
        document.getElementById("lyrics").innerHTML = data.message.body.lyrics.lyrics_body;
    }
}

function temp() {
    document.getElementById("lyrics").innerHTML = "Yes! It's so crazy right now! Most incredibly, it's ya girl, Bee It's ya boy, young. You ready? Uh oh, uh oh, uh oh, oh no no Uh oh, uh oh, uh oh, oh no no Uh oh, uh oh, uh oh, oh no no Uh oh, uh oh, uh oh, oh no no Yea, history in the making, it's so crazy right now I look and stare so deep in your eyes I touch on you more and more every time When you leave I'm begging you not to go Call your name two or three times in a row Such a funny thing for me to try to explain How I'm feeling and my pride is the one to blame. 'Cuz I know I don't understand Just how your love your doing no one else can.Got me looking so crazy right now, your love's Got me looking so crazy right now (in love) Got me looking so crazy right now, your touch Got me looking so crazy right now (your touch) Got me hoping you'll page me right now, your kiss Got me hoping you'll save me right now Looking so crazy in love's Got me looking, got me looking so crazy in love.Uh oh, uh oh, uh oh, oh no no Uh oh, uh oh, uh oh, oh no no ... ******* This Lyrics is NOT for Commercial use ******* (1409618693831)";
}
