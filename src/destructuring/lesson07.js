/*-----------------------
 * Destructuring 
 **---------------------*/

 //from object to object
 let o1 = {a : 1, b: 2, c: 3};
 let o2 = {};

 ({a: o2.x, b: o2.y, c: o2.z} = o1);

 console.log('%j', o2);

 //from object to array
 let a1 = [];
 ({a : a1[0], b: a1[1], c: a1[2]} = o1);
 
 console.log(a1);

 //from array to object
 let o3 = {};
 [o3.a, o3.b, o3.c] = a1;
 console.log('%j', o3);

 //from array to array
 let a2 = [];
 [a2[2], a2[0], a2[1]] = a1;
 console.log(a2);

 //a handy swap
 let x = 10, y = 20;
 [y, x] = [x, y];
 console.log(x, y);
