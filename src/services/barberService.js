import Barber from "../models/Barber.js";

// Create a new barber
export const createBarber = async (barberData) => {
    const { ghanaCardNumber } = barberData;

    // Check if Ghana card is already in use
    const existingBarber = await Barber.findOne({ ghanaCardNumber } );
    if (existingBarber) throw new Error("Ghana card number already registered");

    const barber = await Barber.create(barberData);
    return barber;
};

// Get all barbers
export const getAllBarbers = async () => {
    return await Barber.find({}, {
            fullName: 1,
            phoneNumber: 1,
            email: 1,
            ghanaCardNumber: 1,
            location: 1,
            profileImage: 1,
            yearsOfExperience: 1,
            specialization: 1,
            availability: 1,
            portfolio: 1,
            createdAt: 1,
    });
};

// Get barber by ID
export const getBarberById = async (barberId) => {
    const barber = await Barber.findById(barberId);
    if (!barber) throw new Error("Barber not found");
    return barber;
};

// Update barber by Id
export const updateBarber = async (barberId, updatedData) => {
    const barber = await Barber.findByIdAndUpdate(barberId, updatedData, { new: true});
    if (!barber) throw new Error("Barber not found");
    return barber;
};

// Get barber portfolio
export const getBarberPortfolio = async (barberId) => {
    const barber = await Barber.findById(barberId);
    if (!barber) throw new Error("Barber not found");

    return barber.portfolio;
};

// Delete barber profile
export const deleteBarber = async (barberId) => {
    const barber = await Barber.findByIdAndDelete(barberId);
    if (!barber) throw new Error("Barber not found");

    return { message: "Barber deleted successfully" };
};
