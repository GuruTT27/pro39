var PLAY = 1;
var END = 0;
var gameState = PLAY;

var swan, swanIm;
var stone, stoneIm1, stoneIm2, stoneIm3, stoneIm4, stoneIm5, stoneIm6, stoneGroup;
var fish, fishIm, fishGroup;
var sky, skyIm;
var gameOver, gameOverIm, you_win, you_win_im, you_lose, you_lose_im;
var invisibleGround;
var score;
var survive;

function preload() {

  swanIm = loadImage("swan.png");

  fishIm = loadImage("fish.png");

  skyIm = loadImage("p5Background.png");

  gameOverIm = loadImage("gameOver.png");

  stoneIm1 = loadImage("stone1.png");
  stoneIm2 = loadImage("stone2.png");
  stoneIm3 = loadImage("stone3.png");
  stoneIm4 = loadImage("stone4.png");
  stoneIm5 = loadImage("stone5.png");
  stoneIm6 = loadImage("stone6.png");

  you_win_im = loadImage("youWin.png");
  you_lose_im = loadImage("youLose.png");

}

function setup() {

  createCanvas(600, 460);

  invisibleGround = createSprite(300, 400, 700, 20);
  invisibleGround.velocityX = -3;

  sky = createSprite(200, 200, 10, 10);
  sky.velocityX = -3;
  sky.addImage(skyIm);

  swan = createSprite(100, 356, 10, 10);
  swan.addImage(swanIm);
  swan.scale = 0.4;
  //swan.debug = true;
  swan.setCollider("rectangle", 0, 0, 100, 125);

  gameOver = createSprite(300, 230, 30, 30);
  gameOver.addImage(gameOverIm);
  gameOver.scale = 0.5;

  you_win = createSprite(300, 230, 30, 30);
  you_win.addImage(you_win_im);
  you_win.scale = 0.8;

  you_lose = createSprite(300, 230, 30, 30);
  you_lose.addImage(you_lose_im);
  you_lose.scale = 0.5;

  stoneGroup = new Group();
  fishGroup = new Group();

  score = 0;
  survive = 0;

}

function draw() {

  background('white')
  
  if (gameState === PLAY) {

    gameOver.visible = false;
    you_win.visible = false;
    you_lose.visible = false;

    camera.position.x = swan.x;
    camera.position.y = swan.y;

    if (sky.x < -200) {

      sky.x = 200;

    }

    if (keyDown("space") && swan.y >= 300) {

      swan.velocityY = -10;

    }

    swan.velocityY = swan.velocityY + 0.8

    if (invisibleGround.x < 300) {

      invisibleGround.x = 300;

    }

    if (swan.isTouching(stoneGroup)) {

      stoneGroup.destroyEach();
      survive = survive + 1;
      swan.scale = 0.4;

    }

    if (survive === 10) {

      gameState = END;

    }

    if (swan.isTouching(fishGroup)) {

      fishGroup.destroyEach();
      score = score + 1;
      swanGrow();

    }
    
    if(score === 35){
      
      win();
      
    }

    spawnStones();
    spawnFish();

  }

  if (gameState === END) {

    reset();

  }

  swan.collide(invisibleGround)

  drawSprites();

  fill('black');
  textSize(20);
  text("Fish Eaten: " + score,-180,300);
  
  fill('black');
  textSize(20);
  text("Rocks Hit: " + survive,250,300);

  fill('black');
  textSize(20);
  text("If You Eat 30 fishes you win. But if you hit 10 rocks you lose.",-170,200);

  fill('black');
  textSize(20);
  text("Press 'space key' to jump",-20,250);

}

function spawnStones() {

  if (frameCount % 127 === 0) {
    stone = createSprite(600, 380, 10, 40);
    stone.velocityX = -5;

    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1:stone.addImage(stoneIm1);
        break;
      case 2:stone.addImage(stoneIm2);
        break;
      case 3:stone.addImage(stoneIm3);
        break;
      case 4:stone.addImage(stoneIm4);
        break;
      case 5:stone.addImage(stoneIm5);
        break;
      case 6:stone.addImage(stoneIm6);
        break;
      default:break;

    }

    stone.scale = 0.5;
    stone.lifetime = 300;

    //stone.debug = true;
    stone.setCollider("rectangle", 0, 0, 100, 50)

    stoneGroup.add(stone);
  }
}

function spawnFish() {

  if (frameCount % 80 === 0) {

    fish = createSprite(350, 250, 30, 03);
    fish.velocityX = -5;
    fish.addImage(fishIm);
    //fish.debug = true;
    fish.setCollider("circle", 0, 0, 100)
    fish.scale = 0.3;
    fish.lifetime = 50;

    fishGroup.add(fish);

  }

}

function reset() {

  gameOver.visible = true;
  you_lose.visible = true;

  if (sky.x < -200) {

    sky.x = sky.width / 2;

  }

  fishGroup.destroyEach();
  stoneGroup.destroyEach();
  swan.visible = false;
  swan.lifetime = 10;


}

function swanGrow() {

  switch (score) {
    case 10: swan.scale = 0.5;
      break;
    case 20:swan.scale = 0.6;
      break;
    case 30:swan.scale = 0.7;
      break;
    default:break;

  }
}

function win(){
  
   gameOver.visible = true;
   you_win.visible = true;
  
   if (sky.x < 0) {

    sky.x = sky.width / 2;

  }

  fishGroup.destroyEach();
  stoneGroup.destroyEach();
  swan.visible = false;
  swan.lifetime = 10;

  
}