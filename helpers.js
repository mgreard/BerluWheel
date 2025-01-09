
// Ease-out cubic function for smooth deceleration
function easeOutCubic(x) {
  return 1 - pow(1 - x, 3);
}

let lyricsSample = `pour un badge VIP,
pendant une longue intro,
(fais tourner ! fais tourner !)
pour voir la queue du loup,
pour douze heures de TO

On fait tourner la roue
(fais tourner ! fais tourner !)
sur la berlu TV
(fais tourner ! fais tourner !)
on fait le cri du loup
(fais tourner ! fais tourner !)
auto roue c est doublee
(Woyoy !)

pour un badge VIP,
pour douze heures de TO,
(fais tourner ! fais tourner !)
pour voir la queue du loup,
pour gagner le gros lot

On fait tourner la roue
(fais tourner ! fais tourner !)
sur la berlu TV
(fais tourner ! fais tourner !)
on fait le cri du loup
(fais tourner ! fais tourner !)
bananes bien depensees
(Woyoy !)

one love, iyah !
Fais tourner la roue, Bababoy !
`;

let lyrics = lyricsSample.split('\n');
let lyricsData = [];
let currentIndex = 0;

function recordLyrics () {
   if(audioManager.audioTrack.isPlaying() && audioManager.audioTrack.currentTime() > 2){
    // Get current time when mouse is pressed
    let currentTime = round(audioManager.audioTrack.currentTime(), 2);
    
    // Push the current lyric line and the time to the lyricsData array
    if (currentIndex < lyrics.length) {
      lyricsData.push({ time: currentTime, text: lyrics[currentIndex] });
      currentIndex++; // Move to the next line of lyrics
    }

    // Once all lyrics are collected, log them
    //if (currentIndex === lyrics.length) {
      console.log(JSON.stringify({ lyrics: lyricsData }, null, 2));
    //}
  }
}

let recordedEvents = [];
// Fonction pour enregistrer un événement lorsqu'une touche est enfoncée
function recordEvents(event) {
  let currentKey = event.key;

  // Déterminer l'action à effectuer en fonction de la touche
  let action = '';
  if (currentKey === 'r') { // Si la touche 'r' est pressée, "roll"
    action = 'start_roll';
    wheel1.roll();
    wheel2.roll();
  } else if (currentKey === 'l') { // Si la touche 'l' est pressée, afficher le loup
    action = 'show_loup';
    loup.show();
  } else if (currentKey === 'h') { // Si la touche 'h' est pressée, masquer le loup
    action = 'hide_loup';
    loup.hide();
  } else {
    return; // Si une touche non définie est pressée, ne rien faire
  }

  // Ajouter l'événement avec le temps actuel
  recordedEvents.push({ time: audioManager.audioTrack.currentTime(), action: action });
  
  // Afficher dans la console pour le debug
  console.log(JSON.stringify({ events: recordedEvents }, null, 2));
}