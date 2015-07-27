
function order(x, y) {
	if(x > y) { //(A)
		let tmp = x;
		x = y;
		y = tmp;
	}
	return [x, y];
}

var a = order(2,1);
var b = order(1,2);

console.log(a);
console.log(b);