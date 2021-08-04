var bow , arrow, score, arrows, balloons, lastreloaded;
var bowImage, arrowImage, green_balloonImage, red_balloonImage, pink_balloonImage ,blue_balloonImage, backgroundImage;
var gbs, rbs, pbs, bbs
// Check line 16!
let win;
function preload(){
  soundFormats('mp3', 'ogg');
  win = loadSound('Win.mp3');
  backgroundImage = loadImage("background0.png");
  arrowImage = loadImage("arrow0.png");
  bowImage = loadImage("bow0.png");
  green_balloonImage = loadImage("green_balloon0.png");
  red_balloonImage = loadImage("red_balloon0.png");
  pink_balloonImage = loadImage("pink_balloon0.png");
  blue_balloonImage = loadImage("blue_balloon0.png");
}

function setup() {
  rate = 30 //Change this to change the number of frames before you can shoot
  lastreloaded = -rate;
  reloaded = true;
  createCanvas(400, 400);
  arrows = createGroup();
  balloons = createGroup();
  gbs = createGroup();
  rbs = createGroup();
  bbs = createGroup();
  pbs = createGroup();
  score = 0;
  textSize(20);
  textAlign(CENTER, CENTER);
  textFont('Courier');
  fill(50);
  scene = createSprite(0,200,400,400);
  scene.addImage(backgroundImage);
  bow = createSprite(380,220,20,50);
  bow.addImage(bowImage); 
  bow.scale = 1;
}

function createArrow() {
  if (frameCount - lastreloaded >= rate) {
    reloaded = true
  }
  if (reloaded) {
    lastreloaded = frameCount;
    reloaded = false
    var arrow = createSprite(100, 100, 60, 10);
    arrow.addImage(arrowImage);
    arrow.x = 360;
    arrow.y=bow.y;
    arrow.velocityX = -4;
    arrow.lifetime = 100;
    arrow.scale = 0.3;
    arrows.add(arrow);
  }
}

function redBalloon() {
  var red = createSprite(30,Math.round(random(20, 370)), 10, 10);
  red.addImage(red_balloonImage);
  red.velocityX = 3;
  red.lifetime = 150;
  red.scale = 0.1;
  rbs.add(red);
}

function blueBalloon() {
  var blue = createSprite(30,Math.round(random(20, 370)), 10, 10);
  blue.addImage(blue_balloonImage);
  blue.velocityX = 3;
  blue.lifetime = 150;
  blue.scale = 0.1;
  bbs.add(blue);
}

function greenBalloon() {
  var green = createSprite(30,Math.round(random(20, 370)), 10, 10);
  green.addImage(green_balloonImage);
  green.velocityX = 3;
  green.lifetime = 150;
  green.scale = 0.1;
  gbs.add(green);
}

function pinkBalloon() {
  var pink = createSprite(30,Math.round(random(20, 370)), 10, 10);
  pink.addImage(pink_balloonImage);
  pink.velocityX = 3;
  pink.lifetime = 150;
  pink.scale = 1.2;
  pbs.add(pink);
}

function draw() {
  background(0);
  // moving ground
  scene.velocityX = -3;

  if (scene.x < 0){
    scene.x = scene.width/2;
  }
   
  bow.y = World.mouseY;
   
  // release arrow when space key is pressed
  if (keyDown("space")) {
    createArrow();
  }
   
   //creating continous balloons
   var select_balloon = Math.round(random(1,4));
   
  if (World.frameCount % 90 == 0) {
    if (select_balloon == 1) {
      redBalloon();
    } else if (select_balloon == 2) {
      blueBalloon();
    } else if (select_balloon == 3) {
      greenBalloon();
    } else {
      pinkBalloon();
    }
  }
  if (arrows.isTouching(gbs)) {
    win.play();
    gbs.destroyEach();
    arrows.destroyEach();
    score = score + 4;
  }
  if (arrows.isTouching(rbs)) {
    win.play();
    rbs.destroyEach();
    arrows.destroyEach();
    score = score + 1;
  }
  if (arrows.isTouching(bbs)) {
    win.play();
    bbs.destroyEach();
    arrows.destroyEach();
    score = score + 3;
  }
  if (arrows.isTouching(pbs)) {
    win.play();
    pbs.destroyEach();
    arrows.destroyEach();
    score = score + 2;
  }
  drawSprites();
  if (keyDown("h")) {
    text("Red balloons: 1", 200, 150);
    text("Pink balloons: 2", 200, 180);
    text("Blue balloons: 3", 200, 210);
    text("Green balloons: 4", 200, 240);
  }
  text("SCORE: "+score, 300, 20);
 }