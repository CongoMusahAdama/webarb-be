import * as barberService from "../services/barberService.js";


// Create barber
export const createBarber = async (req, res) => {
    try {
        const { fullName, phoneNumber, email, ghanaCardNumber, location, specialization, yearsOfExperience } = req.body;
        const profileImage = req.file ? req.file.path : null;

        const barber = await barberService.createBarber(fullName, phoneNumber, email, ghanaCardNumber, location, specialization, yearsOfExperience, profileImage);
        res.status(201).json({ message: "Barber created successfully", barber });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

// Get all barbers
export const getAllBarbers = async (req, res) => {
    try {
        const barbers = await barberService.getAllBarbers();
        res.status(200).json(barbers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get barber by ID
export const getBarberById = async (req, res) => {
    try {
        const barber = await barberService.getBarberById(req.params.id);
        if (!barber) {
            return res.status(404).json({ error: "Barber not found" });
        }
        res.status(200).json(barber);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update barber
export const updateBarber = async (req, res) => {
    try {
        const barber = await barberService.updateBarber(req.params.id, req.body);
        res.status(200).json({ message: "Barber updated successfully", barber });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get barber portfolio
export const getBarberPortfolio = async (req, res) => {
    try {
        const portfolio = await barberService.getBarberPortfolio(req.params.id);
        res.status(200).json({ message: "Barber portfolio retrieved successfully", portfolio });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete barber
export const deleteBarber = async (req, res) => {
    try {
        const result = await barberService.deleteBarber(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
