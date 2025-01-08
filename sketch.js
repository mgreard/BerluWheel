// 🎨 Shader pour le déplacement des couleurs
let colorDisplacementShader;

// 🖥️ Visualiseurs audio
let waveformVisualizer, spectrumVisualizer;

// 🎶 Gestionnaire audio
let audioManager;

// 📸 Images et assets
let bananeImage, boueeImage, myFont;

// 🎡 Loup, Roues et cônes de lumière
let wheel1, wheel2;
let loup;
let lightCones = [];

// 🌧️ Images qui tombent en rythme avec la musique
let imageDrops = [];

let psycheMode = false;
let psycheTimer = 0;

// 🎨 Segments de roue colorés
const wheelSegments = [
  { color: "#06d6a0", weight: 2 },
  { color: "#fb5607", weight: 2 },
  { color: "#3a86ff", weight: 2 },
  { color: "#e63946", weight: 2 },
  { color: "#8338ec", weight: 2 },
  { color: "#ffbe0b", weight: 2 }
];

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
  colorDisplacementShader = createFilterShader(colorDisplacementShaderSrc);

  // 🔊 Outils d'analyse audio
  let fftAnalyzer = new p5.FFT();
  let peakDetector = new p5.PeakDetect();
  let amplitudeAnalyzer = new p5.Amplitude();

  // 🎶 Initialisation du gestionnaire audio
  audioManager = new AudioManager(fftAnalyzer, peakDetector, amplitudeAnalyzer);
  
  // 🖥️ Initialisation des visualiseurs
  waveformVisualizer = new Waveform(fftAnalyzer, canvasWidth, canvasHeight, imageWidth);
  spectrumVisualizer = new Spectrum(fftAnalyzer, canvasWidth, canvasHeight, imageWidth);
  

  // 🎡 Initialisation des roues
  wheel1 = new Wheel(wheelSegments, max(canvasWidth * 2.1, canvasHeight * 2.1), 1, true);
  wheel2 = new Wheel(wheelSegments, imageWidth / 1.5, 2);

  // 💡 Initialisation des cônes de lumière
  for (let i = 0; i < 10; i++) {
    lightCones.push(new LightCone(TWO_PI / 10 * i, 1));
  }
  
  // Ajouter une fonction de gestion de la touche pour enregistrer les événements et lyrics
  document.addEventListener("click", recordLyrics);
  document.addEventListener("keypress", recordEvents);
  
  //ajout du bouton psychMode
  addPsycheBtn();
}


// Main draw loop to render visuals
function draw() {
  psycheTimer++;
  
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
  filter(colorDisplacementShader);
  filter(BLUR, 3);
  
  if(!psycheMode){
    // 💡 Affichage des cônes de lumière
    lightCones.forEach((cone) => {
      cone.update(audioManager.fftAnalyzer);
      cone.display();
    });
  }
  
  // 🌧️ Affichage des images qui tombent
  for (let i = imageDrops.length - 1; i >= 0; i--) {
    imageDrops[i].update();
    imageDrops[i].display();

    if (imageDrops[i].offScreen()) {
      imageDrops.splice(i, 1);
    }
  }
  filter(BLUR, 1);

  // 🖥️ Affichage de Spectrum
  spectrumVisualizer.render(); 
  
  if(psycheMode){
    // 💡 Affichage des cônes de lumière
    lightCones.forEach((cone) => {
      cone.update(audioManager.fftAnalyzer);
      cone.display();
    });
  }
  
  // 🎡 Mise à jour et affichage de la roues centrale
  wheel2.update();
  wheel2.render(map(energy, 0, 256, imageWidth / 1.5, imageWidth / 1.2));
  
  // 🖥️ Affichage de Waveform
  waveformVisualizer.render();

  // 🦊 Affichage de l'image Loup
  loup.display(audioManager);

  // 🎤 Synchronisation et affichage des paroles
  audioManager.syncLyrics();
  if(!psycheMode){
    audioManager.displayLyrics();
  }
  audioManager.handleEvents();
  
}


function addPsycheBtn() {
    psycheButton = createButton().parent("#controls");
    psycheButton.html("Psyche Mode");
    psycheButton.attribute("class", "psyche_btn");
    psycheButton.mousePressed(() => {
      psycheMode = !psycheMode;
      if(psycheMode){
        psycheTimer = 0;
      }
    });
}