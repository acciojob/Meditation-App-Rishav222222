//your JS code here. If required.
document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('video');
    const audio = document.getElementById('audio');
    const playBtn = document.getElementById('play-btn');
    const timeDisplay = document.getElementById('time-display');
    const timeButtons = document.querySelectorAll('#time-select button');
    const soundButtons = document.querySelectorAll('.sound-picker button');

    let duration = 600; // Default 10 minutes
    let countdown;
    let isPlaying = false;

    // Function to switch sound and video
    const switchMode = (mode) => {
        if (mode === 'beach') {
            video.src = 'videos/beach.mp4';
            audio.src = 'sounds/beach.mp3';
        } else if (mode === 'rain') {
            video.src = 'videos/rain.mp4';
            audio.src = 'sounds/rain.mp3';
        }
        if (isPlaying) audio.play();
    };

    // Function to update time display
    const updateTimeDisplay = () => {
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    // Function to start and stop meditation
    const togglePlay = () => {
        if (isPlaying) {
            clearInterval(countdown);
            audio.pause();
            playBtn.textContent = 'Play';
        } else {
            countdown = setInterval(() => {
                duration--;
                updateTimeDisplay();
                if (duration <= 0) {
                    clearInterval(countdown);
                    audio.pause();
                    playBtn.textContent = 'Play';
                }
            }, 1000);
            audio.play();
            playBtn.textContent = 'Pause';
        }
        isPlaying = !isPlaying;
    };

    // Event listeners for time buttons
    timeButtons.forEach(button => {
        button.addEventListener('click', () => {
            duration = parseInt(button.getAttribute('data-time'));
            updateTimeDisplay();
            if (isPlaying) {
                clearInterval(countdown);
                togglePlay();
            }
        });
    });

    // Event listeners for sound buttons
    soundButtons.forEach(button => {
        button.addEventListener('click', () => {
            const mode = button.id.split('-')[0]; // Get mode from button id
            switchMode(mode);
        });
    });

    // Event listener for play button
    playBtn.addEventListener('click', togglePlay);

    // Initial setup
    switchMode('beach');
    updateTimeDisplay();
});