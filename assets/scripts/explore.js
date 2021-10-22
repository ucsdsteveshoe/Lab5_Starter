// explore.js

let cancelableInterval;

window.addEventListener('DOMContentLoaded', init);

function init() {

  // speechSynthesis needs a moment to load voices. Keep trying until they're in
  cancelableInterval = setInterval(() => {
    if(speechSynthesis.getVoices().length != 0){
      clearInterval(cancelableInterval);
      main();
    }
  }, 50)
}

function main() {

  // Load in voices as options
  const select_voice = document.querySelector('select');
  
  const ssVoices = speechSynthesis.getVoices();

  ssVoices.forEach(voice => {
    let newVoice = document.createElement('option');

    newVoice.innerHTML = voice.name;
    newVoice.value = voice.name;

    select_voice.appendChild(newVoice);
  });

  const image_asset = "assets/images/smiling";

  const text_input = document.querySelector('textarea');
  const talk_button = document.querySelector('button');
  const face_element = document.querySelector('img');

  talk_button.addEventListener('click', () => {
    const utterance = new SpeechSynthesisUtterance(text_input.value);
    utterance.voice = ssVoices.find(val => val.name == select_voice.value);
    face_element.setAttribute('src', image_asset + "-open.png");
    speechSynthesis.speak(utterance);
    utterance.addEventListener('end', () => {
      face_element.setAttribute('src', image_asset + ".png");
    })
  })
}