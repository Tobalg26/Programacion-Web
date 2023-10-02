let areas=require("./areas.js");
var cowsay=require("cowsay");
// var yodasay = require('yodasay');

let a=areas.areaCuadrado(4);


console.log(a);
console.log(cowsay.say({
    text : "I'm a moooodule",
    e : "oO",
    T : "U "
}));
// console.log(yodasay.say({
//     text : 'Use yodasay, you will.'
//   }));
