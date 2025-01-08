class Spectrum {
  constructor(fftAnalyzer, canvasWidth, canvasHeight, imageWidth) {
    this.fftAnalyzer = fftAnalyzer;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.imageWidth = imageWidth;
    this.spectrumScalingFactor = 1;
  }

  render() {
    const theme = themeManager.setting;
    const cachedSpectrum = this.fftAnalyzer.analyze();
    const energy = this.fftAnalyzer.getEnergy(10, 100);

    push();
    if(theme.spectrum.exclusionBlend){
      blendMode(EXCLUSION)
    }
    translate(this.canvasWidth / 2, this.canvasHeight / 2);
    beginShape();
    strokeWeight(theme.spectrum.strokeWeight);
    stroke(...theme.spectrum.strokeColor, theme.spectrum.strokeAlpha);
    fill(...theme.spectrum.fillColor, theme.spectrum.fillAlpha);
    
    for (let i = 30; i < 150; i++) {
      this.renderSection(cachedSpectrum, i, -HALF_PI, HALF_PI, energy);
    }
    for (let i = 150; i > 30; i--) {
      this.renderSection(cachedSpectrum, i, PI + HALF_PI, HALF_PI, energy);
    }
    endShape(CLOSE);
    blendMode(BLEND)
    pop();
  }

  renderSection(spectrum, index, startAngle, stopAngle, energy) {
    const theme = themeManager.setting;
    const angle = map(index, 30, 150, startAngle, stopAngle);
    const amplitude = spectrum[index];
    const spectrumScalingFactor = map(energy, 0, 256, ...theme.spectrum.scalingFactor);
    const radius = map(amplitude, 70, 200, theme.spectrum.radiusRange[0], theme.spectrum.radiusRange[1]) * spectrumScalingFactor;
    const x = radius * cos(angle);
    const y = radius * sin(angle);
    vertex(x, y);
  }
}