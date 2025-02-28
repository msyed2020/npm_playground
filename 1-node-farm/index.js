const fs = require('fs'); // fs stands for filesystem

const textInput = fs.readFileSync('./txt/input.txt', 'utf-8');

console.log(textInput);

//const greet = "Hello";
//console.log(greet);