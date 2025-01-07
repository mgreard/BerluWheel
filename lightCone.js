
// Classe pour les cônes de lumière
class LightCone {
  constructor(initialAngle, direction) {
    this.angle = initialAngle;
    this.opacity = 10;
    this.speed = 0.003;
    //this.speed = direction * random(0.003, 0.006) || 0.004;
  }

  update(fftAnalyzer) {
    // Calculer la luminosité en fonction de la musique
    const energy = fftAnalyzer.getEnergy(100, 300); // Ajuster la plage de fréquences
    this.opacity = map(energy, 150, 256, 0, 20);

    // Faire tourner le cône de lumière
    this.angle += this.speed;
  }

  display() {
    push();
    translate(width / 2, height / 2);
    rotate(this.angle);
    
    /*
    // Dessiner le cône
    noStroke();
    fill(255, 255, 255, this.opacity);
    beginShape();
    vertex(0, 0);
    for (let i = 0; i <= 10; i++) {
      const x = cos(map(i, 0, 10, 0, PI / 12)) * height;
      const y = sin(map(i, 0, 10, 0, PI / 12)) * height;
      vertex(x, y);
    }
    endShape(CLOSE);
    */
    
    //blendMode(DODGE);
    blendMode(ADD);

    // Dessiner plusieurs couches pour simuler le flou
    for (let i = 0; i < 10; i++) {
      let alpha = map(i, 0, 9, this.opacity, 0);
      let size = map(i, 0, 9, height/2 * 0.5, height/2);

      fill(255, 255, 255, alpha);
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
    
    blendMode(BLEND);
    pop();
  }
}