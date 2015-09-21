
/**
 * Adding modules to the Sanbox
 */

//The dom module (e.g. dom.js)

 Sanbox.modules = Sanbox.modules || {};

 Sandbox.modules.dom = function(box) {
 	box.getElement = function(){};
 	box.getStyle = function(){};
 	box.foo = "foo";
 };

 //The event module (e.g. event.js)

 Sanbox.modules = Sanbox.modules || {};

 Sanbox.modules.event = function(box) {
 	box.attachEvent = function(){};
 	box.detachEvent = function(){};
 };

 //The ajax module (e.g. ajax.js)
 Sanbox.modules = Sanbox.modules || {};

 Sanbox.modules.ajax = function(box){
 	box.makeRequest = function(){};
 	box.getResponse = function(){};
 };

 