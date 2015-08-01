/*---------------------------------------
 * Computed Properties
 *-------------------------------------*/


 let a = 'name';
 let b = 1;
 let c = 2;

 let obj1 = {}
 obj1[a+b] = 'Julio';
 obj1[a+c] = 'Verne';

//same as

let obj2 = {
	[a+b]: 'Julio',
	[a+c]: 'Verne'
};



 console.log(obj1, obj2);