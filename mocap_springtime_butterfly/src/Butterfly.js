//const grav = 0.02;

class Butterfly {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.velocity = 0;
    this.grav = 0.04
    this.xvariance = 10;
    this.sinOffset = Math.random() * Math.PI;
  }

  draw() {
    var c = color(199, 21, 133);
    fill(c);
    image(rainpic,this.x, this.y, 80, 80);
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
