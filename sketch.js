// 🎨 Shader pour le déplacement des couleurs
let colorDisplacementShaders = [];

// 🖥️ Visualiseurs audio
let waveformVisualizer, spectrumVisualizer;

// 🎶 Gestionnaire audio
let audioManager;

// 🎨 Initialisation du ThemeManager
let themeManager;

// 📸 Images et assets
let bananeImage, boueeImage, myFont;

// 🎡 Loup, Roues et cônes de lumière
let wheel1, wheel2;
let loup;
let lightCones = [];

// 🌧️ Images qui tombent en rythme avec la musique
let imageDrops = [];


// Variables for audio analysis and canvas properties
let audioTrack, fftAnalyzer, peakDetector, amplitudeAnalyzer;


let canvasWidth = 1000;
let canvasHeight = 800;
let imageWidth = 400;
let imageHeight = 400;
let lyricsTextSize = 54;
let imageRainFlag = false;


// Preload assets (image and sound) before setup
function preload() {
  myFont = loadFont('fbg_type.ttf');
  bananeImage = loadImage("assets/images/Banane.png");
  boueeImage = loadImage("assets/images/Boue.png");
  
  // 🦊 Initialisation de l'image Loup
  loup = new Loup(imageWidth, imageHeight);
}

// Initial setup of canvas and variables
function setup() {
  canvasWidth = min(windowWidth, 1000);
  canvasHeight = min(windowHeight, 1000);
  createCanvas(canvasWidth, canvasHeight, document.getElementById("canvas"));
  colorDisplacementShaders[0] = createFilterShader(colorDisplacementShaderSrc);
  colorDisplacementShaders[1]  = createFilterShader(colorDisplacement2ShaderSrc);
  
  // 🔊 Outils d'analyse audio
  let fftAnalyzer = new p5.FFT();
  let peakDetector = new p5.PeakDetect();
  let amplitudeAnalyzer = new p5.Amplitude();

  // 🎶 Initialisation du gestionnaire audio
  audioManager = new AudioManager(fftAnalyzer, peakDetector, amplitudeAnalyzer);
  
  //Instance globale pour gérer les themes
  themeManager = new ThemeManager();
  themeManager.addTheme('default', defaultTheme);
  themeManager.addTheme('psyche', psycheTheme);
  themeManager.addTheme('cloud', cloudTheme);
  themeManager.addTheme('disco', discoTheme);
  themeManager.addTheme('toy', toyTheme);
  themeManager.addTheme('sunrise', sunriseTheme);
  themeManager.applyTheme('default');
  
  // 🖥️ Initialisation des visualiseurs
  waveformVisualizer = new Waveform(fftAnalyzer, canvasWidth, canvasHeight);
  spectrumVisualizer = new Spectrum(fftAnalyzer, canvasWidth, canvasHeight, imageWidth);

  resetElements();
  
  // Ajouter une fonction de gestion de la touche pour enregistrer les événements et lyrics
  document.addEventListener("click", recordLyrics);
  document.addEventListener("keypress", recordEvents);
}

function resetElements(){
  const theme = themeManager.setting;
  
  // 🎡 Initialisation des roues
  wheel1 = new Wheel(theme.wheelSegments, max(canvasWidth * 2.1, canvasHeight * 2.1), 1);
  wheel2 = new Wheel(theme.wheelSegments, imageWidth / 1.5, 2, true);
  
  // 💡 Initialisation des cônes de lumière
  lightCones = [];
  for (let i = 0; i < theme.lightCone.total; i++) {
    lightCones.push(new LightCone(TWO_PI / theme.lightCone.total * i, 1));
  }
}

// Main draw loop to render visuals
function draw() {
  const theme = themeManager.setting;
  
  // 🎶 Énergie audio pour synchroniser les visuels
  const energy = audioManager.fftAnalyzer.getEnergy(10, 100);
  
  // 🎵 Détection des battements
  audioManager.updateAudioAnalysis();
  if (audioManager.peakDetector.isDetected) {
    imageDrops.push(new ImageDrop(imageRainFlag ? bananeImage : boueeImage));
    imageRainFlag = !imageRainFlag;
  }
  
  // 🎡 Mise à jour et affichage de la roue en fond
  wheel1.update();
  wheel1.render();
  
  // 🖥️ Application des shaders et effets
  if(theme.general.shaderIndex !== -1){
    filter(colorDisplacementShaders[theme.general.shaderIndex]);
  }
  filter(BLUR, theme.general.bgBlur);
  
  // 🌧️ Affichage des images qui tombent
  for (let i = imageDrops.length - 1; i >= 0; i--) {
    imageDrops[i].update();
    imageDrops[i].display();

    if (imageDrops[i].offScreen()) {
      imageDrops.splice(i, 1);
    }
  }
  background(...theme.general.bgColor, theme.general.bgAlpha)
  filter(BLUR, theme.general.dropBlur);

  // 💡 Affichage des cônes de lumière
  lightCones.forEach((cone) => {
    cone.update(audioManager.fftAnalyzer);
    cone.display();
  });
  
  // 🖥️ Affichage de Spectrum
  spectrumVisualizer.render(); 
  
  // 🎡 Mise à jour et affichage de la roues centrale
  wheel2.update();
  wheel2.render(map(energy, 0, 256, theme.wheelFg.radiusRange[0], theme.wheelFg.radiusRange[1]));
  
  // 🖥️ Affichage de Waveform
  waveformVisualizer.render();

  // 🦊 Affichage de l'image Loup
  loup.display(audioManager);

  // 🎤 Synchronisation et affichage des paroles
  audioManager.syncLyrics();
  audioManager.displayLyrics();
  audioManager.handleEvents();
  
}
