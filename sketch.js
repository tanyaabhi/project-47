var PLAY = 1;
var END = 0;
var gameState = PLAY;


var score=0;

var gameOver, restart;
var bgImg


function preload(){
  
  duck1=loadImage("duck.png");
  bowIg=loadImage("bow.png");
  arrowIg=loadImage("arrow.png");
  egg1=loadImage("egg.png");
  duckEnd=loadImage("duckgame.png");
  bgImg=loadImage("bgimage.jpeg");
  //gameOverImg = loadImage("gameOver.png");
 // restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 600);
  
  bg=createSprite(300,300)
  bg.addImage(bgImg)
  bg.scale=2.4
  bg.velocityX=-1

  bow=createSprite(75,300)
  bow.addImage(bowIg);
  bow.scale=0.3;

  
  
  gameOver = createSprite(300,100);
  //gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  //restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  duckGroup=new Group();
  arrowGroup=new Group();
  eggGroup=new Group();
  babiesGroup=new Group();
}

function draw() {
  //trex.debug = true;
  background(180);
 
  if(gameState===PLAY){
    spawnducks()
    bow.y=mouseY;

    spawneggs()
    
    if(bg.x<0){
      bg.x=600
    }
    if(keyDown("space")){
      createArrow();
    }
    if(arrowGroup.isTouching(duckGroup)){
      arrowGroup.destroyEach();
      duckGroup.destroyEach();
      score +=5;
    }
    if(arrowGroup.isTouching(eggGroup)){
      arrowGroup.destroyEach();
      eggGroup.destroyEach();
      gameState= END;
      spawnbabies();
    } 
    drawSprites();

    text("Score: "+ score, 500,50);
  }
  else if(gameState===END){
    spawnbabies();
    bow.visible=false;
    duckGroup.destroyEach();
    eggGroup.destroyEach();
    if(keyDown('space')){
      reset();
    }
    drawSprites();
    textSize(35)
    fill('blue');
    text('GAME OVER',200,250);
    text('PRESS SPACE TO RESTART',80,300);
  }
  
}

function createArrow() {
   arrow=createSprite(75,bow.y,100,2);
   arrow.addImage(arrowIg);
    arrow.velocityX=8; 
    arrow.scale=0.07;
    arrowGroup.add(arrow); 
    //return arrow;
 }

function spawnducks() {
  if(frameCount % 200 === 0) {
    var duck = createSprite(600,Math.round(random(50,550)),10,40);
    //obstacle.debug = true;
    duck.velocityX = -(3);
    
 // generate random obstacles
  var rand = Math.round(random(1,6));
    
      duck.addImage(duck1)

    
    //assign scale and lifetime to the obstacle           
    duck.scale = 0.1;
    duck.lifetime = 300;
   // add each obstacle to the group
    duckGroup.add(duck);
  }
}

function reset(){
  gameState = PLAY;
  bow=createSprite(75,300)
  bow.addImage(bowIg);
  bow.scale=0.3;
  babiesGroup.destroyEach();
  score = 0;
 }
   function spawneggs() {
   if(frameCount % 280 === 0) {
   var egg = createSprite(600,Math.round(random(50,550)),10,40);
        //obstacle.debug = true;
   egg.velocityX = -(4);
      
   //generate random obstacles
  var rand = Math.round(random(1,6));
      
  egg.addImage(egg1)
  
      
  //assign scale and lifetime to the obstacle           
    egg.scale = 0.1;
    egg.lifetime = 300;
        //add each obstacle to the group
    eggGroup.add(egg);
    }
   }
  
     function spawnbabies() {
     if(frameCount % 10 === 0) {
      var duck1 = createSprite(Math.round(random(50,550)),Math.round(random(50,550)),Math.round(random(50,550)),10,40);
      
      
      duck1.addImage(duckEnd)
  
      
     // assign scale and lifetime to the obstacle           
      duck1.scale = 0.1;
      
      babiesGroup.add(duck1);
    }
  }
  