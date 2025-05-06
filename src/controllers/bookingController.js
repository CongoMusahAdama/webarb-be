import { STRING } from "sequelize";
import BookingService from "../services/bookingService.js";

export const createBooking = async (req, res) => {
    try {
        const { barberId, date, time, location, style } = req.body;
        const userId = req.user.id;

        let styleImage = null;
        if (req.file) {
            styleImage = req.file.path; // multer for file uploads TODO
        }

        const booking = await BookingService.createBooking({
            userId, barberId, date, time, location, style, styleImage, // Include styleImage
        });

        // Notify the barber when the new booking is created
        console.log(`Barber ${barberId} - You have a new booking request from User ${userId}`);

        res.status(201).json({ message: "Your booking is successfully created", booking });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserBookings = async (req, res) => { // Fixed typo
    try {
        const userId = req.user.id;
        const bookings = await BookingService.getBookingsByUser(userId);
        res.json({ bookings });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getBarberBookings = async (req, res) => {
    try {
        const barberId = req.params.barberId;

        const bookings = await BookingService.getBookingsByBarber(barberId);
        res.json({ bookings });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateBookingsStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const { bookingId } = req.params;

        const booking = await BookingService.updateBookingStatus(bookingId, status); // Retrieve booking after updating

        // Notify the user about status change
        console.log(`User ${booking.userId} - Your booking status changed to '${status}'`);

        res.json({ message: `Booking ${status}` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const rescheduleBooking = async (req, res) => {
    try {
        const { newDate, newTime } = req.body;
        const { bookingId } = req.params; // Extract bookingId from URL parameters

        const requestedBy = req.user.role === "barber" ? "Barber" : "User";

        const booking = await BookingService.rescheduleBooking(bookingId, newDate, newTime, requestedBy);
        console.log(`📢 Booking ${bookingId} rescheduled to ${newDate} ${newTime} by ${requestedBy}`);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
