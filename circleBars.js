class CircleBars {
  constructor(fftAnalyzer) {
    this.fftAnalyzer = fftAnalyzer;
  }

  render() {
    const theme = themeManager.setting;
    const spectrum = this.fftAnalyzer.analyze(); // Analyse du spectre audio
    const angleStep = TWO_PI / theme.circleBars.total;

    push();
    translate(width / 2, height / 2);
    for (let i = 0; i < theme.circleBars.total; i++) {
      const angle = i * angleStep; // Calculer l'angle pour chaque barre
      const amplitude = spectrum[floor(map(i, 0, theme.circleBars.total, 0, spectrum.length - 200))]; // Obtenir l'amplitude
      const barHeight = map(amplitude, 0, 255, 0, theme.circleBars.scaleFactor); // Échelle de hauteur
      const x = theme.circleBars.radius * cos(angle);
      const y = theme.circleBars.radius * sin(angle);

      push();
      translate(x, y);
      rotate(angle + HALF_PI); // Aligner la barre radialement
      rectMode(RIGHT);
      fill(...theme.circleBars.fillColor, theme.circleBars.fillAlpha);
      noStroke();
      rect(0, 0, theme.circleBars.width, -barHeight);
      pop();
    }
    pop();
  }
}