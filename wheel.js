
// Class for the rotating wheel
class Wheel {
  constructor(segments, radius, minimumTurns = 2, reverse = false) {
    this.segments = segments;
    this.radius = radius;
    this.originalRadius = radius;
    this.reverse = reverse;
    this.angle = 0;
    this.targetAngle = 0;
    this.isRotating = false;
    this.previousAngle = 0;
    this.minimumTurns = minimumTurns;
    this.totalWeights = this.calculateTotalWeights();
    this.segmentAngle = PI / this.totalWeights;
    this.initializeSegments();
    this.timerRotate = 0;
  }

  calculateTotalWeights() {
    return this.segments.reduce((sum, segment) => sum + segment.weight, 0);
  }

  initializeSegments() {
    let previousTotalAngle = 0;
    for (let segment of this.segments) {
      segment.startAngle = previousTotalAngle;
      segment.stopAngle = previousTotalAngle + this.segmentAngle * segment.weight;
      previousTotalAngle += this.segmentAngle * segment.weight;
    }
  }

  update() {
    if(this.reverse){
      if (this.isRotating) {
        this.angle -= easeOutCubic(map(this.angle, this.previousAngle, this.targetAngle, 0.04, 0.005));
        if (this.angle < this.targetAngle) {
          this.isRotating = false;
          this.previousAngle = this.angle;
        }
      } else {
        this.angle -= psycheMode ? 0.005 : 0.002;
      }
    } else {
      if (this.isRotating) {
        this.angle += easeOutCubic(map(this.angle, this.previousAngle, this.targetAngle, 0.08, 0.005));
        if (this.angle >= this.targetAngle) {
          this.isRotating = false;
          this.previousAngle = this.angle;
        }
      } else {
        this.angle += 0.002;
      }
    }
    
    if(this.isRotating && this.timerRotate < 100){
      this.timerRotate++;
    }
    if(!this.isRotating && this.timerRotate > 0){
      this.timerRotate--;
    }
  }

  render(customRadius = false) {
    push()
    translate(canvasWidth / 2, canvasHeight / 2);
    rotate(this.angle);
    let previousTotalAngle = 0;
    for (let segment of this.segments) {
      this.renderSegment(segment, previousTotalAngle, customRadius);
      previousTotalAngle += 2 * this.segmentAngle * segment.weight;
    }
    pop();
  }

  renderSegment(segment, previousTotalAngle, customRadius) {
    noStroke();
    let segmentColor = color(segment.color);
    segmentColor.setAlpha(customRadius ? 255 : psycheMode ? map(this.timerRotate, 0, 100, 160, 50): 180);
    fill(segmentColor);
    arc(
      0,
      0,
      customRadius ? customRadius : this.radius,
      customRadius ? customRadius : this.radius,
      -HALF_PI + previousTotalAngle,
      -HALF_PI + previousTotalAngle + 2 * this.segmentAngle * segment.weight,
      PIE
    );
  }

  roll() {
    this.previousAngle = this.angle;
    this.isRotating = true;
    if(this.reverse){
      this.targetAngle = this.previousAngle - random(0, 2 * TWO_PI) - this.minimumTurns * PI;
    } else {
      this.targetAngle = this.previousAngle + random(0, 2 * TWO_PI) + this.minimumTurns * PI;
    }
  }
}