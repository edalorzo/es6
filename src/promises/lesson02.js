/**
 * How race-to–completion avoids race
 * conditions.
 */
 
let async = true;
let xhr = new XMLHttpRequest()
xhr.open('get','http://localhost:3000/users', async);
xhr.send();

function listener(data){
  console.log('Greetings from listener %s', data.srcElement.responseText);
}
xhr.addEventListener('load', listener);
xhr.addEventListener('error', listener);