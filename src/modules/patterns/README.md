# JavaScript Modularity

## The Namespace Pattern

Namespaces help reduce the number of globals required by our program and at the same time also help avoid naming collisions or excessive name prefixing.
Traditional JavaScript doesn't have namespaces built into the language syntax, but this is a feature that is quite easy to achieve. Instead of polluting the global scope with a lot of functions, objects and other variables, you can create one (and ideally only one) global object for your application library. Then you can add all the functionality to that object.

Consider the following example:

```javascript
//BEFORE: 5 globals
//Warning: attipatern

//constructors
function Parent {}
function Child {}

//a variable
var some_var = 1;

//some objects
var module1 = {};
module1.data = {a: 1. b: 2};
var module2 = {};
```

You can refactor this type of code by creating a single global object for your application, called, for example `MYAPP`, and change all your functions and variables to become properties of your global object:

```javascript
//AFTER: 1 global

//global object
var MYAPP = {};

//constructors
MYAPP.Parent = function() {};
MYAPP.Child = function() {};

//a variable
MYAPP.some_var = 1;

//an object container
MYAPP.modules = {};

//nested objects
MYAPP.modules.module1 = {};
MYAPP.modules.module1.data = {a: 1, b: 2};
MYAPP.modules.module2 = {};
```

For the name of the global namespace object, you can pick, for example, the name of your application library, your domain name, or your company name. Often developers use the convention of making the global variable ALL CAPS, so it stands out to the readers of the code.

This pattern is a good way to namespace your code and avoid naming collisions in your own code, and collisions between your code and third-party code on the same page, such as JavaScript libraries or widgets. This pattern is highly recommended and perfectly applicable for many tasks, but it does have some drawbacks:

* A bit more to type; prefixing every variable and function does add up in the total amount of code that needs to be downloaded.
* Only one global instance means that any part of the code can modify the global instance and the rest of the functionality get the updated state.
* Long nested names mean longer (slower) property resolution lookups.

The sandbox pattern discussed later on addresses this problem.

## General Purpose Namespace Function

As the complexity of the program grows and some parts of the code get split into different files and included conditionally, it becomes common to assume that your code is the first to define a certain namespace or a property inside of it. Some of the properties you're adding to the namespace may already exist, and you could be overriding them. Therefore, before adding a property or creating a namespace, it's best to check first that it doesn't already exist, as show in this example:

```javascript
//unsafe
var MYAPP= {};

//better
if(typeof MYAPP === "undefined") {
   var MYAPP = {};
}

//or shorter
var MYAPP = MYAPP || {};
```

You can see how these added checks can quickly result in a lot of repeating code. For example, if you want to define `MYAPP.modules.module2`, you'll have to make three checks, one for each object or property you're defining. That's why it's handy to have a reusable function that takes care of the namespacing details. Let's call this function namespace() and use it like so:

```javascript
//using a namespace function
MYAPP.namespace('MYAPP.modules.module2');

//equivalent to:
// var MYAPP = {
//    modules: {
//       module2: {}
//    }
// }
```

Next is an example implementation of the namespacing function. This implementation is nondestructive, meaning that if a namespace exists, it won't be re-recreated:

```javascript
var MYAPP = MYAPP || {};

MYAPP.namespace = function(ns_string) {
    var parts = ns_string.split('.'),
        parent = MYAPP,
        i;
        
    //strip redundant leading global
    if(parts[0] === "MYAPP") {
        parts = parts.slice(1);
    }

    for(i = 0; i < parts.length; i += 1) {
        //create a property if it doesn't exist
        if(typeof parent[parts[i]] === "undefined"){
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }
    return parent;
};
```

This implementation enables all of these uses:

```

//assign returned value to a local var
var module2 = MYAPP.namespace('MYAPP.modules.module2');
module2 === MYAPP.modules.module2;

//skip initial MYAPP
MYAPP.namespace('modules.module51');

//long namespace
MYAPP.namespace('once.upon.a.time.there.was.this.long.nested.property');
```

## Declaring Dependencies

JavaScript libraries are often modular and namespaced, which enables you to include only the modules you require. For example, in YUI2 there's a global variable `YAHOO`, which serves as a namespace, and then modules that are properties of the global variable, such as `YAHOO.util.Dom` and `YAHOO.util.Event`.

It's a good idea to declare modules your code relies on at the top of your function or module. The declaration involves creating only a local variable and pointing to the desired module:

```
var myFunction = function() {
    //dependencies
    var event = YAHOO.util.Event,
        dom = YAHOO.util.Dom;

    //use event and dom variables
    //for the rest of the function
}
```

This is an extremely simple pattern, but at the same time it has numerous benefits:

* Explicit declaration of dependencies signals to the user of your code the specific script files that they need to make sure are included in the page.
* Upfront declaration at the top of the function makes it easy to find and resolve dependencies.
* Working with a local variable (such as `dom`) is always faster than working with a global (such as `YAHOO`) and even faster than working with nested properties of a global variable (such as `YAHOO.util.Dom`), resulting in better performance. 
* When following this dependency declaration pattern, the global symbol resolution is performed only once in the function. After that the local variable is used, which is much faster.

Smaller code after minification -- most minification tools will rename local variables (so event will likely become just one character such as A) but will not rename global variables, because it's usually not safe to do so.

The following snippet is an illustration of the effect of the dependency declaration pattern on the minified code. Although `test2()`, which follows the pattern, looks a bit involved because it requires more lines of code and an extra variable, it actually results in less code after minification, meaning less code the user has to download:

```javascript
function test1(){
    alert(MYAPP.modules.m1);
    alert(MYAPP.modules.m2);
    alert(MYAPP.modules.m51);
}

/*minified test1 body
alert(MYAPP.modules.m1);alert(MYAPP.modules.m2);alert(MYAPP.modules.m51);
*/

function test2() {
    var modules = MYAPP.modules;
    alert(modules.m1);
    alert(modules.m2);
    alert(modules.m51);
}

/*minified test2 body
var a=MYAPP.modules;alert(a.m1);alert(a.m2);alert(a.m51);
*/
```

## Private Properties and Methods

JavaScript has no special syntax to denote private, protected, or public properties and methods, unlike Java or other languages. All object members are public:

```javascript
var myobj = {
    myprop: 1,
    getProp: function() {
        return this.myprop;
    }
};
console.log(myobj.myprop); //myprop is publicly accessible
console.log(myobj.getProp()); //getProp is public too
```

The same is true when you use constructor functions to create objects; all members are still public:

```javascript
function Gadget() {
    this.name = 'iPod';
    this.stretch = function() {
        return 'iPad';
    };
}
var toy = new Gadget();
console.log(toy.name); //name is public
console.log(toy.stretch()); //stretch() is public
```

### Private Members

Although the language doesn't have a special syntax for private members, you can implement them using a closure. Your constructor functions create a closure and any variables that are part of the closure score are not exposed outside the constructor. However, these private variables are available to the public methods: methods defined insider the constructor and exposed as par of the returned objects. Let's see an example where name is a private member, not accesible outside the constructor:

```javascript
function Gadget() {
    //private member
    var name = 'iPod';
    //public function
    this.getName = function() {
        return name;
    };
}
var toy = new Gadget();

//name is undefined, it's private
console.log(toy.name); //undefiend


//public method has access to name
console.log(toy.getName()); //"iPod"
```

A couple of variations with object literals:

```javascript
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

myobj.getName(); //"my, oh my"
```

The same idea with slightly different implementation is given in the following example:

```javascript
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

myobj.getName(); //"my, oh my"
```

### Prototypes and Privacy

One drawback of the private members when used with constructors is that they are re-created every time the constructor is invoked to create a new object.

This is actually a problem with any members you add to this inside of constructors. To avoid duplication of effort and save memory, you can add common properties and methods to the prototype property of the constructor. This way the common parts are shared amon all the instances created with the same constructor. You can also share the hidden private members among the instances.

```javascript
function Gadget() {
    //private member
    var name = 'iPod';
    //public function
    this.getName = function() {
        return name;
    };
}

Gadget.prototype = (function(){
    //private member
    var browser = "Mobile Webkit";
    //public prototype members
    return {
        getBrowser: function() {
            return browser;
        }
    };
}());

var toy = new Gadget();
console.log(toy.getName()); //privileged "own" method
console.log(toy.getBrowser()); //privileged prototype method
```

As you can see, it's easy to achieve privacy in JavaScript. All you need to do is wrap that data you want to keep private in a function and make sure it's local to the function, which means not making it available outside the function.

### Revealing Private Function as Public Members

The revelation pattern is about having private methods, which you also expose as public methods. This could be useful when all the functionality in an object is critical for the workings of the object and you want to protect it as much as possible. But at the same time, you want to provide public access to some of this functionality because that could be useful, too. When you expose methods publicly, yo make them vulnerable' some of the users of your public API may modify it, even involuntarily. In ECMAScript 5 you have the option to freeze an object, but not in the previous version of the language. Enter the revelation pattern (the term coined by Christian Heilmann originally was "revealing module pattern").

Let's take an example, building on top of one the privacy pattern -- the private members in object literals:

```javascript
var myarray;

(function(){
    
    var astr = "[object Array]",
        toString = Object.prototype.toString;

    function isArray(a) {
        return toString.call(a) === astr;
    }

    function indexOf(haystack, needle) {
        var i = 0,
            max = haystack.length;
        
        for(; i < max; i += 1) {
            if(haystack[i] === needle) {
                return i;
            }
        }
        return -1;
    }

    myarray = {
        isArray: isArray,
        indexOf: indexOf,
        inArray: indexOf
    };
}())
```

Here you have two private variables and two private functions --`isArray()` and `indexOf())`. Toward the end of the immediate function, the object marry is populated with the functionality you decide is appropriate too make publicly available. In this case the same private indexOf is exposed as both ECMAScript 5-style indexOf and PHP-inspired inArray. Testing the new myarray object:

```javascript
myarray.isArray([1,2]); //true
myarray.isArray({0:1}); //false
myarray.indexOf(["a","b","z"],"z"); //2
myarray.inArray(["a","b","z"],"z"); //2
```

Now, if something unexpected happens, for example, to the public indexOf(), the private indexOf() is still safe and therefore inArray() will continue to work:

```javascript
myarray.indexOf = null;
myarray.inArray(["a","b","z"],"z"); //2
```

## The Module Pattern

The module pattern is widely used because of it proved structure and helps organize your code as it grows. Unlike other languages, JavaScript doesn't have special syntax for packages, but the module pattern provides the tools to create self-contained decouple pieces of code, which can be traced as black boxes of functionality and added, replaced, or removed according to the (ever-changing) requirements of the software you're writing.

The module pattern is a combination of several patterns described so far in the book, namely:

### Namespaces

The first step is setting up a namespace. Let's use the namespace function from earlier in this chapter and start an example utility module that provides useful array methods`

```javascript
MYAPP.namespace('MYAPP.utilities.array');
```

The next step is defining the module. The pattern uses an immediate function that will provided private scope if privacy is needed. The immediate function returns an object -- the actual module with its public interface, which will be available to the consumer of the module:

```javascript
MYAPP.utilities.array = (function(){
    return {
        //todo....
    };
})();
```

Next, let's add some methods to the public interface:

```javascript
MYAPP.utilities.array = (function(){
    return {
        inArray: function(needle, haystack){
            //...
        },
        isArray: function(a) {
            //...
        }
    };
})();
```

Using the private scope provided by the immediate function, you can declare some private properties and methods as needed. Right at the top of the immediate function will also be the place to declare dependencies your module might have. Following the variable declarations, you can optionally place any one-off initialization code that helps set up the module. The final result is an object returned by the immediate function that contains the public API of your module.

```javascript
MYAPP.namespace('MYAPP.utilities.array');

MYAPP.utilities.array = (function(){
        //dependencies
    var uobj = MYAPP.utilities.object,
        ulang = MYAPP.utilities.lang,
        //private properties
        array_string = "[object Array]",
        ops = Object.prototype.toString;
        
        //private methods
        //...
        ///end var
    
        //optionally one-time init procedures
        //....

        //public API
        return {
            inArray: function(needle, haystack){
                for(var i=0; max = haystack.length; i<max; i += 1){
                    if(haystack[i] === needle){
                        return true;
                    }
                }
            },
            isArray: function(a){
                return ops.call(a) === array_string;
            }
            //... more methods and properties
        };
})();
```

### The Revealing Module Pattern

We already discussed the revelation pattern in this chapter while looking at the privacy patterns. The module pattern can be organized in a similar way, where all the methods are kept private and you only expose those that you decide at the end, while setting up the public API.

The above become:

```javascript
MYAPP.utilities.array = (function(){
        //private properties
    var array_string = "[object Array]";
        ops = Object.prototype.toString,
        //private method
        inArray  = function(haystack, needle){
            for(var i=0; max=haystack.length; i<max; i+=1){
                if(haystack[i] === needle){
                    return true;
                }
            }
        },
        isArray: function(a) {
            return ops.call(a) === array_string;
        };
        //end var

    //revealing public api
    return {
        isArray: isArray,
        indexOf: inArray
    };
})();
```

### Modules That Create Consturctors

The preceding example produced an object MYAPP.utilities.array, but sometimes it's more convenient to create your objects using constructor functions. You can still do that using the module pattern. The only difference is that the immediate function that wraps the module will return a function at the end, and not an object.

Consider the following example of the module pattern that creates a constructor function MYAPP.utilities.Array:

```javascript
MYAPP.namespace('MYAPP.utilities.ARRAY');

MYAPP.utilities.Array = (function(){
        //dependencies
    var uobj = MYAPP.utilities.object,
        ulang = MYAPP.utilities.lang,
        //private properties and methods
        Constr;
        //end var

    //optionally one-time init procedures
    //...

    //public API - constructor
    Constr = function(o){
        this.elements = this.toArray(o);
    };
    //public API - prototype
    Constr.prototype = {
        constructor: MYAPP.utilities.Array,
        version: "2.0",
        toArray: function(obj) {
            for(var i=0; a=[], len=obj.length; i<len; i +=1){
                a[i] = obj[i];
            }
            return a;
        }
    };
    //return the constructor
    //to be assigned to the new namespace
    return Constr;
})();
```

The way to use this new constructor will be like so:

```javascript
var arr = new MYAPP.utilities.Array(obj);
```

### Importing Globals into a Module

In a common variation of the pattern, you can pass arguments to the immediate function that wraps the module. You can pass any values, but usually these are references to global variables and even the global object itself. Importing globals helps speed the global symbol resolution inside immediate function, because the imported variables become locals for the function.

```javascript
MYAPP.utilities.module = (function(app, global){

    //references to the global object
    //and to the global app namespace object
    //are not localized
    
})(MYAPP, this);
```

### Sandbox Pattern

The sandbox patterns addresses the drawbacks of the namespacing pattern, namely:

Reliance on a single global variable to the the application's global. In the namespacing pattern, there is not way to have two versions of the same application or library run on the same page, because they both need the same global symbol name, for example, MYAPP.

Long, dotted names to type and resolve at runtime, for example, MYAPP.utilities.array.

As the name suggest, the sandbox pattern improves an environment for the modules to "play" without affecting other modules and their personal sandboxes.

The pattern is heavily used in YUI version 3, for example, but keep in mind that the following discussion is a sample reference implementation and does not attempt to describe how YUI3's sandbox implementation works.

#### A Global Constructor

In the namespacing pattern you have one global object; in the sandbox pattern the single global is a constructor: let's call it Sandbox(). You can create objects using this constructor, and you also pass a callback function, which becomes the isolated sandbox environment for your code.

Using the sandbox will look like this:

```javascript
new Sandbox(function(box){
    //your code here
});
```

The object box will be like MYAPP in the namespacing example -- it will have all the library functionality you need to make your code work.

Let's add two more things to the pattern:

With some magic you can assume new and not require it when creating the object.

The Sandbox constructor can accept additional configuration arguments specifying names of modules required for this object instance. We want the code to be modules, so most the functionality Sandbox provides will be contained in modules.

With these two additionall features, let's see some examples of what the code for instantiating objects will look like:

You can omit new and creat an object that uses some fictional "ajax" and "event" module like so:

```javascript
Sandbox(['ajax','event'], function (box){
    ///console.log(box);
});
```

This example is similar to the preceding one, but this time module names are passed as individual arguments:

```javascript
Sandbox('ajax', 'dom', function(box){
    //console.log(box);
});
```

And how about using a wildcard "*" argument to mean "use all available modules"? For convenience, let's also say that when no modules are passed, the sandbox will assume *. So two ways to use all available modules will be like:

```javascript
Sanbox('*', function(box){
    //console.log(box);
});

Sandbox(function(box){
    //console.log(box);
});
```

And one more example of using the pattern illustrates how you can instantiate sandbox objects multiple times -- and you can even nest them one within the other without the two interfacing:

```javascript
Sandbox(['dom','event'], function(box){
    //work with dom and event
    Sandbox(['ajax'], function(box){
        //another sandboxed "box" object
        //this "box" is not the same as
        //the "box" outside this function
        
        //...
        //done with ajax
    });
    //no trace of Ajax module here
});
```

As you can see from these examples, when using the sandbox pattern, you can protect the global namespace by having your code wrapped into callback functions.

If you need, you can also use the fact that functions are objects and store some data as "static" properties of the Sandbox() constructor.

And finally, you can have different instance depending on the types of modules you need and thos instances work independently of each other.

Now, let's see how you can approach implementing the Sandbox() constructor and its modules to support all this functionality.

#### Adding Modules

Before implementing the actual constructor, let's see how we can approach adding modules.

The Sandbox() constructor function is also an object, so you can add a static property called modules to it. This property will be another object containing key-value pairs where the keys are the names of the modules and the values are the functions that implement each module:

```javascript
Sandbox.modules = {};

Sandbox.modules.dom = function(box) {
    box.getElement = function(){};
    box.getStyle = function(){};
    box.foo = "bar";
}

Sandbox.modules.event = function(box){
    //access to the Sandbox property if needed
    //box.constructor.prototype.m = "mmm"
    box.attachEvent = function(){};
    box.detachEvent = function(){};
    
}

Sandbox.modules.ajax = function(box) {
    box.makeRequest = function(){};
    box.getResponse = function(){};
}
```

In this example we added modules dom, event, and ajax, which are common pieces of functionality in every library or complex application.

The function that implement each module accept the current instance of box as a parameter and may add additional properties and methods to that instance.

#### Implementing the Constructor

Finally, let's implement the Sandbox constructor (naturally you would want to rename this type of constructor to something that makes sense for your library or application):

```javascript
function Sandbox(){
        //turning arguments into an array
    var args = Array.prototype.slice.call(arguments),
        //the last argument is the callback
        callback = args.pop(),
        //modules can be passed as an array or as individual params
        modules = (args[0] && typeof args[0] === "string" ? args : args[0],
        i;

    //make sure the function is called 
    //as a constructor
    if(!(this instance of Sandbox)){
        return new Sandbox(modules, callback);
    }
    
    //add properties to `this` as needed
    this.a = 1;
    this.b = 2;

    //now add modules to the core `this` object
    //no modules or '*' both mean "use all modules"
    if(!modules || modules === '*'){
        modules = [];
        for(i in Sandbox.modules) {
            if(Sandbox.modules.hasOwnProperty(i)){
                modules.push(i);
            }
        }
    }
    //initialize the required modules
    for(i=0; i < modles.length; i += 1) {
        Sandbox.modules[modules[i]](this);
    }

    //call the callback
    callback(this);
}

//any prototype properties as needed
Sandbox.proptotype = {
    name: "My Application",
    version: "1.0",
    getName: function() {
        return this.name;
    }
};
```

The key items in the implementation are:

* There's a check wether this is an instance of Sandbox and if not (meaning Sandbox() was called without new), we call the function again as a constructor.
* You can add properties to this inside the constructor. You can also add properties to the prototype of the constructor.
* The required modules can be passed as an array of he module names, or as individual arguments, or with the '*' wildecard (or omitted), which means we should load all available modules. Notices that tin this example implementation we don't worry about loading required functionality from additional files, but that's definitively an option. This is something supported by YUI3 for example. You can load only the most basic module (also know as "seed") and whatever module you require will be loaded from external files using naming convention where the file names corresponding to module names.
* When we know the required modules, we initialize them, which means we call the function that implements each module.
* The last argument to the constructor is the callback. The callback will be invoked at the end using the newly created instance. This callback is actually the user's sandbox, and it gets a box object populated with all the requested functionality.

#### Existing Modularity Solution

There are several third-party libraries doing modularity in different ways. The major differece in there design is not so much different in the idea of how modules are defined and imported, but in how modules are loaded, that is how modules are recovered from storage and made available for the application.

Typically modules are define in a file. Some module systems even require that there is a one-to-one relationship between modules and files.

In server-side JavaScript, modules files reside in the same server with the rest of the code, and so it has been customary to use a synchronous module loader. On the client-side modules files need to be retrieved from a remote server, and so it has been customary to use asynchronous solutions to bring them back.

The two major vertiennts of thought in this area can be exemplified by CommonJS and AMD (Asynchronous Module Definition).

#### The CommonJS Way

CommonJS is a project intended to specify an ecosystem for JavaScript outside the browser (e.g. server-side JavaScript).

The project has defined a standard way to define modules. The best well known implementation of this is Node.js.

##### On Modules, Import and Export

Let's start by the most obvious and simple thing, something probably everyone learns since the first day of work with Node: every code file is considered a module.

The variables, properties, functions, constructors that we declared in a file are private to that module and other modules cannot gain access to them or use them unless the programmer of the module explicitly expose them to the public; namely everything we declare inside a module is encapsulated and hidden from the outside world by default unless explicitly stated otherwise. To expose something the programmer has access to a special object called module, which has a special property called exports. Everything that you publish in the module.exports object is made publicly available for other modules to use.

```javascript
//module foo.js
var pi = 3.14;
module.exports.bar = 'Hello World';
```

In the code above, the variable pi is inaccessible to any other modules but foo.js, whereas the property named bar is made publicly available to any other modules importing the module foo.js. Note that this is a fundamental difference from JavaScript in Node.js when compared with JavaScript as executed in a browser where all declarations are publicly exposed in a global object (i.e. window) unless they are explicitly encapsulated in a function.

Now a second module baz.js can "import" the module foo.js and gain access to the property bar. In Node, we achieve this effect by means of using a global function named require. Somewhat as follows:

```javascript
//module baz.js
var foo = require('./foo');
console.log(foo.bar); //yields Hello World
```

##### Extending "exports" Object with Additional Functionality
So, one technique to expose the functionality in a module consists in adding functions and properties to the module.exports object. When this is the case, Node provides a direct access to the exports object to make things simpler for us. For instance:

```javascript
//module foo.js
exports.serviceOne = function(){ };
exports.serviceTwo = function(){ };
exports.serviceThree = function(){ };
```

And as you might expect, the users of this module, at importing it, would obtain a reference to the exports object and by this they would gain access to all the functionality exposed in it.

```javascript
//module bar.js
var foo = require('./foo');
foo.serviceOne();
foo.serviceTwo();
foo.serviceThree();
```

##### Substitute Default "exports" Object with Another Object

By this point you probably suspect that given the fact that module.exports is just an object that exposes the public part of a module then we could probably define our own object and then replace the default module.exports object with our own. For instance:

```javascript
//module foo.js
var service = {
   serviceOne: function(){ },
   serviceTwo: function(){ },
   serviceThree = function(){ }
};

module.exports = service;
```

The code in this last example would behave exactly as the code in the previous example, it's just that this time we have explicitly created our exported object instead of using the one provided by default by Node.

##### Substitute Default "exports" Object with a Constructor Function

In the examples so far we have always used an instance of an object as our exposed target. However there are occasions in which it may seem more convenient to allow the user to create as many instances of a given type as she wants. Nothing prevents us from replacing the module.exports object with other types of objects like a constructor function. In the example below we expose a constructor which the user can use to create many instances of the Foo type.

```javascript
//module Foo.js
function Foo(name){
   this.name = name;
}

Foo.prototype.serviceOne = function(){ };
Foo.prototype.serviceTwo = function(){ };
Foo.prototype.serviceThree = function(){ };

module.exports = Foo;
```

And the user of this module can simply do something like this:

```javascript
//module bar.js
var Foo = require('./Foo');
var foo1 = new Foo('Obi-wan');
foo1.serviceOne();
foo1.serviceTwo();
foo1.serviceThree();

var foo2 = new Foo('Luke');
//...
```

##### Substitute Default "exports" Object with Plain Old Function

It is easy to imagine now that if we can use a constructor function then we might just as well be able to use any other plain old JavaScript function as the target exposed in module.exports.

As in the following example in which our exported function allows the user of this module to gain access to one of several other encapsulated service objects.

```javascript
//foo.js
var serviceA = {};
serviceA.serviceOne = function(){ };
serviceA.serviceTwo = function(){ };
serviceA.serviceThree = function(){ };

var serviceB = {};
serviceB.serviceOne = function(){ };
serviceB.serviceTwo = function(){ };
serviceB.serviceThree = function(){ };

module.exports = function(name){
   switch(name){
      case 'A': return serviceA;
      case 'B': return serviceB;
      default: throw new Error('Unknown service name: ' + name);
   }
};
```

Now the user that imports this module receives a reference to our anonymous function declared above and then she can simply invoke the function to gain access to one of our encapsulated objects. For instance:

```javascript
//module bar.js
var foo = require('./foo');
var obj = foo('A');
obj.serviceOne();
obj.serviceTwo();
obj.serviceThree();
```

Many programmers ordinarily invoke the function immediately returned by require instead of assigning it to a reference first. For instance:

```javascript
//module bar.js
var foo = require('./foo')('A');
foo.serviceOne();
foo.serviceTwo();
foo.serviceThree();
```

So, in summary, it is as simple as follows: everything that we expose in module.exports is what we get when we invoke require. And using different techniques we could expose objects, constructors functions, properties, etc.

##### About Modules and the use Global State

An interesting aspect of modules is the way they are evaluated. The module is evaluated the first time it is required and then it is cached. This means that after it has been evaluated no matter how many times we require it, we will always get the same exported object back.

This means that, although Node provides a global object, it is probably better to use modules to store shared stated instead of putting it directly into the global object. For instance, the following module exposes the configuration of a Mongo database.

```javascript
//module config.js

dbConfig = {
  url:'mongodb://foo',
  user: 'anakin',
  password: '*******'
}

module.exports = dbConfig;
```

We can easily share this module with as many other modules as we want, and everyone of them will get the exact same instance of the configuration object since the module is evaluated only once and the exported object is cached from there on.

```javascript
//foo.js
var dbConfig1 = require('./config');
var dbConfig2 = require('./config');
var assert = require('assert');
assert(dbConfig1==dbConfi2);
```

## ES6 and Beyond

I don't thing it's an exaggeration to suggest that the single most important code organization pattern in all of JavaScript is, and always has been, the module. For myself, and I thing for a large cross-section of the community, the module pattern drives the vast majority of code.

### The Old Way

The traditional module patterns is based on an outer function with inner variables and functions, and a returned "public API" with methods that have closure over the inner data and capabilities. It's often expressed like this:

```javascript
function Hello(name) {
    function greeting() {
        console.log('Hello ' + name + '!');
    }
    
    //public API
    return {
        greeting: greeting
    };
}

var me = Hello('Kyle');
me.greeting();  //Hello Kyle!
```

This Hello(...) module can produce multiple instances by being called subsequent times. Sometimes, a module is only called for as a singleton (i.e. just needs one instance), in which case a slight variation on the previous snippet, using an IIFE, is common:

```javascript
var me = (function Hello(name) {
    function greeting() {
        console.log('Hello " + name + '!');
    }
    
    //public API
    return {
        greeting: greeting
    };
})('Kyle');

me.greeting(); //Hello Kyle!
```

This pattern is tried and tested. It's also flexible enough to have a wide assortment of variations for a number of different scenario.

One of the most common is Asynchronous Module Definition (AMD), and another is Universal Module Definition (UMD). We won't cover the particular of these patterns and techniques here, but they're explained extensively in many places online.

### Moving Forward

As of ES6, we no longer need to rely on the enclosing function and closure to provide us with module support. ES6 modules have first class syntactic and functional support.

Before we get into the specific syntax, it's important to understand some fairly significant conceptual differences with ES modules compared to how you may have dealt with modules in the past.

ES6 uses file-based modules, meaning one module per file. At this time, there is no standardized way of combining multiple modules into a single file.

Than means that if you are going to load ES6 modules directly into a browser web application, you will be loading them individually, not as a large bundle in a single file as has been common in performance optimization efforts.

It's expected that the contemporaneous advent of HTTP/2 will significantly mitigate any such performance concernts, as it operates on a persistent socket connection and thus can very efficiently load many smaller files in parallel and interleaved with one another.

The API of an ES6 module is static. That is, you define statically what all the top-level exports are on your module's public API, and those cannot be amended later.

Some users are accustomed to being able to provide dynamic API definitions, where methods can be added/removed/replace in response to runtime conditions. Either these users will have to change to fit with ES6 static APIs, or they will have to restrain the dynamic changes to properties/methods of a second-level object.

ES6 modules are singletons. That is, there's only one instance of the module, which maintains its state. Every time you import that module into another module, you get a reference to the one centralized instance. If you want to be able to product multiple module instances, your module will need to provided some sort of factory to do it.

The properties and methods you expose on a module's public API are not just normal assignments of values or references. They are actual bindings (almost like pointers) to the identifiers in your inner module definition.

In pre-ES6 modules, if you put a property on your public API that holds a primitive value like a number or string, that property assignment was by value-copy, and any internal update of a corresponding variable would be separate and not affect the public copy of the API object.

With ES6, exporting a local private variable, even if it currently holds a primitive string/number/etc, exports a binding to the variable. If the module changes the variable's value, the external import binding now resolves to that new value.

Importing a module is the same thing as statically requesting it to load (if it hasn't already). If you're in a browser, that implies a blocking load over the network. If you're on a server (i.e. Node.js) it's a blocking load from the filesystem.

However, don't panic about the performance implications. Because ES6 modules have static definitions, the import requirements can be statically scanned, and loads will happen preemptively, even before you've used the module.

ES6 doesn't actually specify or handle the mechanics of how these load requests work. There's a separate notion of a Module Loader, where each hosting environment (browser, Node.js, etc) provides a default Loader appropriate to the environment. The importing of a module uses a string value to represent where to get the module (URI, file path, etc), but this value is opaque in your program and only meaningful to the Loader itself.

You can define your own custom Loader if you want more fine-grained control than the default Loader affords -- which is basically none, as it's totally hidden from your program's code.

As you can see, ES6 modules will serve the overall use case of organizing code with encapsulation, controlling public APIs, and referencing dependency imports. But they have a very particular way of doing so, and that may or may not fit very closely with how you've already being doing modules for years.

### CommonJS
There's a similar, but not fully compatible, module syntax called CommonJS, which is familiar to those in the Node.js ecosystem.

For lack of a more tactful way to say this, in the long run, ES6 modules essentially are bound to supersede all previous formats and standards for modules, even CommonJS, as they are built on syntactic support in the language. This will, in time, inevitably win out as the super approach, if for no other reason the ubiquity.

We face a fairly log oread to get to that point, though. There are literally hundreds of thousands of CommonJS style modules in server-side JavaScript world, and 10 times that many modules of varying format standards (UMD, AMD, ad hoc) in the browser world. It will take many years for the transition to make any significant progress.

In the interim, module transpilers/converters will be an absolute necessity., You might as well just get used to that new reality. Wether you author in regular modules, AMD, UMD, CommonJS or ES6, there tools will have to parse and convert to a format that is suitable for whatever environment your code will run in.

For Node.js that probably means (for now) that the target is CommonJS. For the browser, it's probably UMD or AMD. Expect lots of flux on this over the next few years as these tools mature and best practices emerge.

From here on out, my best advice on modules is this: whatever format you've been religiously attached to with strong affinity, also develop an appreciation for and understanding ES modules, such as they are, and let your other module tendencies fade. They are the future modules in JS, even if that reality is a bit of a ways off.

The New Way
The two main new keywords that enable ES6 classes are import and export. I imagine their overall purposes are obvious enough I don't need to waste ink explaining. However, there's lots of nuance to the syntax, so let's take a deeper look.

Note: an important detail that's easy to overlook: both import and export must always appear in the top-level scope of their respective usage. For example, you cannot put either an import or export inside an if conditional; they must appear outside of all blocks and functions.

### Exporting API Members
The export keyword is either put in fron to declarations, or used as an operator (of sorts) with a special list of binding to export. Consider:

```javascript
export function foo() { }
export var awesome = 42;
var bar = [1,2,3];
export { bar };
```

Another way of expressing the same exports:

```javascript
function foo(){}
var awesome = 42;
var bar = [1,2,3];
export {foo, awesome, bar};
```

These are called named exports, as you are in effect exporting the name bindings of the variables/functions/etc. Anything you don't label with export stays private inside the scope of the module. That is, although something like var bar = ... looks like it's declaring at the top level global scope, the top-level scope is actually the module itself; there is no global scope in modules.

Note: modules do still have access to window and all the "globals" that hang of it, just not as lexical top-level scope. However, you really should stay away from the globals in you module if at all possbile

You can also "rename" (aka alias) a module member during named export:

```javascript
function foo(){}
export {foo as bar};
```

When this module is imported, only the bar member name is available to import; foo stays hidden inside the module.

Module exports are not just normal assignments of values or references, as you're accustomed to with the = assignment operator. Actually, when you export something, you're exporting a binding (kinda like a pointer) to that thing (variable, etc). Within your module, if you change the value of a variable you already exported a binding to, even if it's already being imported (see next section), the imported binding will resolve to the current (updated) value. Consider:

```javascript
var awesome = 42;
export {awesome};
//later
awesome = 100;
```

When this module is imported, regardless of whether that's before or after awesome = 100 setting, once that assignment has happened, the imported binding is, in essence, a reference to, or a pointer to, the awesome variable itself, rather than a copy to its value. This is a mostly unprecedented concept for JS instoduced with ES6 module bindings.

Though you can clearly use export multiple times inside a module's definition, ES6 definitively prefers the approach that a module has a single export, which is known as a default export. In the words of some members of the TC39 committee, you're "rewarded with simpler import syntax" if you follow that pattern, and conversely "penalized" with more verbose syntax if you don't.

A default export sets a particular exported binding to be the default when importing the module. The name of the binding is literally default. As you'll see later, when importing module bindings you can also rename them, as you commonly will with a default export.

There can only be one default per module definition. We'll cover import in the next section, and you'll see how the import syntax is more concise if the module has a default export.

There's a subtle nuance to default export syntax that you should play close attention to. Compre these two snippets:

```javascript
function foo() {}
export default foo;
```
And this one:

```javascript
function foo(){}
export {foo as default};
```

In the first snippet, you are exporting a binding to the function expression value at that moment, not to the identifier foo. In other words, export default ... takes an expression. If you later assign foo to a different value inside your module, the module import still reveals the function originally exported, not the new value.

By the way, the first snippet could also have been written as:

```javascript
export default function foo(){}
```

Warning: Although the function foo... part here is technically a function expression, for the purposes of the internal scope of the module, it's treated like a function declaration, in that the foo name is bound in the module's top-level scope (often called "hoisting"). The same is true for export default class Foo.... However, while you can do export var foo =..., you currently cannot do export default var foo =... (or let or const), in a frustrating case of inconsistency. At the time of this writing, there already discussion of adding that capability in soon, post ES6, for consistency sake

Recall the second snippet again:

```javascript
function foo(){}
export {foo as default};
```

In this version of the module export, the default export binding is actually to the foo identifier rather than its value, so you get the previously described binding behavior (i.e. if you later change foo's value, the value seen in the import side will also be updated). Be very careful of this subtle gotcha in default export syntax, especially if your logic calls for export values to be updated. If you never plan to update the value export default ... is fine,. If you do plan to update the value, you must use export { ... as default}. Either way, make sure to comment your code to explain your intent!

Because there can only be one default per module, you may be tempted to design your module with one default export of an object with all your API methods on it, sus ash:

```javascript
export default { foo(){}, bar(){}, ...};
```

That pattern seems to map closely to how developers have structured their pre-ES6 modules, so it seems like a natual approach. Unfortunately, it has some downside and is officially discouraged. In particular the JS engine cannot statically analyze the contents of the plain object, which means it cannot do some optimizations for static import performance. The advantage of having each member individually and explicitly exported is that the engine can do static analysis and optimizations. If your API has more than one member already, it seems like these principles --one default export per module, and all API members are named exports-- are in conflict, doesn't it? But you can have a single default export as well as other named exports; they are not mutually exclusive. So, instead of this (discouraged) pattern:

```javascript
export default function foo(){}
foo.bar = function(){}
foo.baz = function(){}
```

You can do:

```javascript
export default function foo(){}
export function bar(){}
export function baz(){}
```

Note: In this previous snippet, I used the name foo for the function that the default labels. That foo name, however, is ignored for the purposes of export --default is actually the exported name. When you import this binding you can give it whatever name you want as you'll see in the next section.

Alternatively, some will prefer:

```javascript
function foo(){}
function bar(){}
function baz(){}
export {foo as default, bar, baz}
```

The effects of mixing default and named exports will be clearer when we cover import shortly. But essentially it means that the most concise default import form would only retrieve the foo function. The user could additionally list bar and base as named imports, if they want them. You can probably imagine how tedious that's going to be for consumers of your module if you have lots of named export bindings. There is a wildcard import from where you import all of a module's exports within a single namespace object, but there's not way to wildcard import to top-level bindings. Again, the ES6 module mechanism is intentionally designed to discourage modules with lots of exports; relatively speaking it's desired that such approaches be a little more difficult, as a sort of social engineering to encourage simple design in favor of large/complex module design. I would probably recommend not to mix default export with named exports, especially if you have a large API and refactoring to separate modules isn't practical or desired. In that case, just use all named exports, and document that consumers of you module should probably use the import * as ... (namespace import, discussed in the next section) approach to bring the whole API in at once on a single namespace. We mentioned this earlier, but let's come back to it in more detail.

Other than the export default ... form that exports an expression value binding, all other export forms are exporting bindings to local identifiers. For those bindings, if you change the value of a variable inside a module after exporting, the external imported binding will access the updated value:

```javascript
var foo = 42;
export {foo as default}
export var bar = 'hello world';
foo = 10;
bar = 'cool';
```

When you import this module, the default and bar exports will be bound to the local variables foo and bar, meaning they will reveal the updated 10 and 'cool' values. The values at the time of export are irrelevant. The values at the time of import are irrelevant. The bindings are live links, so all that matters is what the current value is when you access the binding.

Warning: Two-way bindings are not allowed. If you import a foo from a module, and try to change the value of your imported foo variable, and error will be thrown! We'll revisit that in the next section

You can also re-export another module's export, such as

```javascript
export {foo, bar} from "baz";
export {foo as FOO, bar as BAR} from "base";
```

Those form are similar to just importing from "base" module then listing its members explicitly for export from your module. However, in these forms, the members of "base" module are never imported to your module's local scope; they sort of pass through untouched.

To import a module, unsurprisingly you use the import statement. Just as export has several nuanced variations, so does import, so spend plenty of time considering the following issues and experimenting with your options.

If you want to import certain specific named members of a module's API into your top-level scope, you use this syntax:

```javascript
import {foo, bar, baz"} from "foo";
```

Note: the {...} syntax here may look like an object literal, or even an object restructuring syntax. However, its form is special just for modules, so be careful not to confuse it with other {...} patterns elsewhere.

The "foo" string is called a module specifier. Because the whole goal is statically analyzable syntax, the module specifier must be a string literal; it cannot be a variable holding the string value.

From the perspective of your ES6 code and the JS engine itself, the contents of this string literal are completely opaque and meaningless. The module loader will interpret this string as an instruction of where to find the desired module, either as a URL path or a local filesystem path.

The foo, bar, and baz identifiers list must match named exports on the module'a API (state analysis and error assertions apply). They are bound as top-level identifiers in your current scope.

```javascript
import {foo} from "foo";
foo();
```

You can rename the bound identifier imported, as:

```javascript
import {foo as theFooFunc} from "foo";
theFooFunc();
```

If the module has just a default export that you want to import and bind to an identifier, you can opt to skip the {...} surrounding syntax for that binding. The import in this preferred case gets the nicest and most concise of the import syntax forms:

```javascript
import foo from "foo";
//or
import {default as foo} from "foo";
```

Note: As explained in the previous section, the default keyword in a module's export specifies a named export where the name is actually default, as is illustrated by the second more verbose syntax option. The renaming from default to, in this case, foo, is explicit in the latter syntax and is identical yet implicit in the former syntax

You can also import a default export along with other named exports, if the module has such definition. Recall this module definition from earlier:

```javascript
export default function foo(){}

export function bar(){}
export function baz(){}
```

To import module's default export and its two named exports:

```javascript
import FOOFN, {bar, baz as as BAZ} from "foo";

FOOFN();
bar();
BAZ();
```

The strongest suggested approach from ES6's module philosophy is that you only import the specific bindings from a module that you need. I fa module provides 10 API methods, but you only need two of them, some believe it wasteful to bring the entire set of API bindings.

One benefit, besides code being more explicit, is that narrow imports make static analysis and error detection (accidentally using the wrong binding name, for instance) more robust.

Of course, that's just the standard position influenced by ES6 design philosophy' there's nothing that requires adherence to that approach.

Many developers would be quick to point out that such approaches can be more tedious, requiring you to regularly revisit and update your import statement(s) each time you realize you need something else from a module. The trade-off is in exchange for convenience.

In that light, the preference might be to import everything from the module into a single namespace, rather than importing individual members, each directly into the scope. Fortunately, the import statement has a syntax variation that can support this style of module consumption, called namespace import.

Consider a "foo" module exported as:

```javascript
export function bar(){}
export var x = 42;
export function baz(){}
```

You can import the entire API to a single module namespace binding:

```javascript
import * as foo from "foo";
foo.bar();
foo.x;
foo.baz();
```

Note: the * as... clause requires the * wildcard. In other words, you cannot do something like import {bar, x} as foo from "foo" to bring only part of the API but still bind to the foo namespace. I would have liked something like that, but for ES6 it's all or nothing with the namespace import.

If the module your're importing with * as ... has a default export, it is named default in the namespace specified. You can additionally name the default import outside of the namespace binding, as top-level identifier. Consider a "world" module exported as:

```javascript
export default function foo(){}
export function bar(){}
export function baz(){}
```

And this import:

```javascript
import foofn, * as hello from "world";
foofn();
hello.default();
hello.bar();
hello.baz();
```

While this syntax is valid, it can be rather confusing that one method of the module (the default export) is bout at the top-level of your scope, whereas the rest of the named exports (and one called default) are bound as properties on a differently named (hello) identifier namespace.

As I mentioned earlier, my suggestion would be to avoid designing your module exports in this way, to reduce changes that your module's users will suffer these strange quirks.

All imported bindings are immutable and/or read-only. Consider the previous import; all these subsequent assignment attempts will throw TypeErrors:

```javascript
import foofn, * as hello from "world";

foofn = 42;          //(runtime) TypeError!
hello.default = 42;  //(runtime) TypeError!
hello.bar = 42;      //(runtime) TypeError!
hello.baz = 42;      //(runtime) TypeError!
```

Recall earlier in the Exporting API Members section that we talked about how the bar and baz bindings are bound to actual identifiers inside the "world" module. That means if the module changes those values, hello.bar and hello.baz now reference the updated values.

But the immutable/read-only nature of your local imported binding enforces that you cannot change them from the imported bindings, hence the TypeError's. That's pretty important, because without those protections, your changes would end up affecting all consumers of the module (remember: singleton), which could create some very surprising side effects.

Moreover, though a module can change its API members from inside, you should be very cautions of intentionally designing your modules in that fashion. ES6 modules are intented to be static, so deviations from that principle should be rare and should be carefully and verbosely documented.

Note: There are module design philosophies where you actually intent to let a consumer change the value of a property on your API, or module APIs are designed to be "extended" by having other "plug-ins" add to the API namespace. As we just asserted, ES6 module APIs should be thought of and designed as static and unchangeable, which strongly restricts and discourages these alternative module design patterns. You can get around these limitations by exporting a plan object, which of course can then be changed at will. But be careful and thing twice before going down that road.

Declarations that occur as a result of an import are "hoisted". Consider:

```javascript
foo();
import {foo} from "foo";
```

foo can run because not only did the static resolution of the import ... statement figure out what foo is during compilation, but it also "hosted" the declaration to the top of the module's scope, thus making it available throughout the module.

Finally, the most basic form of import looks like this:

```javascript
import "foo";
```

This for doe not actually import any of the module's bindings into your scope. It loads (if not already loaded), compiles (if not already compile) and evaluates (if not already run) the "foo" module.

In general, that sort of import is probably not going to be terribly useful. There may be niche cases where a module's definition has side effect (such as signing things to the window/global object). You could also envision import "foo" as a sort of preload a module that be needed later.

### Circular Module Dependency

A imports B. B imports A. How does this actually work?

I'll state off the bat that designing systems with intentional circular dependency is generally something I try to avoid. That having being said, I recognize there are reasons people do this and it can solve some sticky design situations.

Let's consider how ES6 handles this. First, module "A":

```javascript
import bar from "B";

export default function foo(x){
    if(x > 10) return bar(x - 1);
    return x * 2;
}
```

Now module "B":

```javascript
import foo from "A";

export default function bar(y){
    if(y > 5) return foo(y / 2);
    return y * 3;
}
```

These two functions, foo() and bar(), would work as standard function declarations if they were in the same scope, because the declarations are "hoisted" to the whole scope and thus available to each other regardless of authoring code.

With module, you have declarations in entirely different scopes, so ES6 has to do extra work to help make these circular references work.

In a rough conceptual sense, this is how circular import dependencies are validated and resolved:

If the "A" module is loaded first, the first step is to scan the file and analyze all the exports, so if can register all those bindings available for import. Then it process the import ... from "B", which signals that it needs to go fetch "B".

Once the engine loads "B", it does the same analysis of its export bindings. When it sees the import ... from "A", it knows the API of "A" already, so it can verify the import is valid. Now that it knows "B" API, it can also validate the import ... from "B" in the waiting "A" module.

In essence, the mutual imports, along with the static verification that's done to validate both import statements, virtually composes the two separate module scopes (via the bindings), such that foo() can call bar() and vice versa. This is symetric to if they had originally been declared in the same scope.

Now, let's try using the two modules together. First, we'll try foo():

```javascript
import foo from "foo";
foo(25);
```

Or we can try bar():

```javascript
import bar from "bar";
bar(25);
```

By the time either foo(25) or bar(25) calls are executed, all the analysis/compilation of all modules has completed. That means foo() internally knows directly about bar() and bar() internally knows directly about foo().

If all we need is to interact with foo(), then we only need to import the "foo" module. Likewise with bar() and the "bar" module.

Of course, we can import and use both of them if we want to:

```javascript
import foo from "foo";
import bar from "bar";

foo(25);    //11
bar(25);    //11.5
```

The static loading semantics of the import statement mean that "foo" and "bar" that mutually depend on each other via import will ensure that both are loaded, parsed, and compiled before either of them runs. So their circular dependency is statically resolved and this works as you'd expect.

### Module Loading

We asserted at the beginning of this "Modules" section that the import statement uses a separate mechanism, provided by the hosting environment (browser, Node.js, etc) to actually resolve module specifier string into some useful instruction for finding and loading the desired module. That mechanism is the system Module Loader.

The default module loader provided by the environment will interpret a module specifier as a URL if in the browser, and (generally) as a local filesystem path if on a server such as Node.js. The default behavior is to assume the loaded file is authored in the ES6 standard module format.

Moreover, you will be able to load a module into the browser via an HTML tag, similar to how current script programs are loaded. At the time of this writing, it's not fully clear if this tag will be <script type="module"> or <module>. ES6 doesn't control that decision, bu discussions in the appropriate standards bodies are already along in parallel of ES6.

Whatever the tag looks like, you can be sure that under the covers it will use the default loader (or a customized one you've pre-specified, as we'll discuss in the next section).

Just like the tag, you'll use in markup, the module loader itself is not specified by ES6. It is a separate, parallel standard controller currently by the WHATWG browser standards group.

At the time of this writing, the following discussions reflect an early pass as the API design, and things are likely to change.

### Loading Modules Outside Modules

One use of interacting directly with the module loader is if a non-module needs to load a module. Consider

```javascript
//normal script loaded in browser via <script>
//import is illegal here

Reflect.Loader.import("foo")
    .then(function(foo){
        foo.bar();
    });
```

The Reflect.Loader.import(...) utility imports the entire module onto the named parameters (as a namespace) just like the import * as foo namespace import we discussed earlier.

Note: The Reflect.Loader.import(...) utility returns a promise that is fulfilled once the module is ready. To import multiple modules, you can compose promises from multiple Reflect.Loader.import(...) calls using Promise.all([...]).

You can also use Reflect.Loader.import(...) in a real module to dynamically/conditionally load a module, where import itself would not work. You might, for instance, choose to load a module containing a polyfill for ES7+ feature if a feature test reveals it's not defined by the current engine.

For performance reasons, you'll want to avoid dynamic loading whenever possible, as it happens the ability of the JS engine to fire off early fetches from its static analysis.

### Customized Loading

Another use for directly interacting with the module loader is if you want to customize its behavior through configuration or even redefinition.

At the time of this writing, there's a polyfill for the module loader API being developed. While details are scarce and highly subject to change, we can expore what possibilities may eventually land.

The Reflect.Loader.import(...) call may support a second argument for specifying various options to customize the import/load task. For example:

```javascript
Reflect.Loader.import("foo", {address: "path/to/foo.js"})
    then(function(foo){
        //...
    })
```

It is also expected that a customization will be provided (through some means) for hooking into the process of loading a module, where a translation/transpilation could occur after load, but before the engine compiles the module.

For example, you could load something that's not already ES6-compliant module format (e.g. CoffeeScript, TypeScript, CommonJS, AMD). Your translations step could then convert it to an ES6-compliant module for the engine to then process.

### Exploring ES6

#### From CommonJS Modules to ES6 Modules

Even in ES5, module systems based on either AMD syntax or CommonJS syntax have most commonly replaced hand-written solutions such as the the revealing module pattern.

ES6 has built-in support for modules. Alas, no JavaScript engine supports them natively, yet. But tools such as browserify, web pack or jump let you use ES6 syntax to create modules, making the code you write future-proof.

#### Multiple Exports

In CommonJS, you export multiple entities as follows:

```javascript
//---lib.js---
var sqrt = Math.sqrt;

function square(x){
    return x * x;
}

function diag(x,y){
    return sqrt(square(x) + square*y));
}

module.exports = {
    sqrt: sqrt,
    square: square,
    diag: diag
};

//---main1.js---
var square = require('lib').square;
var diag = require('lib').diag;

console.log(square(11)); //121
console.log(diag(4,3));  //5
```

Alternatively, you can import the whole module as an object and access square and dig via it:

```javascript
//---main2.js---
var lib = require('lib');
console.log(lib.square(11)); //121
console.log(lib.diag(4,3));  //5
```

In ES6, multiple exports are called named exports and handled like this:

```javascript
//---lib.js---
export const sqrt = Math.sqrt;
export function square(x) {
    return x * x;
}
export function diag(x, y){
    return sqrt(square(x) +  square(y));
}

//---main1.js---
import {square, dig} from 'lib';

console.log(square(11)); //121
console.log(diag(4,3));  //5
```

The syntax for importing modules as objects looks as follows:

```javascript
//---main1.js---
import * as lib from 'lib';

console.log(lib.square(11)); //121
console.log(lib.diag(4,3));  //5
```

#### Single Exports

Node.js extends CommonJS end lets you export single values from modules via module.exports:

```javascript
---myFunc.js--
module.exports = function() {};

---main.js--
var myFunc = require('myFunc');
myFunc();
```

In ES6, the same thing is done via export default:

```javascript
--myFunc.js--
export default function(){}

--main.js--
import myFunc from 'myFunc';
myFunc();
```

## Modules

### Overview

In ECMAScript 6, modules are stored inf iles. There is exactly one module per file and one file per module. You can two ways of exporting things from a module. These two ways can be mixed, but it is usually better to use them separately.

### Named Exports

```javascript
//---lib.js---
export const sqrt = Math.sqrt;
export function square(x) {
    return x * x;
}
export function diag(x, y){
    return sqrt(square(x) +  square(y));
}

//---main.js---
import {square, dig} from 'lib';

console.log(square(11)); //121
console.log(diag(4,3));  //5
```

You can also import the complete module:

```javascript
//---main.js---
import * as lib from 'lib';

console.log(lib.square(11)); //121
console.log(lib.diag(4,3));  //5
```

### Default Export

There can be a single default export. For example, a function:

```javascript
--myFunc.js--
export default function(){}

--main.js--
import myFunc from 'myFunc';
myFunc();
```

Or a class:

```javascript
//--MyClass.js--
export default class {}

//main.js
import MyClass from 'MyClass';
let inst = new MyClass();
```

### Browsers: scripts vs modules

Modules in JavaScript

Even though JavaScript never had built-in modules, the community has converged on a simple style of modules, which is supported by libraries in ES5 and earlier. This style has also be adopted by ES6:

* Each module is a piece of code that is executed once is loaded.
* In the code, there may be declarations (variable declarations, function declarations, etc).
* By default, these declarations stay local to the module.
* You can mark some of them as exports, then other modules can import them.
* A module can not only export things, it can also import things from other modules. It refers to those modules via module specifiers, strings that are either:
* Relative paths ('../model/user'): there paths are interpreted relatively to the location of the importing module. The file extension .js can be usually omitted.
* Absolute paths ('/lib/js/helpers'): point directly to the file of the module to be imported.
* Names ('util'): What modules names refer to has to be configured.
* Modules are singletons. Even if a modules is imported multiple times, only a single "instance" of it exists.
* Execution of a client or server app starts with an initial module. In some module systems (including ES6), the initial module can be embedded in a HTML file (think <script> element).
* This approach to modules avoid global variables, the only thing that are global are the module specifiers.

### ES5 Module Systems

It is impressive how well ES5 module systems work without explicit support from the language. The two most important (and unfortunately incompatible) standards are:

CommonJS: the dominant implementing of this standard is in Node.js

* Compact syntax.
* Designed for synchronous loading.
* Mainly used in the server side.

Asynchronous Module Definition (AMD): The most popular implementation of this standard is Require.js

* Slightly more complicated syntax
* Designed for asynchronous loading.
* Mainly used in browsers.

The above is but a simplified explanation of the current state of affairs. If you want more in-depth material take a look at Writing Modular JavaScript With AMD, CommonJS & ES Harmony by Addy Osmani.

#### ECMAScript 6 Modules

The goal of ECMAScript 6 modules was to create a format that both users of CommonJS and AMD are happy with;

Similar to CommonJS they have a compact syntax, a preference for single exports and support for cyclic dependencies.

Similar to AMD, they have direct support for asynchronous loading and configurable module loading.

Being built into the language allowed ES6 modules to go beyond CommonJS and AMD (details are explained later):

Their syntax is even more compact than CommonJS's.

Their structure can be statically analyzed (for static checking, optimization, etc).

Their support for cyclic dependencies is better than CommonJS's.

The ES6 module standard has two parts:

* Declarative syntax (for import and exporting)
* Programatic loader API: to configure how modules are loaded and to conditionally load modules.

##### A First Look at ES6 Modules

There are two kinds of exports: named exports (several per module) and default exports (one per module).

###### Named Exports (Several per Module)

A module can export multiple things by prefixing their declarations with the keyword export. The exports are distinguished by their names and are called named exports.

```javascript
//---lib.js---
export const sqrt = Math.sqrt;
export function square(x) {
    return x * x;
}
export function diag(x, y){
    return sqrt(square(x) +  square(y));
}

//---main.js---
import {square, dig} from 'lib';

console.log(square(11)); //121
console.log(diag(4,3));  //5
```

There are other ways to specify named exports (which are explained later), but I find this one quite convenient: simply write your code as if there were no outside world, then label everything you want to export with a keyword.

If you want to, you can also import the whole module and refer to its named exports via property notation:

```javascript
//---main.js---
import * as lib from 'lib';

console.log(lib.square(11)); //121
console.log(lib.diag(4,3));  //5
```

The same code in CommonJS syntax: For a while, I tried several clever strategies to be less redundant with my module exports in Node.js. Now I prefer the following simple bu slightly verbose style that is reminiscent of the revealing module pattern:

```javascript
//---lib.js---
var sqrt = Math.sqrt;
function square(x) {
    return x * x;
}
function diag(x, y) {
    return sqrt(square(x) + square(y));
}
module.exports = {
    sqrt: sqrt,
    square: square,
    diag: diag
};

//--main.js--
var square = require('lib').square;
var diag = require('lib').diag;
console.log(square(11)); //121
console.log(diag(4,3));  //5
```

##### Default Exports (One per Module)

Modules that only export single values are very popular in Node.js community. But they are also common in front-end development where you often have constructor/classes for modules, with one module per module. An ECMAScript 6 module can pick a default export, that main exported value. Default exports are specially easy to import.

The following ECMAScript 6 module "is" a single function:

```javascript
--myFunc.js--
export default function(){}

--main.js--
import myFunc from 'myFunc';
myFunc();
```

And ECMAScript 6 module whose default export is a class looks as follows:

```javascript
//--MyClass.js--
export default class {}

//main.js
import MyClass from 'MyClass';
let inst = new MyClass();
```

##### Operand of export default: Declaration or Expression

Syntactically, the operand export default is:

A declaration: if it starts with function or class. That means that what you have seen in the previous code examples were anonymous declarations (which can only be used in this particular location).

An expression: in all other cases.

Therefore, there are two ways in which you can default-export an anonymous function.

```javascript
export default function() {}
export default (function() {});
```

You can also give the function declaration a name. That is useful if you want to refer to the default export from somewhere else in the module:

```javascript
bar();
export default function bar(){}
```
This code is equivalent to:

```javascript
bar();
function bar(){}
export default bar;
```

##### Module Export Immutable Bindings, Not Values

In contrast to AMD modules and CommonJS modules, modules do not export values (snapshopts of values), but bindings (live references to where the values are stored). These bindings are immutable: you can only read the value via the binding, but not change it. It can however, be changed from insider the module. The following code demonstrates how that works:

```javascript
//--lib.js--
export let mutableValue = 3;
export function incMutableValue() {
    mutableValue++;
}

//--main.js--
import {mutableValue, incMutableValue} from './lib';
console.log(mutableValue); //3
incMutableValue();
console.log(mutableValue); //4

//the imported value can't be changed
mutableValue++; //TypeError
```

If you import via the askerik (*), you get similar results:

```javascript
//--main.js--
import * as lib from './lib';

console.log(lib.mutableValue); //3
lib.incMutableValue();
console.log(lib.mutableValue); //4

//the imported value can't be changed
lib.mutableValue++; //TypeError
```

##### Imports Are Hoisted

Module imports are hoisted (internally moved to the beginning of the current scope). Therefore, it doesn't matter where you mention them in a module and the following code works without problems:

```javascript
foo();
import {foo} from 'my_module';
```

##### Module Files Are Normal JavaScript Files

The following kinds of file all have extension .js:

* ECMAScript 6 modules
* CommonJS modules (e.g. delivered via npm)
* AMD Modules
* Script files (loaded from HTML files via script src="file.js">)

That is, all of these files are just "JavaScript file". How they are interpreted depends on the context in which they are used.

##### Desing Goals
If you want to make sense of ECMAScript 6 modules, it helps to understand what goals influenced their design.

The major ones are:

* Default exports are favored.
* Static module structure
* Support for both synchronous and asynchronous loading
* Support for cyclic dependencies between modules.

##### Default Exports Are Favored

The module syntax suggesting that the default export "is" the module may seem a bit estrange, but it makes sense if you consider that one major design goal was to make default exports as convenient as possible.

###### Static Module Structure

In current JavaScript module system, you have to execute code in order to fina what the imports and exports are. That is the main reason why ECMAScript 6 breaks with those systems: by building the module system into the language, you can syntactically enforce a static module structure. Let's fitst examine what that means and then what benefits it brings.

A module's structure being static means that you can determine imports and exports at compile time (statically) - you only have to look at the source code, you don't have to execute it. The following two examples of how CommonJS modules can make that impossible. In the first example, you have to run the code to find out what it imports:

```javascript
var my_lib;
if(Math.random()) {
    my_lib = require('foo');
} 
else {
    my_lib = require('bar');
}
```

In the second example, you have to run the code to find out what it exports:

```javascript
if(Math.random()) {
    exports.baz = ...;
}
```

ECMAScript 6 gives you less flexibility, it forces you to be static. As a result, you get several benefits, which are described next.

Benefit 1: Faster Lookup

If you require a library in CommonJS, you get back an object:

```javascript
var lib = require('lib');
lib.someFunc(); //property lookup
```

Thus, accessing a namex export via lib.someFunc means you have do a property lookup, which is slow, because it is dynamic.

In contract, if you import a library in ES6, you statically know its contents and can optimize accesses:

```javascript
import * as lib from 'lib';
lib.SomeFunc(); //statically resolved
```

Benefit 2: Variable Checking

With a static module structure, you always statically know which variables are visible at any location inside the module

Global variables: increasingly, the only completely global variables com from the language proper. Everything else will come from modules (including functionality from the standard library and the browser). That is, you statically know all global variables.

Module imports: you statically know those, too.

Module-local variables: can be determined by statically examining the module.

This helps tremendously with checking wether a given identifier has been spelled properly. This kind of check is a popular feature of linters such as JSLint and JSHint; in ECMAScript 6, most of it can be performed by JavaScript engines.

Additionally, any access of named imports (such as lib.foo) can also be checked statically.

