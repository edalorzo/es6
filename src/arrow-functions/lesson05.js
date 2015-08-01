
/*---------------------------------------------
 * Traditional `this` scope problem
 *---------------------------------------------*/

//constructor
function Prefixer(prefix) {
	this.prefix = prefix;
}

Prefixer.prototype.prefixArray = function(arr) {
	return arr.map(function(item) { 
		return this.prefix + item;
	});
};

let men = ['Soto','Brenes','Ramírez'];
let women = ['Fallas','Aguilar','Hernandez'];

let manPrefixer = new Prefixer('Mr. ');
let wonemPrefixer = new Prefixer('Mrs. ');

let res1 = manPrefixer.prefixArray(men);
let res2 = wonemPrefixer.prefixArray(women);

console.log(res1);
console.log(res2);

