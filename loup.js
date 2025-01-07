// Classe Loup
class Loup {
  
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.isVisible = false;
    this.currentImageIndex = 0; // Track the current image to display
    
    this.images = [];
    this.images[0] = loadImage("assets/images/Loup1.png");
    this.images[1] = loadImage("assets/images/Loup2.png");
    this.images[2] = loadImage("assets/images/Loup3.png");
    this.images[3] = loadImage("assets/images/Loup4.png");
    this.images[4] = loadImage("assets/images/Loup3.png");
    this.images[5] = loadImage("assets/images/Loup2.png");
  }

  nextImage(peakDetector) {
    // Change the displayed image on every beat
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
  }

  show() {
    this.isVisible = true;
  }
  
  hide() {
    this.isVisible = false;
  }
  
  toggleDisplay() {
    this.isVisible = !this.isVisible;
  }

  display(audioManager) {
    if (this.isVisible) {
      if(audioManager.peakDetector.isDetected){
        this.nextImage();
      }

      push();
      translate(canvasWidth / 2, canvasHeight / 2);
      const energy = audioManager.fftAnalyzer.getEnergy(10, 100); // Adjust frequency range
      const scale = map(energy, 50, 256, 1, 1.2);
      const imgWidth = this.width * scale;
      const imgHeight = this.height * scale;
      image(this.images[this.currentImageIndex], -imgWidth / 2 - 10, -imgHeight / 2, imgWidth, imgHeight);
      pop();
    }
  }
}