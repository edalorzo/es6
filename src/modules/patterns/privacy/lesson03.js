

/*
 * Two variations of the privacy pattern
 */

var myobj; //this will be the object
(function(){
    //private members
    var name = "my, oh my";

    //implement the public part
    //not -- no `var`
    myobj = {
        //privileged method
        getName: function() {
            return name;
        }
    };
}());

var res = myobj.getName(); //"my, oh my"
console.log(res);

//in this case the IIFE returns the object

var myobj = (function(){
    //private members
    var name = "my, oh my";

    //implement the public part
    return {
        getName: function() {
            return name;
        }
    };
}());

res = myobj.getName(); //"my, oh my"
console.log(res);
