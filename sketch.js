var player , scene , banana,obstacle,invisibleground;
var player_running,sceneImage,bananaImage,obstacleImage,FoodGroup,ObstacleGroup;
var score=0;

var END =0;
var PLAY =1;
var gameState = PLAY;



function preload(){
   player_running =loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png",
 "Monkey_09.png"     ,"Monkey_10.png"                          )
bananaImage=loadImage("banana.png")
sceneImage =loadImage("jungle.jpg")
   obstacleImage = loadImage("stone.png");
  
}


function setup() {
  createCanvas(600, 280);
  
  
  scene=createSprite(200,40,400,400);
  scene.addImage("scene",sceneImage);
  scene.velocityX=-5
   scene.x=scene.width/2;
  
  player=createSprite(80,225,20,20);
  player.addAnimation("running",player_running);
  player.scale=0.1
 
  
   invisibleground = createSprite(250,280,400,1);
  invisibleground.visible = false;
   
  FoodGroup = new Group();
  ObstaclesGroup = new Group();
}




function draw() {
  background(220);
  if(gameState===PLAY){
    
  if(scene.x<100){
     scene.x=scene.width/2;
    }
    spawnFood();
  spawnObstacle();
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
   if(FoodGroup.isTouching(player)){
    FoodGroup.destroyEach();
    score = score + 2;
    player.scale+=+0.1
  }
  player.collide(invisibleground);
  if(ObstaclesGroup.isTouching(player)){
    
     gameState=END 
} 
  }else if(gameState===END){
    
   //scene.velocity=0
    player.visible=false; 

     FoodGroup.destroyEach();
     ObstaclesGroup.destroyEach();

     textSize(30);
     fill("225"); 
     text("GameOver!",100,100)
    }
    
   
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 450,50);
  
}
function spawnFood(){
  if(frameCount % 80 === 0){
    var banana = createSprite(600,210,40,10);
    banana.addImage("banana", bananaImage);
    banana.scale = 0.05;
    banana.y = random(120,200);
    banana.velocityX = -4;
    banana.lifetime = 300;
    
    player.depth = banana.depth+1;
    
    FoodGroup.add(banana);
  }
}
function spawnObstacle(){
  if(frameCount % 300 === 0){
   var obstacle = createSprite(800,250,10,40);
    obstacle.addImage("obstacle", obstacleImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -6;
    obstacle.lifetime = 300;
    
    ObstaclesGroup.add(obstacle)
  }
}
