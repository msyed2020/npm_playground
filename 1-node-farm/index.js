const fs = require('fs'); // fs stands for filesystem

// sync way

const textInput = fs.readFileSync('./txt/input.txt', 'utf-8');

console.log(textInput);

const textOutput = `What we got: ${textInput}.\nCreated on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt', textOutput);
console.log("Wrote file sync");

//const greet = "Hello";
//console.log(greet);
//console.log("Welcome to Node.js!! I guess XD");

// async way

fs.readFile('./txt/input.txt', 'utf-8', (err, data) => {
    console.log(data);
});