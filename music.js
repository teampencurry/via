window.addEventListener('DOMContentLoaded', (event) => {
    const audio = new Audio();
    const playStopBtn = document.getElementById("play-stop-btn");
    const volumeSlider = document.getElementById("volume-slider");
    
    const musicFilePath = "music/indila.mp3";
    
    audio.src = musicFilePath;
    audio.volume = volumeSlider.value / 100; // Mengatur volume awal
    
    let isPlaying = false;
    
    playStopBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            audio.currentTime = 0;
            playStopBtn.innerHTML = '<i class="fas fa-play"></i>';
            isPlaying = false;
        } else {
            audio.play()
            .then(() => {
                playStopBtn.innerHTML = '<i class="fas fa-stop"></i>';
                isPlaying = true;
            })
            .catch((error) => {
                console.log("Tidak dapat memutar musik: ", error);
            });
        }
    });
    
    volumeSlider.addEventListener('input', () => {
        audio.volume = volumeSlider.value / 100;
    });
});
