import Booking from "../models/Booking.js";
import Barber from "../models/Barber.js";

class BookingService {
    //user create a booking
    static async createBooking({ userId, barberId, date, time, location, style, styleImage }) {
        const barber = await Barber.findByPk(barberId);
        if (!barber) throw new Error("Barber not found");

        if (!barber.availability) throw new Error("This barber is not available for booking at this time");

        //if a user selects a style, ensure it is from the barbers portfolio
        if (style && style !== "Custom"){
            if (!barber.portfolio.includes(style)){
                throw new Error("Selected style is not available in the barber's portfolio");
            }
        }
        //create booking
        const booking = await Booking.create({ 
            userId, barberId, date, time, location, style, styleImage,
            status: "pending", 
        });
        //notify barber when booking is created
        console.log(`Notify Barber ${barberId}: New booking from User ${userId}`);
        return booking;
    }

    
    static async getBookingsByUser(userId){
        return await Booking.findAll({ where: { userId }});
    }

    static async getBookingsByBarber(barberId){
        return await Booking.findAll({ where: { barberId } });
    }

    
    static async updateBookingStatus(bookingId, status){
        const booking = await Booking.findByPk(bookingId);

        if(!booking) throw new Error('Booking not found');

        booking.status = status;
        await booking.save();

        //notification placeholder
        if(status === "accepted"){
            console.log(`Notify User ${booking.userId}: Your booking has been accepted.`);
        }else if (status ==="rejected"){
            console.log(`Notify User ${booking.userId}: Your booking was rejected.`);
        }else if (status ==="rescheduled"){
            console.log(`Notify User ${booking.userId}: Your booking was rescheduled.`);
        }

        return booking;  
    }

    static async rescheduleBooking(bookingId, newDate, newTime, requestedBy){
        console.log(`Received bookingId: ${bookingId}`); // Log booking ID
        const booking = await Booking.findByPk(bookingId);
        if (!booking) {
            console.log("Booking not found");
            throw new Error("Booking not found");
        }

        if (booking.status !== "accepted") throw new Error("Only accepted bookings can be rescheduled");

        booking.date = newDate;
        booking.time = newTime;
        booking.status = "rescheduled"; 
        await booking.save();

        //notify barber when booking has been rescheduled
        console.log(`Notify Barber ${booking.barberId} & User ${booking.userId}: Booking rescheduled by ${requestedBy}`);
        return booking;  
    }
}

export default BookingService;
