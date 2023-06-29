window.addEventListener('DOMContentLoaded', (event) => {
    const audio = new Audio();
    const playStopBtn = document.getElementById("play-stop-btn");
    const volumeSlider = document.getElementById("volume-slider");
    const papperElem = document.querySelector(".papper");

    const musicFilePath = "music/indila.mp3";

    audio.src = musicFilePath;
    audio.volume = 0.3; // Mengatur volume awal menjadi 30%

    let isPlaying = false;

    playStopBtn.addEventListener('click', togglePlayStop);
    papperElem.addEventListener('click', togglePlayStop);
    papperElem.addEventListener('touchstart', togglePlayStop);

    volumeSlider.addEventListener('input', () => {
        audio.volume = volumeSlider.value / 100;
    });

    function togglePlayStop() {
        if (!isPlaying) {
            audio.play()
                .then(() => {
                    playStopBtn.innerHTML = '<i class="fas fa-stop"></i>';
                    isPlaying = true;
                })
                .catch((error) => {
                    console.log("Tidak dapat memutar musik: ", error);
                });
        }
    }
});
