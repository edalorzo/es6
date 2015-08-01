/*
 * Symbols are unique string-like vakues that
 * can't collide with any other value.
 */

const RED = Symbol();
const BLUE = Symbol();
const GREEN = Symbol();
const ORANGE = Symbol();
const YELLOW = Symbol();
const VIOLET = Symbol();

function getComplement(color) {
	switch(color) {
		case RED: return GREEN;
		case ORANGE: return BLUE;
		case YELLOW: return VIOLET;
		case GREEN: return RED;
		case BLUE: return ORANGE;
		case VIOLET: return YELLOW;
		default: throw new Exception('Unknown color: ' + color);
	}
}

if(getComplement(RED) === GREEN) {
	console.log("Paint in green");
}


//But strings are not unique
const SRED = 'RED';
const SBLUE = 'BLUE';
const SGREEN = 'GREEN';
const SORANGE = 'ORANGE';
const SYELLOW = 'YELLOW';
const SVIOLET = 'VIOLET';

function getComplementColor(color) {
 	switch(color) {
 		case SRED: return SGREEN;
 		case SORANGE: return SBLUE;
 		case SYELLOW: return SVIOLET;
 		case SGREEN: return SRED;
 		case SBLUE: return SORANGE;
 		case SVIOLET: return SYELLOW;
 		default: throw new Exception('Unknown color: ' + color);
 	}
 }

const SOME_RED ='RED';
const SOME_GREEN ='GREEN';

 if(getComplementColor(SOME_RED) === SOME_GREEN) {
 	console.log("Paint again in green");
 }

