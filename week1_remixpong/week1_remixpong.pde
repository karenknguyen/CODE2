/* remixed pong game features: everytime player moves paddle and hits ball, ball becomes faster and paddle shrinks */

float d = 25; 
float ballX, ballY;
float speedX, speedY; 

int playerLives = 20; 

boolean playerMoveUp, playerMoveDown;
boolean gameOver = false; 

int time;

Paddle player; 

void setup(){
  size(700, 600); 
  
  textSize(24); 
  player = new Paddle(width-30); 
  
  reset(); 
}

void draw(){
  background(255, 230, 255); 
  
  if(!gameOver){
    time = millis()/1000; 
    fill(179, 255, 217); 
    rect(0, height/2, 10, height); 
    
    fill(255, 224, 102); 
    ellipse(ballX, ballY, d, d); 
    
    fill(121); 
    text("CHANCES: " + playerLives, width*.2, height*.10); 
    
    updateBall(); 
    checkCollision(); 
    player.update(); 
    player.display(); 

  }
  fill(40);
  text("TIME: " + time, width*.6, height*.10); 
  checkLives(); 
}



void updateBall(){
  ballX += speedX; 
  ballY += speedY; 
}

void reset(){
  ballX = width/2; 
  ballY = height/2; 
  
  speedX = random(2, 4); 
  speedY = random(2, 4); 
}

void checkCollision(){
  if(ballX >= width-d/2){
    playerLives -= 1;  
    player.rSize = 200;
    reset(); 
  }
  
  if(ballX <= d/2 + 10){
    speedX *= -1.1; 
  }
  
  if(ballY >= height-d/2 || ballY <= d/2){
    speedY *= -1.1; 
    //player.rSize *=0.9;
  }

  if(ballX >= player.xPos - d/2 && ballY>= (player.yPos-player.rSize/2) && 
    ballY<= (player.yPos+player.rSize/2)){
    speedX *= -1.1; 
    speedY *= 1.1; 
    player.rSize *=0.95;
  }
}

void checkLives(){
  if(playerLives <= 0){
    text("Game Over loSeRz!! :( ", width*.4, height/2); 
    gameOver = true; 
  }
}