/**
 * Defining classes
 */

class Point {
	
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	toString() {
		return `(${this.x}, ${this.y})`;
	}
}

class ColorPoint extends Point {
	
	constructor(x, y, color) {
		super(x,y);
		this.color = color;
	}

	toString() {
		return super.toString() + ' in ' + this.color;
	}

}

let p1 = new Point(1,1);
let p2 = new Point(1,2);
let p3 = new ColorPoint(5,2, 'Red');

console.log('%s', p1);
console.log('%s', p2);
console.log('%s', p3);

console.log(p1 instanceof Point);
console.log(p3 instanceof ColorPoint);