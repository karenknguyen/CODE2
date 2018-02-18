
// "THE BLACK HOLE."

//MOTION: properties - position, velocity, acceleration, size, shape, color; action - track or seek, move or apply force, (opt: collision), display, update

let v;
var thicc = [];

function setup() {
	noCursor()
	createCanvas(1600,900);
	for (var i = 0; i <= 100; i++) {
		thicc[i] = new Vehicle(createVector(random(0,width),random(0,height)));
	}
	//v = new Vehicle(createVector(width/2, height/2))
}

function draw() {
	background(221,212,235);

	// draw circle at mouse position
	fill(200);
	stroke(0);
	strokeWeight(2);
	ellipse(mouseX, mouseY, 48, 48);

	// update and display vehicle
	for (var i = 0; i <= thicc.length - 1; i++) {
		thicc[i].seek(createVector(mouseX, mouseY));
		thicc[i].update();
		thicc[i].display();
	}
	/*v.seek(createVector(mouseX, mouseY));
	v.update();
	v.display();*/

}

//define vehicle class
class Vehicle {
	constructor(position) {		// either way is fine -- class for mult tings
		// this is where we define our properties
		this.position = position;
		this.velocity = createVector(0,0);
		this.acceleration= createVector(0,0);
		//r is our size
		this.r = 6;
		this.color = color(206, 228, 254);

		this.maxSpeed = 4;
	}


	// seek target
	seek(target) {
		// note that this.position is a vector
		// note that target is a vector
		// find the desired vector of travel
		// by subtracting position from target 
		let desired = target.sub(this.position);

		desired.setMag(this.maxSpeed);

		// find the 'steering' vector
		let steer = desired.sub(this.velocity);

		this.applyForce(steer);

	}

	// applyForce
	// this is how we move the car in a given direction
	// with a given magnitude (vector)
	applyForce(force) {

		/*var desiredseparation = 25.0;
		var steer = createVector(0,0);
		var count = 0;

		for (var i = 0; i < thicc.length; i++) {
			var d = p5.Vector.dist(this.position,thicc[i].position);
			if((d>0)&&(d<desiredseparation)){
				var diff = p5.Vector.sub(this.position,thicc[i].position);
				diff.normalize();
				diff.div(d);
				steer.add(diff);
				count++;
			}
			if(count<0){
				steer.div(count);

			}

			// As long as the vector is greater than 0
			if (steer.mag() > 0) {
			// Implement Reynolds: Steering = Desired - Velocity
				steer.normalize();
				steer.mult(this.maxspeed);
				steer.sub(this.velocity);
				steer.limit(this.maxforce);
			}
		}
		this.acceleration.add(force+steer);*/
		this.acceleration.add(force);
		// note that we can do more physics simulation here
		// eg give the car mass & calc. the acceleration 
		// delta as A = F / M
	}


	// update
	// "run simulation"
	// update properties based on changes since last update

	update() {
		if((this.position.x<mouseX+24)&&(this.position.x>mouseX-24)){
			if((this.position.y<mouseY+24)&&(this.position.y>mouseY-24)){
				this.position = createVector(random(0,width),random(0,height));
			}
		}

		//update velocity
		this.velocity.add(this.acceleration);
		// update position
		this.position.add(this.velocity);

		// reset acceleration
		this.acceleration.mult(0);
	}

	// display
	display() {
		// draw a traingle roatted in the direction of velocity

		// get the angle from velocity
		let theta = this.velocity.heading() + HALF_PI;

		// set drawing properties
		fill(this.color);
		stroke(0);
		strokeWeight(1);

		// move the center of the canvas to the vehicle's position
		translate(this.position.x, this.position.y);
		// rotate the canvas to the heading we calculated above
		rotate(theta);

		// draw the vehicle shape
		beginShape();
		// can also use triangle
		vertex(0, -this.r*2);
		vertex(-this.r, this.r*2);
		vertex(this.r, this.r*2);
		endShape(CLOSE);

		// end transforms 
		resetMatrix();
	}
}









