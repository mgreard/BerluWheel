
// Classe pour les cônes de lumière
class LightCone {
  constructor(initialAngle, direction) {
    const theme = themeManager.setting;
    this.angle = initialAngle;
    this.opacity = theme.lightCone.alpha;
    this.speed = 0.003;
    //this.speed = direction * random(0.003, 0.006) || 0.004;
  }

  update(fftAnalyzer) {
    const theme = themeManager.setting;
    // Calculer la luminosité en fonction de la musique
    const energy = fftAnalyzer.getEnergy(100, 300); // Ajuster la plage de fréquences
    this.opacity = map(energy, 150, 256, 0, theme.lightCone.alpha);

    // Faire tourner le cône de lumière
    this.angle += this.speed;
  }

  display() {
    const theme = themeManager.setting;
    push();
    if(theme.lightCone.addBlend){
      blendMode(ADD)
    }
    translate(width / 2, height / 2);
    rotate(this.angle);
    
    // Dessiner plusieurs couches pour simuler le flou
    for (let i = 0; i < 10; i++) {
      let alpha = map(i, 0, 9, this.opacity, 0);
      let size = map(i, 0, 9, height/2 * 0.5, height/2);

      fill(...theme.lightCone.color, alpha);
      noStroke();
      beginShape();
      vertex(0, 0);
      for (let j = 0; j <= 10; j++) {
        const x = cos(map(j, 0, 10, 0, PI / 12)) * size;
        const y = sin(map(j, 0, 10, 0, PI / 12)) * size;
        vertex(x, y);
      }
      endShape(CLOSE);
    }
    
    blendMode(BLEND)
    pop();
  }
}