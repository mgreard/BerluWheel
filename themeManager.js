class ThemeManager {
  constructor() {
    this.themes = {};
    this.currentTheme = null; 
    this.renderOrder = [];
    
    this.themeSelector = createSelect().parent("#controls");
    this.themeSelector.option('default');
    this.themeSelector.option('psyche');
    this.themeSelector.option('cloud');
    this.themeSelector.option('disco');
    this.themeSelector.option('sun');
    this.themeSelector.option('matrixed');
    this.themeSelector.option('google');
    this.themeSelector.option('bababoy');
    this.themeSelector.changed(() => {
      const selectedTheme = this.themeSelector.value();
      this.applyTheme(selectedTheme);
      resetElements();
    });
  }

  addTheme(name, themeConfig) {
    this.themes[name] = themeConfig;
  }

  applyTheme(name) {
    if (this.themes[name]) {
      this.currentTheme = this.themes[name];
      this.renderOrder = this.currentTheme.renderOrder || [];
    } else {
      console.warn(`Theme ${name} not found.`);
    }
  }

  get setting() {
    return this.currentTheme;
  }
}

//Default render order
const defaultRenderOrder = ["wheel1", "shader", "imageDrops", "blur", "bgColor", "spectrum", "lightCones", "wheel2", "waveform", "loup"];
const defaultImageDrops = ["banane", "bouee"]

// 🎨 Segments de roue colorés
const defaultWheelSegments = [
  { color: "#06d6a0", weight: 2 },
  { color: "#fb5607", weight: 2 },
  { color: "#3a86ff", weight: 2 },
  { color: "#e63946", weight: 2 },
  { color: "#8338ec", weight: 2 },
  { color: "#ffbe0b", weight: 2 }
];

// 🎨 thème par défaut
const defaultTheme = {
  renderOrder: defaultRenderOrder,
  imagesDrop: defaultImageDrops,
  spectrum: {
    radiusRange: [400/2, 400/1.7],
    scalingFactor: [1, 1.1],
    strokeColor: [255, 255, 255],
    strokeAlpha: 255,
    strokeWeight: 6,
    fillColor: [255, 255, 255],
    fillAlpha: 120
  },
  waveform: {
    alpha: 255,
    weight: 3,
    color: 0,
    radiusRange: [400 / 3, 400 / 2.4],
    amplitude: [-30, 30],
    entropy: 50
  },
  wheelBg: {
    alpha: 180,
    segmentStrokeColor: [255, 255, 255],
    segmentStrokeAlpha: 255,
    segmentStrokeWeight: 0
  },
  wheelFg: {
    alpha: 255,
    radiusRange: [400 / 1.5, 400 / 1.2],
    strokeColor: [255, 255, 255],
    strokeAlpha: 255,
    strokeWeight: 0,
    segmentStrokeColor: [255, 255, 255],
    segmentStrokeAlpha: 0,
    segmentStrokeWeight: 0,
  },
  lightCone: {
    total: 10,
    alpha: 10,
    color: [255, 255, 255]
  },
  general: {
    bgColor: [255, 255, 255],
    bgAlpha: 10,
    blur: 3,
    shaderIndex: 1
  },
  wheelSegments: defaultWheelSegments
};

const psycheTheme = {
  renderOrder: defaultRenderOrder,
  imagesDrop: defaultImageDrops,
  spectrum: {
    radiusRange: [400/2, 400/1.7],
    scalingFactor: [1, 1.3],
    strokeColor: [255, 255, 255],
    strokeAlpha: 255,
    strokeWeight: 6,
    fillColor: [0, 0, 0],
    fillAlpha: 100
  },
  waveform: {
    alpha: 255,
    weight: 3,
    color: 0,
    radiusRange: [400 / 3, 400 / 2.4],
    amplitude: [-50, 50],
    entropy: 50
  },
  wheelBg: {
    alpha: 60,
    segmentStrokeColor: [255, 255, 255],
    segmentStrokeAlpha: 255,
    segmentStrokeWeight: 0
  },
  wheelFg: {
    alpha: 250,
    radiusRange: [600 / 1.5, 600 / 1.3],
    strokeColor: [255, 255, 255],
    strokeAlpha: 255,
    strokeWeight: 6,
    segmentStrokeColor: [255, 255, 255],
    segmentStrokeAlpha: 255,
    segmentStrokeWeight: 6,
  },
  lightCone: {
    total: 10,
    alpha: 80,
    color: [255, 255, 255]
  },
  general: {
    bgColor: [0, 0, 0],
    bgAlpha: 0,
    blur: 3,
    shaderIndex: 0
  },
  wheelSegments: defaultWheelSegments
};

const cloudTheme = {
  renderOrder: defaultRenderOrder,
  imagesDrop: defaultImageDrops,
  spectrum: {
    radiusRange: [400/2, 400/1.7],
    scalingFactor: [1, 1.1],
    strokeColor: [255, 255, 255],
    strokeAlpha: 255,
    strokeWeight: 6,
    fillColor: [255, 255, 255],
    fillAlpha: 130
  },
  waveform: {
    alpha: 255,
    weight: 4,
    color: 255,
    radiusRange: [400 / 3, 400 / 2.4],
    amplitude: [-30, 30],
    entropy: 50
  },
  wheelBg: {
    alpha: 90,
    segmentStrokeColor: [255, 255, 255],
    segmentStrokeAlpha: 255,
    segmentStrokeWeight: 0
  },
  wheelFg: {
    alpha: 200,
    radiusRange: [400 / 1.5, 400 / 1.2],
    strokeColor: [255, 255, 255],
    strokeAlpha: 255,
    strokeWeight: 0,
    segmentStrokeColor: [255, 255, 255],
    segmentStrokeAlpha: 255,
    segmentStrokeWeight: 6,
  },
  lightCone: {
    total: 0,
    alpha: 10,
    color: [255, 255, 255]
  },
  general: {
    bgColor: [255, 255, 255],
    bgAlpha: 50,
    blur: 4,
    shaderIndex: 0
  },
  wheelSegments: defaultWheelSegments
};

const discoTheme = {
  renderOrder: defaultRenderOrder,
  imagesDrop: defaultImageDrops,
  spectrum: {
    radiusRange: [300/2.2, 300/1.5],
    scalingFactor: [1, 1.05],
    strokeColor: [255, 255, 255],
    strokeAlpha: 255,
    strokeWeight: 10,
    fillColor: [255, 255, 255],
    fillAlpha: 255,
    exclusionBlend: true
  },
  waveform: {
    alpha: 255,
    weight: 5,
    color: 0,
    radiusRange: [300 / 3, 300 / 2.4],
    amplitude: [-50, 50],
    entropy: 50
  },
  wheelBg: {
    alpha: 190,
    segmentStrokeColor: [255, 255, 255],
    segmentStrokeAlpha: 255,
    segmentStrokeWeight: 0
  },
  wheelFg: {
    alpha: 255,
    radiusRange: [300 / 1.5, 300 / 1.2],
    strokeColor: [0, 0, 0],
    strokeAlpha: 255,
    strokeWeight: 0,
    segmentStrokeColor: [0, 0, 0],
    segmentStrokeAlpha: 0,
    segmentStrokeWeight: 0,
  },
  lightCone: {
    total: 10,
    alpha: 50,
    color: [255, 255, 255],
    addBlend: true
  },
  general: {
    bgColor: [0, 0, 0],
    bgAlpha: 120,
    blur: 4,
    shaderIndex: 0
  },
  wheelSegments: defaultWheelSegments
};

const sunRenderOrder = ["bgColor", "lightCones", "blur", "circleBars", "wheel2", "waveform", "loup", "imageDrops"];
const sunTheme = {
  renderOrder: sunRenderOrder,
  imagesDrop: defaultImageDrops,
  spectrum: {
    radiusRange: [350 / 2, 350 / 1.5],
    scalingFactor: [1, 1.2],
    strokeColor: [255,189,0],
    strokeAlpha: 255,
    strokeWeight: 8,
    fillColor: [255,0,84],
    fillAlpha: 80,
    exclusionBlend: false
  },
  waveform: {
    alpha: 180,
    weight: 4,
    color: [255,84,0],
    radiusRange: [300 / 3, 300 / 2.2],
    amplitude: [-40, 40],
    entropy: 50
  },
  wheelBg: {
    alpha: 100,
    segmentStrokeColor: [255, 255, 0],
    segmentStrokeAlpha: 200,
    segmentStrokeWeight: 2
  },
  wheelFg: {
    alpha: 255,
    radiusRange: [300 / 1.5, 300 / 1.3],
    strokeColor: [255,189,0],
    strokeAlpha: 255,
    strokeWeight: 16,
    segmentStrokeColor: [255,189,0],
    segmentStrokeAlpha: 255,
    segmentStrokeWeight: 0
  },
  lightCone: {
    total: 12,
    alpha: 10,
    color: [255,189,0],
    addBlend: true
  },
  circleBars: {
    total: 30,
    fillColor: [255, 255, 255],
    fillAlpha: 150,
    width: 10,
    scaleFactor: 220,
    radius: 150
  },
  general: {
    bgColor: [58,134,255],
    bgAlpha: 160,
    blur: 2,
    shaderIndex: -1
  },
  wheelSegments: defaultWheelSegments
};

const matrixedRenderOrder = [ "lightCones", "wheel1", "imageDrops", "bgColor", "shader", "waveform", "blur", "wheel2", "loup"];
const matrixedTheme = {
  renderOrder: matrixedRenderOrder,
  imagesDrop: defaultImageDrops,
  spectrum: {
    radiusRange: [300/1.2, 300/1],
    scalingFactor: [1, 1.001],
    strokeColor: [255, 255, 255],
    strokeAlpha: 0,
    strokeWeight: 0,
    fillColor: [255, 255, 255],
    fillAlpha: 0,
    exclusionBlend: false
  },
  waveform: {
    alpha: 255,
    weight: 5,
    color: [3,160,98],
    radiusRange: [300 / 1.4, 300 / 1.2],
    amplitude: [-80, 80],
    entropy: 8
  },
  wheelBg: {
    alpha: 5,
    segmentStrokeColor: [0, 0, 0],
    segmentStrokeAlpha: 255,
    segmentStrokeWeight: 6
  },
  wheelFg: {
    alpha: 255,
    radiusRange: [300 / 1.1, 300 / 1],
    strokeColor: [3,160,98],
    strokeAlpha: 255,
    strokeWeight: 10,
    segmentStrokeColor: [0, 0, 0],
    segmentStrokeAlpha: 0,
    segmentStrokeWeight: 0,
  },
  lightCone: {
    total: 0,
    alpha: 50,
    color: [255, 255, 255],
    addBlend: true
  },
  general: {
    bgColor: [14, 14, 14],
    bgAlpha: 215,
    blur: 1,
    shaderIndex: 2
  },
  wheelSegments: defaultWheelSegments
};


const googleRenderOrder = ["imageDrops", "wheel1", "shader", "wheel2", "circleBars"];
const googleTheme = {
  renderOrder: googleRenderOrder,
  imagesDrop: defaultImageDrops,
  spectrum: {
    radiusRange: [300/1.2, 300/1],
    scalingFactor: [1, 1.001],
    strokeColor: [255, 255, 255],
    strokeAlpha: 0,
    strokeWeight: 0,
    fillColor: [255, 255, 255],
    fillAlpha: 0,
    exclusionBlend: false
  },
  waveform: {
    alpha: 255,
    weight: 8,
    color: 255,
    radiusRange: [300 / 2, 300 / 1.9],
    amplitude: [-20, 20],
    entropy: 1
  },
  wheelBg: {
    alpha: 255,
    segmentStrokeColor: [255, 255, 255],
    segmentStrokeAlpha: 0,
    segmentStrokeWeight: 0
  },
  wheelFg: {
    alpha: 255,
    radiusRange: [300 / 1.1, 300 / 1],
    strokeColor: [255, 255, 255],
    strokeAlpha: 255,
    strokeWeight: 10,
    segmentStrokeColor: [0, 0, 0],
    segmentStrokeAlpha: 0,
    segmentStrokeWeight: 0,
  },
  lightCone: {
    total: 0,
    alpha: 0,
    color: [255, 255, 255],
    addBlend: false
  },
  circleBars: {
    total: 30,
    fillColor: [255, 255, 255],
    fillAlpha: 255,
    width: 10,
    scaleFactor: 150,
    radius: 250
  },
  general: {
    bgColor: [255, 255, 255],
    bgAlpha: 0,
    blur: 0,
    shaderIndex: 0
  },
  wheelSegments: defaultWheelSegments
};

const bababoyRenderOrder = ["wheel1", "bgColor", "circleBars", "spectrum", "shader", "lightCones", "blur", "wheel2", "waveform", "loup", "imageDrops"];
const bababoyWheelSegments = [
  { color: "#B21F1F", weight: 2 },
  { color: "#F6C81D", weight: 2 },
  { color: "#296330", weight: 2 },
];
const bababoyImageDrops = ["cana1", "cana2"];

const bababoyTheme = {
  renderOrder: bababoyRenderOrder,
  imagesDrop: bababoyImageDrops,
  spectrum: {
    radiusRange: [230/1.2, 230/1],
    scalingFactor: [1, 1.001],
    strokeColor: [246,200,29],
    strokeAlpha: 200,
    strokeWeight: 6,
    fillColor: [246,200,29],
    fillAlpha: 40,
    exclusionBlend: false
  },
  waveform: {
    alpha: 255,
    weight: 8,
    color: [246,200,29],
    radiusRange: [400 / 2, 400 / 1.9],
    amplitude: [-20, 20],
    entropy: 3
  },
  wheelBg: {
    alpha: 255,
    segmentStrokeColor: [255, 255, 255],
    segmentStrokeAlpha: 0,
    segmentStrokeWeight: 0
  },
  wheelFg: {
    alpha: 255,
    radiusRange: [400 / 1.1, 400 / 1],
    strokeColor: [255, 255, 255],
    strokeAlpha: 255,
    strokeWeight: 10,
    segmentStrokeColor: [0, 0, 0],
    segmentStrokeAlpha: 0,
    segmentStrokeWeight: 0,
  },
  lightCone: {
    total: 10,
    alpha: 10,
    color: [91,186,111],
    addBlend: false
  },
  circleBars: {
    total: 30,
    fillColor: [246,200,29],
    fillAlpha: 255,
    width: 10,
    scaleFactor: 150,
    radius: 220
  },
  general: {
    bgColor: [41,99,48],
    bgAlpha: 220,
    blur: 1,
    shaderIndex: 2
  },
  wheelSegments: bababoyWheelSegments
};
