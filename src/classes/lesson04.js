
/**
 * Static Field Members
 */

class Point {
	
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	toString() {
		return `(${this.x}, ${this.y})`;
	}

	static get ORIGIN() {
		return new Point(0,0);
	}

}

Point.ZERO = new Point(0,0);


console.log('%s', Point.ZERO);
console.log('%s', Point.ORIGIN);

