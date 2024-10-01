const events = require('events');
const eventEmitter = new events.EventEmitter();

// create an event listener
const screamEventHandler = () => {
    console.log('I hear a scream!');
}

// assign the listener to and event
eventEmitter.on('scream', screamEventHandler);

// fire the scream event
eventEmitter.emit('scream');

// great event listener as a callback with arguments
eventEmitter.on('greet', (name) => {
    console.log(`Hello ${name}!`);
});

eventEmitter.emit('greet', 'Muchemi');
