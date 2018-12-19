// Holds our socket server connection
var socket;
var playing = false;
var springtime;
var button;
var speed = 1;
object1 = 0;
//object2 = 
console.goFuckMyself = function() {
  console.log('Fuck Pete');
};

const flowers = [];
const raindrops = [];

function addFlower() {
  flowers.push(new Flower(mouseX,mouseY));
}

function addRainDrop() {
 // console.log(RainDrop);
  raindrops.push(new RainDrop(mouseX,mouseY));
}

function mouseClicked() {
  addFlower();
  addRainDrop();
 // console.log(mouseX,mouseY);
}

function setup() {
//  noLoop();
  // DONT CHANGE THIS, connection to mocap server
  socket = io('192.168.0.100:8000');
  // Setup a listener for the frame event containing rigid body data
  socket.on(
    'frame',
    function(data) {
      // PLACE YOUR CODE FOR HANDLING DATA HERE
      console.log('x raw ', data[0].x, 'y raw ', data[0].y, 'z raw ', data[0].z);

      // Data here is an array of the rigid body objects from QTM
      // [{ x: number, y: number, z: number } ...]
      // x is the short side - max 3600 - min -2000
      // y is the long side - max 3500 - min -3500
      // z is up and down - max is 2300 min is 23
      // If the body loses tracking, all three values will be null

      // Ex of drawing a circle with x and y coords from a rigid body
      if (data[0].y !== null) {
        // Draw a blue circle
        background(0);
        fill(0, 0, 255);
        noStroke();
        // xmin 3000 , xmax 101
        // ymin 4000 , ymax 21
        // zmin 70, zmax 2150

        // Map between two ranges
        const x = (1 - (data[object1].x + 3500) / 7000) * 1000;
        const y = (1 - (data[object1].y + 2000) / 5600) * 400;
        const z = (1 - (data[object1].z - 23) / 2277) * 400;
        ellipse(x, y, 20, 20);
//        console.log('x value ',x, 'y value ',y, 'z value ',z)
      }
    }
  );

 rainpic = loadImage("raindrop.png");
 //rainsvg = loadShape("rainsvg.svg");

 // button = createButton('play');
 // button.mousePressed(toggleVid); // attach button listener
 springtime = createVideo('springtime.mp4');
 springtime.hide();
// springtime.loop();
 //springtime.speed(speed);
 var twicebutton = createButton('2x speed');
 console.log('man', twice_speed);
 twicebutton.mousePressed(twice_speed);

 halfbutton = createButton('half speed');
 halfbutton.mousePressed(half_speed);

 revbutton = createButton('reverse play');
//  button.position(300, 68);
 revbutton.mousePressed(reverse_speed);

 stopbutton = createButton('STOP');
// button.position(400, 68);
 stopbutton.mousePressed(stop_song);

 startbutton = createButton('PLAY!');
// button.position(500, 68);
 startbutton.mousePressed(play_speed);
// springtime.speed(2.0);
// springtime.position(0, 0);
 
 // expect 2 but shows 1
 console.log(springtime.elt.playbackRate);

 createCanvas(1000, 1000);

}



function draw() {
  // Any draw loop code goes here
 //background(150);
 springtime.elt.playbackRate = speed;
 image(springtime, 0, 0);
 //createCanvas(1000, 400);
// background(220);
 // image(springtime, 0, 0);
  // For debugging use `console.log` and open up the browser's inspector
  // console.log(springtime.elt.playbackRate, speed);
 // console.log(springtime);
  var flowerToRemove = -1;
  var rainDropToRemove = -1;

  flowers.forEach((f, i) => {
    f.draw();
    f.update();
    if (f.y > height) {
      flowerToRemove = i;
    }
  });

  if (flowerToRemove > -1) {
    flowers.splice(flowerToRemove, 1);
   // console.log("removing flower ", flowerToRemove);
  }

  raindrops.forEach((f, i) => {
    f.draw();
    f.update();
    if (f.y > height) {
      rainDropToRemove = i;
    }
  });

  if (rainDropToRemove > -1) {
    raindrops.splice(rainDropToRemove, 1);
   // console.log("removing raindrop ", rainDropToRemove);
  }

  
}


// function toggleVid() {
//   if (playing) {
//     springtime.pause();
//     button.html('play');
//   } else {
//     springtime.loop();
//     button.html('pause');
//   }
//   playing = !playing;
// }

function twice_speed() {
  speed = 2;
  console.log('twice man')
}

function half_speed() {
  speed = 0.5;
}

function reverse_speed() {
  springtime.speed(-1);
}

function stop_song() {
  sprintime.stop();
}

function stop_song() {
  springtime.stop();
}

function play_speed() {
  springtime.loop();
}


