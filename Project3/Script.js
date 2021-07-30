// Get DOM Element
const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const time = document.getElementById('time');

// Function for Play and Pause video
function playPauseVideo() {
    // Check if video is play or paused
    if (video.paused) {
        // If video is paused, play the video
        video.play();
    } else{
        // If video is play, pause the video
        video.pause();
    }
};

// Function for update play / pause icon
function updateIcons() {
    // Check if video is play or paused
    if (video.paused) {
        // If video is paused, change the icon to play
        play.innerHTML = '<i class="fa fa-play fa-2x"></i>'
    } else {
        // If video is play, change the icon to pause
        play.innerHTML = '<i class="fa fa-pause fa-2x"></i>'
    }
    
}

// Function for update progress of progress 
function updateProgress() {
    // Update the value of progess bar using current time / total time
    progress.value = (video.currentTime/video.duration)*100;
    // Use current time to calculate minutes
    let minutes = Math.floor(video.currentTime / 60)
    // Format minutes to always be 2 digits
    if (minutes < 10) {
        minutes = '0' + String(minutes);
    }
    // Use current time to calculate seconds
    let seconds = Math.floor(video.currentTime % 60)
    // Format seconds to always be 2 digits
    if (seconds < 10) {
        seconds = '0' + String(seconds);
    }
    //update the time in UI
    time.innerHTML = `${minutes}:${seconds}`;
};

// Function for stop video 
function stopVideo() {
    video.currentTime = 0;
    video.pause();
};

// Function to update the video progress based on progress bar
function updateVideoProgress() {
    // Set the current time of vedio based on position of slider
    video.currentTime = (+progress.value * video.duration) /100;
};


// Event Listner on video
//1. Listen for click on video element
video.addEventListener('click', playPauseVideo);
//2. Listen for play video event
video.addEventListener('play', updateIcons);
//3. Listen for pause video event
video.addEventListener('pause', updateIcons);
//4. Listen for timeUpdate video event
video.addEventListener('timeupdate', updateProgress);
//5. Listen for click on play button
play.addEventListener('click', playPauseVideo);
//6. Listen for click on stop button
stop.addEventListener('click', stopVideo);
//7. Listen for change event on progress bar
progress.addEventListener('change', updateVideoProgress);
