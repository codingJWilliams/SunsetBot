const { Listener } = require('discord-akairo');

class DaddyListener extends Listener {
    constructor() {
        super('daddylistener', {
            emitter: 'client',
            eventName: 'message'
        });
    }

    exec() {
        console.log('I\'m ready!');
    }
}

module.exports = DaddyListener;