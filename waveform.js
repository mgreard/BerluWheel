class Waveform {
  constructor(fftAnalyzer, canvasWidth, canvasHeight, imageWidth) {
    this.fftAnalyzer = fftAnalyzer;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.imageWidth = imageWidth;
  }

  render() {
    const waveform = this.fftAnalyzer.waveform();
    const energy = this.fftAnalyzer.getEnergy(10, 100);
    push();
    translate(this.canvasWidth / 2, this.canvasHeight / 2);
    beginShape();
    noFill();
    stroke(0);
    strokeWeight(3);
    for (let i = 0; i < waveform.length; i++) {
      const amplitude = waveform[i];
      const angle = map(i, 0, waveform.length, 0, 361);
      const height = map(amplitude, -1, 1, -50, 50);
      const radius = map(energy, 0, 256, this.imageWidth / 3, this.imageWidth / 2.4);
      const x = (radius + height) * cos(angle + frameCount / 2);
      const y = (radius + height) * sin(angle + frameCount / 2);
      vertex(x, y);
    }
    endShape(OPEN);
    pop();
  }
}