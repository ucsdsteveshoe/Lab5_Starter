// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  
  // BULLET 1 - Change the horn image and audio playback
  const image_asset = "assets/images/";
  const audio_asset = "assets/audio/";

  const audio_player = document.querySelector("audio");
  const horn_image = document.querySelector("img");
  const horn_selector = document.getElementById("horn-select");

  horn_selector.addEventListener('change', () => {

    horn_image.setAttribute('src', image_asset + horn_selector.value + ".svg");
    audio_player.setAttribute('src', audio_asset + horn_selector.value + ".mp3");
  });

  // BULLET 2 - Change the audio image and volume when scrolled
  const volume_asset = "assets/icons/volume-level-";

  const volume_input = document.getElementById("volume");
  const volume_image = document.querySelector("div img");

  // NOTE - 'input' changes for each value, 'change' changes for each single scroll
  volume_input.addEventListener('input', () => {

    const vol = volume_input.value

    if (vol == 0) {
      volume_image.setAttribute('src', volume_asset + "0.svg");
    } else if (vol < 33) {
      volume_image.setAttribute('src', volume_asset + "1.svg");
    } else if (vol < 67) {
      volume_image.setAttribute('src', volume_asset + "2.svg");
    } else {
      volume_image.setAttribute('src', volume_asset + "3.svg");
    }

    audio_player.volume = vol / 100;
  })

  // BULLET 3 - Play audio and launch confetti with the party horn
  const button = document.querySelector("button");

  const jsConfetti = new JSConfetti()

  button.addEventListener('click', () => {
    audio_player.play();

    if (horn_selector.value == "party-horn" && volume_input.value != 0) {
      jsConfetti.addConfetti()
    }
  });
}