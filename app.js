const chalk = require('chalk');
const yargs = require('yargs');
const busBookings = require('./booking.js');

// book command for bus
yargs.command({
    command: 'bookBus',
    describe: 'Book a bus',
    builder: {
        name: {
            describe: 'Bus name',
            demandOption: true,
            type: 'string'
        },
        date: {
            describe: 'Booking date',
            demandOption: true,
            type: 'string'
        },
        fromTime: {
            describe: 'From time',
            demandOption: true,
            type: 'string'
        },
        toTime: {
            describe: 'To time',
            demandOption: true,
            type: 'string'
        },
        numberOfSeats: {
            describe: 'Number of seats',
            demandOption: true,
            type: 'number'
        },
        userName: {
            describe: 'Your name',
            demandOption: true,
            type: 'string'
        },
        UserEmail: {
            describe: 'Your Email',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        console.log('User: ' + argv.userName);
        console.log('Email ' + argv.UserEmail)
        console.log('Bus: ' + argv.name);
        console.log('Date: ' + argv.date);
        console.log('From Time: ' + argv.fromTime);
        console.log('To Time: ' + argv.toTime);
        console.log('Number of Seats: ' + argv.numberOfSeats);
        busBookings.confirmBusBooking(argv.userName, argv.UserEmail, argv.name, argv.date, argv.fromTime, argv.toTime, argv.numberOfSeats);
    }
});

// check command for bus
yargs.command({
    command: 'checkBus',
    describe: 'Check bus bookings',
    handler() {
        busBookings.checkBusBooking();
    }
});

// show command for bus
yargs.command({
    command: 'showBus',
    describe: 'Show details of a bus booking',
    builder: {
        name: {
            demandOption: true,
            type: 'string'
        },
        date: {
            demandOption: true,
            type: 'string'
        },
        fromTime: {
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        busBookings.showBusBooking(argv.name, argv.date, argv.fromTime);
    }
});

// cancel command for bus
yargs.command({
    command: 'cancelBus',
    describe: 'Cancel a bus booking',
    builder: {
        name: {
            describe: 'Bus name',
            demandOption: true,
            type: 'string'
        },
        date: {
            describe: 'Booking date',
            demandOption: true,
            type: 'string'
        },
        fromTime: {
            describe: 'From time',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        busBookings.cancelBusBooking(argv.name, argv.date, argv.fromTime);
    }
});

yargs.parse();