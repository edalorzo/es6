

/*
 * All properties and functions are public
 */

var myobj = {
    myprop: 1,
    getProp: function() {
        return this.myprop;
    }
};
console.log(myobj.myprop); //myprop is publicly accessible
console.log(myobj.getProp()); //getProp is public too

function Gadget() {
    this.name = 'iPod';
    this.stretch = function() {
        return 'iPad';
    };
}
var toy = new Gadget();
console.log(toy.name); //name is public
console.log(toy.stretch()); //stretch() is public