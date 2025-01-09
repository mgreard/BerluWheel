// Classe pour gérer les images qui tombent
class ImageDrop {
  constructor(img) {
    this.img = img;
    this.x = random(0, canvasWidth);
    this.y = random(-250, -150);  // Position de départ au-dessus de l'écran
    this.speed = random(1.2, 2.5);   // Vitesse de chute
    this.size = random(160, 280); // Taille aléatoire de l'image
    this.rotationSpeed = random(0.01, 0.05) * (floor(random() * 2) || -1); // Vitesse de rotation aléatoire
    this.rotation = 0;  // Angle de rotation initial
    this.startY = this.y; // Position de départ pour le calcul de l'easing
    this.targetY = canvasHeight + this.size; // Position cible (le bas de l'écran)
    this.progress = 0; // Progrès de l'animation (0 à 1)
  }

  // Dessiner l'image avec rotation
  display() {
    push();
    translate(this.x, this.y);  // Déplacer au point d'origine de l'image
    rotate(this.rotation);  // Appliquer la rotation
    translate(-this.size/2, -this.size/2);
    image(this.img, 0, 0, this.size, this.size);  // Dessiner l'image
    pop();
  }

  // Fonction d'easing
  easing(t) {
    return t * t;
    //return -0.5 * (cos(PI * t) - 1);  // Fonction easing : accélère puis ralentit
  }

  // Mettre à jour la position et la rotation de l'image avec easing
  update() {
    // Calculer la position 'y' en fonction du temps avec easing
    this.progress += 0.004;  // Progression du temps

    // Appliquer l'easing à la position Y
    this.y = this.startY + (this.targetY - this.startY) * this.easing(this.progress);
    this.rotation += this.rotationSpeed;  // Rotation continue
  }

  // Vérifier si l'image est sortie de l'écran
  offScreen() {
    return this.y > canvasHeight + this.size ;
  }
}