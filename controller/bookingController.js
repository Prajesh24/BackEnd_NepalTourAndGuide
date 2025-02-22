const { Booking } = require('./../model/BookingModel');
const { TourPackage } = require('./../model/PackageModel');
const User = require('./../model/UserModel');

// Create a new booking
const createBooking = async (req, res) => {
  console.log('Booking data received:', req.body);
  try {
    const { userId, packageId } = req.body;
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ error: 'User not found.' });

    const tourPackage = await TourPackage.findByPk(packageId);
    if (!tourPackage) return res.status(404).json({ error: 'Package not found.' });

    const booking = await Booking.create({ userId, packageId, bookingStatus: 'pending' });
    res.status(201).json({ message: 'Booking created successfully!', booking });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'An error occurred while creating the booking.' });
  }
};


const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      attributes: ['bookingId', 'bookingStatus'], // Use 'bookingId' instead of 'id'
      include: [
        { model: User, attributes: ['username','id'] },
        { 
          model: TourPackage, 
          attributes: ['description', 'region', 'places', 'activities', 'duration','numberOfTravelers', 'includeHotel', 'includeFood', 'budget']
        }
      ],
    });

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ error: 'No bookings found.' });
    }

    const formattedBookings = bookings.map((booking) => ({
      bookingId: booking.bookingId, // Use 'bookingId' instead of 'id'
      userName: booking.User.username,
      userId: booking.User.id,
      packageDescription: booking.TourPackage.description,
      region: booking.TourPackage.region,
      places: booking.TourPackage.places,
      activities: booking.TourPackage.activities,
      duration: booking.TourPackage.duration,
      numberOfTravelers: booking.TourPackage.numberOfTravelers,
      includeHotel: booking.TourPackage.includeHotel,
      includeFood: booking.TourPackage.includeFood,
      budget: booking.TourPackage.budget,
      bookingStatus: booking.bookingStatus
    }));

    res.status(200).json({ bookings: formattedBookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'An error occurred while fetching bookings.' });
  }
};


// Update booking status
const updateBookingStatus = async (req, res) => {
  try {
      const { bookingId } = req.params;
      const { status } = req.body;

      console.log("Updating booking ID:", bookingId, "New status:", status);

      if (!status) {
          return res.status(400).json({ error: "Status is required" });
      }

      const booking = await Booking.findByPk(bookingId);
      if (!booking) {
          return res.status(404).json({ error: "Booking not found" });
      }

      booking.bookingStatus = status;
      await booking.save();

      console.log("Updated booking:", booking);

      res.json({ message: "Booking updated successfully", booking });
  } catch (error) {
      console.error("Error updating booking:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createBooking, getAllBookings, updateBookingStatus };
