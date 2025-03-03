const fs = require('fs'); // fs stands for filesystem

// sync way

const textInput = fs.readFileSync('./txt/input.txt', 'utf-8');

console.log(textInput);

const textOutput = `What we got: ${textInput}.\nCreated on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt', textOutput);
console.log("Wrote file sync");
console.log("\n=========================\n");
//const greet = "Hello";
//console.log(greet);
//const ability = "Welcome to Node.js!! I guess XD"
//console.log(ability);

// async way

fs.readFile('./txt/input.txt', 'utf-8', (err, data) => {
    console.log(data);
    fs.readFile('./txt/append.txt', 'utf-8', (err, data2) => {
        console.log(data2);
        
        fs.writeFile('./txt/final.txt', `${data}\n${data2}`, 'utf-8', err => {
            console.log("File has been written");
        });
    });
});