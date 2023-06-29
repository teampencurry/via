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
