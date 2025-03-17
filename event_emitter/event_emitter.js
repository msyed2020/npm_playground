const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on("newSale", () => {
    console.log("New sale!");
});

emitter.on("newSale", num => {
    console.log(`There is ${num} as input.`);
})

//emitter.emit("newSale");
emitter.emit("newSale", 9)