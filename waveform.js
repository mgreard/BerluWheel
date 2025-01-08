class Waveform {
  constructor(fftAnalyzer, canvasWidth, canvasHeight) {
    this.fftAnalyzer = fftAnalyzer;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }

  render() {
    const theme = themeManager.setting;
    const waveform = this.fftAnalyzer.waveform();
    const energy = this.fftAnalyzer.getEnergy(10, 100);
    push();
    translate(this.canvasWidth / 2, this.canvasHeight / 2);
    beginShape();
    noFill();
    stroke(theme.waveform.color, theme.waveform.alpha);
    strokeWeight(theme.waveform.weight);
    for (let i = 0; i < waveform.length; i++) {
      const amplitude = waveform[i];
      const angle = map(i, 0, waveform.length, 0, 361);
      const waveHeight = map(amplitude, -1, 1, theme.waveform.amplitude[0], theme.waveform.amplitude[1]);
      const radius = map(energy, 0, 256, theme.waveform.radiusRange[0], theme.waveform.radiusRange[1]);
      const x = (radius + waveHeight) * cos(angle + frameCount / 2);
      const y = (radius + waveHeight) * sin(angle + frameCount / 2);
      vertex(x, y);
    }
    endShape(OPEN);
    pop();
  }
}