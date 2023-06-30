window.addEventListener('DOMContentLoaded', (event) => {
    const audio = new Audio();
    const playStopBtn = document.getElementById("play-stop-btn");
    const volumeSlider = document.getElementById("volume-slider");
    const papperElem = document.querySelector(".papper");

    const musicFilePath = "music/indila.mp3";

    audio.src = musicFilePath;
    audio.volume = 0.3;

    let isPlaying = false;
    let isMobile = false;

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        isMobile = true;
    }

    playStopBtn.addEventListener('click', togglePlayStop);
    papperElem.addEventListener('click', togglePlayStop);

    if (isMobile) {
        papperElem.addEventListener('touchend', handleMobileTouch);
        papperElem.addEventListener('touchmove', handleMobileTouch);
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
        } else {
            audio.pause();
            playStopBtn.innerHTML = '<i class="fas fa-play"></i>';
            isPlaying = false;
        }
    }

    function handleMobileTouch(event) {
        event.preventDefault();
        if (!isPlaying) {
            audio.play()
                .then(() => {
                    playStopBtn.innerHTML = '<i class="fas fa-stop"></i>';
                    isPlaying = true;
                })
                .catch((error) => {
                    console.log("Tidak dapat memutar musik: ", error);
                });
        } else {
            audio.pause();
            playStopBtn.innerHTML = '<i class="fas fa-play"></i>';
            isPlaying = false;
        }
    }

    // Matikan musik saat halaman ditutup
    window.addEventListener('beforeunload', () => {
        audio.pause();
        audio.currentTime = 0;
    });
});
