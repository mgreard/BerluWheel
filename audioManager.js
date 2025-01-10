class AudioManager {
  constructor(fftAnalyzer, peakDetector, amplitudeAnalyzer) {
    this.audioTrack = null;
    this.events = [];
    this.lyrics = [];
    this.currentLyric = "";
    this.lyricIndex = 0;
    this.soundReady = false;

    // Audio analysis tools
    this.fftAnalyzer = fftAnalyzer;
    this.peakDetector = peakDetector;
    this.amplitudeAnalyzer = amplitudeAnalyzer;

    // Button for play/pause
    this.playButton = createButton().parent("#controls");
    this.playButton.html('<span class="play"></span>');
    this.playButton.attribute("class", "play_btn play");
    this.playButton.mousePressed(() => this.playPause());

    // Track selector
    this.trackSelect = createSelect().parent("#controls");
    this.trackSelect.attribute("class", "tracks_select");
    this.trackSelect.option("loup_reggae_2");
    this.trackSelect.option("loup_reggae");
    this.trackSelect.option("loup_techno_dub");
    this.trackSelect.option("loup_dance_funk");
    this.trackSelect.option("loup_fuzzy");
    this.trackSelect.option("loup_weird_pop");
    this.trackSelect.option("loup_funk_soul");
    this.trackSelect.changed(() => this.changeTrack());

    // Load the initial track
    this.changeTrack();
  }

  // 🟢 Play or pause the current track
  playPause() {
    if (this.soundReady && this.audioTrack) {
      if (this.audioTrack.isPlaying()) {
        this.playButton.html('<span class="play"></span>');
        this.playButton.attribute("class", "play_btn play");
        this.audioTrack.stop();
        this.resetLyrics();
      } else {
        this.playButton.html('<span class="stop"></span>');
        this.playButton.attribute("class", "play_btn stop");
        this.audioTrack.play();
      }
    }
  }

  // 🎶 Change the audio track and load corresponding lyrics
  changeTrack() {
    const selectedTrack = this.trackSelect.selected();
    if (this.audioTrack && this.audioTrack.isPlaying()) {
      this.audioTrack.stop();
    }

    this.resetLyrics();
    this.soundReady = false;
    this.playButton.html("...");
    this.playButton.attribute("class", "play_btn warning");
    loup.hide();

    // Load lyrics and audio track
    loadJSON(`assets/lyrics/${selectedTrack}.json`, (data) => {
      this.lyrics = data.lyrics;
      this.events = data.events;
    });

    this.audioTrack = loadSound(`assets/tracks/${selectedTrack}.mp3`, () => {
      this.amplitudeAnalyzer.setInput(this.audioTrack);
      this.soundReady = true;
      this.playButton.html('<span class="play"></span>');
      this.playButton.attribute("class", "play_btn play");
    });
  }

  // 🔁 Reset lyrics when a track stops or changes
  resetLyrics() {
    this.currentLyric = "";
    this.lyricIndex = 0;
  }

  // 🕒 Synchronize lyrics with the current audio time
  syncLyrics() {
    if (this.audioTrack && this.audioTrack.isPlaying() && this.lyricIndex < this.lyrics.length) {
      const currentTime = this.audioTrack.currentTime();
      if (currentTime >= this.lyrics[this.lyricIndex].time) {
        this.currentLyric = this.lyrics[this.lyricIndex].text;
        this.lyricIndex++;
      }
    }
  }
  
  displayLyrics() {
    const theme = themeManager.setting;
    push();
    translate(width / 2, height - 120);
    textAlign(CENTER, CENTER);
    let energy = this.fftAnalyzer.getEnergy(200, 400);
    lyricsTextSize = map(sin(millis() / 1000), -1, 1, 40, 40 * 1.4) * map(energy, 0, 250, 1, 1.05);
    textSize(lyricsTextSize);
    textFont(myFont);
    if(theme.general.textStrokeColor){
      stroke(theme.general.textStrokeColor);
      strokeWeight(8);
    }
    fill(theme.general.textColor || 255);
    text(this.currentLyric, 0, 0);
    pop();
  }

  // 🔊 Update audio analysis for beat detection and other visualizers
  updateAudioAnalysis() {
    this.fftAnalyzer.analyze();
    this.peakDetector.update(this.fftAnalyzer);
  }
  
  handleEvents() {
    // Parcourir la liste des événements dans le fichier de configuration
    for (let event of this.events) {
      // Vérifier si l'événement est dû
      if (abs(this.audioTrack.currentTime() - event.time) < 0.5) { // tolérance de 0.5 seconde pour chaque événement
        // Effectuer l'action associée à l'événement
        switch (event.action) {
          case 'start_roll':
            wheel1.roll();
            wheel2.roll();
            break;
          case 'show_loup':
            loup.show();
            break;
          case 'hide_loup':
            loup.hide();
            break;
        }
      }
    }
  }
}
