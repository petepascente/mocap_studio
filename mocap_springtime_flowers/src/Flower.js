//const grav = 0.02;

class Flower {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.velocity = 0;
    this.grav = 0.02
    this.xvariance = 10;
    this.sinOffset = Math.random() * Math.PI;
  }

  draw() {
    var c = color(255, 204, 0);
    fill(c);
    ellipse(this.x, this.y, 50, 50);
  }

  addGravity() {
    this.y += this.velocity;
    this.velocity += this.grav;
  }

  noisemanX() {
    //console.log('noise', noise(this.y));
    this.x += (Math.sin((this.y / 100) + this.sinOffset)) * 3;
  }

  update() {
    this.addGravity();
    this.noisemanX();
  }

  

}

