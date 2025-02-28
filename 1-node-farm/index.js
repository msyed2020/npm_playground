const fs = require('fs'); // fs stands for filesystem

const textInput = fs.readFileSync('./txt/input.txt', 'utf-8');

console.log(textInput);

const textOutput = `What we got: ${textInput}.\nCreated on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt', textOutput);
console.log("Wrote file");

//const greet = "Hello";
//console.log(greet);