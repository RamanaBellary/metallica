var eventEmitterService = (function () {
    // require the EventEmitter from the events module
    const EventEmitter = require('events').EventEmitter;
    var count = 0;

    var instance;

    function createInstance() {
        console.log('instance created...'+count)
        return new EventEmitter();
    }

    return {
        getInstance: function () {
            if (!instance) {
                count=count+1;
                instance = createInstance();
            }
            return instance;
        }
    };

    // // create an instance of the EventEmitter object
    // const eventEmitter = new EventEmitter();

    // var getEventEmitter = function getEventEmitter() {
    //     return new EventEmitter();
    // };

    // console.log('eventservice....');

    // //Create an event handler:
    // var tradeEventHandler = function () {
    //     console.log('trade got updated...!');
    //     //io.sockets.emit('tradeUpdated', 'tradeData got updated...');
    // }

    // //Assign the event handler to an event:
    // eventEmitter.on('tradeUpdated', tradeEventHandler);
})();



module.exports = {
    eventEmitterService: eventEmitterService
};