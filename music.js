window.addEventListener('DOMContentLoaded', (event) => {
    const audio = new Audio();
    const playStopBtn = document.getElementById("play-stop-btn");
    const volumeSlider = document.getElementById("volume-slider");
    const papperElem = document.querySelector(".papper");

    const musicFilePath = "music/indila.mp3";

    audio.src = musicFilePath;
    audio.volume = 0.3; // Mengatur volume awal menjadi 30%

    let isPlaying = false;
    let isMobile = false;

    // Cek apakah pengguna mengakses halaman melalui perangkat mobile
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        isMobile = true;
    }

    playStopBtn.addEventListener('click', togglePlayStop);
    papperElem.addEventListener('click', togglePlayStop);

    if (isMobile) {
        papperElem.addEventListener('touchstart', startMusic);
    }

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

    function startMusic() {
        if (isMobile && !isPlaying) {
            audio.play()
                .then(() => {
                    playStopBtn.innerHTML = '<i class="fas fa-stop"></i>';
                    isPlaying = true;
                    papperElem.removeEventListener('touchstart', startMusic);
                })
                .catch((error) => {
                    console.log("Tidak dapat memutar musik: ", error);
                });
        }
    }
});
