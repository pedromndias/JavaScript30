// Let's get the elements:
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// Function to toggle the video play/pause:
function togglePlay() {
    if(video.paused) {
        video.play()
    } else {
        video.pause()
    }
}

// Function that chamfes the play's button design:
function updateButton() {
    // Note how "this" refers to "video" on the event listener:
    const icon = this.paused ? '►' : '❚ ❚'
    toggle.textContent = icon
}

// Function to control the skip buttons
function skip() {
    // Note it will grab its dataset (data-skip) to determine how much to skip:
    video.currentTime += parseFloat(this.dataset.skip)
}

// Function to handle ranges updates:
function handleRangeUpdate() {
    // Note how the property "name" (from HTML) has the same name as the property we want to update on the video (volume and playbackRate). Square brackets because the are strings:
    video[this.name] = this.value
}

// Function to handle the progress bar changes:
function handleProgress() {
    // We will update the "flex-basis" property with percentage, based on how far we are on the video
    const percent = (video.currentTime / video.duration) * 100
    progressBar.style.flexBasis = `${percent}%`
}

// Function to handle the manual progress bar change:
function scrub(e) {
    // We will calculate the time with the offsetX given by the event and the total width of the bar:
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration
    video.currentTime = scrubTime
}


// Event listeners to play/pause the video
video.addEventListener("click", togglePlay)
toggle.addEventListener("click", togglePlay)

// Event listeners to change the plays's button design
video.addEventListener("play", updateButton)
video.addEventListener("pause", updateButton)

// Event listener for the video's time update
video.addEventListener("timeupdate", handleProgress)

// Event listeners for the skip buttons:
skipButtons.forEach(item => {
    item.addEventListener("click", skip)
})

// Event listeners for changes on the ranges:
ranges.forEach(item => item.addEventListener("change", handleRangeUpdate))
ranges.forEach(item => item.addEventListener("mousemove", handleRangeUpdate))

// Event listener for a click on the progress bar:
progress.addEventListener("click", scrub)
// We also want to make sure only to update if the mouse is down:
let mousedown = false
progress.addEventListener("mousedown", () => mousedown = true)
progress.addEventListener("mouseup", () => mousedown = false)
// Note how we return the function in case mousedown is true:
progress.addEventListener("mousemove", (e) => mousedown && scrub(e))