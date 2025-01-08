class Spectrum {
  constructor(fftAnalyzer, canvasWidth, canvasHeight, imageWidth) {
    this.fftAnalyzer = fftAnalyzer;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.imageWidth = imageWidth;
    this.spectrumScalingFactor = 1;
  }

  render() {
    const cachedSpectrum = this.fftAnalyzer.analyze();
    const energy = this.fftAnalyzer.getEnergy(10, 100);
    this.spectrumScalingFactor = map(energy, 0, 256, 1, 1.1);

    push();
    translate(this.canvasWidth / 2, this.canvasHeight / 2);
    beginShape();
    strokeWeight(6);
    stroke(255, 255);
    //fill(psycheMode ? 0 : 255, psycheMode ? 255 : 150);
    fill(psycheMode ? 0 : 255, psycheMode ? 180 : 150);
    //fill(255, 150);
    for (let i = 30; i < 150; i++) {
      this.renderSection(cachedSpectrum, i, -HALF_PI, HALF_PI);
    }
    for (let i = 150; i > 30; i--) {
      this.renderSection(cachedSpectrum, i, PI + HALF_PI, HALF_PI);
    }
    endShape(CLOSE);
    pop();
  }

  renderSection(spectrum, index, startAngle, stopAngle) {
    const angle = map(index, 30, 150, startAngle, stopAngle);
    const amplitude = spectrum[index];
    const radius = map(amplitude, 70, 200, this.imageWidth / 2, this.imageWidth / 1.7) * this.spectrumScalingFactor;
    const x = radius * cos(angle);
    const y = radius * sin(angle);
    vertex(x, y);
  }
}