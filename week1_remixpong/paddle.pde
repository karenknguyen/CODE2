
class Paddle {
  float xPos, yPos;
  float d = 25; 
  public float rSize; 

  Paddle(float _xPos) {
    xPos = _xPos; 
    yPos = 100; 
    rSize = 200;
  }
  
  void update(){
    yPos = mouseY; 
  }

  void display() {
    rectMode(CENTER); 
    fill(153, 221, 255); 
    rect(xPos, yPos, 10, rSize);
  }
}