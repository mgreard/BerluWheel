class ThemeManager {
  constructor() {
    this.themes = {};
    this.currentTheme = null; 
    
    this.themeSelector = createSelect().parent("#controls");
    this.themeSelector.option('default');
    this.themeSelector.option('psyche');
    this.themeSelector.option('cloud');
    this.themeSelector.option('disco');
    this.themeSelector.option('toy');
    this.themeSelector.option('sunrise');
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
    } else {
      console.warn(`Theme ${name} not found.`);
    }
  }

  get setting() {
    return this.currentTheme;
  }
}


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
    amplitude: [-30, 30] 
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
    bgAlpha: 0,
    bgBlur: 1,
    dropBlur: 3,
    shaderIndex: 1
  },
  wheelSegments: defaultWheelSegments
};

const psycheTheme = {
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
    amplitude: [-50, 50] 
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
    bgBlur: 3,
    dropBlur: 1,
    shaderIndex: 0
  },
  wheelSegments: defaultWheelSegments
};

const cloudTheme = {
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
    amplitude: [-30, 30] 
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
    bgBlur: 2,
    dropBlur: 4,
    shaderIndex: 0
  },
  wheelSegments: defaultWheelSegments
};

const discoTheme = {
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
    amplitude: [-50, 50]
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
    bgBlur: 2,
    dropBlur: 4,
    shaderIndex: 0
  },
  wheelSegments: defaultWheelSegments
};


const toyTheme = {
  spectrum: {
    radiusRange: [300/1.2, 300/1],
    scalingFactor: [1, 1.001],
    strokeColor: [255, 255, 255],
    strokeAlpha: 255,
    strokeWeight: 10,
    fillColor: [255, 255, 255],
    fillAlpha: 255,
    exclusionBlend: true
  },
  waveform: {
    alpha: 100,
    weight: 5,
    color: 255,
    radiusRange: [300 / 3, 300 / 2.4],
    amplitude: [-50, 50]
  },
  wheelBg: {
    alpha: 255,
    segmentStrokeColor: [255, 255, 255],
    segmentStrokeAlpha: 255,
    segmentStrokeWeight: 6
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
    alpha: 50,
    color: [255, 255, 255],
    addBlend: true
  },
  general: {
    bgColor: [255, 255, 255],
    bgAlpha: 0,
    bgBlur: 0,
    dropBlur: 0,
    shaderIndex: -1
  },
  wheelSegments: defaultWheelSegments
};

const sunriseWheelSegments = [
  { color: "#ff0054", weight: 2 },
  { color: "#ff5400", weight: 2 },
  { color: "#ffbd00", weight: 2 },
  { color: "#ff0054", weight: 2 },
  { color: "#ff5400", weight: 2 },
  { color: "#ffbd00", weight: 2 }
];

const sunriseTheme = {
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
    color: [255,0,84],
    radiusRange: [300 / 3, 300 / 2.2],
    amplitude: [-40, 40]
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
    strokeColor: [255,0,84],
    strokeAlpha: 255,
    strokeWeight: 8,
    segmentStrokeColor: [255,189,0],
    segmentStrokeAlpha: 255,
    segmentStrokeWeight: 0
  },
  lightCone: {
    total: 15,
    alpha: 50,
    color: [255,189,0],
    addBlend: true
  },
  general: {
    bgColor: [255,84,0],
    bgAlpha: 60,
    bgBlur: 1,
    dropBlur: 2,
    shaderIndex: 1
  },
  wheelSegments: sunriseWheelSegments
};
