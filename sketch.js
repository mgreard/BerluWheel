// 🎨 Shader pour le déplacement des couleurs
let colorDisplacementShaders = [];

// 📸 assets
let myFont;
let imagesToDrop = {
  "banane" : "",
  "bouee" : "",
  "cana1" : "",
  "cana2" : "",
  "coin" : "",
};

// 🖥️ Visualiseurs audio
let waveformVisualizer, spectrumVisualizer, circleBarsVisualizer;

// 🎶 Gestionnaire audio
let audioManager;

// 🎨 Initialisation du ThemeManager
let themeManager;

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
  imagesToDrop.banane = loadImage("assets/images/Banane.png");
  imagesToDrop.bouee = loadImage("assets/images/Boue.png");
  imagesToDrop.cana1 = loadImage("assets/images/Cana.png");
  imagesToDrop.cana2 = loadImage("assets/images/Cana2.png");
  imagesToDrop.coin = loadImage("assets/images/Coin.png");
  
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
  colorDisplacementShaders[2]  = createFilterShader(colorDisplacementMatrixShaderSrc);
  
  
  // 🔊 Outils d'analyse audio
  let fftAnalyzer = new p5.FFT();
  fftAnalyzer.smooth(0.9)
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
  themeManager.addTheme('sun', sunTheme);
  themeManager.addTheme('matrixed', matrixedTheme);
  themeManager.addTheme('google', googleTheme);
  themeManager.addTheme('bababoy', bababoyTheme);
  themeManager.addTheme('casino', casinoTheme);
  themeManager.applyTheme('default');
  
  // 🖥️ Initialisation des visualiseurs
  waveformVisualizer = new Waveform(fftAnalyzer, canvasWidth, canvasHeight);
  spectrumVisualizer = new Spectrum(fftAnalyzer, canvasWidth, canvasHeight, imageWidth);
  circleBarsVisualizer = new CircleBars(fftAnalyzer);

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
  
  
  const renderOrder = themeManager.renderOrder;

  // Boucle sur l'ordre d'affichage défini dans le thème
  renderOrder.forEach((element) => {
    switch (element) {
      case "wheel1":
        // 🎡 Mise à jour et affichage de la roue en fond
        wheel1.update();
        wheel1.render();
        break;
      case "shader":
        // 🖥️ Application des shaders et effets
        if(theme.general.shaderIndex !== -1){
          filter(colorDisplacementShaders[theme.general.shaderIndex]);
        }
        break;
      case "imageDrops":
        // 🎵 Détection des battements
        audioManager.updateAudioAnalysis();
        if (audioManager.peakDetector.isDetected) {
          imageDrops.push(new ImageDrop(imageRainFlag ? imagesToDrop[theme.imagesDrop[0]] : imagesToDrop[theme.imagesDrop[1]]));
          imageRainFlag = !imageRainFlag;
        }
        // 🌧️ Affichage des images qui tombent
        for (let i = imageDrops.length - 1; i >= 0; i--) {
          imageDrops[i].update();
          imageDrops[i].display();

          if (imageDrops[i].offScreen()) {
            imageDrops.splice(i, 1);
          }
        }
        break;
      case "blur":
        filter(BLUR, theme.general.blur);
        break;
      case "bgColor":
        background(...theme.general.bgColor, theme.general.bgAlpha);
        break
      case "spectrum":
        // 🖥️ Affichage de Spectrum
        spectrumVisualizer.render();
        break;
      case "lightCones":
        // 💡 Affichage des cônes de lumière
        lightCones.forEach((cone) => {
          cone.update(audioManager.fftAnalyzer);
          cone.display();
        });
        break;
      case "wheel2":
        // 🎡 Mise à jour et affichage de la roues centrale
        wheel2.update();
        wheel2.render(map(energy, 0, 256, theme.wheelFg.radiusRange[0], theme.wheelFg.radiusRange[1]));
        break;
      case "waveform":
        // 🖥️ Affichage de Waveform
        waveformVisualizer.render();
        break;
      case "circleBars":
        circleBarsVisualizer.render();
        break;
      case "loup":
        // 🦊 Affichage de l'image Loup
        loup.display(audioManager);
        break;
      default:
        console.warn(`Unknown element "${element}" in renderOrder.`);
    }
  });

  
  // 🎤 Synchronisation et affichage des paroles
  audioManager.syncLyrics();
  audioManager.displayLyrics();
  audioManager.handleEvents();
  
}
