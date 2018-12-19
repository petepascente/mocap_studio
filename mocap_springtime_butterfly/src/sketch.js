// Holds our socket server connection
var socket;
var playing = false;
var springtime;
var button;
var speed = 1;
//let object1 = 0;
let ox = 0;
let oy = 0;

// Time logic
let prevTime = 0;
// Drop water logic
const DROP_TIME_MAX = 250;
let dropTime = 0;

const butterflies = [];

function addButterfly() {
  butterflies.push(new Butterfly(ox,oy));
}


function makeItRain(dt) {
  dropTime += dt;
  if (ox > 0 && dropTime > DROP_TIME_MAX) {
    addButterfly();
    dropTime = 0;
  }
}

function setup() {
  prevTime = Date.now();
//  noLoop();
  // DONT CHANGE THIS, connection to mocap server
  socket = io('192.168.0.100:8000');
  // Setup a listener for the frame event containing rigid body data
  socket.on(
    'frame',
    function(data) {
      // PLACE YOUR CODE FOR HANDLING DATA HERE
    //  console.log('x raw ', data[7].x, 'y raw ', data[7].y, 'z raw ', data[7].z);

      // Data here is an array of the rigid body objects from QTM
      // [{ x: number, y: number, z: number } ...]
      // x is the short side - max 3600 - min -2000
      // y is the long side - max 3500 - min -3500
      // z is up and down - max is 2300 min is 23
      // If the body loses tracking, all three values will be null

      // Ex of drawing a circle with x and y coords from a rigid body
      if (data[7].y !== null) {
        background(0);
        fill(0, 0, 255);
        noStroke();
     
        ox = map(data[7].y,0,4000,1920,0);
        oy = map(data[7].z,0,2000,1080,0);
//        console.log('x value ',x, 'y value ',y, 'z value ',z)
      }
    }
  );

 butterfly = loadImage("butterfly.png");

 springtime = createVideo('cherryforest.mp4');
 springtime.hide();

 var twicebutton = createButton('2x speed');
 console.log('man', twice_speed);
 twicebutton.mousePressed(twice_speed);

 halfbutton = createButton('half speed');
 halfbutton.mousePressed(half_speed);

 revbutton = createButton('reverse play');
 revbutton.mousePressed(reverse_speed);

 stopbutton = createButton('STOP');
 stopbutton.mousePressed(stop_song);

 startbutton = createButton('PLAY!');
 startbutton.mousePressed(play_speed);



 createCanvas(1920,1080);

}



function draw() {
  const currentTime = Date.now();
  const dt = currentTime - prevTime;
  prevTime = currentTime;
  // Any draw loop code goes here
 springtime.elt.playbackRate = speed;
 image(springtime, 0, 0);
 //createCanvas(1000, 400);
// background(220);
 // image(springtime, 0, 0);
  // For debugging use `console.log` and open up the browser's inspector
  // console.log(springtime.elt.playbackRate, speed);
 // console.log(springtime);
  var butterflyToRemove = -1;

  butterflies.forEach((f, i) => {
    f.draw();
    f.update();
    if (f.y > height) {
      butterflyToRemove = i;
    }
  });

  if (butterflyToRemove > -1) {
    butterflies.splice(butterflyToRemove, 1);
  }

  const scaleVal = Math.sin(currentTime / 250) * 12;
  image(butterfly,ox, oy, 150 + scaleVal, 150 + scaleVal);
  makeItRain(dt);
}

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
