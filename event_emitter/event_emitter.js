const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on("newSale", () => {
    console.log("New sale!");
});

emitter.emit("newSale");