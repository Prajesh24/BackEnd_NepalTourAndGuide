const express = require('express');
const router = express.Router();
const { 
    createBooking, 
    updateBookingStatus ,
    getAllBookings
} = require('../controller/bookingController');

// Create a new booking
router.post('/create-booking', createBooking);

router.get('/all-bookings', getAllBookings);

// Update booking status (e.g., confirmed, cancelled)
router.put('/update-booking/:bookingId', updateBookingStatus);

module.exports = router;
