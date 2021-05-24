
var basket,basketImg;
var ballImg,ballGroup;
var score=0;
var gameState =0;
var start,startImg,back,backImg,hTP,hTPIMG;
var mainImg,playImg;

function preload() {
  ballImg = loadImage("images/ball.png");

  basketImg = loadImage("images/basket.png");

  startImg = loadImage("images/start.png");

  backImg = loadImage("images/back.png");

  mainImg = loadImage("images/main.jpg");

  hTPIMG = loadImage("images/htp.png");

 
}


function setup() {

  createCanvas(1000,750);

  basket = createSprite(500,100);
  basket.addImage(basketImg);
  basket.scale = 0.25;
  basket.visible = false;

  ballGroup = new Group();

  back = createSprite(800,700,200,100);
  back.addImage(backImg);
  back.scale = 0.25;

  start = createSprite(500,480,400,50);
  start.addImage(startImg);
  start.scale = 0.5;

  hTP = createSprite(500,580,450,80);
  hTP.scale = 0.5;
  hTP.addImage(hTPIMG);

  

}

function draw() {

  if(gameState==0){

    background(mainImg);
    
    start.visible = true;
    back.visible = false;

    if(mousePressedOver(start)){
      gameState = 1;

    }
    if(mousePressedOver(hTP)){
      gameState = 2;

    }

    basket.visible = false;

    fill("white");
    textSize(50);
    text("BALL IN THE BASKET ",250,400);
    
    hTP.visible = true;

  }

  if(gameState==1){

    background("orange");

    fill("black");
    textSize(30);
    text("SCORE: "+score,800,100);
  
    spawnBall();

    basket.visible = true;

    if(keyDown("left")){
      basket.x = basket.x - 10;

    }
  
    if(keyDown("right")){
      basket.x = basket.x + 10;

    }

    for(i=1;i<ballGroup.length;i++){

      var temp = ballGroup.get(i);
      
      if(temp.isTouching(basket)){
        temp.destroy();
        score = score +1;

      }

      if(temp.y < 0){
        temp.destroy();
        score = score -1;

      }
    }

    start.visible = false;
    back.visible = true;
    
    hTP.visible = false;

    if(mousePressedOver(back)){
      gameState = 0;
      score = 1;
      
    }
  }

  if(gameState==2){
    background("black");
    textSize(40);
    fill("white");
    text("HOW TO PLAY",375,100);
    start.visible = false;
    back.visible = true;
    hTP.visible = false;
    if(mousePressedOver(back)){
      gameState = 0;
      
    }
    textSize(20);
    text("1.  Use Left -> arrow key for going to left direction.",100,200);
    text("2.  Use Right <- arrow key for going to right direction.",100,250);
    text("3.  Get the Balls in the basket for getting points.",100,300);
    text("4.  If Balls touch the top edge of the screen, then you lose points.",100,350);
  }
 
  drawSprites();

}

function spawnBall(){
  if(frameCount %100==0 ){
    var ball = createSprite(random(100,900),1000);
    ball.addImage(ballImg);
    ball.scale = 0.15;
    ball.velocityY = -10;
    ballGroup.add(ball);

  }
}


