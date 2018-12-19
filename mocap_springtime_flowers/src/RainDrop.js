


class RainDrop {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.velocity = 0;
    this.xvariance = 10;
    this.grav = .5;
  //  this.sinOffset = Math.random() * Math.PI;
  }

  draw() {
    var c = color(0, 0, 255);
    fill(c);
    image(rainpic,this.x, this.y, 30, 46);
   // shape(rainsvg, this.x, this.y, 50, 50);
  }

  addGravity() {
    this.y += this.velocity;
    this.velocity += this.grav;
  }

  noisemanX() {
    //console.log('noise', noise(this.y));
   // this.x += (Math.sin((this.y / 100) + this.sinOffset)) * 3;
  }

  update() {
    this.addGravity();
  //  this.noisemanX();
  }

  

}

