// script.js

let currentIndex = 0;
let isPlaying = false;

const audio = document.getElementById("audioPlayer");
const playlistPage = document.getElementById("playlistPage");
const playerPage = document.getElementById("playerPage");
const songList = document.getElementById("songList");
const playerTitle = document.getElementById("playerTitle");
const playerArtist = document.getElementById("playerArtist");
const playerCover = document.getElementById("playerCover");

const progressBar = document.getElementById("progressBar");
const currentTimeEl = document.getElementById("currentTime");
const totalTimeEl = document.getElementById("totalTime");
const playPauseIcon = document.getElementById("playPauseIcon");
const volumeSlider = document.getElementById("volumeSlider");

// Build playlist UI
function initPlaylist() {
    songList.innerHTML = songs.map((song, i) => `
        <div class="song-item" onclick="playSong(${i})">
            <img src="${song.cover}" class="song-cover">
            <div class="song-info">
                <div class="song-title">${song.title}</div>
                <div class="song-artist">${song.artist}</div>
            </div>
            <div class="song-duration">${song.duration}</div>
        </div>
    `).join("");
}

function playSong(index) {
    currentIndex = index;
    const song = songs[index];

    audio.src = song.audio;
    playerTitle.textContent = song.title;
    playerArtist.textContent = song.artist;
    playerCover.src = song.cover;

    showPlayer();
    audio.play();
    isPlaying = true;
    updatePlayPauseIcon();
}

function showPlayer() {
    playlistPage.style.display = "none";
    playerPage.classList.add("active");
}

function showPlaylist() {
    playerPage.classList.remove("active");
    playlistPage.style.display = "block";
}

function togglePlay() {
    if (isPlaying) {
        audio.pause();
    } else {
        audio.play();
    }
    isPlaying = !isPlaying;
    updatePlayPauseIcon();
}

function updatePlayPauseIcon() {
    playPauseIcon.textContent = isPlaying ? "⏸" : "▶";
}

function nextSong() {
    currentIndex = (currentIndex + 1) % songs.length;
    playSong(currentIndex);
}

function previousSong() {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    playSong(currentIndex);
}

progressBar.addEventListener("input", () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
});

audio.addEventListener("timeupdate", () => {
    progressBar.value = (audio.currentTime / audio.duration) * 100;
    currentTimeEl.textContent = formatTime(audio.currentTime);
});

audio.addEventListener("loadedmetadata", () => {
    totalTimeEl.textContent = formatTime(audio.duration);
});

audio.addEventListener("ended", nextSong);

volumeSlider.addEventListener("input", (e) => {
    audio.volume = e.target.value / 100;
});

function formatTime(s) {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
}

audio.volume = 0.7;
initPlaylist();
