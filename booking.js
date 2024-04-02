const fs = require('fs');
const chalk = require('chalk');

const confirmBusBooking = function (userName, userEmail, busName, date, fromTime, toTime, numberOfSeats) {
    const busBookings = loadBusBookings();
    const duplicateBookings = busBookings.filter(function (booking) {
        return booking.UserName === userName && booking.date === date && booking.fromTime === fromTime && booking.busName === busName;
    });

    if (duplicateBookings.length === 0) {
        busBookings.push({
            UserName: userName,
            UserEmail: userEmail,
            busName: busName,
            date: date,
            fromTime: fromTime,
            toTime: toTime,
            numberOfSeats: numberOfSeats
        });
        saveBusBookings(busBookings);
        console.log(chalk.inverse('Bus booking confirmed successfully!'));
    } else {
        console.log('Booking already exists for the specified details!');
    }
};

// save bus bookings
const saveBusBookings = function (busBookings) {
    const dataJSON = JSON.stringify(busBookings, null, 2);
    fs.writeFileSync('busBookings.json', dataJSON);
};

const loadBusBookings = function () {
    try {
        const dataBuffer = fs.readFileSync('busBookings.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
};


const checkBusBooking = () => {
    const busBookings = loadBusBookings(); 

    const tableData = busBookings.map(booking => ({
        UserName: booking.UserName,
        busName: booking.busName,
        fromTime: booking.fromTime
    }));

    console.log(chalk.bgGreen("List of booked buses"));
    console.table(tableData);
};

// Show bus booking details
const showBusBooking = (busName, date, fromTime) => {
    const busBookings = loadBusBookings();
    const booking = busBookings.find((booking) => booking.busName === busName && booking.date === date && booking.fromTime === fromTime);
    if (booking) {
        console.log(chalk.inverse(booking.busName));
        console.log('Date: ' + booking.date);
        console.log('From Time: ' + booking.fromTime);
        console.log('To Time: ' + booking.toTime);
        console.log('Number of Seats: ' + booking.numberOfSeats);
        console.log(chalk.bgGreen("This is Your bus booking"));
    } else {
        console.log(chalk.red.inverse("Bus booking not found"));
    }
};

// Cancel bus booking
const cancelBusBooking = function (busName, date, fromTime) {
    const busBookings = loadBusBookings();
    const busBookingsToKeep = busBookings.filter((booking) => !(booking.busName === busName && booking.date === date && booking.fromTime === fromTime));
    if (busBookings.length > busBookingsToKeep.length) {
        console.log(chalk.green.inverse('Bus booking canceled successfully'));
        saveBusBookings(busBookingsToKeep);
    } else {
        console.log(chalk.red('No such bus booking found!'));
    }
};

module.exports = {
    confirmBusBooking: confirmBusBooking,
    cancelBusBooking: cancelBusBooking,
    checkBusBooking: checkBusBooking,
    showBusBooking: showBusBooking
};